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

	// toggle contact form
	var formToggles = document.querySelectorAll('.form-toggle');

	Array.from(formToggles).forEach((toggle) => {
		toggle.addEventListener('click', function(e) {
			e.preventDefault();

			var formWrap = document.querySelector('#form-wrap');
			formWrap.classList.toggle('show-form');
		});
	});

	// send form
	document.querySelector('#contact-form').addEventListener('submit', function(e) {
		e.preventDefault();

		var formValues = {};

		var formElements = Array.from(e.target.elements);
		formElements.forEach(input => input.name ? formValues[input.name] = input.value : null);

		var data = JSON.stringify(formValues);

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log('Success', xhr.responseText);
			}
		}
		xhr.open('POST', '/contact');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(formValues));
	});
})();
