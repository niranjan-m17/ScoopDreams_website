<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Scoop Dreams</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.152/examples/js/loaders/GLTFLoader.js"></script>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Poppins', sans-serif;
      background-color: #FFA500;
      overflow: hidden;
      transition: background-color 0.5s ease;
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
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .brand-name span {
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
      font-weight: 600;
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
    .product-button {
      padding: 10px 20px;
      cursor: pointer;
      border: none;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      font-size: 1rem;
      font-weight: 600;
      color: white;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      transition: transform 0.3s, background 0.3s;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .product-button:hover {
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.35);
    }
    .featured {
      text-align: center;
      perspective: 1000px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    #viewer {
      width: 300px;
      height: 300px;
      margin: auto;
    }
    .featured img {
      width: 300px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      transform-origin: center;
    }
    .info {
      color: white;
      margin-top: 20px;
    }
    .info h2 {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    .info p {
      font-size: 1.1rem;
      max-width: 400px;
      margin: auto;
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
    <div class="brand-name">Welcome to <span>SCOOP DREAMS</span></div>
    <div class="nav-buttons">
      <button class="nav-button">About</button>
      <button class="nav-button">Login</button>
      <button class="nav-button">Signup</button>
    </div>
  </div>
  <div class="product-buttons">
    <button class="product-button" data-color="#8DB600" data-image="https://via.placeholder.com/300x300/8DB600/FFFFFF?text=Applelicious" data-title="Applelicious" data-desc="Pressed from crisp apples, naturally sweet and refreshing.">Applelicious</button>
    <button class="product-button" data-color="#FFA500" data-image="https://via.placeholder.com/300x300/FFA500/FFFFFF?text=Orange+Burst" data-title="Orange Burst" data-desc="Freshly squeezed orange juice, packed with vitamin C.">Orange Burst</button>
    <button class="product-button" data-color="#C71585" data-image="https://via.placeholder.com/300x300/C71585/FFFFFF?text=Blue+Blast" data-title="Blue Blast" data-desc="A vibrant blend of berries bursting with antioxidants.">Blue Blast</button>
    <button class="product-button" data-color="#FC5A8D" data-image="https://via.placeholder.com/300x300/FC5A8D/FFFFFF?text=Sapphire+Swirl" data-title="Sapphire Swirl" data-desc="A creamy blend with a cool blueberry twist.">Sapphire Swirl</button>
  </div>
  <div class="featured">
    <div id="viewer"></div>
    <img id="product-image" src="" alt="Product" />
    <div class="info">
      <h2 id="product-title"></h2>
      <p id="product-desc"></p>
    </div>
  </div>
  <div class="footer">© 2025 | Created by NIRANJAN M</div>
  <script>
    const buttons = document.querySelectorAll('.product-button');
    const body = document.getElementById('page-body');
    const img = document.getElementById('product-image');
    const title = document.getElementById('product-title');
    const desc = document.getElementById('product-desc');
    function floatImage(element) {
      gsap.to(element, {
        y: -15,
        rotationY: 5,
        rotationX: 5,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    }
    function updateProduct({ color, image, titleText, descText }) {
      gsap.to(body, { backgroundColor: color, duration: 0.8 });
      gsap.killTweensOf(img);
      gsap.to(img, { opacity: 0, y: 50, scale: 0.8, rotationY: 0, rotationX: 0, duration: 0.5 });
      gsap.to([title, desc], { opacity: 0, y: 20, duration: 0.3 });
      setTimeout(() => {
        img.src = image;
        title.textContent = titleText;
        desc.textContent = descText;
        gsap.fromTo(img, 
          { opacity: 0, y: -50, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", onComplete: () => floatImage(img) }
        );
        gsap.fromTo([title, desc], 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
        );
      }, 500);
    }
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        updateProduct({
          color: btn.dataset.color,
          image: btn.dataset.image,
          titleText: btn.dataset.title,
          descText: btn.dataset.desc
        });
      });
    });
    window.onload = () => {
      buttons[0].click();
    };
  </script>
</body>
</html>
