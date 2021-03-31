import { lerp, getMousePos, getSiblings } from './utils.js';

const target = document.querySelector(".target");
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));
export default class Cursor{  
  constructor(el) {
    // Varibles
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.Item = document.querySelectorAll(".hero-inner-link-item");
    this.Hero = document.querySelector(".hero-inner");
    this.Test = document.querySelectorAll(".btn"); 
    this.bounds = this.Cursor.getBoundingClientRect();

    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.2 },
      y: { previous: 0, current: 0, amt: 0.2 },
      scale: {previous: 0, current: 0, amt: 0.15}
    };
    this.onMouseMoveEv = () => {      
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x - this.bounds.width/2;
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y - this.bounds.height/2;
      
      
      
      //Establecer la opacidad a 1 cuando esta sobre un elemento en pantalla
      gsap.to(this.Cursor, {
        duration: 1,
        ease: "Power3.easeOut",
        opacity: 1,
      });
      // Ejecutar funciones de escalado
      this.onScaleMouse();
      this.OnScaleLink();
      // el metodo window.requestAnimationFrame() le dice al navegador que animación desea  para realizar una animación y solicita que el navegador llame a una función específica para actualizar una animación antes del próximo repintado. El método toma una devolución de llamada como argumento que se invocará antes del repintado.
      requestAnimationFrame(() => this.render());
      // limpiado de funcion
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };
    // escalado de cursor
    window.addEventListener("mousemove", this.onMouseMoveEv);    
  }
 
 OnScaleLink(){
  this.Test.forEach((link) => {
    if (link.matches(":hover")) {
      // document.querySelectorAll('.cursor')[0].style.setProperty("--scale", "1.4");
      // document.querySelectorAll('.cursor')[0].style.setProperty("--scale", 1.4);

      this.Scale(document.querySelectorAll('.cursor')[0].style.setProperty("--scale", 1.4));

      this.Scale(document.querySelectorAll('.cursor')[0].style.setProperty("--mix-blend-mode", "difference"));

      // this.Scale(this.Cursor.children[0], 1.2)
    }
    link.addEventListener("mouseenter", () => {
      
      // this.Cursor.setAttribute("style", "mix-blend-mode:exclusion;");
      // this.Cursor.setAttribute("style", "transform: scale(1.4);");
      // document.querySelectorAll('.cursor')[0].style.setProperty("--scale", 1.4);
      this.Scale(document.querySelectorAll('.cursor')[0].style.setProperty("--scale", 1.4));
      this.Scale(document.querySelectorAll('.cursor')[0].style.setProperty("mix-blend-mode", "difference"));


      // this.Scale(this.Cursor.children[0], 1.4);
    });
    link.addEventListener("mouseleave", () => {
      // this.Cursor.classList.remove("media-blend");
      // this.Cursor.classList.remove("cursor-media");
      // this.Cursor.setAttribute("style", "mix-blend-mode:exclusion;");
      // this.Cursor.setAttribute("style", "transform: scale(0.2);");
      // document.querySelectorAll('.cursor')[0].style.setProperty("--scale", 0.2);
      this.Scale(document.querySelectorAll('.cursor')[0].style.setProperty("--scale", 0.2));
      this.Scale(document.querySelectorAll('.cursor')[0].style.setProperty("mix-blend-mode", "hard-light"));

    });
   });
 }
 onScaleMouse() {
  // bucle de elementos
  this.Item.forEach((link) => {
    //si el cursor esta por encima de un elemento lo escala
    if (link.matches(":hover")) {
      this.setVideo(link);
      this.ScaleCursor(this.Cursor.children[0], 0.8);
    }
    //el cursor entra escala el cursor a 0-8
    link.addEventListener("mouseenter", () => {
      this.setVideo(link);
      this.ScaleCursor(this.Cursor.children[0], 0.8);
    });
    //el cursor sale escala el cursor a 0
    link.addEventListener("mouseleave", () => {
      this.ScaleCursor(this.Cursor.children[0], 0);
    });
    //el cursor entra escala el cursor a 0-8
    link.children[1].addEventListener("mouseenter", () => {
      this.Cursor.classList.add("media-blend");
      this.ScaleCursor(this.Cursor.children[0], 1.2);
    });
    //el cursor deja escala el cursor a default
    link.children[1].addEventListener("mouseleave", () => {
      this.Cursor.classList.remove("media-blend");
      this.ScaleCursor(this.Cursor.children[0], 0.8);
    });
  });
}

  setVideo(el) {
    // toma el data-video-src y nos aseguramos que el video encaje con el video correcto
    let src = el.getAttribute("data-video-src");
    let video = document.querySelector(`#${src}`);
    let siblings = getSiblings(video);

    if (video.id == src) {
      gsap.set(video, { zIndex: 4, opacity: 1 });
      siblings.forEach((i) => {
        gsap.set(i, { zIndex: 1, opacity: 0 });
      });
    }
  }
  
  Scale(el) {
    gsap.to(el, {
      duration: 0.6,
      ease: "Power3.easeOut",
    });
  }

  ScaleCursor(el, amount) {
    gsap.to(el, {
      duration: 0.6,
      scale: amount,
      ease: "Power3.easeOut",
    });
  }
  render() {
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    // lerp
    for (const key in this.cursorConfigs) {
      // key será x & y
      // Lerp - lerp devuelve el valor entre dos números en un punto medio decimal especificado
      this.cursorConfigs[key].previous = lerp(
        this.cursorConfigs[key].previous,
        this.cursorConfigs[key].current,
        this.cursorConfigs[key].amt
      );
    }
    // establecer el cursor en x & y de nuestro elemento cursor en html
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;
    // RAF
    requestAnimationFrame(() => this.render());
  }
}


const body = document.querySelector("body");

window.onload = () => {
  body.classList.remove("loading");
  gsap.from(body, {
    opacity: 0,
    duration: 1,
    ease: "Power3.easeInOut",
  });
  const cursor = new Cursor(document.querySelector(".cursor"));
  
};
