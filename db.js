const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('Netflix', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})
module.exports=sequelize;