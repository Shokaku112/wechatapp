// miniprogram/pages/chart/chart.js
var wxCharts = require('../../js/wxcharts.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
      isSelectMonth:false,
      currentYear:"",
      datelist:[],
      datesort:[],
      monthlist:[],
      monthsort:[],
      yearlist:[],
      isYear:false,
      isDate:false,
      tabData: [
        {
          title: "年收入",
          money: 0,
          isAct: true,
          type: "shouru"
        },
        {
          title: "年支出",
          money: 0,
          isAct: false,
          type: "zhichu"
        }
      ]
  },
  // 标题列表的切换点击事件
  toggleTap: function(e){
    // 获取当前点击对应的下标
    let index = e.currentTarget.dataset.index;
    // console.log(index)

    // 判断当前点击的是否已激活，是则终止代码
    if (this.data.tabData[index].isAct) {
      return;
    }

    // 将上一个激活的日份取消
    for (var i = 0; i < this.data.tabData.length; i++) {
      if (this.data.tabData[i].isAct) {
        this.data.tabData[i].isAct = false;
        break;  // 终止循环
      }
    }


    // 将点击的日份激活
    this.data.tabData[index].isAct = true;

    this.setData({
      tabData: this.data.tabData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //实例化canvas
    this.getallbookdata()
   
   
  },
  showItem:function(e){
    console.log(e.currentTarget.dataset.type)
    if(this.data.isSelectMonth==false){
      wx.showToast({
        title: '请选择月份',
        icon: 'none',
        duration: 2000
      })
    }
  
    if(e.currentTarget.dataset.type=="date"){
      this.setData({
        'isYear':false,
        'isDate':!this.data.isDate
      })
    }

   
  },
  showItem2:function(e){
    if(e.currentTarget.dataset.type=="year"){
      this.setData({
        'isYear':!this.data.isYear,
        'isDate':false
      })
    }
  },
  selectYear:function(e,p){
    let onloadyear
    //设置选择月份为false
    this.setData({
      isSelectMonth:false
    })
   
    //对点击年份的月份进行排序
    //查找其中的年份
    if(p==null){
      this.setData({
        currentYear:e.currentTarget.dataset.year
      })
      onloadyear=e.currentTarget.dataset.year
      console.log(typeof e.currentTarget.dataset.year)
    }
    if(p==true){
      onloadyear=e
      this.setData({
        currentYear:onloadyear
      })
    }
   
  
    let monthcache=[]
    this.data.monthlist.forEach(v=>{
        if(v.year==onloadyear){
          console.log("该年份为"+v.year)
          //查找是否存在重复的月份
          if(monthcache.indexOf(v.month)==-1){
            monthcache.push(v.month)
            // console.log("非重复月份")
          }
          else{
            // console.log("重复月份")
          }
        }
    })
    // console.log(monthcache.sort(function(a,b){return a-b}))
    // console.log(monthcache)
    // console.log(this.data.monthlist)
    // 利用sort方法对数组进行升序降序排列
    //自写
    for( var i=0;i<monthcache.length-1;i++){
      for(var j=0;j<monthcache.length-1-i;j++){
        if(monthcache[j]>monthcache[j+1]){
          var temp=monthcache[j]
          monthcache[j]=monthcache[j+1]
          monthcache[j+1]=temp
        }
      }
    }
    let monthsort=[]
    for(let i=0;i<monthcache.length;i++){
      var cache={
        isactive:false,
        month:monthcache[i]
      }
      monthsort.push(cache)
    }
    // console.log(monthcache)
    this.setData({
      monthsort:monthsort
    })
    console.log(this.data.monthsort)
  },
  selectMonth:function(e){
    //取消之前的bold
    for(let i=0;i<this.data.monthsort.length;i++){
      let string="monthsort["+i+"].isactive"
      console.log(string)
      this.setData({
       [string]:false
      })
      console.log(this.data.monthsort)
    }
   let index=e.currentTarget.dataset.index;
   let currenttarget= "monthsort["+index+"].isactive"
   this.setData({
     [currenttarget]:true
   })

    //设置isMonth为true
    this.setData({
      isSelectMonth:true
    })
    console.log(e.currentTarget.dataset.month)
    let datecache=[]
    let datelist=[]
    console.log(this.data.datelist)
    this.data.datelist.forEach(v=>{
      //确认年份
      if(v.year==this.data.currentYear){
        //确定月份
        if(v.month==e.currentTarget.dataset.month){
          //去重
         if(datecache.indexOf(v.date)==-1){
           let cache={
             date:v.date,
             isactive:false
           }
           datecache.push(cache)
         }
        }
      }
    })
    console.log(datecache)
    // 排序
   datecache.sort(function(a,b){return a-b})
   //添加属性

   this.setData({
     'datesort':datecache
   })
  
  },
  getallbookdata:function(){
       var datelist=[]
       var monthlist=[]
       var that=this
       wx.cloud.callFunction({
        name:"getdata",
        success:function(res){
            console.log(res)
            res.result.data.forEach(v=>{
              var y=v.event.uploaddata.date.substring(0,4)
              if(that.data.yearlist.indexOf(y)==-1){
                that.data.yearlist.push(y)
              }

            })
            that.data.yearlist.sort(function(a,b){return a-b})
            console.log(that.data.yearlist)
            that.setData({
              yearlist:that.data.yearlist,
              // currentYear:that.data.yearlist[that.data.yearlist.length-1]
            })
             //对对应年份的月份进行格式化 年份=>月份
        res.result.data.forEach(v=>{
          console.log(v.event.uploaddata.date)
          var datacache={
            year:v.event.uploaddata.date.substring(0,4),
            month:v.event.uploaddata.date.substring(5,7),
          }
          // console.log(datacache.year)
          // console.log(datacache.month)
          monthlist.push(datacache)

        })
         //对对应年份的月份进行排序（从小到大）
        console.log(monthlist)
        that.setData({
          'monthlist':monthlist
        })
        //对对应月份的日进行格式化 年份=》月份=》日
        res.result.data.forEach(v=>{
          console.log(v.event.uploaddata.date)
          var datacache={
            year:v.event.uploaddata.date.substring(0,4),
            month:v.event.uploaddata.date.substring(5,7),
            date:v.event.uploaddata.date.substring(8,10)
          }
          datelist.push(datacache)
        })
        // console.log("datelist",datelist)
        that.setData({
          datelist:datelist
        })
       
        let getdate=new Date().getFullYear().toString()
        that.setData({
          currentYear:getdate
        })
        let p=true
        console.log(getdate)
        console.log(typeof getdate)
        that.selectYear(getdate,p)
        }
    
      
       })
      
        
  },
  datetap:function(e){
      console.log(e)
       //取消之前的bold
    for(let i=0;i<this.data.datesort.length;i++){
      let string="datesort["+i+"].isactive"
      console.log(string)
      this.setData({
       [string]:false
      })
      console.log(this.data.datesort)
    }
   let index=e.currentTarget.dataset.index;
   let currenttarget= "datesort["+index+"].isactive"
   this.setData({
     [currenttarget]:true
   })

  },
  //根据年份获取数据
  selectYearData:function(){
    //varies year
    //获取年份一年的日期
    let start="2020-01-02"
    let end="2020-01-25"
    wx.cloud.callFunction({
      name:"getdata",
      data:{
        start:start,
        end:end,
        timeType:1
      },
      success:function(res){
          console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.getallbookdata()
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

  }
})