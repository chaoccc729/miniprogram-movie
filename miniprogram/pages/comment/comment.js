// pages/comment/comment.js
const db = wx.cloud.database();
Page({

  /**
  * 页面的初始数据
  */
  data: {
    details: {},
    score: 5,
    comment:'',
    images:{}
  },
  onInputChange:function(event){
    this.setData({
      comment:event.detail
    })
  },
  onRateChange:function(event){
    this.setData({
      score: event.detail
    })

  },
  submit:function(){
    db.collection('movie').add({
      data:{
        movieId:this.data.movieId,
        comment:this.data.comment,
        score:this.data.score,
        images:this.data.images
      },
      success:function(res){
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  upload:function(){
    wx.chooseImage({
      count: 9,
      sizeType: ['orignal', 'compressed'],
      sourceType: ['album', 'camera'],
      complete:function(res) {
        cloudPath: 'chao.png';
        const tempFilePaths = res.tempFilePaths;
        console.log('temp' + tempFilePaths);
        this.setData({
          images: tempFilePaths
        })

      }.bind(this)
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
  wx.cloud.callFunction({
    name: 'get_details',
    data: {
      _id: options.movieId
    },
    complete: function (res) {
      console.log(JSON.parse(res.result) );
      this.setData({ details: JSON.parse(res.result) })
    }.bind(this)
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
