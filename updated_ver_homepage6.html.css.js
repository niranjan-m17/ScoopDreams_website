<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ScoopDreams</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
  <!-- Use Tailwind CSS for modern styling -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.152/examples/js/loaders/GLTFLoader.js"></script>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Poppins', 'Montserrat', 'Pacifico', cursive, sans-serif;
      /* Set a static cream and coffee background gradient */
      background: linear-gradient(135deg, #F5F5DC, #6F4E37);
    }
    /* New CSS class for blurring the background */
    body.blurred-background {
      overflow: hidden; /* Prevents scrolling when modal is open */
    }
    /* Removed transition from blur effect for instant application */
    .top-bar.blurred, #main-content.blurred {
      filter: blur(5px);
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
      /* Applying Pacifico font to the entire brand name for a unified style */
      font-family: 'Pacifico', 'Poppins', cursive, sans-serif;
      font-size: 28px;
      font-weight: 400;
      letter-spacing: 1px;
      color: #F5F5DC; /* Dark white color for 'Welcome to' */
      text-shadow:
        0 2px 0 #9F7E57,
        0 4px 8px #3e2723,
        0 1px 0 #fff,
        2px 2px 0 #d7b899,
        0 8px 24px #3e2723;
      text-align: left;
      line-height: 1.1;
      padding: 20px;
    }
    .brand-name span {
      font-size: 38px;
      letter-spacing: 3px;
      color: #6F4E37; /* Coffee color for 'ScoopDreams!' */
      text-shadow:
        0 2px 0 #bfa27a,
        0 4px 8px #3e2723,
        0 1px 0 #fff,
        2px 2px 0 #d7b899,
        0 8px 24px #3e2723;
      padding: 0;
      border-radius: 0;
      background: none;
      box-shadow: none;
      margin-left: 0;
    }
    .nav-buttons {
      display: flex;
      gap: 10px;
      padding-right: 20px;
    }
    /* New styling for Login and Signup buttons */
    .nav-auth-button {
      padding: 6px 14px;
      cursor: pointer;
      border: 2px solid #6B4226;
      border-radius: 9999px; /* Pill shape */
      background: transparent;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      color: #6B4226;
      text-decoration: none;
    }
    .nav-auth-button:hover {
      background: #6B4226;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    /* Keeping original styling for other buttons like "About" */
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
      font-size: 8pt;
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
    /* Updated layout for the featured product section */
    .featured {
      text-align: center;
      perspective: 1000px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90vw;
      max-width: 1000px; /* Constrains the overall width to make the background visible */
      min-height: 400px;
      background: none;
      display: flex;
      flex-direction: row; /* Main layout is now horizontal */
      align-items: center;
      justify-content: center;
      gap: 50px; /* Space between the left and right columns */
    }
    .product-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Align text to the left */
        justify-content: center;
        text-align: left;
        margin-bottom: 20px;
        flex: 1; /* Allows it to take available space */
    }
    .product-info h2 {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-align: left;
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
    .product-info p {
      margin: 20px 0; /* Increased top margin for more space */
      text-align: left;
      color: black;
      font-family: 'Courier New', monospace;
      letter-spacing: 1.5px;
      max-width: 600px;
    }
    .product-info p b {
      font-weight: bold;
    }
    .product-info .product-rating {
      font-size: 1rem;
      color: black;
      font-weight: 700;
      letter-spacing: 1px;
      text-align: left;
      margin: 0;
    }
    .product-image-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 500px; /* Constrain container width on larger screens */
      background: radial-gradient(circle at 50% 120%, rgba(121, 74, 52, 0.8), rgba(64, 38, 22, 0.95) 75%, #2d170c 100%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      border-radius: 20px;
      padding: 30px;
      transform-style: preserve-3d;
      will-change: transform;
      margin-bottom: 20px;
    }
    .product-image-container img {
      width: 100%;
      height: auto;
      max-width: 220px; /* Increased the maximum image size */
      object-fit: contain;
      transform: scale(1.0) rotateY(0deg) rotateX(0deg);
      transition: transform 0.5s cubic-bezier(.25,.8,.25,1);
      will-change: transform;
    }
    .product-price-details {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      margin-top: 8px;
      width: 100%;
      color: white !important;
      gap: 16px;
      flex-wrap: wrap;
    }
    .product-price-details .original-price {
      text-decoration: line-through;
      font-size: 0.9rem;
      opacity: 0.7;
      color: white;
    }
    #product-discounted-price {
      font-size: 1.2rem;
      font-weight: 900;
      color: white !important;
      background: none;
      padding: 0;
      border-radius: 0;
      margin: 0;
      box-shadow: none;
    }
    .discount-label {
      background: rgba(0,0,0,0.4);
      color: white;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 700;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .product-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 10px;
      margin-top: 20px;
    }
    .buy-btn, .cart-btn {
      padding: 8px 16px;
      border-radius: 50px;
      border: none;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      background: #111;
      color: #fff;
      box-shadow: none;
      transition: transform 0.3s, background 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 140px;
      white-space: nowrap;
    }
    .buy-btn:hover, .cart-btn:hover {
      transform: translateY(-3px);
      background: #333;
    }
    .buy-btn:active, .cart-btn:active {
      background: #555;
    }
    .cart-btn svg {
      transition: stroke 0.3s;
    }
    @media (max-width: 900px) {
      .featured {
        width: 98vw;
        max-width: 98vw;
        min-height: 320px;
        flex-direction: column; /* Stacks vertically on smaller screens */
      }
      .product-buttons {
        left: 50%;
        transform: translateX(-50%);
        flex-direction: row;
      }
      .product-info h2 {
        font-size: 2rem;
      }
      .product-info p, .product-info .product-rating {
        text-align: center;
      }
      .product-image-container img {
        width: 90vw;
        max-width: 200px; /* Adjusted for smaller mobile screens */
        transform: none;
      }
      /* Center the text content on smaller screens */
      .product-info {
        align-items: center;
        text-align: center;
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
    /* New CSS for the modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: none; /* Initially hidden */
      justify-content: center;
      align-items: center;
      z-index: 50;
    }
    .modal-content {
      background: #fff8e1;
      padding: 2rem;
      border-radius: 1rem;
      width: 90%;
      max-width: 500px;
      position: relative;
      text-align: center;
      color: #333;
    }
    .modal-content h3 {
      font-family: 'Pacifico', cursive, sans-serif;
      font-size: 2rem;
      color: #6F4E37;
      margin-bottom: 1rem;
    }
    .modal-content p {
      font-family: 'Poppins', sans-serif;
      line-height: 1.5;
    }
    .modal-close {
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6F4E37;
      transition: transform 0.2s ease-in-out;
    }
    .modal-close:hover {
      transform: scale(1.2);
    }
    /* New CSS for the loading spinner */
    .spinner {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      border: 5px solid #fff;
      border-top-color: #6F4E37;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      display: none; /* Initially hidden */
      z-index: 60;
    }
    /* Animation for the spinning effect */
    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  </style>
</head>
<body id="page-body">
  <div class="top-bar">
    <div class="brand-name">Welcome to<br><span>ScoopDreams!</span></div>
    <div class="nav-buttons">
      <!-- The about button now has an event listener in JS -->
      <button id="about-btn" class="nav-text-link">About</button>
      <!-- Login and Signup buttons are now styled with a new class -->
      <a href="Login%20&%20Sign-up.html?form=login" class="nav-auth-button">Login</a>
      <a href="Login%20&%20Sign-up.html?form=signup" class="nav-auth-button">Signup</a>
    </div>
  </div>
  
  <!-- Main product content section -->
  <div id="main-content" class="h-full">
    <div class="product-buttons">
      <span class="product-name" data-color="#8DB600" data-image="https://i.postimg.cc/qv0bvS6b/APPLELICIOUS.png" data-title="Applelicious" data-desc="<b>What it tastes like:</b> Crisp, zesty green-apple soft-serve with a refreshing tart finish.<br><br><b>Why you’ll love it:</b> Cool, juicy bite + creamy swirl = summer in a cone.<br><br><b>Best with:</b> Caramel drizzle or granola crumble.">Applelicious</span>
      <span class="product-name" data-color="#FFA500" data-image="https://i.postimg.cc/9Ftrt5k8/ORANGE-BRUST.png" data-title="Orange Burst" data-desc="<b>What it tastes like:</b> Bright, sunny citrus with a lightly sweet, creamy finish.<br><br><b>Why you’ll love it:</b> Super refreshing—like an orange creamsicle glow-up.<br><br><b>Best with:</b> White-choco curls or crushed biscuit.">Orange Burst</span>
      <span class="product-name" data-color="#C71585" data-image="https://i.postimg.cc/YC3XGR1p/BLUE-BLAST.png" data-title="Blue Blast" data-desc="<b>What it tastes like:</b> Velvety blueberry cream with real berry aroma and a jammy kick.<br><br><b>Why you’ll love it:</b> Deep berry notes and a smooth, luscious mouthfeel.<br><br><b>Best with:</b> Choco chips or almond slivers.">Blue Blast</span>
      <span class="product-name" data-color="#FC5A8D" data-image="https://i.postimg.cc/NMNbJjdZ/SAPPHIRE-SWIRL.png" data-title="Sapphire Swirl" data-desc="<b>What it tastes like:</b> Ripe berry sweetness balanced with cool creaminess.<br><br><b>Why you’ll love it:</b> Crowd-pleasing, fruity and rich without being heavy.<br><br><b>Best with:</b> Rainbow sprinkles or wafer sticks.">Sapphire Swirl</span>
    </div>
    <div class="featured">
      <!-- Left Column: Product Info -->
      <div class="product-info">
        <h2 id="product-title"></h2>
        <p id="product-desc"></p>
        <div class="product-rating">
            <span>Rating:</span>
            <span id="product-rating">4.5 ★</span>
        </div>
      </div>
      <!-- Right Column: Image, Price, and Buttons -->
      <div class="flex flex-col items-center">
        <div class="product-image-container">
          <img id="product-image" src="" alt="Product" />
          <div class="product-price-details">
            <span id="product-original-price" class="original-price"></span>
            <span id="product-discounted-price"></span>
            <span id="product-discount" class="discount-label"></span>
          </div>
        </div>
        <div class="product-actions">
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
  </div>
  
  <div class="footer">© 2025 | Created by NIRANJAN M</div>

  <!-- About Modal Section (Initially Hidden) -->
  <div id="about-modal" class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close" id="close-modal-btn">&times;</button>
      <h3>About ScoopDreams</h3>
      <p>
        ScoopDreams is your one-stop shop for delicious and dreamy soft-serve ice cream. We blend classic flavors with exciting new creations to bring you a dessert experience like no other. Our mission is to spread joy, one scoop at a time!
      </p>
      <p>
        Also, created by NIRANJAN M
      </p>
    </div>
  </div>

  <!-- Loading Spinner (Initially Hidden) -->
  <div id="loading-spinner" class="spinner"></div>

  <script>
    // Add price, discount, and rating data
    const products = [
      {
        color: "#8DB600",
        image: "https://i.postimg.cc/qv0bvS6b/APPLELICIOUS.png",
        title: "Applelicious",
        desc: "<b>What it tastes like:</b> Crisp, zesty green-apple soft-serve with a refreshing tart finish.<br><br><b>Why you’ll love it:</b> Cool, juicy bite + creamy swirl = summer in a cone.<br><br><b>Best with:</b> Caramel drizzle or granola crumble.",
        mrp: "MRP ₹149",
        price: "₹119",
        discount: "20% OFF (save ₹30)",
        rating: "4.6/5"
      },
      {
        color: "#FFA500",
        image: "https://i.postimg.cc/9Ftrt5k8/ORANGE-BRUST.png",
        title: "Orange Burst",
        desc: "<b>What it tastes like:</b> Bright, sunny citrus with a lightly sweet, creamy finish.<br><br><b>Why you’ll love it:</b> Super refreshing—like an orange creamsicle glow-up.<br><br><b>Best with:</b> White-choco curls or crushed biscuit.",
        mrp: "MRP ₹139",
        price: "₹118",
        discount: "15% OFF (save ₹21)",
        rating: "4.5/5"
      },
      {
        color: "#C71585",
        image: "https://i.postimg.cc/YC3XGR1p/BLUE-BLAST.png",
        title: "Blue Blast",
        desc: "<b>What it tastes like:</b> Velvety blueberry cream with real berry aroma and a jammy kick.<br><br><b>Why you’ll love it:</b> Deep berry notes and a smooth, luscious mouthfeel.<br><br><b>Best with:</b> Choco chips or almond slivers.",
        mrp: "MRP ₹179",
        price: "₹134",
        discount: "25% OFF (save ₹45)",
        rating: "4.8/5"
      },
      {
        color: "#FC5A8D",
        image: "https://i.postimg.cc/NMNbJjdZ/SAPPHIRE-SWIRL.png",
        title: "Sapphire Swirl",
        desc: "<b>What it tastes like:</b> Ripe berry sweetness balanced with cool creaminess.<br><br><b>Why you’ll love it:</b> Crowd-pleasing, fruity and rich without being heavy.<br><br><b>Best with:</b> Rainbow sprinkles or wafer sticks.",
        mrp: "MRP ₹169",
        price: "₹118",
        discount: "30% OFF (save ₹51)",
        rating: "4.7/5"
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

    // New element references for the About modal
    const aboutBtn = document.getElementById('about-btn');
    const modal = document.getElementById('about-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const spinner = document.getElementById('loading-spinner');
    // Get the elements to be blurred
    const topBar = document.querySelector('.top-bar');
    const mainContent = document.getElementById('main-content');

    function updateProduct(idx) {
      const product = products[idx];
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
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out"}
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

    // Event listener for the About button
    aboutBtn.addEventListener('click', () => {
      // 1. Blur the background instantly
      topBar.classList.add('blurred');
      mainContent.classList.add('blurred');
      
      // 2. Show the loading spinner instantly
      spinner.style.display = 'block';

      // 3. Set a timeout to show the pop-up after 2 seconds
      setTimeout(() => {
        // Hide the spinner instantly
        spinner.style.display = 'none';
        // Show the modal instantly
        modal.style.display = 'flex';
      }, 2000); // 2000 milliseconds = 2 seconds
    });

    // Event listeners to close the modal instantly
    closeBtn.addEventListener('click', () => {
      // Hide the modal instantly
      modal.style.display = 'none'; 
      // Un-blur the background instantly
      topBar.classList.remove('blurred');
      mainContent.classList.remove('blurred');
    });
    modal.addEventListener('click', (e) => {
      // Close modal if the user clicks on the semi-transparent overlay
      if (e.target === modal) {
        // Hide the modal instantly
        modal.style.display = 'none';
        // Un-blur the background instantly
        topBar.classList.remove('blurred');
        mainContent.classList.remove('blurred');
      }
    });

    window.onload = () => {
      updateProduct(0); // Start on the first product
      productNames[0].classList.add('glassy-active');
    };
  </script>
</body>
</html>
