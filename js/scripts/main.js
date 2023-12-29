var slide_thumbnail = new Swiper(".slide-thumbnail", {
  slidesPerView: 5,
  direction: 'vertical',
  spaceBetween: 20,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      direction: 'horizontal'
    },
    1150: {
      direction: 'vertical'
    }
  }
});

var progressSlide = document.querySelector('.js-progress');

var slide_hero = new Swiper(".slide-principal", {
  effect: 'fade',
  thumbs: {
    swiper: slide_thumbnail,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  on: {
    init: function() {
      progressSlide.classList.remove('animate');
      progressSlide.classList.remove('active');
      progressSlide.classList.add('animate');
      progressSlide.classList.add('active');
    },
    slideChangeTransitionStart: function() {
      progressSlide.classList.remove('animate');
      progressSlide.classList.remove('active');
      progressSlide.classList.add('active');
    },
    slideChangeTransitionEnd: function() {
      progressSlide.classList.add('animate');
    }

  }
});

const allFilters = document.querySelectorAll('.js-nav-games li a');
const tabPanes = document.querySelectorAll('.tab-pane-games');

allFilters.forEach((filter, index) => {
  filter.addEventListener('click', (event) => {
    event.preventDefault();

    allFilters.forEach(item => {
      item.classList.remove('active');
    });

    tabPanes.forEach(tabPane => {
      tabPane.classList.remove('active');
    });

    tabPanes[index].classList.add('active');

    filter.classList.add('active');
  })
})

const btnOpenModal = document.querySelector('.js-open-modal')
const btnCloseModal = document.querySelector('.js-close-modal');
let tagHtml = document.documentElement;

btnOpenModal.addEventListener('click', (event) => {
  event.preventDefault();

  tagHtml.classList.add('show-modal')
})

let interactionModal = document.querySelector('.overlay')

if (interactionModal) {
  interactionModal.addEventListener('click', () => {
    tagHtml.classList.remove('show-modal')
  })
}

document.addEventListener('keydown', (event) => {
  const modal = document.querySelector('.modal')
  if(event.key === 'Escape') {
    tagHtml.classList.remove('show-modal')    
  }
})


btnCloseModal.addEventListener('click', () => {
 
  tagHtml.classList.remove('show-modal');
})


const btnMenu = document.querySelectorAll('.js-btn-menu');
const menuItem = document.querySelectorAll('.js-menu');

btnMenu.forEach((btn, index) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();

    menuItem.forEach(item => {
      item.classList.remove('active')
      item.addEventListener('mouseleave', () => {
        item.classList.remove('active')

        btnMenu.forEach(item => {
          item.classList.remove('active');
        })
    
      })
    })

    btnMenu.forEach(item => {
      item.classList.remove('active');
    })

    btn.classList.add('active')

    menuItem[index].classList.add('active');
  })
})
