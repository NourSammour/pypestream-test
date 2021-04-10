'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class subscribersTopics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subscribersTopics.belongsTo(models.subscribers);
      subscribersTopics.belongsTo(models.topics);
    }
  }
  subscribersTopics.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      subscriberId: DataTypes.BIGINT,
      topicId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'subscribersTopics'
    }
  );
  return subscribersTopics;
};
