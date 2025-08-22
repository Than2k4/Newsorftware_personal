import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node_fullstack', 'root', '100104', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

export { connectDB as default, sequelize };