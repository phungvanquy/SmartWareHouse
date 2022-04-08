import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const client = twilio(accountSid, authToken);

const sendMessWhatsApp = async (messsageToSend) => {
  console.log(process.env.TWILIO_accountSid);
  await client.messages
    .create({
      body: messsageToSend,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+79680434764",
    })
    .done();
};

export default sendMessWhatsApp;
