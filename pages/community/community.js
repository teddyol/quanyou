const app = getApp();//获取全局的数据
const community = require('../../assets/data/community.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNav:'1',//当前选项卡
    sysWidth:'',//图片宽度
    recommendList: [],//推荐列表
    followList:[],//推荐列表
    videoList:[],//视频列表
    recommend_isDataBack: false,//数据是否已加载
    follow_isDataBack: false,//数据是否已加载
    video_isDataBack:false,//数据是否已加载
    videoUrl:'',//视频播放地址
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
    var _self = this;
    _self.setData({
      sysWidth: wx.getSystemInfoSync().windowWidth + 'px',
    });
    this.getList();
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
    wx.stopPullDownRefresh();
    this.getList();
    console.log('下拉加载')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉加载')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //回到顶部
  goTop:function(){
    if(wx.pageScrollTo){
      wx.pageScrollTo({
        scrollTop:0
      });
    }else{
      app.model('当前微信版本过低，请升级到最新版本。');
    };
  },
  //导航栏切换
  tapNav:function(e){
    var _self = this;
    _self.setData({
      currentNav  : e.currentTarget.dataset.key
    });
    switch(_self.data.currentNav){
      case '1':
        if(!_self.data.recommend_isDataBack){
          _self.goTop();
          _self.getList(); 
        };
        break;
      case '2':
        if (!_self.data.follow_isDataBack) {
          _self.goTop();
          _self.getList();
        };
        break;
      case '3':
        if (!_self.data.video_isDataBack) {
          _self.goTop();
          _self.getList();
        };
        break;
    };
  },
  //获取列表
  getList:function(){
    // app.ajax('../../assets/data/recommendList.json',{},function(){
    //   console.log(111111)
    // })
    var _self = this;
    switch (_self.data.currentNav) {
      case '1':
        _self.setData({
          recommendList : community.recommendList,
          recommend_isDataBack: true,
        });
        break;
      case '2':
        _self.setData({
          followList: community.followList,
          follow_isDataBack: true,
        });
        break;
      case '3':
        _self.setData({
          videoList: community.videoList,
          video_isDataBack: true,
        });
        break;
    };
  },
  //播放视频
  videoPlay:function(e){
    var _self = this;
    var target = e.currentTarget.dataset.target;
    for (var i in community.videoList){
      if(community.videoList[i].id == target){
        _self.setData({
          videoUrl: community.videoList[i].url,
        });
        var videoContext = wx.createVideoContext('video' + target, this)
        videoContext.requestFullScreen();
      };
    };
  },
  //关闭视频
  closeVideo:function(e){
    var _self = this;
    var target = e.currentTarget.id;
    var videoContext = wx.createVideoContext(target, this);
    videoContext.exitFullScreen();
    videoContext.stop();
    _self.setData({
      videoUrl: '',
    });
  },
  videoFull:function(e){
    var _self = this;
    var target = e.currentTarget.id;
    var videoContext = wx.createVideoContext(target, this);
    if(e.detail.fullScreen){
      videoContext.play();
    }else{
      videoContext.stop();
      _self.setData({
        videoUrl: '',
      });
    };
  }
})