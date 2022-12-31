const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Observations extends Model {}
Observations.init(
    {
        observations_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        observations_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        observer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'observer',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'observations'
    }
);

module.exports = Observations;
