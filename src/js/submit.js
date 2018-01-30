
(function() {
  document.querySelector('.new-meetup input[type=submit]').addEventListener('click', function(event) {
    event.preventDefault();

    var body = '---\n';
    var name = '';
    [].slice.apply(document.querySelectorAll('.new-meetup label input,.new-meetup label textarea')).forEach(function(node) {
      if (node.name === 'tags') {
        var tags = node.value.split(',');
        body += node.name + ':\n';
        tags.forEach(function(tag) {
          tag = tag.trim();
          if (tag) {
            body += ' - ' + tag + '\n';
          }
        });
      } else {
        if (node.name === 'name' ) {
          name = node.value.replace(/ /g, '');
        }
        body += node.name + ': ' + node.value + '\n';
      }
    });
    body += '---';
    body = body.replace(/\n/g, '%0A');
    window.location = 'https://github.com/AverageMarcus/funded-meetups/new/master/src/meetups/' + name + '.md?filename=' + name + '.md&value=' + body + '&message=Added ' + name;
  });
}());
