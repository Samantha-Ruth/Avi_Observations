const { Observer } = require('../models');

const observerData = [
  {
    observer_name: 'Denver Health',
    observer_url: 'denverhealth.com',
    email: 'denver@denver.com',
    password: 'UofD', 
    address: '777 Bannock St',
    address_city: 'Denver',
    address_state: 'Colorado',
    address_zip: '80204',
    specialization: 'Emergency Medical'
  },
  {
    observer_name: 'Lenox Hill Hospital',
    observer_url: 'lenoxhill.northwell.edu',
    email: 'LenoxHill@email.com',
    password: 'Lenox',
    address: '100 E 77th St',
    address_city: 'New York',
    address_state: 'New York',
    address_zip: '10075',
    specialization: 'Ear, Nose, Throat'
  }
]
const seedObserverData = () => Observer.bulkCreate(observerData);

module.exports = seedObserverData;
