const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init({
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    }, {
      sequelize,
      paranoid: true,
      tableName: 'user',

      defaultScope: {
        // Remove attributes from default query
        // https://sequelize.org/master/manual/scopes.html
        attributes: {
          exclude: ['password']
        },
      },
    });
  }
}

module.exports = User;
