document.addEventListener("DOMContentLoaded", () => {
  
  // 1. 
  const textTarget = document.getElementById("typingText");
  const textToType = "Hecho desde el impulso de crear \ny moverse.";
  let index = 0;

  function typeEffect() {
    if (index < textToType.length) {
      textTarget.innerHTML += textToType.charAt(index);
      index++;
      setTimeout(typeEffect, 90);
    } else {
      textTarget.style.borderRight = "none";
    }
  }
  setTimeout(typeEffect, 1200);

  // 2. 
  const arrow = document.getElementById("scrollArrow");
  arrow.addEventListener("click", () => {
    document.getElementById("video-section").scrollIntoView({ behavior: "smooth" });
  });

  // 3. 
  const dots = document.querySelectorAll(".nav-dot");
  
  // Mapeo manual de qué ID de sección activa qué puntito (index)
  const sectionMapping = {
    "hero": 0,
    "video-section": 1,
    "section-bg": 2,
    "manzanita": 3,
    "alba-sec": 4,     // Alba activa el puntito 5 (index 4)
    "leandro-sec": 4,  // Leandro TAMBIÉN activa el puntito 5 (index 4)
    "cinta-sec": 5,    // La cinta pasa a ser el puntito 6
    "footer-sec": 6    // El footer pasa a ser el puntito 7
  };

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const allSections = document.querySelectorAll("section, .cinta, footer");

    allSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();

      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    if (currentSectionId && sectionMapping[currentSectionId] !== undefined) {
      const activeIndex = sectionMapping[currentSectionId];
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  });

 
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const targetId = dot.getAttribute("data-target");
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });

// 4. 

var seccionManzana = document.getElementById("manzanita");
var contenedorManzana = document.getElementById("appleContainer");

// CROLL
window.onscroll = function() {
  if (!seccionManzana || !contenedorManzana) return;


  var posicion = seccionManzana.getBoundingClientRect();
  var altoPantalla = window.innerHeight;


  if (posicion.top < altoPantalla * 0.8 && posicion.bottom > altoPantalla * 0.2) {
    contenedorManzana.classList.add("is-separated");
  } else {

    contenedorManzana.classList.remove("is-separated");
    contenedorManzana.classList.remove("grid-active");
  }
};

//  CLICK 
function activarManzana() {
  if (!contenedorManzana) return;
  
  if (contenedorManzana.classList.contains("is-separated")) {
    contenedorManzana.classList.add("grid-active");
  }
}

// CLICK
if (contenedorManzana) {
  contenedorManzana.addEventListener("click", activarManzana);
}
  // 5
  const triggers = document.querySelectorAll(".canvas-trigger");

  triggers.forEach(trigger => {
    let isDrawing = false;
    const imgSrc = trigger.getAttribute("data-src");

    trigger.addEventListener("mousedown", () => isDrawing = true);
    window.addEventListener("mouseup", () => isDrawing = false);
    trigger.addEventListener("touchstart", () => isDrawing = true);
    window.addEventListener("touchend", () => isDrawing = false);

    trigger.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      createTrail(e.clientX, e.clientY, trigger, imgSrc);
    });

    trigger.addEventListener("touchmove", (e) => {
      if (!isDrawing) return;
      const touch = e.touches[0];
      createTrail(touch.clientX, touch.clientY, trigger, imgSrc);
    });
  });

  function createTrail(clientX, clientY, container, src) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const stamp = document.createElement("div");
    stamp.classList.add("trail-stamp");
    
    stamp.style.width = `${rect.width / 5}px`;  
    stamp.style.height = `${rect.height / 5}px`;
    stamp.style.backgroundImage = `url('${src}')`;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    stamp.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

    stamp.style.left = `${x}px`;
    stamp.style.top = `${y}px`;

    container.appendChild(stamp);

    setTimeout(() => { stamp.remove(); }, 1200);
  }
});


  const trackImages = document.querySelectorAll('.track img');

  trackImages.forEach(img => {
  
    img.addEventListener('mouseenter', () => {
      img.classList.add('is-hovered');
    });

  
    img.addEventListener('mouseleave', () => {
      img.classList.remove('is-hovered');
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('text-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ANIMACIÓN
  const pool = ["C", "L", "M", "R", "K", "N", "O", "L", "O", "P", "I", "E", "N", "S", "E", "S", "T", "A", "N", "T", "O"];
  let currentIndex = 0;
  
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  const minDistance = 35; 


  let activeLetters = [];


  function addLetter(x, y) {
    
    activeLetters.push({
      char: pool[currentIndex],
      x: x,
      y: y,
      angle: (Math.random() - 0.5) * 0.3,
      alpha: 0,      
      targetAlpha: 1,
      life: 90   
    });

    currentIndex = (currentIndex + 1) % pool.length;
  }

  
  function loop() {
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = activeLetters.length - 1; i >= 0; i--) {
      let l = activeLetters[i];

      if (l.alpha < l.targetAlpha && l.life > 60) {
        l.alpha += 0.1;
        if (l.alpha > 1) l.alpha = 1;
      }

      if (l.life <= 60) {
        l.alpha -= 1 / 60; 
      }


      l.life--;

   
      if (l.life <= 0 || l.alpha <= 0) {
        activeLetters.splice(i, 1);
        continue;
      }

    
      ctx.save();
      ctx.font = 'bold 42px sans-serif';
      
  
s
      ctx.fillStyle = `rgba(255, 255, 255, ${l.alpha})`; 
      
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      ctx.translate(l.x, l.y);
      ctx.rotate(l.angle);
      ctx.fillText(l.char, 0, 0);
      ctx.restore();
    }

   
    requestAnimationFrame(loop);
  }


  requestAnimationFrame(loop);


  function handleMove(currentX, currentY) {
    if (!isDrawing) return;
    const distance = Math.hypot(currentX - lastX, currentY - lastY);

    if (distance > minDistance) {
      addLetter(currentX, currentY);
      lastX = currentX;
      lastY = currentY;
    }
  }


  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    addLetter(lastX, lastY);
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    handleMove(e.clientX - rect.left, e.clientY - rect.top);
  });

  window.addEventListener('mouseup', () => isDrawing = false);


  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.touches[0].clientX - rect.left;
    lastY = e.touches[0].clientY - rect.top;
    addLetter(lastX, lastY);
  });

  canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    handleMove(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  });

  window.addEventListener('touchend', () => isDrawing = false);
});