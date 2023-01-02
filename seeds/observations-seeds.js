//observation, observer_id
const { Observations } = require('../models');

const observationsData = [
  {
    observations_id: 1,
    observations_name: 'x-ray of upper body (chest)',
    observer_id: 1, 
  },
  {
    observations_id: 2,
    observations_name: 'x-ray of upper body (chest)',
    observer_id: 2, 
  },
  {
    observations_id: 3,
    observations_name: 'x-ray of lower body (knees)',
    observer_id: 1, 
  },
  {
    observations_id: 4,
    observations_name: 'x-ray of lower body (knees)',
    observer_id: 2, 
  },
  {
  observations_id: 5,
  observations_name: 'x-ray of limb (hand)',
  observer_id: 1,
  },
  {
    observations_id: 6,
    observations_name: 'x-ray of limb',
    observer_id: 2,
    },
  {
    id: 7,
    observations_name: 'CT Scan',
    observer_id: 1, 
  },
  {
    observations_id: 8,
    observations_name: 'comprehensive metabolic panel',
    observer_id: 1, 
  },
  {
    observations_id: 9,
    observations_name: 'comprehensive metabolic panel',
    observer_id: 2, 
  }
]
const seedObservationsData = () => Observations.bulkCreate(observationsData);

module.exports = seedObservationsData;
