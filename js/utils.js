// interpolación lineal
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Obtiene la posicion del mouse
const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }
  return { x: posx, y: posy };
};
// obtener hermanos
const getSiblings = (e) => {
  // colleccion de hermanos
  let siblings = [];
  // Si no es pareja, retornar sin hermanos
  if (!e.parentNode) {
    return siblings;
  }
  // primer hijo del un nodo de padres
  let sibling = e.parentNode.firstChild;
  // almacenar hermanos
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export  { lerp, getMousePos, getSiblings };