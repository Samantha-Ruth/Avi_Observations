const seedObservers = require('./observer-seeds');
const seedObservations = require('./observations-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  
  await seedObservers();
  console.log('--------------');

  await seedObservations();
  console.log('--------------');

  process.exit(0);
};

seedAll();
