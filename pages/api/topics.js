import models from '../../db/models';

export default async (req, res) => {
  const topics = await models.topics.findAndCountAll({});

  res.status(200).json(topics);
};
