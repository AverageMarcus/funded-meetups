(function() {
  var meetups = [].slice.apply(document.querySelectorAll('.meetup'));

  function search(searchTerm) {
    [].slice.call(document.querySelectorAll('[data-city],[data-country]')).forEach(function(node) {
      node.classList.add('hide');
    });

    meetups.forEach(function(meetup) {
      var title = meetup.querySelector('.meetup-title').innerText.trim().toLowerCase();
      var city = meetup.parentNode.parentNode.dataset['city'].toLowerCase();
      var country = meetup.parentNode.parentNode.parentNode.dataset['country'].toLowerCase();

      if (title.indexOf(searchTerm) >= 0 || city.indexOf(searchTerm) >= 0 || country.indexOf(searchTerm) >= 0) {
        meetup.classList.remove('hide');
      } else {
        meetup.classList.add('hide');
      }
    });

    [].slice.call(document.querySelectorAll('[data-city],[data-country]')).forEach(function(node) {
      if (node.querySelector('.meetup:not(.hide)')) {
        node.classList.remove('hide')
      }
    });
  }

  function clearSearch() {
    [].slice.call(document.querySelectorAll('[data-city],[data-country],.meetup')).forEach(function(node) {
      node.classList.remove('hide')
    });
  }

  document.querySelector('.search input[type="text"]').addEventListener('keyup', function(event) {
    var searchTerm = this.value.toLowerCase();
    if (searchTerm) {
      search(searchTerm);
      window.location.hash = searchTerm;
    } else {
      clearSearch();
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  });

  if (window.location.hash.substring(1)) {
    search(window.location.hash.substring(1).toLowerCase());
    document.querySelector('.search input[type="text"]').value = window.location.hash.substring(1);
  }
}());
