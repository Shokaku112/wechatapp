// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const command=db.command()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event.date)
  if(event.date){
    return await db.collection('Userinfo').where({
      'event.uploaddata.date':event.date
     }).get()
     console.log(event.getMonth)
     console.log("执行")
  }
  else if(event.getMonth){
    return await db.collection('Userinfo').where({
      'event.uploaddata.month':event.getMonth
    
     }).get()
     console.log(event.getMonth)
     console.log("执行")
  }
  // else if(event.checkdate){
  //   //加入要获取一个事件范围内的数据
  //   if(event.timetype==1){
    
  //   }

  // }
  else{
    return await db.collection('Userinfo').
     get()
     console.log("执行")
  }
 
}
// 'event.userInfo.openId':wxContext.OPENID,
    // event:{
    //   userInfo:{
    //     openId:wxContext.OPENID
    //   }
    // }
    //根据OPENID查找
    //根据日期查找