"use server";

import bcrypt from "bcryptjs";

import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
  values: NewPasswordSchemaType,
  token?: string | null
) => {
  if (!token) {
    return { error: "الكود غير موجود" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "البيانات الذى أدخلتها غير صحيحه" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "الكود الذى أدخلته غير صحيح" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "الكود الذى أدخلته غير صحيح" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "الحساب الذى أدخلتة غير صحيح" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "تم تحديث كلمة المرور بنجاح" };
};
