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
      background-color: #FFA500;
      overflow: hidden;
      transition: background-color 0.5s ease;
    }
    .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 400;
      font-family: 'Arial', sans-serif;
      letter-spacing: 1px;
      color: white;
      text-shadow: 0 2px 2px rgba(0,0,0,0.3);
      text-align: left;
      line-height: 1.1;
      padding: 20px;
    }
    .brand-name span {
      font-size: 45px;
      font-family: 'Pacifico', 'Poppins', cursive, sans-serif;
      font-weight: 900;
      letter-spacing: 3px;
      font-style: italic;
      color: #6F4E37; /* Chocolate coffee color */
      text-shadow:
        0 2px 0 #bfa27a,
        0 4px 8px #3e2723,
        0 1px 0 #fff,
        2px 2px 0 #d7b899,
        0 8px 24px #3e2723;
      padding: 2px 10px;
      border-radius: 20px;
      background: none;
      box-shadow: none;
      margin-left: 40px;
    }
    .nav-buttons {
      display: flex;
      gap: 10px;
      padding-right: 20px;
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
      transition: transform 0.3s;
    }
    .nav-button:hover {
      transform: translateY(-3px);
    }
    .nav-text-link {
      background: transparent;
      border: none;
      color: white;
      font-weight: 500;
      letter-spacing: 0;
      transition: all 0.3s ease;
    }
    .nav-text-link:hover {
      transform: scale(1.05);
      text-decoration: underline;
    }
    .product-buttons {
      position: absolute;
      bottom: 30px;
      left: 30px;
      display: flex;
      flex-direction: row;
      gap: 10px;
      flex-wrap: wrap;
      z-index: 10;
    }
    .product-name {
      font-size: 8pt; /* Adjusted size to be exactly 8pt */
      font-family: 'Montserrat', 'Poppins', sans-serif;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 8px 16px; /* Adjusted size */
      margin-right: 8px;
      border-radius: 50px;
      color: #333;
      background: none;
      cursor: pointer;
      border: none;
      box-shadow: none;
      display: inline-block;
      text-shadow: none;
    }
    .product-name:hover {
      transform: translateY(-3px) scale(1.05);
      background: #f5f5f5;
      letter-spacing: 2.5px;
    }
    .product-name.glassy-active {
      background: rgba(111, 78, 55, 0.18);
      color: #fff;
      border: 1px solid rgba(111, 78, 55, 0.3);
      box-shadow: 0 4px 10px rgba(111,78,55,0.15);
      transform: scale(1.12);
      letter-spacing: 3px;
      font-style: italic;
    }
    .featured {
      text-align: center;
      perspective: 1000px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90vw;
      max-width: 900px;
      min-height: 400px;
      background: none;
    }
    .product-details-layout {
      display: grid;
      grid-template-areas:
        "title title title"
        "left image right"
        "left price right";
      grid-template-columns: 1.2fr 1.5fr 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 18px 24px;
      align-items: center;
      justify-items: center;
      width: 100%;
    }
    .product-title-top {
      grid-area: title;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }
    /* Updated font size and weight for the main product title */
    #product-title {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-align: center;
      margin: 0;
      color: #FFFDD0;
      font-family: 'Pacifico', cursive, sans-serif;
      text-shadow:
        0 2px 0 #9F7E57,
        0 4px 8px #3e2723,
        0 1px 0 #fff,
        2px 2px 0 #d7b899,
        0 8px 24px #3e2723;
    }
    .product-details-left {
      grid-area: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 100%;
      text-align: left;
      font-size: 1.1rem;
      max-width: 260px;
      word-break: break-word;
      margin: 0;
    }
    /* Updated description style */
    .product-details-left p {
      margin: 0 0 12px 0;
      text-align: left;
      color: black;
      font-family: 'Courier New', monospace;
      letter-spacing: 1.5px;
    }
    /* Bold the heading in the description */
    .product-details-left p b {
      font-weight: bold;
    }
    /* Updated rating color */
    .product-rating {
      font-size: 1rem;
      color: black;
      font-weight: 700;
      letter-spacing: 1px;
      text-align: left;
      margin: 0;
    }
    .product-image-center {
      grid-area: image;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .product-image-center img {
      width: 100%;
      max-width: 340px;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.18);
      margin-bottom: 20px; /* Increased bottom spacing */
      object-fit: contain;
    }
    .product-price-details {
      grid-area: price;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      margin-top: 8px;
      width: 100%;
      color: white !important; /* Changed to white */
      gap: 16px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      flex-wrap: wrap; /* Added for mobile responsiveness */
    }
    /* Strikethrough style for the original MRP */
    .product-price-details .original-price {
      text-decoration: line-through;
      font-size: 1rem;
      opacity: 0.7;
      color: white; /* Changed to white */
    }
    #product-discounted-price {
      font-size: 1.4rem;
      font-weight: 900;
      color: white !important; /* Changed to white */
      background: none;
      padding: 0;
      border-radius: 0;
      margin: 0;
      box-shadow: none;
    }
    .discount-label {
      background: rgba(0,0,0,0.4); /* Changed to darker, semi-transparent background */
      color: white; /* Changed to white */
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 700;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .product-details-right {
      grid-area: right;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 10px;
      position: relative;
    }
    .buy-btn, .cart-btn {
      padding: 10px 20px;
      border-radius: 50px;
      border: none;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      background: #111; /* Updated background */
      color: #fff; /* Updated color */
      box-shadow: none;
      transition: transform 0.3s, background 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 160px; /* Fixed width to match */
      white-space: nowrap; /* Prevent text from wrapping */
    }
    .buy-btn:hover, .cart-btn:hover {
      transform: translateY(-3px);
      background: #333; /* Darken on hover */
    }
    .buy-btn {
      margin-bottom: 8px;
    }
    .cart-btn {
      margin-top: 0;
    }
    .buy-btn:active, .cart-btn:active {
      background: #555; /* Darker on active */
    }
    .cart-btn svg {
      transition: stroke 0.3s;
    }
    @media (max-width: 900px) {
      .featured {
        width: 98vw;
        min-height: 320px;
        max-width: 98vw;
      }
      .product-buttons {
        left: 50%;
        transform: translateX(-50%);
        flex-direction: row;
      }
      .product-details-layout {
        grid-template-areas:
          "title"
          "image"
          "left"
          "price"
          "right";
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto auto auto;
        gap: 12px;
      }
      /* Increased font size for mobile view */
      #product-title {
        font-size: 2rem;
      }
      .product-details-left {
        align-items: center;
        text-align: center;
        max-width: 98vw;
      }
      .product-details-left p, .product-rating {
        text-align: center;
      }
      .product-details-right {
        align-items: center;
      }
      .product-image-center img {
        width: 90vw;
        max-width: 320px;
      }
      .product-price-details {
        position: static;
        left: unset;
        transform: unset;
        bottom: unset;
        justify-content: center;
        margin-top: 10px;
      }
    }
    .footer {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      text-align: center;
      color: #fff8e1;
      font-size: 8pt;
      letter-spacing: 1px;
      opacity: 0.7;
      z-index: 10;
    }
  </style>
</head>
<body id="page-body">
  <div class="top-bar">
    <div class="brand-name">Welcome to<br><span>ScoopDreams!</span></div>
    <div class="nav-buttons">
      <span class="nav-button nav-text-link">About</span>
      <button class="nav-button">Login</button>
      <button class="nav-button">Signup</button>
    </div>
  </div>
  <div class="product-buttons">
    <span class="product-name" data-color="#8DB600" data-image="https://i.postimg.cc/qv0bvS6b/APPLELICIOUS.png" data-title="Applelicious" data-desc="<b>What it tastes like:</b> Crisp, zesty green-apple soft-serve with a refreshing tart finish.<br><br><b>Why you’ll love it:</b> Cool, juicy bite + creamy swirl = summer in a cone.<br><br><b>Best with:</b><br>Caramel drizzle or granola crumble.">Applelicious</span>
    <span class="product-name" data-color="#FFA500" data-image="https://i.postimg.cc/9Ftrt5k8/ORANGE-BRUST.png" data-title="Orange Burst" data-desc="<b>What it tastes like:</b> Bright, sunny citrus with a lightly sweet, creamy finish.<br><br><b>Why you’ll love it:</b> Super refreshing—like an orange creamsicle glow-up.<br><br><b>Best with:</b><br>White-choco curls or crushed biscuit.">Orange Burst</span>
    <span class="product-name" data-color="#C71585" data-image="https://i.postimg.cc/YC3XGR1p/BLUE-BLAST.png" data-title="Blue Blast" data-desc="<b>What it tastes like:</b> Velvety blueberry cream with real berry aroma and a jammy kick.<br><br><b>Why you’ll love it:</b> Deep berry notes and a smooth, luscious mouthfeel.<br><br><b>Best with:</b><br>Choco chips or almond slivers.">Blue Blast</span>
    <span class="product-name" data-color="#FC5A8D" data-image="https://i.postimg.cc/NMNbJjdZ/SAPPHIRE-SWIRL.png" data-title="Sapphire Swirl" data-desc="<b>What it tastes like:</b> Ripe berry sweetness balanced with cool creaminess.<br><br><b>Why you’ll love it:</b> Crowd-pleasing, fruity and rich without being heavy.<br><br><b>Best with:</b><br>Rainbow sprinkles or wafer sticks.">Sapphire Swirl</span>
  </div>
  <div class="featured">
    <div class="product-details-layout">
      <div class="product-title-top">
        <h2 id="product-title"></h2>
      </div>
      <div class="product-details-left">
        <p id="product-desc"></p>
        <div class="product-rating">
          <span>Rating:</span>
          <span id="product-rating">4.5 ★</span>
        </div>
      </div>
      <div class="product-image-center">
        <img id="product-image" src="" alt="Product" />
        <div class="product-price-details">
          <span id="product-original-price" class="original-price"></span>
          <span id="product-discounted-price"></span>
          <span id="product-discount" class="discount-label"></span>
        </div>
      </div>
      <div class="product-details-right">
        <button class="buy-btn">Buy Now</button>
        <button class="cart-btn" aria-label="Add to cart">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="20" r="1.6"/>
              <circle cx="17" cy="20" r="1.6"/>
              <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
            </g>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <div class="footer">© 2025 | Created by NIRANJAN M</div>
  <script>
    // Add price, discount, and rating data
    const products = [
      {
        color: "#8DB600",
        image: "https://i.postimg.cc/qv0bvS6b/APPLELICIOUS.png",
        title: "Applelicious",
        desc: "<b>What it tastes like:</b> Crisp, zesty green-apple soft-serve with a refreshing tart finish.<br><br><b>Why you’ll love it:</b> Cool, juicy bite + creamy swirl = summer in a cone.<br><br><b>Best with:</b><br>Caramel drizzle or granola crumble.",
        mrp: "MRP ₹149",
        price: "₹119",
        discount: "20% OFF (save ₹30)",
        rating: "★★★★☆ 4.6/5"
      },
      {
        color: "#FFA500",
        image: "https://i.postimg.cc/9Ftrt5k8/ORANGE-BRUST.png",
        title: "Orange Burst",
        desc: "<b>What it tastes like:</b> Bright, sunny citrus with a lightly sweet, creamy finish.<br><br><b>Why you’ll love it:</b> Super refreshing—like an orange creamsicle glow-up.<br><br><b>Best with:</b><br>White-choco curls or crushed biscuit.",
        mrp: "MRP ₹139",
        price: "₹118",
        discount: "15% OFF (save ₹21)",
        rating: "★★★★☆ 4.5/5"
      },
      {
        color: "#C71585",
        image: "https://i.postimg.cc/YC3XGR1p/BLUE-BLAST.png",
        title: "Blue Blast",
        desc: "<b>What it tastes like:</b> Velvety blueberry cream with real berry aroma and a jammy kick.<br><br><b>Why you’ll love it:</b> Deep berry notes and a smooth, luscious mouthfeel.<br><br><b>Best with:</b><br>Choco chips or almond slivers.",
        mrp: "MRP ₹179",
        price: "₹134",
        discount: "25% OFF (save ₹45)",
        rating: "★★★★½ 4.8/5"
      },
      {
        color: "#FC5A8D",
        image: "https://i.postimg.cc/NMNbJjdZ/SAPPHIRE-SWIRL.png",
        title: "Sapphire Swirl",
        desc: "<b>What it tastes like:</b> Ripe berry sweetness balanced with cool creaminess.<br><br><b>Why you’ll love it:</b> Crowd-pleasing, fruity and rich without being heavy.<br><br><b>Best with:</b><br>Rainbow sprinkles or wafer sticks.",
        mrp: "MRP ₹169",
        price: "₹118",
        discount: "30% OFF (save ₹51)",
        rating: "★★★★½ 4.7/5"
      }
    ];

    const productNames = document.querySelectorAll('.product-name');
    const body = document.getElementById('page-body');
    const img = document.getElementById('product-image');
    const title = document.getElementById('product-title');
    const desc = document.getElementById('product-desc');
    const originalPrice = document.getElementById('product-original-price');
    const discountedPrice = document.getElementById('product-discounted-price');
    const discount = document.getElementById('product-discount');
    const rating = document.getElementById('product-rating');

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

    function updateProduct(idx) {
      const product = products[idx];
      gsap.to(body, { backgroundColor: product.color, duration: 0.8 });
      gsap.killTweensOf(img);
      gsap.to(img, { opacity: 0, y: 50, scale: 0.8, rotationY: 0, rotationX: 0, duration: 0.5 });
      gsap.to([title, desc], { opacity: 0, y: 20, duration: 0.3 });
      setTimeout(() => {
        img.src = product.image;
        title.textContent = product.title;
        desc.innerHTML = product.desc;
        originalPrice.textContent = product.mrp;
        discountedPrice.textContent = product.price;
        discount.textContent = product.discount;
        rating.textContent = product.rating;
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

    productNames.forEach((element, idx) => {
      element.addEventListener('click', () => {
        updateProduct(idx);
        productNames.forEach(el => el.classList.remove('glassy-active'));
        element.classList.add('glassy-active');
      });
    });

    window.onload = () => {
      updateProduct(0);
      productNames[0].classList.add('glassy-active');
    };
  </script>
</body>
</html>
