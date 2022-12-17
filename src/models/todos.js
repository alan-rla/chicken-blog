'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
    }
  }
  Todos.init(
    {
      todoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      done: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Todos',
      timestamps: true,
    },
  );
  return Todos;
};
