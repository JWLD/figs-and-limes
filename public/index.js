;(function() {
  // show / hide scroll-to-top button
  var topBtn = document.getElementById('top-btn')

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      if (topBtn.classList.contains('shrink')) {
        topBtn.classList.remove('shrink')
      }
    } else {
      if (!topBtn.classList.contains('shrink')) {
        topBtn.classList.add('shrink')
      }
    }
  })

  // toggle mobile menu
  var mobileBtn = document.getElementById('mobile-btn')
  var mobileBtnClose = document.getElementById('mobile-btn-close')
  var mobileMenu = document.getElementById('mobile-menu')
  var mobileLinks = Array.from(document.getElementsByClassName('mobile-link'))

  mobileBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('hide')
  })

  mobileBtnClose.addEventListener('click', function() {
    mobileMenu.classList.add('hide')
  })

  mobileLinks.forEach(function(mobileLink) {
    mobileLink.addEventListener('click', function() {
      mobileMenu.classList.add('hide')
    })
  })

  // load video
  var videos = document.querySelectorAll('.video-wrap')

  Array.from(videos).forEach(video => {
    video.addEventListener('click', function(e) {
      const vidFrame = e.target.querySelector('iframe')
      vidFrame.classList.add('activate')

      setTimeout(() => {
        vidFrame.src =
          'https://www.youtube.com/embed/' +
          e.target.dataset.vid +
          '?autoplay=1'
      }, 500)
    })
  })

  // toggle contact form
  var toggleContactForm = function() {
    var formWrap = document.querySelector('#form-wrap')
    formWrap.classList.toggle('show-form')
  }

  var formToggles = document.querySelectorAll('.form-toggle')

  Array.from(formToggles).forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault()

      toggleContactForm(e)
    })
  })

  // send form
  document
    .querySelector('#contact-form')
    .addEventListener('submit', function(e) {
      e.preventDefault()

      var formValues = {}

      var formElements = Array.from(e.target.elements)
      formElements.forEach(
        input => (input.name ? (formValues[input.name] = input.value) : null)
      )

      var data = JSON.stringify(formValues)

      var xhr = new XMLHttpRequest()

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('Success', xhr.responseText)
        }
      }
      xhr.open('POST', '/contact')
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(formValues))

      toggleContactForm()
    })
})()
