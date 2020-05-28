

// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    Month:{
      decimal:0,
      incometotal:0,
      outcometotal:0,
      total:0,
    },
    total:0,
    isToday:true,
    getDate:{
      month:3,
      date:2
    },
    cost:{
      income:4.21,
      outcome:3.45
    },
    onload:false,
    cureentDate:"",
        array:[
         
      
        ],
        timer:{
            start:null,
            end:null,
        }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置日期
    //设置结束日期
    let year=(new Date().getFullYear()).toString();
    let mon=(new Date().getMonth()+1).toString();
    let day=(new Date().getDate()).toString();
    
    let startdate=year+"-"+mon+"-"+"01"
    let end=(new Date().getFullYear()+1).toString()+"-"+mon+"-"+day
    this.setData({
      'timer.start':startdate,
      'timer.end':end,
      'getDate.month':(new Date().getMonth()+1).toString(),
      'getDate.date':(new Date().getDate()).toString()
    })
    console.log(startdate)
    
    console.log(this.data.isToday)
    if(this.data.onload==false){

      this.setData({
        'onload':true,
      })
      console.log("onload")
    }
   
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindDateChange:function(e){

    console.log(e.detail)

    let getmonth=e.detail.value.slice(5,7)
    let getdate=e.detail.value.slice(8,10)
    console.log(getdate)
    this.setData({
      array:[],
      'isToday':false,
      'getDate.month':getmonth,
      'getDate.date':getdate
    })
    this.renderdata(e.detail.value)
    this.renderdatamonth(e.detail.value)
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let year=new Date().getFullYear().toString();
    let mon=new Date().getMonth()+1;
    let day=(new Date().getDate()).toString();
    let year2=(new Date().getFullYear()+1).toString();
    if(mon<"10"){
      mon="0"+mon.toString();
    }
    else{

    }
    if(day<"10"){
      day="0"+day;
    }
    else{

    }
    let startdate=year+"-"+mon+"-"+day
    let enddate=year2+"-"+mon+"-"+day

    console.log(startdate)
      // //拉取数据库数据
    // const db=wx.cloud.database().collection("Userinfo").get({
    //  success:function(res){
    //    console.log(res)
    //  }
    // })
    console.log("show")
    this.renderdata(startdate);
    this.renderdatamonth(startdate);

  },

  renderdata:function(date){
   
    this.setData({
      'cost.outcome':0,
      'cost.income':0
    })
    if(this.data.onload==true){
     
      let renderdata=[]
      var that=this
      wx.cloud.callFunction({
        name:"getdata",
        data:{date},
        success:function(res){
          // console.log(res.result.data[1].event)
          for(let i=0;i<res.result.data.length;i++){
            renderdata.push(res.result.data[i].event.uploaddata)
          }
          console.log(renderdata)
          let array=[]
          let income=0
          let outcome=0
          for(let i=0;i<renderdata.length;i++){
            var dattype={
                id:renderdata[i].title,
                message:renderdata[i].info,
                status:renderdata[i].price,
                img:renderdata[i].imgurl,
                type:renderdata[i].headtitle,
                style:null
            }
            dattype.status=Number(dattype.status).toFixed(2)
            console.log(dattype.type)
            if(dattype.type=="支出"){
             dattype.status="-￥"+ dattype.status
             outcome+=Number(renderdata[i].price)
              // console.log("zhichu")

            }
            else{
              dattype.status="+￥"+ dattype.status
              income+=Number(renderdata[i].price)
             
              // console.log("shouru")
              dattype.style="color:green"
            }
            array.push(dattype)
          }
          that.setData({
            'array':array
          })
          console.log(that.data.array)
         
           //   {
    //     id:"购买",
    //     message:"你好，你已经订购了ps5预售.....",
    //     status:"+￥300",
    //     img:"../../imges/sale.png"
    // },
    income.toFixed(2)
    outcome.toFixed(2)
    that.setData({
      'cost.outcome':outcome,
      'cost.income':income,
    })
        },
        fail:function(err){
          console.log(err)
        }
      })
    }
    else{

    }
   
  },
  renderdatamonth:function(month){
    let getMonth=month.slice(0,7)
    let renderdata=[]
    var that=this
    wx.cloud.callFunction({
      name:"getdata",
      data:{getMonth},
      success:function(res){
      console.log("month"+res)
        for(let i=0;i<res.result.data.length;i++){
          renderdata.push(res.result.data[i].event.uploaddata)
        }
        console.log(renderdata)
        let array=[]
        let income=0
        let outcome=0
        let total=0
        let de
        for(let i=0;i<renderdata.length;i++){
          var dattype={
         
           
              status:renderdata[i].price,
            
              type:renderdata[i].headtitle,
            
          }
          dattype.status=Number(dattype.status).toFixed(2)
          console.log(dattype.type)
          if(dattype.type=="支出"){
            outcome+=Number(dattype.status)

          }
          else{
            income+=Number(dattype.status)
          }
        }
       income=income.toFixed(2)
        outcome=outcome.toFixed(2)
        de=(income-outcome).toString()[lastIndexOf('.')]

        total=(income-outcome).toFixed(0)
        
        that.setData({
          'Month.incometotal':income,
          'Month.outcometotal':outcome,
          'Month.total':total,
          'Month.decimal':de,
        })
  
       
 
      },
      fail:function(err){
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  selectDate:function(){
    
  }
})