 "use client";

import { useMemo, useState } from "react";
import "./product-details.css";

const product = {
  title: "Samsung Galaxy A55 5G (8GB RAM, 256GB)",
  brand: "Samsung",
  category: "Electronics / Smartphones",
  rating: 4.8,
  reviews: 1248,
  price: 42999,
  originalPrice: 52999,
  discount: 19,
  stock: 18,
  seller: "Gadget Galaxy",
  sellerRating: 97,
  deliveryDays: "2–4 days",
  returnDays: 14,
  colors: [
    { name: "Awesome Navy", value: "#26364d" },
    { name: "Awesome Iceblue", value: "#b9dce9" },
    { name: "Awesome Lilac", value: "#b9a8d2" },
  ],
  storage: ["128 GB", "256 GB"],
  images: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1000&q=85",
  ],
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(amount);

export default function ProductDetailsPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0].name);
  const [storage, setStorage] = useState("256 GB");
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState("Dhaka");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState("description");

  const currentPrice = useMemo(
    () => storage === "128 GB" ? product.price - 4000 : product.price,
    [storage]
  );

  function addToCart() {
    setCartCount((count) => count + quantity);
    setNotice(`${quantity} item${quantity > 1 ? "s" : ""} added to your cart.`);
  }

  function buyNow() {
    setNotice("Demo checkout: your selected product is ready for checkout.");
  }

  return (
    <main className="vv-page">
      <div className="top-strip">
        <div className="vv-container top-strip-inner">
          <span>Welcome to VendorVerse</span>
          <div className="top-links"><span>Save more with VV Coins</span><span>Help Center</span><span>বাংলা</span></div>
        </div>
      </div>

      <header className="site-header">
        <div className="vv-container header-inner">
          <a className="brand-mark" href="#" aria-label="VendorVerse home">
            <span className="brand-icon">V</span>
            <span>Vendor<span>Verse</span><small>SHOP SMART. LIVE BETTER.</small></span>
          </a>
          <label className="search-box">
            <span className="search-icon">⌕</span>
            <input aria-label="Search products" placeholder="Search products, brands and more..." />
            <button type="button">Search</button>
          </label>
          <button className="header-cart" type="button" onClick={() => setNotice(`Your cart currently has ${cartCount} item${cartCount === 1 ? "" : "s"}.`)}>
            <span className="cart-symbol">🛒</span><span>Cart</span><b>{cartCount}</b>
          </button>
        </div>
      </header>

      <div className="vv-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="#">Home</a><span>/</span><a href="#">Electronics</a><span>/</span><a href="#">Smartphones</a><span>/</span><strong>Product Details</strong>
        </nav>

        <section className="product-layout">
          <div className="gallery-card">
            <div className="gallery-main">
              <span className="sale-pill">-{product.discount}% OFF</span>
              <button className={`heart-button ${wishlisted ? "is-saved" : ""}`} onClick={() => setWishlisted(!wishlisted)} aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>{wishlisted ? "♥" : "♡"}</button>
              <img src={product.images[activeImage]} alt={`${product.title} view ${activeImage + 1}`} onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=85"; }} />
            </div>
            <div className="thumbnail-row">
              {product.images.map((image, index) => (
                <button key={image} className={`thumbnail ${activeImage === index ? "active" : ""}`} onClick={() => setActiveImage(index)} aria-label={`Show product image ${index + 1}`}>
                  <img src={image} alt="" onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=240&q=80"; }} />
                </button>
              ))}
            </div>
            <div className="trust-row"><span>✓ Verified product details</span><span>↗ Share product</span></div>
          </div>

          <div className="product-info">
            <div className="eyebrow">{product.brand} <span>•</span> {product.category}</div>
            <h1>{product.title}</h1>
            <div className="rating-line"><span className="stars">★★★★★</span><strong>{product.rating}</strong><a href="#reviews">{product.reviews.toLocaleString()} ratings</a><i /> <span className="sold-label">Popular choice</span></div>

            <div className="price-panel">
              <div className="price-line"><span className="currency">৳</span><strong>{money(currentPrice)}</strong><del>৳{money(product.originalPrice)}</del><span className="discount-chip">{product.discount}% OFF</span></div>
              <p className="installment">Special price for a limited time <span>·</span> VAT included</p>
              <div className="voucher-row"><span className="ticket-icon">✂</span><strong>Store voucher</strong><span>৳500 off on eligible orders</span><button type="button" onClick={() => setNotice("Store voucher applied to this demo selection.")}>Collect</button></div>
            </div>

            <div className="option-block">
              <div className="option-label">Color: <strong>{color}</strong></div>
              <div className="color-options">
                {product.colors.map((item) => <button key={item.name} title={item.name} aria-label={item.name} onClick={() => setColor(item.name)} className={`color-choice ${color === item.name ? "selected" : ""}`}><span style={{ background: item.value }} /></button>)}
              </div>
            </div>

            <div className="option-block">
              <div className="option-label">Storage</div>
              <div className="storage-options">{product.storage.map((item) => <button key={item} className={storage === item ? "selected" : ""} onClick={() => setStorage(item)}>{item}{item === "256 GB" && <small>Best value</small>}</button>)}</div>
            </div>

            <div className="option-block quantity-block">
              <div className="option-label">Quantity</div>
              <div className="quantity-control"><button disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)} aria-label="Decrease quantity">−</button><span>{quantity}</span><button disabled={quantity >= product.stock} onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div>
              <span className="stock-note">{product.stock} pieces available</span>
            </div>

            <div className="action-row"><button className="btn-primary" onClick={buyNow}>Buy Now</button><button className="btn-secondary" onClick={addToCart}>＋ Add to Cart</button></div>
            {notice && <div className="notice" role="status"><span>✓</span>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification">×</button></div>}

            <div className="delivery-card">
              <div className="delivery-heading"><span className="delivery-icon">♧</span><strong>Delivery & Services</strong><span className="safe-tag">Buyer protection</span></div>
              <div className="delivery-location"><span>Deliver to</span><strong>⌖ {postalCode}</strong><button onClick={() => { setDeliveryChecked(false); setPostalCode(postalCode === "Dhaka" ? "Chattogram" : "Dhaka"); }}>Change</button></div>
              <div className="service-item"><span className="service-icon">▣</span><div><strong>Standard Delivery</strong><p>{product.deliveryDays} · Delivery fee calculated at checkout</p></div><b>৳60</b></div>
              <div className="service-item"><span className="service-icon">৳</span><div><strong>Cash on Delivery</strong><p>Pay when your order arrives</p></div><span className="available">Available</span></div>
              <div className="service-item"><span className="service-icon">↺</span><div><strong>{product.returnDays}-day return policy</strong><p>Return eligible items within 14 days</p></div></div>
              <div className="service-item"><span className="service-icon">♢</span><div><strong>Warranty</strong><p>1-year brand warranty</p></div></div>
              {deliveryChecked && <p className="delivery-result">Estimated delivery to {postalCode}: {product.deliveryDays}</p>}
              <button className="text-link" onClick={() => setDeliveryChecked(!deliveryChecked)}>{deliveryChecked ? "Hide delivery estimate" : "Check delivery estimate"} →</button>
            </div>
          </div>

          <aside className="seller-card">
            <div className="seller-title">Sold by</div>
            <div className="seller-name-row"><div className="store-avatar">GG</div><div><strong>{product.seller}</strong><span className="official-label">Verified seller</span></div><span className="chevron">›</span></div>
            <div className="seller-stats"><div><strong>{product.sellerRating}%</strong><span>Positive ratings</span></div><div><strong>Within 24h</strong><span>Chat response</span></div></div>
            <button className="outline-full" onClick={() => setNotice(`Opening ${product.seller} store (demo).`)}>Visit Store</button>
            <div className="seller-divider" />
            <div className="secure-heading">Why shop with us?</div>
            <div className="benefit"><span>✓</span><div><strong>Secure payments</strong><small>Your payment information is protected</small></div></div>
            <div className="benefit"><span>↺</span><div><strong>Easy returns</strong><small>Clear and simple return process</small></div></div>
            <div className="benefit"><span>♧</span><div><strong>Local support</strong><small>Help when you need it</small></div></div>
            <div className="seller-help">Need help? <a href="#questions">Ask a question</a></div>
          </aside>
        </section>

        <section className="details-section">
          <div className="tab-bar" role="tablist" aria-label="Product information">
            {[["description", "Description"], ["specifications", "Specifications"], ["reviews", `Reviews (${product.reviews.toLocaleString()})`], ["questions", "Q&A"]].map(([key, label]) => <button key={key} role="tab" aria-selected={tab === key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label}</button>)}
          </div>
          {tab === "description" && <div className="tab-content"><h2>Product highlights</h2><p>Enjoy a vivid display, dependable performance and a versatile camera setup with the Samsung Galaxy A55 5G. This sample listing demonstrates the information customers can review before placing an order.</p><div className="highlight-grid"><div><span>01</span><strong>Super AMOLED display</strong><p>Rich colors and smooth everyday viewing.</p></div><div><span>02</span><strong>5G-ready performance</strong><p>Fast connectivity where supported.</p></div><div><span>03</span><strong>All-day battery</strong><p>Designed to keep up with daily use.</p></div></div><p className="sample-note">Demo content: product details, price, seller information and policies are sample data for the VendorVerse prototype.</p></div>}
          {tab === "specifications" && <div className="tab-content"><h2>Specifications</h2><div className="spec-table"><div><span>Brand</span><strong>Samsung</strong></div><div><span>Model</span><strong>Galaxy A55 5G</strong></div><div><span>Storage</span><strong>{storage}</strong></div><div><span>Color</span><strong>{color}</strong></div><div><span>Network</span><strong>5G / 4G LTE</strong></div><div><span>Warranty</span><strong>1 year (sample)</strong></div></div></div>}
          {tab === "reviews" && <div className="tab-content" id="reviews"><h2>Customer reviews</h2><div className="review-summary"><strong className="big-rating">{product.rating}<span>/5</span></strong><div><div className="stars">★★★★★</div><p>Based on {product.reviews.toLocaleString()} ratings</p></div><span className="ai-badge">✦ AI review summary</span></div><p className="ai-summary">Customers commonly praise the display quality, smooth everyday performance and premium feel. Some buyers recommend comparing storage options before ordering. <small>Illustrative summary for prototype only.</small></p><div className="review-card"><div className="review-avatar">R</div><div><strong>Rahim A. <span className="verified-purchase">✓ Verified purchase</span></strong><div className="stars">★★★★★</div><p>Good quality and arrived safely. The display looks great.</p><small>Sample review · Dhaka</small></div></div><div className="review-card"><div className="review-avatar purple">S</div><div><strong>Samia K. <span className="verified-purchase">✓ Verified purchase</span></strong><div className="stars">★★★★☆</div><p>Nice phone overall. Delivery was smooth and packaging was secure.</p><small>Sample review · Chattogram</small></div></div></div>}
          {tab === "questions" && <div className="tab-content" id="questions"><h2>Questions & answers</h2><div className="question"><strong>Q: Is Cash on Delivery available?</strong><p>A: Yes, COD is available for eligible delivery locations in this demo.</p></div><div className="question"><strong>Q: Does it include a warranty?</strong><p>A: The sample listing shows a 1-year brand warranty. Actual terms should be confirmed by the seller.</p></div><div className="ask-row"><input aria-label="Ask a product question" placeholder="Ask a question about this product..." /><button onClick={() => setNotice("Your question has been saved in this demo.")}>Ask Question</button></div></div>}
        </section>

        <section className="related-section"><div className="section-heading"><div><span className="eyebrow">YOU MAY ALSO LIKE</span><h2>Related products</h2></div><a href="#">View all →</a></div><div className="related-grid">{[
          { name: "Galaxy Buds FE", price: "৳7,499", image: "photo-1606220945770-b5b6c2c55bf1" },
          { name: "Fast USB-C Charger", price: "৳1,290", image: "photo-1583863788434-e58a36330cf0" },
          { name: "Protective Phone Case", price: "৳650", image: "photo-1601593346740-9255c6b2d3c5" },
          { name: "Wireless Power Bank", price: "৳2,199", image: "photo-1609091839311-d5365f9ff1c5" },
        ].map((item) => <button className="related-card" key={item.name} onClick={() => setNotice(`${item.name} selected (demo).`)}><img src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=500&q=80`} alt={item.name} /><span className="related-name">{item.name}</span><strong>{item.price}</strong><span className="mini-rating">★★★★★ <small>4.7</small></span></button>)}</div></section>
      </div>
      <footer className="site-footer"><div className="vv-container footer-inner"><div className="brand-mark footer-brand"><span className="brand-icon">V</span><span>Vendor<span>Verse</span><small>SHOP SMART. LIVE BETTER.</small></span></div><p>A smarter marketplace, made for Bangladesh.</p><span>© 2026 VendorVerse · Demo product page</span></div></footer>
    </main>
  );
}
