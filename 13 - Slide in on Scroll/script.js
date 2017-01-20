function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}



const sliderImages = document.querySelectorAll('.slide-in');

function isScrolling(e) {
  sliderImages.forEach(image => {
    // to determine when image is in view, get scroll Y (top) + window height / 2 === middle of image
    const slideInAt  = (window.scrollY + window.innerHeight) - image.height / 2;
    // bottom of image
    const imageBottom = image.height + image.offsetTop;
    const isHalfShown = slideInAt > image.offsetTop;
    const notScrolledPast = window.scrollY < imageBottom;

    if(isHalfShown && notScrolledPast) {
      // slide image in
      image.classList.add('active');
    } else {
      // re-apply styles to hide image
      image.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(isScrolling));
