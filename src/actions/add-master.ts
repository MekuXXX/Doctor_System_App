import { db } from "@/lib/db";
import { AddMasterSchemaType, addMasterSchema } from "@/schemas/addMaster";

const addMaster = async (data: AddMasterSchemaType) => {
  const parsedData = addMasterSchema.safeParse(data);

  if (!parsedData.success) return { error: "خطأ فى البيانات المدخلة" };

  const res = db.master.create({
    data: {
      name: parsedData.data.masterName,
      description: parsedData.data.description,
    },
  });
};
