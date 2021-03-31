

function pageTransition() {

  var tl = gsap.timeline();
  
  tl.to('ul.transition li', {    
    duration: .5,
    scaleY: 1,
    transformOrigin: "bottom left",
    stagger: .2
  });
  tl.to('ul.transition li', {
    duration: .5,
    scaleY: 0,
    transformOrigin: "bottom left",
    stagger: .1,
    delay: .3
  });
}


barba.hooks.afterEnter((data) => {
  var swiper = new Swiper('.carrusel', {
    initialSlide: 1,
    autoHeight: true, 
    speed: 1000,
    spaceBetween: 1,
    loop: true,
    centeredSlides: true,
    roundLengths: true,
    grabCursor: true,
    parallax: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 350,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        height:125,
        width:100
      },
      // when window width is >= 480px
      480: {
        height:125
      },
      // when window width is >= 640px
      640: {
        height:125
      }  
    }  
  });
  new Swiper('.carrusel2', {
    slidesPerView: 'auto',
    initialSlide: 2,
    speed: 1000,
    spaceBetween: 32,
    loop: true,
    centeredSlides: true,
    roundLengths: true,
    mousewheel: true,
    grabCursor: true,
    parallax: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    }
  });
 
  
});

barba.hooks.before((data)=>{
  contentAnimation();
  });
  
 
 
 

function contentAnimation() {

  let tl = gsap.timeline({delay: 0.5, paused:true});


  dots = $('.dot'),
  loader = $('#loader'),
  tlLoader = new TimelineMax({
    repeat: 2,
    onComplete: loadContent
  });

  tlLoader
  .staggerFromTo(dots, 0.5, {
      y: 0,
      autoAlpha: 0
    }, {
      y: 20,
      autoAlpha: 1,
      ease: Back.easeInOut
    },
    0.1
  )
  .fromTo(loader, 0.3, {
      autoAlpha: 1,
      scale: 1
    }, {
      autoAlpha: 0,
      ease: Power0.easeNone
    },
    1
  );

function loadContent() {
  var tlLoaderOut = new TimelineLite({
    onComplete: contentIn
  });
  tlLoaderOut
    .set(dots, {
      backgroundColor: "#4a4a4a"
    })
    .to(loader, 0.1, {
      autoAlpha: 1,
      ease: Power0.easeNone
    })
    .staggerFromTo(dots, 0.3, {
        y: 0,
        autoAlpha: 0
      }, {
        y: 20,
        autoAlpha: 1,
        ease: Back.easeInOut
      },
      0.1
    )
    .to(loader, 0.3, {
      scale: 1,
      y: -100,
      autoAlpha: 0,
      ease: Back.easeIn
    })

}
function contentIn() {
  tl.play();
}



  
  tl.from('.left', {
    duration: 1.5,
    translateY: 50,
    opacity: 0
  })
  tl.to('img', {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  }, "-=1.1");
  
  tl.from('.content', {
    y: '-30%',
    opacity: 0,
    duration: 2,
    ease: Power4.easeOut
})
tl.from('.head', {
    y: '-30%',
    opacity: 0,
    duration: 1,
    ease: Power4.easeOut
})

tl.from('.stagger1', {
    opacity: 0,
    y: -50,
    stagger: .3,
    ease: Power4.easeOut,
    duration: 2
}, "-=1.5")
tl.from('.hero', {
    opacity: 0,
    y: 50,
    ease: Power4.easeOut,
    duration: 1
}, "-=2")


// Helpers {
function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function lerp(v0, v1, t) {
  return v0*(1-t)+v1*t
}

// Functions
const onScroll = e => {
  const speed = Math.abs(e.scroll.y - e.delta.y);
  scale = mapRange(speed, 0, 800, 1, 0.5);
  
  skew = mapRange(speed, 0, 800, 0, 10);
  if (containerScrollRafId === null) {
    containerScrollRafId = requestAnimationFrame(containerScroll);
  }
}
scroll.on('scroll', onScroll);

const containerScroll = () => {
  containerScrollRafId = requestAnimationFrame(containerScroll);
  scaleDelta = lerp(scaleDelta, scale, 0.075);
  delayedScaleDelta = lerp(delayedScaleDelta, scale, 0.05);
  scaleEls.map((el, index) => {
    el.style.transform = `scale(${scaleDelta})`;
    imageEls[index].style.transform = `scale(${1 / delayedScaleDelta})`;
  });
  if (scaleDelta >= 0.9999) {
    cancelAnimationFrame(containerScrollRafId);
    containerScrollRafId = null;
  }
}


}


function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({

  sync: true,

  transitions: [{

    async leave(data) {

      const done = this.async();

      pageTransition();
      await delay(1500);
      done();

    },

    async enter(data) {
      contentAnimation();
    },

    async once(data) {
      contentAnimation();
    }

  }]
});


//#region lanzador de apps
var contactUsLauncher = function () {
  var webchatLaunched = false;

  var config = {};

  var launchWebchat = function () {
    webchatLaunched = true;
    document.querySelector("#contactUsButton").style.display = "none";
    document.querySelector("#contactChannelContainer").style.display = "none";
  };

  function isMobile() {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a) ||

        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)))


        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  var _appendModalStuff = function (element, modalName) {
    element.dataset.toggle = "modal";
    element.dataset.target = "." + modalName;
  };

  var _wrapInLinkTag = function (element, href) {
    var buttonLink = document.createElement("a");
    buttonLink.href = href;
    buttonLink.target = "_blank";
    buttonLink.rel = "noopener";
    buttonLink.appendChild(element);

    return buttonLink;
  };

  var _renderAnimationContainer = function (i) {
    var container = document.createElement("div");
    container.classList.add("channelButtonIn");
    container.classList.add("channelButtonIn-" + i);
    return container;
  };

  var _renderIconContainer = function (icon) {
    var container = document.createElement("div");
    container.classList.add("channelIcon");
    container.appendChild(icon);
    return container;
  };

  var _renderText = function (text) {
    var container = document.createElement("div");
    container.appendChild(document.createTextNode(text));
    return container;
  };

  var _renderBasicButton = function (i, id, imgUrl, text) {
    var button = document.createElement("div");
    button.id = id;
    button.classList.add("channelButton");

    var img = document.createElement("img");
    img.src = imgUrl;

    var icon = _renderIconContainer(img);
    var text = _renderText(text);

    button.appendChild(icon);
    button.appendChild(text);

    var parent = _renderAnimationContainer(i);
    parent.appendChild(button);

    return parent;
  };

  var _renderSms = function (i) {
    var button = _renderBasicButton(
      i,
      "smsButton",
      "source/phone.svg",
      "Llamar");


    // Always using sms link until we can make our own modal stuff
    return _wrapInLinkTag(button, "tel:" + config.sms.phoneNumber);

    // if (isMobile()) {
    //   // If we're on a phone, this should just be an sms link
    //   return _wrapInLinkTag(button, "sms:+" + config.sms.phoneNumber);
    // } else {
    //   // Not in a phone, append WP stuff to show the modal for the phone number
    //   _appendModalStuff(button, "smsmodal");
    //   return button;
    // }
  };

  var _renderWebchat = function (i) {
    var button = _renderBasicButton(
      i,
      "webchatButton",
      "source/whats.webp",
      "WhatsApp");


    return _wrapInLinkTag(button, "https://api.whatsapp.com/send?phone=" + config.sms.phoneNumber);
  };

  var _renderFacebook = function (i) {
    var button = document.createElement("div");
    button.id = "facebookButton";
    button.classList.add("channelButton");

    var img = document.getElementById("Messenger_Mark");
    img.style.display = "block";

    var spacer = document.createElement("div");
    spacer.style.width = "50px";
    spacer.style.textAlign = "center";
    spacer.appendChild(img);
    var icon = _renderIconContainer(spacer);
    var text = _renderText("Facebook Messenger");

    button.appendChild(icon);
    button.appendChild(text);

    var buttonLink = _wrapInLinkTag(
      button,
      "https://www.messenger.com/t/" + config.facebook.id);


    var parent = _renderAnimationContainer(i);
    parent.appendChild(buttonLink);

    return parent;
  };

  var _renderAbc = function (i) {
    var button = document.createElement("div");
    button.classList.add("apple-business-chat-button-container");
    button.style.maxHeight = "52px";
    button.style.overflow = "hidden";
    button.dataset.appleBusinessId = config.abc.appleBusinessId;
    button.dataset.appleButtonTheme = "dark";

    var parent = _renderAnimationContainer(i);
    parent.appendChild(button);

    return parent;
  };

  var _renderAutoPopMessage = function (message) {
    var bubble = document.createElement('div');
    bubble.classList.add('autoPopBubble');
    bubble.appendChild(document.createTextNode(message));

    return bubble;
  };

  var _timeout = undefined;

  return {
    configure: function (configuration) {
      config = configuration;
    },
    render: function (channels) {
      var container = document.querySelector(
        "#contactChannelContainer .channelButtons");

      var totalChannels = (channels || []).length;

      (channels || []).forEach(function (channel, i) {
        var button;
        switch (channel) {
          case "sms":
            if (config.sms && config.sms.phoneNumber) {
              button = _renderSms(totalChannels - i - 1);
            }
            break;
          case "webchat":
            button = _renderWebchat(totalChannels - i - 1);
            break;
          case "facebook":
            if (config.facebook && config.facebook.id) {
              button = _renderFacebook(totalChannels - i - 1);
            }
            break;
          case "abc":
            if (config.abc && config.abc.appleBusinessId) {
              button = _renderAbc(totalChannels - i - 1);
            }
            break;
        }


        if (button) {
          container.appendChild(button);
        }
      });
    },
    toggle: function () {
      var container = document.querySelector("#contactChannelContainer");
      var chatButton = document.querySelector("#contactUsButton");
      var open = container.style.display !== "none";

      if (_timeout) {
        clearTimeout(_timeout);
      }

      document.querySelectorAll('#contactUsButton .autoPopBubble').forEach(function (bubble) {
        bubble.classList.add('animateOut');

        setTimeout(function () {
          bubble.style.display = 'none';
        }, 500);
      });

      if (open) {
        container.classList.add('channelButtonsOut');

        setTimeout(function () {
          container.classList.remove('channelButtonsOut');
          container.style.display = 'none';
        }, 700);

      } else {
        container.style.display = "block";
      }
    },
    close: function () {
      var container = document.querySelector("#contactChannelContainer");
      container.style.display = "none";
    },
    launchWebchat: launchWebchat,
    autoPop: function (message, timeout) {
      if (_timeout) {
        clearTimeout(_timeout);
      }

      _timeout = setTimeout(function () {
        var container = document.getElementById('contactUsButton');

        container.appendChild(_renderAutoPopMessage(message));
      }, timeout);
    }
  };

}();

contactUsLauncher.configure({
  sms: {
    phoneNumber: "2431109435"
  },

  facebook: {
    id: "mttechmixteca"
  },

  abc: {
    appleBusinessId: "your-abc-id"
  }
});



contactUsLauncher.render(["sms", "webchat", "facebook", "abc"]);

var mouseStop = null;
var Time = 7000; //tiempo en milisegundos que espera para se efectuarse la funcion

contactUsLauncher.autoPop('Hola, ¿Dinos en qué te podemos ayudar?', 10000);

const cursor = document.querySelector('.cursor')


document.querySelectorAll('.button').forEach(button => {

  let div = document.createElement('div'),
      letters = button.textContent.trim().split('');

  function elements(letter, index, array) {

      let element = document.createElement('span'),
          part = (index >= array.length / 2) ? -1 : 1,
          position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
          move = position / (array.length / 2),
          rotate = 1 - move;

      element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
      element.style.setProperty('--move', move);
      element.style.setProperty('--rotate', rotate);
      element.style.setProperty('--part', part);

      div.appendChild(element);

  }

  letters.forEach(elements);

  button.innerHTML = div.outerHTML;

  button.addEventListener('mouseenter', e => {
      if(!button.classList.contains('out')) {
          button.classList.add('in');
      }
  });

  button.addEventListener('mouseleave', e => {
      if(button.classList.contains('in')) {
          button.classList.add('out');
          setTimeout(() => button.classList.remove('in', 'out'), 950);
      }
  });

});