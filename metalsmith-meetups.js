const ensureTreeExists = (obj, countryName, cityName) => {
  let country = obj.find(item => item.country === countryName);
  if (!country) {
    country = { country: countryName, cities: [] };
    obj.push(country);
  }

  let city = country.cities.find(item => item.city === cityName);
  if (!city) {
    city = { city: cityName, meetups: [] };
    country.cities.push(city);
  }
};

const sortMeetups = meetups => {
  meetups.sort((a, b) => {
    return a.country.localeCompare(b.country);
  })
  meetups.forEach(country => {
    country.cities.sort((a, b) => {
      return a.city.localeCompare(b.city);
    });

    country.cities.forEach(city => {
      city.meetups.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    });
  });
};

module.exports = function() {
  return function(files, metalsmith, done) {
    const meetups = Object.keys(files).filter(key => key.indexOf('meetups/') === 0);
    const parsedMeetups = [];
    const tags = new Set();

    meetups.forEach(key => {
      const meetup = files[key];

      ensureTreeExists(parsedMeetups, meetup.country, meetup.city);

      let country = parsedMeetups.find(item => item.country === meetup.country);
      let city = country.cities.find(item => item.city === meetup.city);
      city.meetups.push(meetup);

      if (meetup.tags) {
        meetup.tags.forEach(tag => tags.add(tag));
      }
    });

    sortMeetups(parsedMeetups);

    const metadata = metalsmith.metadata();
    metadata.meetups = parsedMeetups;
    metadata.tags = Array.from(tags);
    done();
  };
}
