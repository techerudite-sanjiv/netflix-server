const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Movies = sequelize.define("Movies", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
  },
  gener: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = Movies;
