import Backbone from 'backbone';
import Trip from 'models/trip';

const TripCollection = Backbone.Collection.extend({
  model: Trip,
  url: 'http://localhost:3000/trips/',
  TEXT_FIELDS: ['name', 'category', 'continent'],
  NUMERIC_FIELDS: ['weeks', 'cost'],

  filter(field, value) {
    this.filterField = field;
    if (this.TEXT_FIELDS.includes(field)) {
      this.filterValue = value.toLowerCase();
    } else if (this.NUMERIC_FIELDS.includes(field)) {
      this.filterValue = parseFloat(value);
    } else {
      // Shouldn't be possible with current UI design
      throw `Invalid filter field ${ this.filterField }`;
    }
    this.trigger('filter', this);
  },

  getFiltered() {
    // Perf is exceptionally important here, since this runs every keystroke
    // It was pretty snappy on my machine with only 30 trips, but YMMV.
    // Things to look into if perf is an issue:
    //   - cache lowercase / integer versions of fields on models
    //   - track state between filters - if they previously filtered for
    //       'abc' and now for 'abcd', only look in the previous results
    //   - track whether we've got a numeric or text filter
    //       (avoid the strcmp of includes)
    if (!this.filterField || !this.filterValue) {
      return this;
    }

    if (this.TEXT_FIELDS.includes(this.filterField)) {
      return this.select((trip) => {
        return trip.get(this.filterField).toLowerCase().includes(this.filterValue);
      });
    } else if (this.NUMERIC_FIELDS.includes(this.filterField)) {
      return this.select((trip) => {
        // console.log(`${ trip.get(this.filterField) } ${ parseFloat(trip.get(this.))}`);
        return parseFloat(trip.get(this.filterField)) <= this.filterValue;
      });
    }
    // how did we get here?
    throw `Invalid filter field ${ this.filterField }`;
  }
});

export default TripCollection;
