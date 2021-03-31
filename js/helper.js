gsap.registerPlugin(ScrollTrigger);


// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 2,
	smoothMobile:true
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
  
});
 

ScrollTrigger.create({
  trigger: '.image-mask',
  scroller: '[data-scroll-container]',
  start: 'top+=30% 50%',
  end: 'bottom-=40% 50%',
  animation: gsap.to('.image-mask', {backgroundSize: '120%'}),
  scrub: 2,
  markers: true
})
gsap.to(".gallery", {
  scrollTrigger: {
    scroller: '[data-scroll-container]',
    scrub: true,
    trigger: ".clscont",
    pin: true,
    // anticipatePin: 1,
    start: "top top",
    end: pinWrapWidth,
    pinType: "fixed"
  },
  x: -horizontalScrollLength,
  ease: "none"
});

gsap.from(".transition3", {
  scrollTrigger: {
    trigger: '.transition3',
    start: "top center",
    scroller: '[data-scroll-container]'
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: .6
});

let tl = gsap.timeline({ paused: true});


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

tl.from(".transition2", {
  scrollTrigger: {
    trigger: '.transition2',
    start: "top center",
    scroller: '[data-scroll-container]'
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: .6
})
tl.from(".cuadrado-anim", {
  stagger: .2,
  opacity: 0,
  scale: .1,
  duration: 1,
  ease: Back.easeOut.config(1.7)
})
.from(".is-animated", {
  duration: 0.5,
  translateY: 10,
  opacity: 0,
  stagger: 0.4
})

function contentIn() {
  tl.play();
}

document.querySelectorAll(".image").forEach(image => {
  const tl = gsap.timeline({
        scrollTrigger: {
        trigger: image,	
       scroller: "[data-scroll-container]",  
       scrub: true,   
        end:"+=225%"	
    }}); 	
 
   tl.set(image, {
       autoAlpha:0,
        scale:1
    })		
   
   .fromTo(image, {
       autoAlpha:0, 
    }, {	
        autoAlpha: 1,
        scale:1
    })	
   
   .to(image, {autoAlpha: 0, scale:1})
   
  })
  
 
  

  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      scroller: "[data-scroll-container]",
      start: "top 50%",
      onEnter: () =>
        gsap.to("body", {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          overwrite: "auto"
        }),
      onLeaveBack: () =>
        gsap.to("body", {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: "auto"
        })
    });
  });

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();