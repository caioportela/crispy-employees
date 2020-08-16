const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('../utils/JWT');

class User extends Model {
  static init(sequelize) {
    return super.init({
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
      name: { type: DataTypes.STRING, allowNull: false },
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

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false,
        field: 'companyId',
        name: 'company',
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

  generateToken(password) {
    const isValid = bcrypt.compareSync(password, this.password);
    if(!isValid) { return null; }

    return jwt.sign({ user: this.id });
  }
}

module.exports = User;
