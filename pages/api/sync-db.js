const Sequelize = require('sequelize');
import models from '../../db/models';

import dbConfig from '../../db/config';

const env = process.env.NODE_ENV || 'development';

const config = dbConfig[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export default async (req, res) => {
  await models.subscribers.sync({
    force: true,
    alter: true,
    logging: console.log
  });
  await models.topics.sync({ force: true, alter: true, logging: console.log });
  await models.subscribersTopics.sync({
    force: true,
    alter: true,
    logging: console.log
  });

  return res.status(200).json({ synced: true });
};
