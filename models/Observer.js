const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Observer extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Observer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        observer_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        observer_location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newObserverData) {
                newObserverData.password = await bcrypt.hash(newObserverData.password, 10);
                return newObserverData;
            },

            async beforeUpdate(updatedObserverData) {
                updatedObserverData.password = await bcrypt.hash(updatedObserverData.password, 10);
                return updatedObserverData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'observer'
    }
);

module.exports = Observer;
