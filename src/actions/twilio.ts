"use server";
import twilio from "twilio";
const FROM = process.env.TWILIO_NUMBER;
const SID = process.env.TWILIO_ACCOUNT_SID;
const TOKEN = process.env.TWILIO_AUTH_TOKEN;

export async function sendSMS(message: string, to: string) {
  try {
    const client = twilio(SID, TOKEN);

    client.messages
      .create({
        from: "+201061637259",
        body: "Hello there!",
        to: "+201144200925",
      })
      .then((res) => console.log(res));

    return { success: "تم ارسال الرسالة بنجاح" };
  } catch {
    return { error: "حدث خطأ أثناء ارسال الرسالة" };
  }
}
