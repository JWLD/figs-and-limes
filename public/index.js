(function() {
  var topBtn = document.getElementById('top-btn');

  window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 300) {
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
