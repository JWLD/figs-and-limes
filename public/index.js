(function() {
  // show / hide scroll-to-top button
  var topBtn = document.getElementById('top-btn');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      if (topBtn.classList.contains('shrink')) {
        topBtn.classList.remove('shrink');
      }
    } else {
      if (!topBtn.classList.contains('shrink')) {
        topBtn.classList.add('shrink');
      }
    }
  });
})();
