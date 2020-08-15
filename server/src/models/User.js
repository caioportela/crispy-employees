const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    return super.init({
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
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

  static hooks() {
    this.beforeCreate('assignPasswordHash', async (user) => {
      user.password = user.generateHash();
    });
  }

  generateHash() {
    const SALT_ROUNDS = 10;
    return bcrypt.hashSync(this.password, SALT_ROUNDS);
  }
}

module.exports = User;
