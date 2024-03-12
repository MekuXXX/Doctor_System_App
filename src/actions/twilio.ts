"use server";
import twilio from "twilio";
const FROM_SMS = process.env.TWILIO_SMS_NUMBER;
const FROM_WHATSAPP = process.env.TWILIO_WHATSAPP_NUMBER;
const SID = process.env.TWILIO_ACCOUNT_SID;
const TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function sendSMS(message: string, to: string) {
  try {
    const client = twilio(SID, TOKEN);
    console.log("FROM:", FROM_SMS);
    client.messages
      .create({
        body: message,
        from: FROM_SMS,
        to: to,
      })
      .then((res) => console.log(res));

    return { success: "تم ارسال الرسالة بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء ارسال الرسالة" };
  }
}

export async function sendWhatsapp(message: string, to: string) {
  try {
    const client = twilio(SID, TOKEN);
    console.log("FROM:", FROM_WHATSAPP);
    const res = await client.messages.create({
      body: message,
      from: `whatsapp:${FROM_WHATSAPP}`,
      to: `whatsapp:${to}`,
    });

    console.log(res);
    return { success: "تم ارسال الرسالة بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء ارسال الرسالة" };
  }
}
