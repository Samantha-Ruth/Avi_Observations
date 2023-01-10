const { Observer } = require('../models');

const observerData = [
  {
    observer_name: 'Denver Health',
    observer_location: 'Denver',
    email: 'denver@denver.com',
    password: 'UofD', 
  },
  {
    observer_name: 'Lenox Hill Hospital',
    observer_location: 'New York',
    email: 'LenoxHill@email.com',
    password: 'Lenox',
  }
]
const seedObserverData = () => Observer.bulkCreate(observerData);

module.exports = seedObserverData;
