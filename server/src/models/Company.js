const { DataTypes, Model } = require('sequelize');

class Company extends Model {
  static init(sequelize){
    return super.init({
      name: { type: DataTypes.STRING, allowNull: false, },
    },{
      sequelize,
      tableName: 'company'
    });
  }
}

module.exports = Company;
