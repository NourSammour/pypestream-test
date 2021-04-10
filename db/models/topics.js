'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topics.belongsToMany(models.subscribers, {
        through: { model: models.subscribersTopics, unique: false },
        as: 'subscribers'
      });
      topics.hasMany(models.subscribersTopics, {
        foreignKey: 'subscriberId',
        as: 'topicSubscribers',
      });
    }
  }
  topics.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'topics'
    }
  );
  return topics;
};
