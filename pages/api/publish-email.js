import models from '../../db/models';
import nodemailer from 'nodemailer';

const requestValidator = async req => {
  const { topic, message } = req.body;

  if (!message) {
    throw new Error('Can not send empty message as newsletter');
  }
  if (!topic) {
    throw new Error('Topic can not be empty');
  }
  const targetTopic = await models.topics.findOne({
    where: { name: topic.toLowerCase() }
  });

  if (!targetTopic) {
    throw new Error('There is no matched topic in db');
  }
};

export default async (req, res) => {
  try {
    await requestValidator(req);
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }

  const { message } = req.body;
  const topic = req.body.topic.toLowerCase();

  const targetTopic = await models.topics.findOne({
    where: { name: topic },
    include: ['subscribers']
  });
  const emails = targetTopic.subscribers.map(({ email }) => email);

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '29d5dfc7396254',
      pass: 'bcc91838be22d0'
    }
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: emails.join(', '), // list of receivers
    subject: 'Newsletter', // Subject line
    text: message, // plain text body
    html: `<b>${message}?</b>` // html body
  });

  res.status(200).json(info);
};
