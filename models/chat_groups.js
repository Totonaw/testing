"use strict";

function chatGroupMdl(sequelize,DataTypes){
 var group = sequelize.define('chat_group', {
    user_id:{
      type:DataTypes.INTEGER,
      allowNull :false,
    },
    user_role:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    date_created:{
        type:DataTypes.DATEONLY,
    },
    date_add:{
      type:DataTypes.DATEONLY,
    },
    date_update:{
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
  return group;
}

module.exports = chatGroupMdl;