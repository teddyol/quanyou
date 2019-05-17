//app.js
App({
  globalData: {
    userInfo: null,
    appid: 'wx426380900cb1544e', //小程序AppID
    secretid: '4ac13878af03e30215f6ac6c302a108a', //小程序Appsecret
  },
  globalTxt: '全局参数',
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });

    //获取系统信息
    // wx.getSystemInfo({
    //   success: function (res) {
    //     var version = res.SDKVersion;
    //     version = version.replace(/\./g, "")
    //     if (parseInt(version.substring(0, 2)) < 19) { // 小于1.2.0的版本
    //       console.log(version.substring(0, 2))
    //     }
    //     if (res.model.indexOf('iPhone X') > -1) {
    //       wx.setStorageSync('isIphoneX', true);
    //     } else {
    //       wx.removeStorageSync('isIphoneX');
    //     }
    //   }
    // });

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  //loading转圈圈 显示
  showToast(text) {
    var _this = this;
    var textNow = '加载中...';
    wx.showToast({
      title: textNow,
      icon: 'loading',
      mask: true,
      duration: 100000 //loading转转显示10秒钟
    });
  },
  //loading转圈圈 隐藏
  hideToast() {
    wx.hideToast();
  },
  //ajax封装
  ajax: function (_url, obj, successBack, loading) {
    var app = this;
    if (!loading) {
      app.showToast();
    }
    wx.request({
      url: _url,
      data: obj,
      method: 'POST',
      dataType: 'json',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        var resData = res.data;
        if (!loading) {
          app.hideToast();
        };
        successBack(resData);
      },
      fail: function (res) {
        app.model(res.errMsg);
        app.hideToast();
      },
      complete: function (res) {
      }
    });
  },
  //授权判断
  ImpowerFn: function (e, callback) {
    var app = this;
    // 判断是否同意授权
    // 不同意跳转到首页
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.setStorageSync('isImpower', '');
      app.model('登录失败');
    } else {
      // 同意跳转到首页
      wx.setStorageSync('isImpower', 1);
      app.getSession3rd(function () {
        // if (typeof callback == 'function') {
        //   callback();
        // }
        app.ajax('', {
          label: 'addWeChatInfo',
          user_openid: wx.getStorageSync('openid'),
          user_nickname: e.detail.userInfo.nickName,
          headimg: e.detail.userInfo.avatarUrl,
          user_sex: e.detail.userInfo.gender,
        }, res => {
          if (res.status) {
            if (typeof callback == 'function') {
              callback();
            }
          } else {
            app.model(res.msg);
          }
        });
      });
    }
  },
  //获取openid
  getSession3rd(callback) {
    var app = this;
    wx.login({
      success: res => {
        app.ajax('', {
          label: "getOpenid",
          appid: app.globalData.appid,
          secret: app.globalData.secretid,
          code: res.code
        }, data => {
          if (data.status) {
            wx.setStorageSync('session_key', data.data.session_key);
            wx.setStorageSync('openid', data.data.openid);
            if (typeof callback == 'function') {
              callback();
            }
          } else {
            app.model(data.msg);
          }
        })
      }
    })
  },
  // 返回上一页
  goBack: function (e) {
    wx.navigateBack({
      delta: e.currentTarget.dataset.backDel
    })
  },
  // 页面跳转
  pageTab: function (e) {
    console.log(e)
    var to;
    switch (e.currentTarget.dataset.openType) {
      //保留当前页面，跳转非 tabBar
      case 'navigate':
        to = wx.navigateTo;
        break;
      //关闭当前页面，跳转非 tabBar
      case 'redirect':
        to = wx.redirectTo;
        break;
      //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      case 'switch':
        to = wx.switchTab;
        break;
      //关闭所有页面，可以打开任意页面，没有返回按钮了
      case 'launch':
        to = wx.reLaunch;
        break;
    };
    to({
      url: e.currentTarget.dataset.url
    });
  },
  //提示
  model(content, showCancel, succedBack, errorBack) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: !!showCancel,
      confirmColor: '#fd7801',
      success: function (res) {
        if (res.confirm) {
          if (typeof succedBack === 'function') {
            succedBack(res);
          }
        } else if (res.cancel) {
          if (typeof errorBack === 'function') {
            errorBack(res);
          }
        }
      }
    })
  },
  //手机号正则验证
  telCheck: function (num) {
    return /^1[3456789]\d{9}$/.test(parseInt(num));
  },
  // 验证姓名
  nameCheck: function (name) {
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,5}$/;
    return regCn.test(name)
  },
})