document.addEventListener('DOMContentLoaded', function() {
  // ============== Loading Animation ==============
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 1500);

  // ============== Mobile Navigation ==============
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ============== Sticky Navigation ==============
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ============== Smooth Scrolling ==============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============== Animate Stats Counting ==============
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // Animation duration in ms
      const step = target / (duration / 16); // 16ms per frame
      let current = 0;
      
      const updateCount = () => {
        current += step;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };
      
      updateCount();
    });
  }

  // Only animate when stats are in view
  const statsSection = document.querySelector('.stats-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);

  // ============== Pricing Toggle ==============
  const pricingToggle = document.getElementById('pricingToggle');
  const packageGrid = document.querySelector('.package-grid');
  
  // Package data with monthly and annual prices
  const packages = [
    {
      name: "Starter Plan",
      monthlyPrice: 499,
      annualPrice: 4790, // 499 * 12 * 0.8 (20% discount)
      features: [
        "1-Page Mobile-Friendly Website",
        "Google Business Profile Setup",
        "Business Email Setup",
        "WhatsApp Chat Widget"
      ],
      popular: false
    },
    {
      name: "Growth Plan",
      monthlyPrice: 999,
      annualPrice: 9590, // 999 * 12 * 0.8
      features: [
        "All Starter Plan features",
        "Facebook Page Revamp",
        "2-Week Social Media Content Launch Pack",
        "1-Year Hosting Included"
      ],
      popular: true
    },
    {
      name: "Pro Plan",
      monthlyPrice: 1499,
      annualPrice: 14390, // 1499 * 12 * 0.8
      features: [
        "All Growth Plan features",
        "3-Page Business Website with E-Commerce",
        "Booking or Order System Integration",
        "Monthly Content & Marketing Strategy Session"
      ],
      popular: false
    }
  ];

  // Add-ons data
  const addons = [
    {
      id: "seo",
      name: "SEO Optimization",
      description: "Basic on-page SEO setup to help your site rank better",
      monthlyPrice: 299,
      annualPrice: 2870
    },
    {
      id: "blog",
      name: "Blog Setup",
      description: "Add a blog section to your website with 3 starter posts",
      monthlyPrice: 199,
      annualPrice: 1910
    },
    {
      id: "analytics",
      name: "Analytics Setup",
      description: "Google Analytics and Search Console integration",
      monthlyPrice: 149,
      annualPrice: 1430
    },
    {
      id: "logo",
      name: "Logo Design",
      description: "Custom logo design for your business",
      monthlyPrice: 499,
      annualPrice: 499 // One-time
    }
  ];

  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Lunga's Hair Studio",
      category: "service",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
      description: "A modern website for a local hair salon with online booking system",
      stats: "Bookings increased by 200% in first month"
    },
    {
      id: 2,
      title: "Siya's Mobile Car Wash",
      category: "service",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3",
      description: "Landing page with service packages and contact form",
      stats: "Went from 0 to 5 bookings per week"
    },
    {
      id: 3,
      title: "Thandi's Fashion Boutique",
      category: "retail",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
      description: "E-commerce store for handmade African fashion",
      stats: "First online sales within 2 weeks"
    },
    {
      id: 4,
      title: "Mama's Kitchen",
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      description: "Restaurant website with menu and reservation system",
      stats: "30% increase in reservations"
    },
    {
      id: 5,
      title: "FixIt Plumbing",
      category: "professional",
      image: "https://images.unsplash.com/photo-1621607516706-ed8042321817",
      description: "Service website with emergency contact feature",
      stats: "Calls increased by 150%"
    },
    {
      id: 6,
      title: "DJ Tumi Events",
      category: "professional",
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498",
      description: "Portfolio site with booking calendar",
      stats: "Booked for 3 months in advance"
    }
  ];

  // Render packages based on selected billing cycle
  function renderPackages(isAnnual) {
    packageGrid.innerHTML = '';
    
    packages.forEach(pkg => {
      const price = isAnnual ? pkg.annualPrice : pkg.monthlyPrice;
      const billingText = isAnnual ? '/year (save 20%)' : '/month';
      
      const packageCard = document.createElement('div');
      packageCard.className = `package-card ${pkg.popular ? 'popular' : ''}`;
      
      packageCard.innerHTML = `
        ${pkg.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
        <div class="package-header">
          <h3>${pkg.name}</h3>
          <div class="price">R${price}<span>${billingText}</span></div>
        </div>
        <ul class="features-list">
          ${pkg.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
        </ul>
        <button class="btn btn-package" data-package="${pkg.name.toLowerCase().replace(' ', '-')}">
          Choose ${pkg.name.split(' ')[0]}
        </button>
      `;
      
      packageGrid.appendChild(packageCard);
    });

    // Add event listeners to package buttons
    document.querySelectorAll('.btn-package').forEach(btn => {
      btn.addEventListener('click', function() {
        const packageId = this.getAttribute('data-package');
        const selectedPackage = packages.find(pkg => 
          pkg.name.toLowerCase().replace(' ', '-') === packageId
        );
        
        openPackageModal(selectedPackage, pricingToggle.checked);
      });
    });
  }

  // Initialize packages with monthly pricing
  renderPackages(false);

  // Toggle between monthly and annual pricing
  pricingToggle.addEventListener('change', function() {
    renderPackages(this.checked);
  });

  // ============== Package Modal ==============
  const packageModal = document.getElementById('packageModal');
  const selectedPackageName = document.getElementById('selectedPackageName');
  const packageFeatures = document.getElementById('packageFeatures');
  const packageBasePrice = document.getElementById('packageBasePrice');
  const packageBillingCycle = document.getElementById('packageBillingCycle');
  const addonsGrid = document.getElementById('addonsGrid');
  const totalPrice = document.getElementById('totalPrice');
  const proceedToPayment = document.getElementById('proceedToPayment');
  const closeModalButtons = document.querySelectorAll('.close-modal');

  let currentPackage = null;
  let isAnnualBilling = false;
  let selectedAddons = [];

  function openPackageModal(pkg, annual) {
    currentPackage = pkg;
    isAnnualBilling = annual;
    selectedAddons = [];
    
    // Update modal content
    selectedPackageName.textContent = pkg.name;
    
    packageFeatures.innerHTML = pkg.features.map(feature => 
      `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
    ).join('');
    
    const price = annual ? pkg.annualPrice : pkg.monthlyPrice;
    const billingText = annual ? 'per year (save 20%)' : 'per month';
    
    packageBasePrice.textContent = `R${price}`;
    packageBillingCycle.textContent = billingText;
    
    // Render addons
    renderAddons();
    
    // Update total price
    updateTotalPrice();
    
    // Show modal
    packageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function renderAddons() {
    addonsGrid.innerHTML = '';
    
    addons.forEach(addon => {
      const price = isAnnualBilling && addon.id !== 'logo' ? addon.annualPrice : addon.monthlyPrice;
      const billingText = addon.id === 'logo' ? 'one-time' : (isAnnualBilling ? 'per year' : 'per month');
      
      const addonItem = document.createElement('div');
      addonItem.className = 'addon-item';
      addonItem.innerHTML = `
        <div class="addon-checkbox"><i class="fas fa-check"></i></div>
        <div class="addon-details">
          <div class="addon-name">${addon.name}</div>
          <div class="addon-price">R${price} <small>${billingText}</small></div>
          <div class="addon-description">${addon.description}</div>
        </div>
      `;
      
      addonItem.addEventListener('click', () => {
        addonItem.classList.toggle('selected');
        
        if (addonItem.classList.contains('selected')) {
          selectedAddons.push({
            id: addon.id,
            name: addon.name,
            price: price,
            billing: billingText
          });
        } else {
          selectedAddons = selectedAddons.filter(item => item.id !== addon.id);
        }
        
        updateTotalPrice();
      });
      
      addonsGrid.appendChild(addonItem);
    });
  }

  function updateTotalPrice() {
    const basePrice = isAnnualBilling ? currentPackage.annualPrice : currentPackage.monthlyPrice;
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const total = basePrice + addonsTotal;
    
    totalPrice.textContent = `R${total}`;
  }

  // Proceed to payment
  proceedToPayment.addEventListener('click', () => {
    packageModal.style.display = 'none';
    openPaymentModal();
  });

  // Close modal buttons
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      packageModal.style.display = 'none';
      paymentModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === packageModal) {
      packageModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    if (e.target === paymentModal) {
      paymentModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    if (e.target === portfolioLightbox) {
      portfolioLightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // ============== Payment Modal ==============
  const paymentModal = document.getElementById('paymentModal');
  const orderItems = document.getElementById('orderItems');
  const orderTotalPrice = document.getElementById('orderTotalPrice');
  const paymentForm = document.getElementById('paymentForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const closeConfirmation = document.getElementById('closeConfirmation');

  function openPaymentModal() {
    // Calculate total
    const basePrice = isAnnualBilling ? currentPackage.annualPrice : currentPackage.monthlyPrice;
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const total = basePrice + addonsTotal;
    
    // Update order summary
    orderItems.innerHTML = `
      <li>
        <span>${currentPackage.name}</span>
        <span>R${basePrice}</span>
      </li>
      ${selectedAddons.map(addon => `
        <li>
          <span>${addon.name}</span>
          <span>R${addon.price}</span>
        </li>
      `).join('')}
    `;
    
    orderTotalPrice.textContent = `R${total}`;
    
    // Show payment modal
    paymentModal.style.display = 'block';
  }

  // Handle form submission
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    // For demo, we'll just show the confirmation
    
    paymentModal.style.display = 'none';
    confirmationModal.style.display = 'block';
  });

  // Close confirmation modal
  closeConfirmation.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    paymentForm.reset();
  });

  // ============== Portfolio Filtering ==============
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.querySelector('.portfolio-grid');

  // Render portfolio items
  function renderPortfolio(filter = 'all') {
    portfolioGrid.innerHTML = '';
    
    const filteredItems = filter === 'all' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === filter);
    
    filteredItems.forEach(item => {
      const portfolioItem = document.createElement('div');
      portfolioItem.className = 'portfolio-item';
      portfolioItem.setAttribute('data-category', item.category);
      portfolioItem.setAttribute('data-id', item.id);
      
      portfolioItem.innerHTML = `
        <img src="${item.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="${item.title}">
        <div class="portfolio-overlay">
          <h3>${item.title}</h3>
          <p>${item.stats}</p>
        </div>
      `;
      
      portfolioItem.addEventListener('click', () => {
        openLightbox(item);
      });
      
      portfolioGrid.appendChild(portfolioItem);
    });
  }

  // Initialize portfolio
  renderPortfolio();

  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      const filter = button.getAttribute('data-filter');
      renderPortfolio(filter);
    });
  });

  // ============== Portfolio Lightbox ==============
  const portfolioLightbox = document.getElementById('portfolioLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const lightboxStats = document.getElementById('lightboxStats');
  const closeLightbox = document.querySelector('.close-lightbox');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentLightboxIndex = 0;
  let currentFilter = 'all';
  let filteredPortfolioItems = [...portfolioItems];

  function openLightbox(item) {
    const itemIndex = portfolioItems.findIndex(i => i.id === item.id);
    currentLightboxIndex = itemIndex;
    currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    filteredPortfolioItems = currentFilter === 'all' 
      ? [...portfolioItems] 
      : portfolioItems.filter(i => i.category === currentFilter);
    
    updateLightboxContent(item);
    portfolioLightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent(item) {
    lightboxImage.src = `${item.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80`;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    lightboxStats.textContent = item.stats;
  }

  // Navigation in lightbox
  lightboxPrev.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredPortfolioItems.length) % filteredPortfolioItems.length;
    updateLightboxContent(filteredPortfolioItems[currentLightboxIndex]);
  });

  lightboxNext.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredPortfolioItems.length;
    updateLightboxContent(filteredPortfolioItems[currentLightboxIndex]);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (portfolioLightbox.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        lightboxPrev.click();
      } else if (e.key === 'ArrowRight') {
        lightboxNext.click();
      } else if (e.key === 'Escape') {
        portfolioLightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });

  // ============== Testimonial Slider ==============
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentTestimonialIndex = 0;
  let slideInterval;

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current testimonial
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
  }

  // Dot click event
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentTestimonialIndex = index;
      showTestimonial(currentTestimonialIndex);
      resetInterval();
    });
  });
  
  // Previous button
  prevBtn.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex > 0) ? currentTestimonialIndex - 1 : testimonials.length - 1;
    showTestimonial(currentTestimonialIndex);
    resetInterval();
  });
  
  // Next button
  nextBtn.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex < testimonials.length - 1) ? currentTestimonialIndex + 1 : 0;
    showTestimonial(currentTestimonialIndex);
    resetInterval();
  });
  
  // Auto slide every 5 seconds
  function startInterval() {
    slideInterval = setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex < testimonials.length - 1) ? currentTestimonialIndex + 1 : 0;
      showTestimonial(currentTestimonialIndex);
    }, 5000);
  }
  
  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }
  
  // Pause on hover
  const slider = document.querySelector('.testimonials-slider');
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', startInterval);
  
  // Start the slider
  startInterval();

  // ============== Scroll Animations ==============
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.business-card, .package-card, .portfolio-item, .contact-card, .process-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.business-card, .package-card, .portfolio-item, .contact-card, .process-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});
