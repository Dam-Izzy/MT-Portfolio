
$(document).ready(function(){
  
    const MAX_TRANSLATE = 10;
  
    document.addEventListener("mousemove", event => {
        const height = event.clientY / window.innerHeight;
        const width = event.clientX / window.innerWidth;
        updatePositions(height, width);
    });
    
    
    window.addEventListener("deviceorientation", event => {
        const height = -event.beta / 90;
        const width = event.gamma / 180;
        updatePositions(height, width);
    }, true);
    
    const elements = [
        "Ir_a_la_Web", "Fonodogrisclaro", "Fondo_grisObscuro",
        "planeta_pequeno", "Planetas"
    ].map(klass => document.querySelector(`.${klass}`));
    
    
    function updatePositions(height, width) {
        const maxVHTranslation = -height * MAX_TRANSLATE;
        const maxVWTranslation = -width * MAX_TRANSLATE;
        for (let i=0; i<elements.length; i++) {
            const translateVH = i / elements.length * maxVHTranslation;
            const translateVW = i / elements.length * maxVWTranslation;
    
            elements[i].style.transform = `translate3d(${translateVW}vh, ${translateVH}vh, 0)`;
        }
    }
    });
    
  
  