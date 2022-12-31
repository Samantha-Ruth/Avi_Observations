//observation, observer_id
const { Observations } = require('../models');

const observationsData = [
  {
    id: 1,
    observations_name: 'x-ray of upper body (chest)',
    observer_id: 1, 
  },
  {
    id: 2,
    observations_name: 'x-ray of upper body (chest)',
    observer_id: 2, 
  },
  {
    id: 3,
    observations_name: 'x-ray of lower body (knees)',
    observer_id: 1, 
  },
  {
    id: 4,
    observations_name: 'x-ray of lower body (knees)',
    observer_id: 2, 
  },
  {
  id: 5,
  observations_name: 'x-ray of limb (hand)',
  observer_id: 1,
  },
  {
    id: 6,
    observations_name: 'x-ray of limb',
    observer_id: 2,
    },
  {
    id: 7,
    observations_name: 'CT Scan',
    observer_id: 1, 
  },
  {
    id: 8,
    observations_name: 'comprehensive metabolic panel',
    observer_id: 1, 
  },
  {
    id: 9,
    observations_name: 'comprehensive metabolic panel',
    observer_id: 2, 
  }
]
const seedObservationsData = () => Observations.bulkCreate(observationsData);

module.exports = seedObservationsData;
