window.addEventListener('load', () => {
  document.getElementById('arrow-left').addEventListener('click', clickLeft);
  document.getElementById('arrow-right').addEventListener('click', clickRight);
  
  document.querySelector('.c-knowledge').addEventListener('keydown', e => {
    switch(e.key) {
      case 'ArrowLeft':
        clickLeft();
        break;
      case 'ArrowRight':
        clickRight();
        break;
      default:
        break;
    }
  });
  
    
    // const getSelector = document.querySelector(selectorName);
    document.querySelector(selectorName).addEventListener('touchstart', e => {
      Xstart = e.changedTouches[0].screenX;
      Ystart = e.changedTouches[0].screenY;
      console.log("Xstart = %d", Xstart);
      console.log("Ystart = %d", Ystart);
    });
    document.querySelector(selectorName).addEventListener('touchend', e => {      
      Xend = e.changedTouches[0].screenX;
      Yend = e.changedTouches[0].screenY;
      console.log("Xend = %d", Xend);
      console.log("Yend = %d", Yend);
      operations();
    });

    // e.forEach(touch => {
    // console.log(e);
    // console.log(e.changedTouches);
    // console.log(e.changedTouches[0]);
    // console.log(e.changedTouches[0].target.className);
    //donde se posiciona el touch en la pantalla
    // console.log(e.changedTouches[0].clientX);
    // console.log(e.changedTouches[0].pageX);
    // console.log(e.changedTouches[0].screenX);
    // Ni idea
    // console.log(e.changedTouches[0].radiusX);
    // });
});

const selectorName = ".carousel";
let Xstart = 0;
let Ystart = 0;
let Xend = 0;
let Yend = 0;
let difYtouch = 0;
let displacement = "";
function operations() {
  difYtouch = Math.sqrt((Ystart - Yend)**2);
  console.log(difYtouch);
  if(((Xstart - Xend) >= 30) && (difYtouch < 50)) {
    displacement = "right";
    clickRight();
  }else if(((Xstart - Xend) <= -30) && (difYtouch < 50)) {
    displacement = "left";
    clickLeft();
  }else { displacement = "central" }
  console.log(displacement);
}


/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
  let widthWindow = parseInt(getComputedStyle(document.getElementById('carousel-window')).width, 10); // Obtiene el valor numerico del width del elemento con el id carousel-window.
  /* Se obtiene el valor de left y se convierte a base decimal (10), o sea se obtiene "0" y se entrega 0 */
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".carousel-container")).left,
    10
  );
  if (currentLeft === 0) { // Si el valor de izquiera es 0, retornar para no seguir movierno el contenido
    return;
  }
  let newValue = currentLeft + widthWindow;
  document.querySelector(".carousel-container").style.left = `${newValue}px`;
  switch (newValue) {
    case -widthWindow:
      document.getElementById('knowledge-3').setAttribute("tabindex", "-1");
      document.getElementById('knowledge-2').removeAttribute("tabindex");
      break;
    case 0:
      document.getElementById('knowledge-2').setAttribute("tabindex", "-1");
      document.getElementById('knowledge-1').removeAttribute("tabindex");
      break;
    default:
      break;
  }
}


/* Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
  let widthWindow = parseInt(getComputedStyle(document.getElementById('carousel-window')).width, 10); // Obtiene el valor numerico del width del elemento con el id carousel-window.
  /* Se obtiene el valor de left y se convierte a base decimal (10), o sea se obtiene "0" y se entrega 0 */
  const currentRight = parseInt(
    getComputedStyle(document.querySelector(".carousel-container")).left,
    10
  );
  if (currentRight < -widthWindow) { // Si el valor de izquierda es menor a -540, retorna para de mover el contenido.
    return;
  }
  let newValue = currentRight - widthWindow;
  document.querySelector(".carousel-container").style.left = `${newValue}px`;
  switch (newValue) {
    case -widthWindow:
      document.getElementById('knowledge-1').setAttribute("tabindex", "-1");
      document.getElementById('knowledge-2').removeAttribute("tabindex");
      break;
    case -(widthWindow * 2):
      document.getElementById('knowledge-2').setAttribute("tabindex", "-1");
      document.getElementById('knowledge-3').removeAttribute("tabindex");
      break;
    default:
      break;
  }
}
