const Metalsmith = require('metalsmith');
const inplace = require('metalsmith-in-place');
const Handlebars = require('handlebars');
const meetups = require('./metalsmith-meetups');

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Funded Meetups',
      description: 'A collection of meetups offering support with speaker expenses'
    }
  })
  .use(meetups())
  .use(inplace({
    engine: 'handlebars'
  }))
  .build(function(err) {
    if (err) throw err;
  });
