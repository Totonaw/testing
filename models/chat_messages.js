"use strict";

function chatMsgMdl(sequelize,DataTypes){
 var messages = sequelize.define('chat_messages', {
    text:{
      type:DataTypes.STRING,
      allowNull :false,
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    group_id:{
      type:DataTypes.INTEGER,
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
  return messages;
}

module.exports = chatMsgMdl;