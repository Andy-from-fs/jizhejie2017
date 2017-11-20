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
  * @params {fn} callback 动画结束时回调的函数
  *
  */
(function($) {
  $.fn.extend({
    strip: function(_option) {
      "use strict";
      var option,
        defaultOption = {
          btnTouch:'#start',
          imgList: null,
          radio: 1,
          fps: 60,
          scale: 0.985,
          scaleSlow: 0.995,
        };

      if (
        _option.imgList &&
        (typeof _option.imgList === "Array" ||
          typeof _option.imgList === "object")
      ) {
        option = $.extend(defaultOption, _option);
      } else {
        console.log("错误的 imgList !");
        return this;
      }
      // function i(i) {}

      function e(i) {
        (this.canvas = i),
          (this.ctx = this.canvas.getContext("2d")),
          (this.audio = $("#audio")[0]),
          (this.imgList = option.imgList),
          (this.radio = option.radio),
          (this.index = 0),
          (this.fps = option.fps),
          (this.scale = option.scale),
          (this.scaleSlow = option.scaleSlow);
      }

      /micromessenger/.test(navigator.userAgent.toLocaleLowerCase());
      // document.addEventListener("touchmove", i, !1);
      // document.addEventListener("touchstart", i, !1);

      e.prototype.initCanvas = function() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.w > this.h &&
          ((this.w = 725),
          (this.h = 1206),
          $("body").css({
            width: "100%",
            height: "100%",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden"
          }),
          $("html").css({
            width: "100%",
            height: "100%"
          })),
          this.canvas.setAttribute("width", this.w),
          this.canvas.setAttribute("height", this.h);
      };
      e.prototype.preload = function() {
        function i() {
          e++, e == n.length && a(t.imgList);
        }
        for (
          var e = 0, t = this, a = function() {}, n = this.imgList, m = 0;
          m < n.length;
          m++
        )
          (this.imgList[m].image = new Image()),
            (this.imgList[m].image.src = n[m].link),
            (this.imgList[m].image.i = m),
            (this.imgList[m].image.name = m),
            (this.imgList[m].image.className = "item"),
            (this.imgList[m].image.onload = function() {
              $(".collection").append(t.imgList[this.i].image), i();
            }),
            (this.imgList[m].image.onerror = function() {
              i(), $(".collection").append(t.imgList[this.i].image);
            });
        return {
          done: function(i) {
            a = i || a;
            $(".collection").hide();
          }
        };
      };
      e.prototype.showend = function() {
        $(option.btnTouch).fadeOut('slow');
        // console.log("finish");
        // console.log(this);
        this.ctx.drawImage(this.domList[this.index],0,0,750,1206);
        if (option.end) {
          option.end.call(this);
        }
      };
      e.prototype.init = function() {
        var i = this;
        this.initCanvas();
        option.initFn.call(this);
        this.preload().done(function() {
          option.afterLoad.call(this);
          i.domList = $(".collection .item").sort(function(i, e) {
            return i.name - e.name;
          });
          i.img_oversize = i.domList[i.index + 1].image;
          i.img_minisize = i.domList[i.index].image;
          i.draw();
          i.touchEvent();
        });
      };
      e.prototype.draw = function() {
        if (this.index + 1 != this.imgList.length) {
          if (
            this.radio <
              this.imgList[this.index + 1].areaW /
                this.imgList[this.index + 1].imgW &&
            (this.index++, (this.radio = 1), !this.imgList[this.index + 1])
          )
            return void this.showend();
          (this.imgNext = this.imgList[this.index + 1]),
            (this.imgCur = this.imgList[this.index]),
            (this.img_oversize = this.domList[this.index + 1]),
            (this.img_minisize = this.domList[this.index]),
            this.drawImgOversize(
              this.img_oversize,
              this.imgNext.imgW,
              this.imgNext.imgH,
              this.imgNext.areaW,
              this.imgNext.areaH,
              this.imgNext.areaL,
              this.imgNext.areaT,
              this.radio
            ),
            this.drawImgMinisize(
              this.img_minisize,
              this.imgCur.imgW,
              this.imgCur.imgH,
              this.imgNext.imgW,
              this.imgNext.imgH,
              this.imgNext.areaW,
              this.imgNext.areaH,
              this.imgNext.areaL,
              this.imgNext.areaT,
              this.radio
            );
        }
      };

      e.prototype.touchEvent = function() {
        var i = this;
        $(option.btnTouch).bind("touchstart", function() {
          function e() {
            var a = new Date().getTime();
            if (i.index + 1 != i.imgList.length) {
              if (a - t < 1e3 / i.fps)
                return void (i.timer = requestAnimationFrame(e));
              (t = a),
                i.imgList[i.index + 1].limitMax &&
                i.imgList[i.index + 1].limitMin &&
                i.radio < i.imgList[i.index + 1].limitMax &&
                i.radio > i.imgList[i.index + 1].limitMin
                  ? (i.radio = i.scaleSlow * i.radio)
                  : (i.radio = i.scale * i.radio),
                i.draw(),
                (i.timer = requestAnimationFrame(e));
            }
          }
          cancelAnimationFrame(i.timer),
            $(".cover").length && $(".cover")[0].remove();
          var t = new Date().getTime();
          i.timer = requestAnimationFrame(e);
        });
        $(option.btnTouch).bind("touchmove", function() {});
        $(option.btnTouch).bind("touchend", function() {
          cancelAnimationFrame(i.timer);
        });
      };

      e.prototype.drawImgOversize = function(i, e, t, a, n, m, s, g) {
        this.ctx.drawImage(
          i,
          m - (a / g - a) * (m / (e - a)),
          s - (n / g - n) * (s / (t - n)),
          a / g,
          n / g,
          0,
          0,
          750,
          1206
        );
      };

      e.prototype.drawImgMinisize = function(i, e, t, a, n, m, s, g, r, o) {
        this.ctx.drawImage(
          i,
          0,
          0,
          e,
          t,
          (m / o - m) * (g / (a - m)) * o * 750 / m,
          (s / o - s) * (r / (n - s)) * o * 1206 / s,
          750 * o,
          1206 * o
        );
      };

      var a = new e($(this)[0]);
      a.init();
      return this;
    }
  });
})(jQuery);
