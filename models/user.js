"use strict";

function userMdl(sequelize,DataTypes){
 var user = sequelize.define('user', {
    username:{
      type:DataTypes.STRING,
      allowNull :false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    date_add:{
      type:DataTypes.DATEONLY,
    },
    date_upd:{
      type:DataTypes.DATEONLY,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    },
    timestamps:false,
    freezeTableName:true,
  });
  return user;
}

module.exports = userMdl;