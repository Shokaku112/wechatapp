// miniprogram/pages/record/record.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    userinformation:{
      date:null,
      price:null,
      info:null
    },
    banner: [
        [],
        []
    ],
    title:"支出",
    chages2:"background:white;",
    chages1:"background:#13227a;",
    array2:[
      { status:true,
        display:"display:block"
        
      },
      { status:true,
        display:"display:none"
      }
    ],
   
     
     
   
    array3:[
      {
        img:"../../imges/drink.png",
        itemname:"ご飯",

      },
      {
        img:"../../imges/sale.png",
        itemname:"ご飯",

      },
      {
        img:"../../imges/drink.png",
        itemname:"ご飯",

      },
      {
        img:"../../imges/sale.png",
        itemname:"ご飯",

      },
      {
        img:"../../imges/drink.png",
        itemname:"ご飯",

      },
      {
        img:"../../imges/drink.png",
        itemname:"ご飯",
      },
      {
        img:"../../imges/drink.png",
        itemname:"ご飯",
      },
      {
        img:"../../imges/drink.png",
        itemname:"ご飯",

      },
      {
        img:"../../imges/drink.png",
        itemname:"ご飯",

      },
      {
        img:"../../imges/sale.png",
        itemname:"ご飯",

      }
    ],
    array1:[
      {
        img:"../../imges/drink.png",
        itemname:"餐饮",

      },
      {
        img:"../../imges/sale.png",
        itemname:"销售",

      },
      {
        img:"../../imges/drink.png",
        itemname:"餐饮",

      },
      {
        img:"../../imges/sale.png",
        itemname:"销售",

      },
      {
        img:"../../imges/drink.png",
        itemname:"餐饮",

      },
      {
        img:"../../imges/drink.png",
        itemname:"餐饮",
      },
      {
        img:"../../imges/drink.png",
        itemname:"餐饮",
      },
      {
        img:"../../imges/drink.png",
        itemname:"餐饮",

      },
      {
        img:"cloud://test-server-04aog.7465-test-server-04aog-1302176545/images/sale.png",
        itemname:"餐饮",

      },
      {
        img:"cloud://test-server-04aog.7465-test-server-04aog-1302176545/images/sale.png",
        itemname:"销售",

      }
    ],
    array4:[
      {
        isactive:true,
        tagname:"现金",
        style:"background:#ffab05;"
      },
    
      {
        isactive:false,
        tagname:"微信钱包",
        style:"background:#f5f5f5;"
      }, {
        isactive:false,
        tagname:"支付宝",
        style:"background:#f5f5f5;"
      },
      {
        isactive:false,
        tagname:"储蓄卡",
        style:"background:#f5f5f5;"
      },
      {
        isactive:false,
        tagname:"信用卡",
        style:"background:#f5f5f5;"
      }
    ],
    setData:{
      Dated:null,
      start:null,
      end:null
    },
   array5:[

   ],
   tabData:[{

   },
   {

   }]
  },
  outtcome:function(e){
    console.log(e.currentTarget.dataset.title)
      this.setData({
        'array2[0].status':false,
        'array2[0].display':"display:none",
        'chages2':"background:#13227a",
        'chages1':"background:white",
        'array2[1].status':true,
        'array2[1].display':"display:block",
        'title':e.currentTarget.dataset.title
      })
    
   
    // console.log()
    
},

changed:function(it){
    console.log(it.currentTarget.dataset.indx)
    let index=it.currentTarget.dataset.indx;
    let tostring="array4["+index+"].isactive"
    let tostring2="array4["+index+"].style"
    console.log(this.data.array4[index])
    if(this.data.array4[index].isactive==false){
      console.log("hit")
      this.setData({
        [tostring]:true,
        [tostring2]:"background:#ffab05;"
      })
      console.log(tostring2)
      console.log(tostring)
       console.log(this.data.array4[index])
    }
    else{
      
      this.setData({
        [tostring]:false,
        [tostring2]:"background:#f5f5f5;"
      })
    }
     
},
income:function(e){
  
  this.setData({
    'array2[1].status':false,
    'array2[1].display':"display:none",
    'array2[0].status':true,
    'chages1':"background:#13227a",
    'chages2':"background:white",
    'array2[0].display':"display:block",
    'title':e.currentTarget.dataset.title
  })
  console.log(e.currentTarget.dataset.title)

// console.log()

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let year=new Date().getFullYear().toString();
    let mon=(new Date().getMonth()+1).toString();
    let day=(new Date().getDate()).toString();
    let year2=(new Date().getFullYear()+1).toString();
    if(mon<"10"){
      mon="0"+mon;
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
   
    // console.log(end)
    let that=this;

    // console.log(typeof start)
    // console.log(typeof this.Dated)
    this.setData({
        'setData.Dated':startdate,
        'setData.start':startdate,
        'setData.end':enddate
    })
    // wx.cloud.callFunction({
    //   name:"getdb",
    //   data:{},
    //  success:function(res){
    //     console.log("call succeded")
    //     that.setData({
    //       'array5':res.result.data
    //     })
    //     let data=res.result.data
    //   }
    //  })
     wx.cloud.callFunction({
      
       name:"getdb",
       data:{}
     }).then(res=>{

        let add=res.result.data;
      //  for(let k;k<add.length;k++){
      //    add[k].isactive=false
      //  }
        add.forEach(v => {
        v.isactive=false
      });
      console.log(add)
      that.setData({
        'array5':add
      })
      let data1=[]
      let begin=0
      let data2=res.result.data
      while(begin<data2.length){
        let temp=data2.slice(begin,begin+8)
        begin+=8
        data1.push(temp)
      }
     this.setData({
       'banner[0]':data1[0],
       'banner[1]':data1[1]
     })
      console.log(this.data.banner)
     }).then(console.log("hi"))
     .catch(e=>{
       console.log(e)
     })
     
  },
  bindDateChange:function(e){
    console.log(this.data.array5)
    // console.log(e.detail.value)
    this.setData({
      'setData.Dated':e.detail.value,
      'userinformation.date':e.detail.value
      
    })
    console.log(this.data.userinformation.date)
  },
  //记账类型
  clickchanged:function(e){
        let index=e.currentTarget.dataset.block.length
        let index2=e.currentTarget.dataset.index;
        let block=null;
        console.log(index2)
        for(let i=0;i<this.data.banner.length;i++){
            if(index==this.data.banner[i].length){
              block=i;
              break;
            }
        }

    
        let data=this.data.banner[block][index2]

        let formatarray="banner["+block+"]["+index2+"]"+".isactive"
        console.log(data.isactive)
     
        console.log([formatarray.isactive])
        if(data.isactive==false){
          this.setData({
            [formatarray]:true
          })
        }
        else{
          this.setData({
            [formatarray]:false
          })
        }
         // console.log(e.currentTarget.dataset.index)
        // for(let i=0;i<bannerType[i].length;j++){
        //   for(let j=0;j<bannerType[i].length;j++){
        //     bannerType[i][j].isactive=false
        //   }
        // }


  },

  price:function(e){
    console.log(e.detail.value)
    this.setData({
      'userinformation.price':e.detail.value
    })
  },
  info:function(e){
    console.log(e.detail.value)
    this.setData({
      'userinformation.info':e.detail.value
    })
  },
//  getDate:function(e){
//   console.log(e.detail.value)
//   console.log(typeof e.detail.value)
//   this.setData({
//     'userinformation.date':e.detail.value.tostring()
//   })
//  },
 savedata:function(){
   wx.showLoading({
     title: 'Saving',
   })
   var type=[]
   var select=[]
   //检查选择类型
   //首页选择框
   var form=this.data.userinformation;
   let getselecttab=this.data.banner;
   let format1
   console.log(this.data.banner)
    // console.log(getselecttab.length)
    console.log(getselecttab[0].length)
    // console.log(getselecttab[1].length)
   for(let i=0;i<getselecttab.length;i++){
    console.log(getselecttab[i].length)
     for(let k=0;k<getselecttab[i].length;k++){
    if(getselecttab[i][k].isactive){
     format1={
        title:getselecttab[i][k].title,
        imgurl:getselecttab[i][k].icon_url,
        stringtype:getselecttab[i][k].type,
      }
      console.log(format1)
      type.push(format1)
      break;
    }
     }
    }
    console.log(type)
   
    if(type.length==0){
      wx.showToast({
        title: '请选择类型',
        icon: 'none',
        duration: 2000
      })
   
    }
    let getselecttab2=this.data.array4
    for(let i=0;i<getselecttab2.length;i++){
      if(getselecttab2[i].isactive==true){
       let format2=getselecttab2[i].tagname
        select.push(format2)
        break;
      }
    }
    // let data1=[]
    
    // let data2=[]
    // let uploaddata={
    //  accounttype:type[0].type,
    //  comment:userinformation.info,
    //  cost:"支出",
    //  costType:
    //  date:,
    //  icon:,
    //  iconType:,

    // }
    let uploaddata={
        headtitle:this.data.title,
        imgurl:format1.imgurl,
        title:format1.title,
        titletype:format1.stringtype,
        accounttype:select[0],
        date:form.date,
        info:form.info,
        price:form.price,  
        month:form.date.slice(0,7)    

    }
    console.log(select)
  //  封装选择类型
    // console.log(this.data.userinformation.price)
    // console.log(this.data.userinformation.date)
    // console.log(this.data.userinformation.info)
    // const db=wx.cloud.database().collection("Userinfo")
    // let that=this;
    // db.add({
    //   data:{
    //     uploaddata
    //   },
    //   success:function(res){
    //     console.log("upload success",res)
    //   },
    //   fail:function(error){
    //     console.log("upload failed",error)
    //   }
    // })
    let that=this
    wx.cloud.callFunction({
      name:"adddata",
      data:{uploaddata},
      success:function(res){
        console.log("调用成功",res)
        that.resetData();
        wx.hideLoading()

      }
    }) 
 },
 resetData:function(){
      let top=this.data.banner
      let mid=this.data.array4;
      //resettop  "background:#ffab05;""background:#f5f5f5;"
      for(let i=0;i<this.data.banner.length;i++){
        for(let k=0;k<this.data.banner[i].length;k++){
          let resetdata="banner["+i+"]["+k+"].isactive"
          this.setData({
          [resetdata]:false
          })
        }
      }
      
      //resetmid
      this.setData({
        'array4[0].isactive':true,
        'array4[0].style':"background:#ffab05;"
      })
      for(let i=1;i<this.data.array4.length;i++){
        let getdata="array4["+i+"].isactive"
        let getdata2="array4["+i+"].style"
        console.log(getdata)
        // "background:#f5f5f5;"
        this.setData({
            [getdata]:false,
            [getdata2]:"background:#f5f5f5;"       
        })
      }
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

  },
  onHide:function(){
    this.resetData()
  }

  
})