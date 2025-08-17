<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ScoopDreams</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.152/examples/js/loaders/GLTFLoader.js"></script>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Poppins', 'Montserrat', 'Pacifico', cursive, sans-serif;
      background: radial-gradient(circle at 50% 50%, #fffbe6 0%, #ffe5ec 40%, #f9e7d3 100%);
      overflow: hidden;
      transition: background 0.8s cubic-bezier(.77,0,.175,1);
    }
    .top-bar {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
    }
    .brand-name {
      font-size: 45px; /* Updated for large heading */
      font-weight: 900;
      font-family: 'Pacifico', 'Poppins', cursive, sans-serif;
      letter-spacing: 2px;
      color: white;
      text-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.3);
    }
    .brand-name span {
      font-family: 'Montserrat', 'Poppins', sans-serif;
      font-weight: 900;
      letter-spacing: 3px;
      font-style: italic;
      color: #7B3F00;
    }
    .nav-buttons {
      display: flex;
      gap: 10px;
    }
    .nav-button {
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      border-radius: 50px;
      background: white;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 1px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      transition: transform 0.3s;
    }
    .nav-button:hover {
      transform: translateY(-3px);
    }
    .product-buttons {
      position: absolute;
      bottom: 30px;
      left: 30px;
      display: flex;
      flex-direction: row;
      gap: 10px;
      flex-wrap: wrap;
    }
    .product-name {
      font-size: 9pt; /* Updated for smaller product names */
      font-family: 'Montserrat', 'Poppins', sans-serif;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 8px 16px;
      margin-right: 8px;
      border-radius: 50px;
      color: #333;
      background: none;
      cursor: pointer;
      transition: background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.3s, letter-spacing 0.2s;
      border: none;
      box-shadow: none;
      display: inline-block;
    }
    .product-name:hover {
      transform: translateY(-3px) scale(1.05);
      background: #f5f5f5;
      letter-spacing: 2.5px;
    }
    .product-name.glassy-active {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      transform: scale(1.12);
      letter-spacing: 3px;
      font-style: italic;
    }
    .featured {
      text-align: center;
      perspective: 1200px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100vw;
      max-width: 1200px;
      height: 480px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    #product-carousel {
      position: relative;
      width: 700px;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .carousel-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center;
      transition: filter 0.5s, box-shadow 0.5s, transform 0.7s;
      pointer-events: none;
      opacity: 0;
      background: transparent;
    }
    .carousel-img.center {
      z-index: 3;
      opacity: 1;
      width: 380px;
      height: 380px;
      filter: none;
      box-shadow: 0 0 120px 40px rgba(255,255,200,0.45), 0 0 60px 10px rgba(255,255,255,0.25);
      transform: translate(-50%, -50%) scale(1.15);
      pointer-events: auto;
      background: transparent;
      border-radius: 30px;
    }
    .carousel-img.left, .carousel-img.right {
      z-index: 2;
      opacity: 1;
      width: 180px;
      height: 180px;
      filter: blur(6px) grayscale(40%);
      box-shadow: 0 8px 20px rgba(0,0,0,0.10);
      background: transparent;
      border-radius: 20px;
    }
    .carousel-img.left {
      transform: translate(-250px, -50%) scale(0.7) rotateY(18deg);
    }
    .carousel-img.right {
      transform: translate(250px, -50%) scale(0.7) rotateY(-18deg);
    }
    .info {
      color: #7B3F00;
      margin-top: 20px;
      text-align: center;
    }
    .info h2 {
      font-size: 2.7rem;
      font-family: 'Pacifico', 'Montserrat', cursive, sans-serif;
      font-weight: 700;
      letter-spacing: 2px;
      text-shadow: 0 2px 8px rgba(255,255,255,0.22);
      margin-bottom: 10px;
    }
    .info p {
      font-size: 1.25rem;
      font-family: 'Montserrat', 'Poppins', sans-serif;
      font-weight: 500;
      letter-spacing: 1px;
      line-height: 1.7;
      max-width: 500px;
      margin: auto;
      text-align: center;
      text-shadow: 0 1px 4px rgba(255,255,255,0.07);
    }
    .footer {
      position: absolute;
      bottom: 5px;
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.7);
      white-space: normal;
    }
  </style>
</head>
<body id="page-body">
  <div class="top-bar">
    <div class="brand-name">Welcome to <span>ScoopDreams!</span></div>
    <div class="nav-buttons">
      <button class="nav-button">About</button>
      <button class="nav-button">Login</button>
      <button class="nav-button">Signup</button>
    </div>
  </div>
  <div class="product-buttons">
    <span class="product-name" data-color="#8DB600" data-image="https://i.postimg.cc/qv0bvS6b/APPLELICIOUS.png" data-title="Applelicious" data-desc="Pressed from crisp apples, naturally sweet and refreshing.">Applelicious</span>
    <span class="product-name" data-color="#FFA500" data-image="https://i.postimg.cc/9Ftrt5k8/ORANGE-BRUST.png" data-title="Orange Burst" data-desc="Freshly squeezed orange juice, packed with vitamin C.">Orange Burst</span>
    <span class="product-name" data-color="#C71585" data-image="https://i.postimg.cc/YC3XGR1p/BLUE-BLAST.png" data-title="Blue Blast" data-desc="A vibrant blend of berries bursting with antioxidants.">Blue Blast</span>
    <span class="product-name" data-color="#FC5A8D" data-image="https://i.postimg.cc/NMNbJjdZ/SAPPHIRE-SWIRL.png" data-title="Sapphire Swirl" data-desc="A creamy blend with a cool blueberry twist.">Sapphire Swirl</span>
  </div>
  <div class="featured">
    <div id="product-carousel"></div>
    <div class="info">
      <h2 id="product-title"></h2>
      <p id="product-desc"></p>
    </div>
  </div>
  <div class="footer">© 2025 | Created by NIRANJAN M</div>
  <script>
    const products = [
      {
        color: "#f9e7d3",
        image: "https://i.postimg.cc/qv0bvS6b/APPLELICIOUS.png",
        title: "Applelicious",
        desc: "Pressed from crisp apples, naturally sweet and refreshing."
      },
      {
        color: "#ffe5ec",
        image: "https://i.postimg.cc/9Ftrt5k8/ORANGE-BRUST.png",
        title: "Orange Burst",
        desc: "Freshly squeezed orange juice, packed with vitamin C."
      },
      {
        color: "#fffbe6",
        image: "https://i.postimg.cc/YC3XGR1p/BLUE-BLAST.png",
        title: "Blue Blast",
        desc: "A vibrant blend of berries bursting with antioxidants."
      },
      {
        color: "#f9e7d3",
        image: "https://i.postimg.cc/NMNbJjdZ/SAPPHIRE-SWIRL.png",
        title: "Sapphire Swirl",
        desc: "A creamy blend with a cool blueberry twist."
      }
    ];

    const carousel = document.getElementById('product-carousel');
    const title = document.getElementById('product-title');
    const desc = document.getElementById('product-desc');
    const body = document.getElementById('page-body');
    let current = 0;

    function renderCarousel(idx) {
      carousel.innerHTML = '';
      products.forEach((p, i) => {
        const img = document.createElement('img');
        img.src = p.image;
        img.className = 'carousel-img';
        img.style.background = 'transparent';
        img.style.objectFit = 'contain';
        img.style.boxShadow = 'none';
        if (i === idx) img.classList.add('center');
        else if (i === idx - 1) img.classList.add('left');
        else if (i === idx + 1) img.classList.add('right');
        else img.style.opacity = 0;
        carousel.appendChild(img);
      });
    }

    function animateTransition(newIdx, direction) {
      const imgs = carousel.querySelectorAll('.carousel-img');
      const oldIdx = current;
      const oldImg = imgs[oldIdx];
      const newImg = imgs[newIdx];

      // Slide out old image
      gsap.to(oldImg, {
        x: direction === 'right' ? -500 : 500,
        opacity: 0,
        duration: 0.7,
        onComplete: () => {
          renderCarousel(newIdx);
          const imgsNew = carousel.querySelectorAll('.carousel-img');
          const centerImg = imgsNew[newIdx];
          gsap.fromTo(centerImg, 
            { x: direction === 'right' ? 500 : -500, opacity: 0, scale: 0.7 },
            { x: 0, opacity: 1, scale: 1.15, duration: 0.8, ease: "power3.out" }
          );
        }
      });
    }

    function updateProduct(idx, animate = true) {
      if (animate && idx !== current) {
        animateTransition(idx, idx > current ? 'right' : 'left');
      } else {
        renderCarousel(idx);
      }
      current = idx;
      const p = products[idx];
      // Use product color as main gradient color
      gsap.to(body, { 
        background: `radial-gradient(circle at 50% 50%, ${p.color} 0%, #fffbe6 60%, #f9e7d3 100%)`, 
        duration: 0.8 
      });
      title.textContent = p.title;
      desc.textContent = p.desc;
    }

    // Product name click
    const names = document.querySelectorAll('.product-name');
    names.forEach((name, idx) => {
      name.addEventListener('click', () => {
        names.forEach(n => n.classList.remove('glassy-active'));
        name.classList.add('glassy-active');
        updateProduct(idx, true);
      });
    });

    window.onload = () => {
      names[0].click();
      updateProduct(0, false);
    };
  </script>
</body>
</html>
