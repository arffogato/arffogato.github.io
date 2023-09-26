
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  

  const menuItems = [
    { name: "Affogato", category: "Espresso", price: 145 },
    { name: "Ala King", category: "Brunch", price: 150 },
    { name: "Apple Shake", category: "Non-Coffee Drinks", price: 120 },
    { name: "Avocado", category: "Shakes", price: 115 },
    { name: "Avocado Frappe", category: "Non-Coffee Drinks", price: 105 },
    { name: "Beef Tapa W/ Rice & Egg", category: "Brunch", price: 130 },
    { name: "Beefy Nacho Fries", category: "Starter", price: 185 },
    { name: "Blue Lemonade", category: "Non-Coffee Drinks", price: 70 },
    { name: "Brewed Coffee Plain Black", category: "Espresso", price: 50 },
    { name: "Brewed Coffee With Milk", category: "Espresso", price: 55 },
    { name: "Caesar Salad", category: "Salads", price: 210 },
    { name: "Caffe Latte", category: "Espresso", price: 90 },
    { name: "Caffe Mocha Latte", category: "Espresso", price: 125 },
    { name: "Caramel Macchiato", category: "Espresso", price: 125 },
    { name: "Carbonara (Chicken)", category: "Pastas", price: 165 },
    { name: "Carbonara (Tuna)", category: "Pastas", price: 165 },
    { name: "Cheesy Cornedbeef", category: "Sandwiches", price: 100 },
    { name: "Cheesy Egg Sandwich", category: "Sandwiches", price: 85 },
    { name: "Cheesy Meaty Fries", category: "Starter", price: 110 },
    { name: "Cheesy Potato Balls", category: "Starter", price: 145 },
    { name: "Chicken Creamy Pesto W/Rice", category: "Brunch", price: 150 },
    { name: "Chicken Fillet W/Rice", category: "Brunch", price: 150 },
    { name: "Chicken Salad", category: "Salads", price: 220 },
    { name: "Chicken Sandwich", category: "Sandwiches", price: 95 },
    { name: "Chicken Strips", category: "Starter", price: 130 },
    { name: "Chicken Wings (Buffalo)", category: "Brunch", price: 170 },
    { name: "Chicken Wings (Honeysoy)", category: "Brunch", price: 170 },
    { name: "Chicken Wings Parmesan", category: "Brunch", price: 170 },
    { name: "Chocolate Frappe", category: "Non-Coffee Drinks", price: 115 },
    { name: "Chocolate Waffle", category: "Waffles", price: 120 },
    { name: "Churros & Dip (Caramel)", category: "Starter", price: 135 },
    { name: "Churros & Dip (Chocolate)", category: "Starter", price: 135 },
    { name: "Churros Bowl Ala Mode", category: "Starter", price: 145 },
    { name: "Coffee-Based Caramel Frappe", category: "Espresso", price: 130 },
    { name: "Coke In Can", category: "Softdrinks", price: 60 },
    { name: "Cookie Monster", category: "Non-Coffee Drinks", price: 140 },
    { name: "Cookies And Cream Frappe", category: "Non-Coffee Drinks", price: 125 },
    { name: "Corn Shake", category: "Shakes", price: 110 },
    { name: "Cornsilog", category: "Brunch", price: 95 },
    { name: "Crab And Corn Soup", category: "Brunch", price: 70 },
    { name: "Cucumber Slush", category: "Shakes", price: 115 },
    { name: "Dirty Matcha Latte", category: "Espresso", price: 130 },
    { name: "Dirty Strawberry Latte", category: "Espresso", price: 130 },
    { name: "Dragon Fruit", category: "Shakes", price: 120 },
    { name: "Fish Fillet", category: "Brunch", price: 150 },
    { name: "French Toast", category: "Sandwiches", price: 100 },
    { name: "Fresh Buko", category: "Shakes", price: 80 },
    { name: "Fries & Dip (Barbeque)", category: "Starter", price: 95 },
    { name: "Fries & Dip (Cheese)", category: "Starter", price: 95 },
    { name: "Fries & Dip (Original)", category: "Starter", price: 95 },
    { name: "Fries & Dip (Sour Cream)", category: "Starter", price: 85 },
    { name: "Fries Sour Cream", category: "Starter", price: 95 },
    { name: "Fries W/ Chicken Strips", category: "Starter", price: 205 },
    { name: "Frozen Iced Tea", category: "Non-Coffee Drinks", price: 80 },
    { name: "Garlic Rice", category: "Brunch", price: 25 },
    { name: "Garlic Truffle", category: "Pizza", price: 190 },
    { name: "Grape Slush", category: "Shakes", price: 120 },
    { name: "Ham And Egg Sandwich", category: "Sandwiches", price: 100 },
    { name: "Ham And Egg With Rice", category: "Brunch", price: 115 },
    { name: "Hazelnut Latte", category: "Espresso", price: 110 },
    { name: "Hot Americano", category: "Espresso", price: 75 },
    { name: "Hot Caramel Latte", category: "Espresso", price: 85 },
    { name: "Hot Chocolate", category: "Non-Coffee Drinks", price: 85 },
    { name: "Hot Mocha Latte", category: "Espresso", price: 120 },
    { name: "Hot Tea", category: "Non-Coffee Drinks", price: 50 },
    { name: "Hot Vanilla Latte", category: "Espresso", price: 95 },
    { name: "Hungarian W/ Rice", category: "Brunch", price: 145 },
    { name: "Hungarian W/ Egg", category: "Brunch", price: 115 },
    { name: "Ice Cream", category: "Starter", price: 85 },
    { name: "Iced Caffe Americano", category: "Espresso", price: 75 },
    { name: "Iced Caffe Latte", category: "Espresso", price: 90 },
    { name: "Iced Caramel Latte", category: "Espresso", price: 100 },
    { name: "Iced Chocolate", category: "Non-Coffee Drinks", price: 110 },
    { name: "Iced Matcha Latte", category: "Non-Coffee Drinks", price: 125 },
    { name: "Lemon Cucumber", category: "Non-Coffee Drinks", price: 70 },
    { name: "Lemon Iced Tea", category: "Non-Coffee Drinks", price: 70 },
    { name: "Lemon Yakult", category: "Non-Coffee Drinks", price: 105 },
    { name: "Lemonade", category: "Non-Coffee Drinks", price: 99 },
    { name: "Longsilog", category: "Brunch", price: 95 },
    { name: "Mango Shake", category: "Shakes", price: 115 },
    { name: "Matcha Creme Frappe", category: "Non-Coffee Drinks", price: 115 },
    { name: "Meat Wagon", category: "Pizza", price: 190 },
    { name: "Mushroom Soup", category: "Brunch", price: 70 },
    { name: "Nacho Fries", category: "Starter", price: 160 },
    { name: "Nachos", category: "Starter", price: 120 },
    { name: "Pesto Pasta (Chicken)", category: "Pastas", price: 180 },
    { name: "Pesto Pasta (Tuna)", category: "Pastas", price: 180 },
    { name: "Pesto Shrimp Pasta", category: "Pastas", price: 180 },
    { name: "Pitcher", category: "Non-Coffee Drinks", price: 200 },
    { name: "Pizza 3 Cheese", category: "Pizza", price: 190 },
    { name: "Pizza Hawaiian", category: "Pizza", price: 190 },
    { name: "Pizza Italian", category: "Pizza", price: 190 },
    { name: "Pizza Pepperoni", category: "Pizza", price: 190 },
    { name: "Pizza Zoila", category: "Pizza", price: 190 },
    { name: "Pup Cup", category: "Dog Menu", price: 35 },
    { name: "Pupsicle", category: "Dog Menu", price: 70 },
    { name: "Royal In Can", category: "Softdrinks", price: 60 },
    { name: "Set A", category: "Starter", price: 150 },
    { name: "Set B", category: "Starter", price: 185 },
    { name: "Set C", category: "Starter", price: 245 },
    { name: "Shrimp Carbonara", category: "Pastas", price: 165 },
    { name: "Shrimp Scampi", category: "Pastas", price: 180 },
    { name: "Spam", category: "Brunch", price: 50 },
    { name: "Spam & Egg W/ Rice", category: "Brunch", price: 115 },
    { name: "Spam Sandwich", category: "Sandwiches", price: 105.55 },
    { name: "Spanish Latte", category: "Espresso", price: 105 },
    { name: "Sprite In Can", category: "Softdrinks", price: 60 },
    { name: "Strawberry Frappe", category: "Shakes", price: 110 },
    { name: "Strawberry Latte", category: "Non-Coffee Drinks", price: 130 },
    { name: "Strawberry Red Tea", category: "Non-Coffee Drinks", price: 70 },
    { name: "Strawberry Smoothie", category: "Shakes", price: 125 },
    { name: "Strawberry Waffle", category: "Waffles", price: 140 },
    { name: "Sweet And Sour Chicken W/Rice", category: "Brunch", price: 150 },
    { name: "Tocino W/Rice", category: "Brunch", price: 95 },
    { name: "Tuna Salad", category: "Salads", price: 220 },
    { name: "Vanilla Caramel Frappe", category: "Non-Coffee Drinks", price: 115 },
    { name: "Vanilla Latte", category: "Espresso", price: 100 },
    { name: "Vanilla Waffle", category: "Waffles", price: 120 },
    { name: "Watermelon Shake", category: "Shakes", price: 115 }
  ];

  // Extract unique categories from menuItems array and sort them alphabetically
  const categories = [...new Set(menuItems.map(item => item.category))]
  .sort((a, b) => {
    // Move "Starter" to the beginning
    if (a === "Starter") return -1;
    if (b === "Starter") return 1;
    // Sort other categories alphabetically
    return a.localeCompare(b);
  });

  // Create the <ul> element
  const menuFiltersUl = document.createElement('ul');
  menuFiltersUl.id = 'menu-flters';

  // Create and append the "Show All" list item
  const showAllLi = document.createElement('li');
  showAllLi.dataset.filter = '*';
  showAllLi.textContent = 'Show All';
  menuFiltersUl.appendChild(showAllLi);

  // Iterate through the categories and create list items
  categories.forEach(category => {
  const filterLi = document.createElement('li');
  filterLi.dataset.filter = `.filter-${category.toLowerCase().replace(/\s+/g, '-')}`;
  filterLi.textContent = category;
  menuFiltersUl.appendChild(filterLi);

  // Add the "filter-active" class if the category is "Starter"
  if (category === "Starter") {
    filterLi.classList.add('filter-active');
  }
  });

  // Get the target element with ID "menulist"
  const menulistDiv = document.getElementById('menulist');

  // Append the generated <ul> element to the "menulist" div
  menulistDiv.appendChild(menuFiltersUl);
  // End categories

  const menuContainer = document.querySelector('.row.menu-container');

  menuItems.forEach(item => {
    const menuItemDiv = document.createElement('div');
    menuItemDiv.classList.add('col-lg-6', 'menu-item');
  
    // Dynamically generate the filter class based on the category
    const filterClass = `filter-${item.category.toLowerCase().replace(/\s+/g, '-')}`;
    menuItemDiv.classList.add(filterClass);
  
    const menuContentDiv = document.createElement('div');
    menuContentDiv.classList.add('menu-content');
  
    const itemNameLink = document.createElement('p');
    itemNameLink.href = '#';
    itemNameLink.textContent = item.name;
  
    const itemPriceSpan = document.createElement('span');
    itemPriceSpan.textContent = item.price;
  
    menuContentDiv.appendChild(itemNameLink);
    menuContentDiv.appendChild(itemPriceSpan);
    menuItemDiv.appendChild(menuContentDiv);
  
    if (item.description) { // Check if the item has a description
      const itemIngredientsDiv = document.createElement('div'); // Create a <div> for the description
      itemIngredientsDiv.classList.add('menu-ingredients');
      itemIngredientsDiv.textContent = item.description;
      menuItemDiv.appendChild(itemIngredientsDiv); // Append the description
    }
  
    // Step 3: Append the created elements to the menu container
    menuContainer.appendChild(menuItemDiv);
  });

  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows',
        filter: '.filter-starter'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Testimonials slider
   */
   new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Events slider
   */
   new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()