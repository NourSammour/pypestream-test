import models from '../../db/models';
import nodemailer from 'nodemailer';
import axios from 'axios';

export default async (req, res) => {
  console.log(process.env.MAILTRAP_API_TOKEN);
  console.log(process.env.MAILTRAP_INBOX_ID);
  const reqConfig = {
    headers: {
      'api-Token': process.env.MAILTRAP_API_TOKEN
    }
  };
  const { data } = await axios.get(
    `https://mailtrap.io/api/v1/inboxes/${
      process.env.MAILTRAP_INBOX_ID
    }/messages`,
    reqConfig
  );
  const messagesPromises = data.map(
    async message =>
      new Promise(async (resolve, reject) => {
        const messageText = await axios
          .get(`https://mailtrap.io/${message.txt_path}`, reqConfig)
          .catch(reject);
        resolve({ ...message, message_text: messageText.data });
      })
  );

  const messages = await Promise.all(messagesPromises);

  res.status(200).json({ messages });
};
