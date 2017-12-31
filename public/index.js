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

	// load video
	var videos = document.querySelectorAll('.video-wrap');

	Array.from(videos).forEach((video) => {
		video.addEventListener('click', function(e) {
			const vidFrame = e.target.querySelector('iframe');
			vidFrame.classList.add('activate');

			setTimeout(() => {
				vidFrame.src = 'https://www.youtube.com/embed/' + e.target.dataset.vid + '?autoplay=1';
			}, 500);
		});
	});
})();
