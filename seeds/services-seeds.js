//observation, price, provider_id, category_id
const { Observations } = require('../models');

const observationsData = [
  {
    id: 1,
    observations_name: 'x-ray of upper body (chest)',
    observations_category: 'Imaging',
    cost: 236,
    provider_id: 1, 
  },
  {
    id: 2,
    observations_name: 'x-ray of upper body (chest)',
    observations_category: 'Imaging',
    cost: 420,
    provider_id: 2, 
  },
  {
    id: 3,
    observations_name: 'x-ray of lower body (knees)',
    observations_category: 'Imaging',
    cost: 181,
    provider_id: 1, 
  },
  {
    id: 4,
    observations_name: 'x-ray of lower body (knees)',
    observations_category: 'Imaging',
    cost: 278,
    provider_id: 2, 
  },
  {
  id: 5,
  observations_name: 'x-ray of limb (hand)',
  observations_category: 'Imaging',
  cost: 243,
  provider_id: 1,
  },
  {
    id: 6,
    observations_name: 'x-ray of limb',
    observations_category: 'Imaging',
    cost: 374,
    provider_id: 2,
    },
  {
    id: 7,
    observations_name: 'CT Scan',
    observations_category: 'Imaging',
    cost: 2186,
    provider_id: 1, 
  },
  {
    id: 8,
    observations_name: 'comprehensive metabolic panel',
    observations_category: 'Laboratory',
    cost: 117,
    provider_id: 1, 
  },
  {
    id: 9,
    observations_name: 'comprehensive metabolic panel',
    observations_category: 'Laboratory',
    cost: 180,
    provider_id: 2, 
  }
]
const seedObservationsData = () => Observations.bulkCreate(observationsData);

module.exports = seedObservationsData;
