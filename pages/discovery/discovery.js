// pages/discovery/discovery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal:'',
    imgUrls: [
      '../../assets/images/recommend/3-gou-3.jpg',
      '../../assets/images/recommend/4-gou-2.jpg',
      '../../assets/images/recommend/6-gou-5.jpg',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  //显示搜索
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //隐藏搜索
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  //清除搜索框
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  //搜索输入触发
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //滑块改变
  changeSwiper:function(e){
    //console.log(e.detail.current)
  }
})