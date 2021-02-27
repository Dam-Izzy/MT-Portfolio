$(document).ready(function () {
  
  var swiperverticle = new Swiper('.swiper-container.verticle-animation', {
    speed: 600,
    parallax: true,
    direction: 'vertical',
    mousewheel: true,
    mousewheelReleaseOnEdges: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    paginationType: "custom",
    paginationCustomRender: function (swiper, current, total) {
      var names = [];
      $(".swiper-wrapper .swiper-slide").each(function (i) {
        names.push($(this).data("name"));
      });
      var text = "<span style='background-color:black;padding:20px;'>";
      for (let i = 1; i <= total; i++) {
        if (current == i) {
          text += "<span style='border-top:1px solid green;margin-right:4px;color:green;padding:10px;' z-index:999;>" + names[i] + "</span>";
        } else {
          text += "<span style='border-top:1px solid white;margin-right:4px;color:white;padding:10px;'>" + names[i] + "</span>";
        }

      }
      text += "</span>";
      return text;
    }

  });

  swiperverticle.on('slideChange', function () {
    var index = this.activeIndex;

    // $('.halfbox').css({background: 'var('+colors[index % colors.length]+')'});

    $('.team-info .team-info-item').removeClass('active').eq(this.activeIndex).addClass('active')
  });

});