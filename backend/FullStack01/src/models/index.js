import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import { sequelize } from '../config/configDB.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  // ...existing code...
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelUrl = new URL(modelPath, 'file://');
    import(modelUrl).then(module => {
      const model = module.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
  });
// ...existing code...

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;