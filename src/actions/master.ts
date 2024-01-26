"use server";
import { db } from "@/lib/db";
import { AddMasterSchemaType, addMasterSchema } from "@/schemas/addMaster";
import { revalidatePath } from "next/cache";

export const addMaster = async (data: AddMasterSchemaType) => {
  const parsedData = addMasterSchema.safeParse(data);

  if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };

  const master = await db.master.findFirst({
    where: {
      name: parsedData.data.masterName,
    },
  });

  if (master) return { error: "هذا التخصص موجود بالفعل" };

  try {
    await db.master.create({
      data: {
        name: parsedData.data.masterName,
        description: parsedData.data.description,
      },
    });
    return { success: "تم انشاء التخصص بنجاح" };
  } catch {
    return { error: "خطأ أثناء انشاء التخصص برجاء اعادة المحاولة لاحقا" };
  }
};

export const removeMaster = async (id: string) => {
  try {
    await db.master.delete({ where: { id } });
    return { success: "تم حذف التخصص بنجاح" };
  } catch {
    return { error: "حدثت مشكلة أثناء حذف التخصص" };
  }
};

export const editMaster = async (id: string, name: string, desc: string) => {
  try {
    await db.master.update({
      where: { id: id },
      data: { name: name, description: desc },
    });
    return { success: "تم تحديث التخصص بنجاح" };
  } catch {
    return { error: "خطأ أثناء تحديث التخصص" };
  }
};
