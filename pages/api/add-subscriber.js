import models from '../../db/models';

const requestValidator = async req => {
  const { email } = req.body;
  const topic = req.body.topic.toLowerCase();

  const dbSubscriber = await models.subscribers.findOne({ where: { email } });

  const dbTopic = await models.topics.findOne({ where: { name: topic } });

  // Check if subscribers already subscribed for topic
  if (!!dbSubscriber && !!dbTopic) {
    const dbSubscriberTopic = await models.subscribersTopics.findOne({
      subscriberId: dbSubscriber?.id,
      topicId: dbTopic?.id
    });

    if (!!dbSubscriberTopic) {
      throw new Error(
        `Email (${email}) already subscribed for this topic (${topic})`
      );
    }
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

  const { email } = req.body;
  const topic = req.body.topic.toLowerCase();

  const [createdSubscriber] = await models.subscribers.findOrCreate({
    defaults: { email },
    where: { email }
  });
  const [createdTopic] = await models.topics.findOrCreate({
    defaults: { name: topic },
    where: { name: topic }
  });

  const createdSubscriberTopic = await models.subscribersTopics.create({
    subscriberId: createdSubscriber.id,
    topicId: createdTopic.id
  });

  return res
    .status(200)
    .json({ createdSubscriber, createdTopic, createdSubscriberTopic });
};
