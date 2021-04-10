const Sequelize = require('sequelize');
import dbConfig from '../config';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const models = {};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync');
context
  .keys()
  .map(context)
  .forEach(module => {
    const sequelizeModel = module.default(sequelize, Sequelize);
    models[sequelizeModel.name] = sequelizeModel;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
