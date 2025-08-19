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
  <style>
    /*
      Base body and html styles for the "page by page" effect.
      We set a fixed background and disable default scrolling.
      UPDATED: Removed `scroll-snap-type` to allow for continuous scrolling.
    */
    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', 'Montserrat', 'Pacifico', cursive, sans-serif;
      background: linear-gradient(135deg, #F5F5DC, #6F4E37);
      background-attachment: fixed;
      /* Allow for normal scrolling and set min-height for content */
      height: auto;
      min-height: 100vh;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    /*
      The main container for all pages.
      UPDATED: Removed `scroll-snap-type`. This container is now a standard flex column.
    */
    .scroll-container {
      height: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    /*
      Each 'page' section.
      UPDATED: Changed `height: 100vh` to `min-height: 100vh` to ensure sections
      take up at least the full viewport height but can expand with content.
      `scroll-snap-align` is no longer needed.
    */
    .scroll-page {
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    /* Styles for the new welcome section at the top of the first page */
    .welcome-section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px; /* Reduced padding to bring elements closer to the edge */
      margin: 0;
      position: absolute;
      top: 0;
    }
    .brand-name {
      font-family: 'Pacifico', 'Poppins', cursive, sans-serif;
      font-size: 28px;
      font-weight: 400;
      letter-spacing: 1px;
      color: #F5F5DC;
      text-shadow:
        0 2px 0 #9F7E57,
        0 4px 8px #3e2723,
        0 1px 0 #fff,
        2px 2px 0 #d7b899,
        0 8px 24px #3e2723;
      text-align: left;
      line-height: 1.1;
    }
    .brand-name span {
      font-size: 38px;
      letter-spacing: 3px;
      color: #6F4E37;
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
    }
    .nav-auth-button {
      padding: 6px 14px;
      cursor: pointer;
      border: 2px solid #6B4226;
      border-radius: 9999px;
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
    .featured-content {
      text-align: center;
      perspective: 1000px;
      position: relative;
      width: 90vw;
      max-width: 1000px;
      background: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 50px;
    }
    .product-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        text-align: left;
        margin-bottom: 20px;
        flex: 1;
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
      margin: 20px 0;
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
      max-width: 500px;
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
      max-width: 220px;
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
    /*
      Updated styling for the scroll-down button.
      It's now hidden by default and will appear on hover.
      Added a "shaking" keyframe animation.
    */
    .scroll-down-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 9999px;
      /* Initial state: hidden */
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease-in-out;
      border: none;
      background: rgba(111, 78, 55, 0.18);
      border: 1px solid rgba(111, 78, 55, 0.3);
      box-shadow: 0 4px 10px rgba(111,78,55,0.15);
      /* Apply the shaking animation */
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) infinite both;
    }
    .scroll-down-btn.is-visible {
      /* This class is added by JavaScript on hover to make the button visible */
      opacity: 1;
      pointer-events: auto;
    }
    /* Define the shaking animation */
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0) scale(1.0); }
      20%, 80% { transform: translate3d(2px, 0, 0) scale(1.0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0) scale(1.0); }
      40%, 60% { transform: translate3d(4px, 0, 0) scale(1.0); }
    }
    @media (max-width: 900px) {
      .featured-content {
        width: 98vw;
        max-width: 98vw;
        flex-direction: column;
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
        max-width: 200px;
        transform: none;
      }
      .product-info {
        align-items: center;
        text-align: center;
      }
      .scroll-down-btn {
        bottom: 120px;
      }
    }
    .footer {
      width: 100%;
      padding: 20px;
      text-align: center;
      color: #fff8e1;
      font-size: 8pt;
      letter-spacing: 1px;
      opacity: 0.7;
      z-index: 10;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: none;
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
      display: none;
      z-index: 60;
    }
    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    /* Styles for the "other flavors" page */
    .product-grid-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* UPDATED: Aligns content to the top instead of centering */
      justify-content: flex-start;
      /* Adjusted padding to move the content higher */
      padding: 40px 20px 20px;
    }
    .product-grid-title {
      font-family: 'Pacifico', cursive, sans-serif;
      font-size: 2.5rem;
      text-align: center;
      color: #FFFDD0;
      text-shadow:
        0 2px 0 #9F7E57,
        0 4px 8px #3e2723;
      /* Adjusted margin to move the heading higher */
      margin-top: 12px;
      margin-bottom: 30px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      width: 100%;
      max-width: 1200px;
      padding: 0 1rem;
    }
    .product-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 1rem;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }
    .product-card:hover {
        transform: translateY(-8px);
    }
    .product-card img {
      border-radius: 12px;
      object-fit: contain; /* Changed to 'contain' to ensure full image visibility */
      width: 100%;
      height: 200px; /* Fixed height for consistent sizing */
    }
    .product-card h4 {
      font-weight: 600;
      font-size: 1.25rem;
      margin-top: 0.75rem;
      color: #6F4E37;
    }
    .product-card p {
      font-size: 1rem;
      color: #3e2723;
      margin-top: 0.25rem;
    }
    .product-card .price {
      font-weight: 700;
      color: #111;
      margin-top: 0.5rem;
    }
    /* Custom styles for the new footer */
    .app-footer {
      background: linear-gradient(135deg, rgba(245, 245, 220, 0.7), rgba(111, 78, 55, 0.7));
      color: #4b382d;
      font-family: 'Poppins', sans-serif;
      padding: 4rem 1.5rem;
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .footer-section h5 {
      font-weight: 600;
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: #6F4E37;
    }
    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-section ul li {
      margin-bottom: 0.5rem;
    }
    .footer-section a {
      color: #4b382d;
      text-decoration: none;
      transition: color 0.3s;
    }
    .footer-section a:hover {
      color: #a0522d;
    }
    .brand-logo {
      width: 100px; /* Adjusted size to be smaller */
      height: auto;
    }
    .brand-tagline {
      font-style: italic;
      font-size: 0.875rem;
      color: #7b5133;
      margin-top: 0.5rem;
    }
    .social-icons-container {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .social-icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: background-color 0.3s, transform 0.3s;
    }
    .social-icon-btn:hover {
      background-color: rgba(255, 255, 255, 0.8);
      transform: scale(1.1);
    }
    .social-icon-btn svg {
      width: 20px;
      height: 20px;
      color: #6F4E37;
    }
    .footer-copyright {
      text-align: center;
      font-size: 0.75rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      margin-top: 2rem;
      color: #4b382d;
    }
  </style>
</head>
<body id="page-body">
  <!--
    Removed the fixed top-bar and integrated the welcome message and buttons
    directly into the first page section.
  -->
  <div class="scroll-container">
    <!-- First Page: Featured Product Section -->
    <div id="featured-page" class="scroll-page">
      <div class="welcome-section">
        <div class="brand-name">Welcome to<br><span>ScoopDreams!</span></div>
        <div class="nav-buttons">
          <button id="about-btn" class="nav-text-link">About</button>
          <a href="Login%20&%20Sign-up.html?form=login" class="nav-auth-button">Login</a>
          <a href="Login%20&%20Sign-up.html?form=signup" class="nav-auth-button">Signup</a>
        </div>
      </div>
      <div class="featured-content">
        <div class="product-info">
          <h2 id="product-title"></h2>
          <p id="product-desc"></p>
          <div class="product-rating">
              <span>Rating:</span>
              <span id="product-rating">4.5 ★</span>
          </div>
        </div>
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
      
      <!-- Moved scroll-down button to be above product buttons -->
      <div class="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <button id="scroll-down-btn" class="scroll-down-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <!--
        Product selection buttons have been re-added here.
        This fixes the `TypeError` by providing elements for `querySelectorAll` to find.
      -->
      <div class="product-buttons">
        <button class="product-name">Applelicious</button>
        <button class="product-name">Orange Burst</button>
        <button class="product-name">Blue Blast</button>
        <button class="product-name" id="sapphire-swirl-btn">Sapphire Swirl</button>
      </div>
    </div>
  
    <!-- Second Page: Other Products Grid Section -->
    <div id="product-grid-page" class="scroll-page product-grid-page">
        <h2 class="product-grid-title">Our Other Top Flavors</h2>
        <div class="product-grid">
            <!-- Product Card 1 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/6Q6LR8m7/violet.png" alt="A scoop of Violet Dream ice cream" />
                <h4>Violet Dream</h4>
                <p class="price">₹149</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <!-- Product Card 2 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/v8x7WF3v/brown.png" alt="A scoop of Golden Caramel ice cream" />
                <h4>Golden Caramel</h4>
                <p class="price">₹127</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <!-- Product Card 3 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/859hqtPW/green.png" alt="A scoop of Mint Blast ice cream" />
                <h4>Mint Blast</h4>
                <p class="price">₹123</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <!-- Product Card 4 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/hGC80Kk2/lemon.png" alt="A scoop of Lemon Zing ice cream" />
                <h4>Lemon Zing</h4>
                <p class="price">₹103</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <!-- Product Card 5 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/4dm6LrZs/pistachio.png" alt="A scoop of Pistachio Swirl ice cream" />
                <h4>Pistachio Swirl</h4>
                <p class="price">₹151</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <!-- Product Card 6 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/3NGg7mdq/grapes.png" alt="A scoop of Grape Escape ice cream" />
                <h4>Grape Escape</h4>
                <p class="price">₹124</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <!-- Product Card 7 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/fT4cC2PQ/coffee.png" alt="A scoop of Choco Hazelnut ice cream" />
                <h4>Choco Hazelnut</h4>
                <p class="price">₹148</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <!-- Product Card 8 -->
            <div class="product-card">
                <img src="https://i.postimg.cc/hjS8LfZz/Yellow.png" alt="A scoop of Banana Cream ice cream" />
                <h4>Banana Cream</h4>
                <p class="price">₹112</p>
                <div class="mt-4 flex space-x-2">
                    <button class="buy-btn">Buy Now</button>
                    <button class="cart-btn" aria-label="Add to cart">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="9" cy="20" r="1.6"/>
                          <circle cx="17" cy="20" r="1.6"/>
                          <path d="M3 4h2l2.2 10.2c.1.5.6.8 1.1.8H18a1.2 1.2 0 0 0 1.2-1l1.3-6.8a.9.9 0 0 0-.9-1.1H7.4"/>
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- New Footer Section -->
        <footer class="app-footer">
          <div class="footer-container">
            <!-- Brand Info Section -->
            <div class="footer-section">
              <img src="https://i.postimg.cc/yNqxYnwP/logo.png" alt="Scoop Dreams Logo" class="brand-logo" />
              <p class="brand-tagline">Deliciously dreamy ice creams crafted with love</p>
              <div class="social-icons-container">
                <!-- Social Media Icons (Inline SVGs) -->
                <a href="#" class="social-icon-btn" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.04c-5.514 0-9.986 4.472-9.986 9.986 0 5.405 4.398 9.805 9.986 9.986v-7.075h-2.502v-2.911h2.502v-2.148c0-2.474 1.488-3.834 3.711-3.834 1.059 0 1.968.079 2.233.114v2.585h-1.545c-1.226 0-1.465.578-1.465 1.428v1.855h2.894l-.377 2.911h-2.517v7.075c5.588-0.181 9.986-4.581 9.986-9.986 0-5.514-4.472-9.986-9.986-9.986z"/>
                  </svg>
                </a>
                <a href="#" class="social-icon-btn" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.254 5.92c-.752.333-1.564.557-2.417.656.866-.52 1.528-1.344 1.84-2.336-.81.482-1.71.834-2.658 1.026-.764-.813-1.854-1.325-3.064-1.325-2.32 0-4.2 1.88-4.2 4.2 0 .33.037.653.109.965-3.493-.175-6.59-1.847-8.665-4.36-.36.62-.567 1.34-.567 2.096 0 1.455.74 2.736 1.868 3.495-.685-.022-1.332-.21-1.898-.52v.053c0 2.036 1.45 3.737 3.375 4.12-.353.096-.725.148-1.11.148-.27 0-.533-.026-.79-.074.536 1.674 2.096 2.898 3.94 2.932-1.432 1.12-3.234 1.787-5.19 1.787-.336 0-.668-.02-.994-.06.185.122.395.234.618.336 1.432.654 3.018 1.037 4.773 1.037 5.72 0 8.855-4.72 8.855-8.855 0-.134-.002-.266-.008-.398.608-.44 1.134-.99 1.554-1.61z"/>
                  </svg>
                </a>
                <a href="#" class="social-icon-btn" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.99 7.04c-.16-.62-.64-1.1-1.26-1.26-1.1-.3-5.59-.3-5.59-.3h-8.28s-4.49 0-5.59.3c-.62.16-1.1.64-1.26 1.26-.3 1.1-.3 3.36-.3 3.36v3.2s0 2.26.3 3.36c.16.62.64 1.1 1.26 1.26 1.1.3 5.59.3 5.59.3h8.28s4.49 0 5.59-.3c.62-.16 1.1-.64 1.26-1.26.3-1.1.3-3.36.3-3.36v-3.2s0-2.26-.3-3.36zm-12.75 6.46v-3.95l3.87 1.97-3.87 1.98z"/>
                  </svg>
                </a>
              </div>
            </div>
            <!-- Quick Links Section -->
            <div class="footer-section">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Flavors</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <!-- Contact Info Section -->
            <div class="footer-section">
              <h5>Contact Us</h5>
              <p>123 Dreamy Lane, Softville, SD 90210</p>
              <p>+91 9876543210</p>
              <p>contact@scoopdreams.com</p>
            </div>
          </div>
          <!-- Copyright Section -->
          <div class="footer-copyright">
            © 2025 Scoop Dreams. All Rights Reserved, Created by NIRANJAN M
          </div>
        </footer>
    </div>
  </div>

  <!-- About Modal Section (Initially Hidden) -->
  <div id="about-modal" class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close" id="close-modal-btn">&times;</button>
      <h3>About ScoopDreams</h3>
      <p>
        ScoopDreams is your one-stop shop for delicious and dreamy soft-serve ice cream. We blend classic flavors with exciting new creations to bring you a dessert experience like no other. Our mission is to spread joy, one scoop, at a time!
      </p>
      <p>
        Also, created by NIRANJAN M
      </p>
    </div>
  </div>

  <!-- Loading Spinner (Initially Hidden) -->
  <div id="loading-spinner" class="spinner"></div>

  <script>
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
    const img = document.getElementById('product-image');
    const title = document.getElementById('product-title');
    const desc = document.getElementById('product-desc');
    const originalPrice = document.getElementById('product-original-price');
    const discountedPrice = document.getElementById('product-discounted-price');
    const discount = document.getElementById('product-discount');
    const rating = document.getElementById('product-rating');

    // Modal and Spinner elements
    const aboutBtn = document.getElementById('about-btn');
    const modal = document.getElementById('about-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const spinner = document.getElementById('loading-spinner');
    
    // New scroll-down button
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    const featuredPage = document.getElementById('featured-page');
    const productGridPage = document.getElementById('product-grid-page');
    const scrollContainer = document.querySelector('.scroll-container');
    const sapphireSwirlBtn = document.getElementById('sapphire-swirl-btn');

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

    aboutBtn.addEventListener('click', () => {
      spinner.style.display = 'block';

      setTimeout(() => {
        spinner.style.display = 'none';
        modal.style.display = 'flex';
      }, 2000);
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // New event listeners to show/hide the scroll button on mouse hover.
    featuredPage.addEventListener('mousemove', (e) => {
      const pageHeight = featuredPage.offsetHeight;
      const hoverThreshold = 0.85; // 85% of the page height from the top
      if (e.clientY / pageHeight > hoverThreshold) {
        scrollDownBtn.classList.add('is-visible');
      } else {
        scrollDownBtn.classList.remove('is-visible');
      }
    });

    featuredPage.addEventListener('mouseleave', () => {
      scrollDownBtn.classList.remove('is-visible');
    });

    // New event listener for the scroll-down button
    scrollDownBtn.addEventListener('click', () => {
      productGridPage.scrollIntoView({ behavior: 'smooth' });
    });

    window.onload = () => {
      // Check if productNames is not empty before trying to access the first element
      if (productNames.length > 0) {
        updateProduct(0);
        productNames[0].classList.add('glassy-active');
      }
    };
  </script>
</body>
</html>
