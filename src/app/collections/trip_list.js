import Backbone from 'backbone';
import Trip from '../models/trip';

const TripList = Backbone.Collection.extend({
  model: Trip,
  url: 'https://ada-backtrek-api.herokuapp.com/trips',
  // default comparator so it sorts by name to start off
  comparator: name,
  filterData() {
    console.log('in filterData');
    let filtered = this;
    // TODO: add if/else to do differnt filters depending on what the input and option properties are
    if (Object.keys(this.filterValues).length > 0 ) {
      for (var key in this.filterValues) {
        if (key === 'continent' || key === 'category'  || key === 'name') {
          filtered = filtered.filter((model) => {
            console.log(`in filter! model: ${model}`);
            return model.get(key).includes(this.filterValues[key]);
          }) // _filter
        } // if 'continent', 'name', or 'category'
      } // for loop
    } // if filterValues is empty
    return filtered;
  }, // filterData,
  filterValues: {}, // set filter option
});

export default TripList;
