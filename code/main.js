// function play(i) {
//   var e = document.getElementById(i);
//   t = function() {
//     document.removeEventListener("WeixinJSBridgeReady", t);
//     document.removeEventListener("YixinJSBridgeReady", t);
//     e.play();
//   };
//   e.play();
//   window.WeixinJSBridge && e.play();
//   "undefined" == typeof WeixinJSBridge
//     ? document.addEventListener("WeixinJSBridgeReady", t, !1)
//     : (document.addEventListener("YixinJSBridgeReady", t, !1), e.play());
// }

var option = {
  imgList: [
    {
      link: "./assets/p1封面.jpg",
      imgW: "720",
      imgH: "1215"
    },
    {
      link: "./assets/p2人民日报.jpg",
      limitMax: 0.6,
      limitMin: 0.30625,
      imgW: "1280",
      imgH: "2160",
      areaW: "392",
      areaH: "657",
      areaL: "848",
      areaT: "1250"
    },
    {
      link: "./assets/P3黄书记到访南海新闻中心.jpg",
      limitMax: 0.5,
      limitMin: 0.23671875,
      imgW: "1280",
      imgH: "2160",
      areaW: "303",
      areaH: "512",
      areaL: "586",
      areaT: "1445"
    },
    {
      link: "./assets/P4顾区媒体见面会.jpg",
      limitMax: 0.5,
      limitMin: 0.265625,
      imgW: "1280",
      imgH: "2160",
      areaW: "340",
      areaH: "575",
      areaL: "259",
      areaT: "1350"
    },
    {
      link: "./assets/P5南宣季度选题会现场.jpg",
      limitMax: 0.6,
      limitMin: 0.33203125,
      imgW: "1280",
      imgH: "2160",
      areaW: "425",
      areaH: "714",
      areaL: "708",
      areaT: "744"
    },
    {
      link: "./assets/P6广东新媒体小编大会.jpg",
      limitMax: 0.5,
      limitMin: 0.26484375,
      imgW: "1280",
      imgH: "2160",
      areaW: "339",
      areaH: "576",
      areaL: "453",
      areaT: "1347"
    },
    {
      link: "./assets/P7大城工匠活动现场.jpg",
      limitMax: 0.6,
      limitMin: 0.3328125,
      imgW: "1280",
      imgH: "2160",
      areaW: "426",
      areaH: "720",
      areaL: "76",
      areaT: "1278"
    },
    {
      link: "./assets/P8记者深夜写稿.jpg",
      limitMax: 0.6,
      limitMin: 0.3078125,
      imgW: "1280",
      imgH: "2160",
      areaW: "394",
      areaH: "628",
      areaL: "699",
      areaT: "648"
    },
    {
      link: "./assets/P9多栋楼房亮灯11.8.jpg",
      limitMax: 0.1,
      limitMin: 0.07265625,
      imgW: "1280",
      imgH: "2160",
      areaW: "93",
      areaH: "157",
      areaL: "292",
      areaT: "711"
    },
    {
      link: "./assets/p10end.jpg",
      limitMax: 0.5,
      limitMin: 0.28,
      imgW: "1280",
      imgH: "2160",
      areaW: "340",
      areaH: "575",
      areaL: "259",
      areaT: "1350"
    }
  ],
  btnTouch: "#start",
  end: function() {
    // console.log("had finished");
    $(".fd2bg").fadeIn("slow");
  },
  initFn: function() {
    // play("music");
    $(".music").removeClass("music_close");
  },
  afterLoad: function() {
    setTimeout(function() {
      $(".loading").fadeOut('slow');
    }, 1000);
    // $(".fma").addClass("animated swing");
    setTimeout(function() {
      $(".cover").addClass("animated fadeOut"), $("#start").fadeIn("slow");
    }, 2000);
  }
};
/*
  * @params {Array} imgList(第一张图片只填写link,imgW和imgH,其余图片都必须填写所有参数)
  *   {string} link (img的src)
  *   {num} limitMax (小于这个比例缩放速度减慢)
  *   {num} limitMin (小于这个比例切换下一张图片)
  *   {string} imgW (原图片尺寸-width)
  *   {string} imgH (原图片尺寸-height)
  *   {string} areaW (图片放置上一张图片的区域尺寸-width)
  *   {string} areH (图片放置上一张图片的区域尺寸-height)
  *   {string} areL (放置上一张图片的区域在原图片的位置（相对于原图片左边框）-X轴)
  *   {string} areT (放置上一张图片的区域在原图片的位置（相对于原图片左边框）-Y轴)
  * 
  * @params {num} radio 默认：1
  * @params {num} fps 画面每秒传输帧数 （默认：60）
  * @params {float} scale 正常缩放速度 (默认：0.985)
  * @params {float} scaleSlow 慢速缩放速度 （默认：0.995）
  * @params {fn} end 动画结束时回调的函数
  * @params {fn} initFn 动画初始化后回调的函数
  * @params {fn} afterLoad 动画在图片加载完成后回调的函数
  */
$("#app").strip(option);
$(".reload").bind("touchstart", function() {
  window.location.reload();
});
$(".share_btn").bind("touchend", function() {
  h5Share();
});
$(".share").bind("touchend", function() {
  ShareClose();
});

function h5Share() {
  $(".share").fadeIn();
}

function ShareClose() {
  $(".share").fadeOut();
}

$(".music").bind("touchend", function() {
  $(".music").hasClass("music_close")
    ? ($(".music").removeClass("music_close"), $("#audio")[0].play())
    : ($(".music").addClass("music_close"), $("#audio")[0].pause());
});
