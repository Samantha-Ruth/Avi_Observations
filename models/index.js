const Observer = require('./Observer')
const Category = require('./Category')
const Observations = require('./Observations')
const Comment = require('./Comment');

Observer.hasMany(Observations, {
    foreignKey: 'observer_id'
});

Observations.belongsTo(Observer, {
    foreignKey: 'observer_id'
});

Category.hasMany(Observations, {
    foreignKey: 'category_id'
});

Observations.belongsTo(Category, {
    foreignKey: 'category_id'
});

Comment.belongsTo(Observer, {
    foreignKey: 'observer_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Observations, {
    foreignKey: 'observations_id',
    onDelete: 'SET NULL'
});

Observer.hasMany(Comment, {
    foreignKey: 'observer_id',
    onDelete: 'SET NULL'
});

Observations.hasMany(Comment, {
    foreignKey: 'observations_id'
});



module.exports = { Observer, Observations, Category, Comment };