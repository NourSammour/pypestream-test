'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class subscribers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subscribers.belongsToMany(models.topics, {
        through: { model: models.subscribersTopics, unique: false },
        as: 'topics'
      });
      subscribers.hasMany(models.subscribersTopics, {
        foreignKey: 'topicId',
        as: 'subscriberTopics'
      });
    }
  }
  subscribers.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'subscribers'
    }
  );
  return subscribers;
};
