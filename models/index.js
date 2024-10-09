const User = require('./User');
const Payment = require('./Payment');

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Payment };
