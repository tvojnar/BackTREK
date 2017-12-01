import Backbone from 'backbone';
import Trip from '../models/trip';

const TripList = Backbone.Collection.extend({
  model: Trip,
  url: 'https://ada-backtrek-api.herokuapp.com/trips',
  // default comparator so it sorts by name to start off
  comparator: name,
  filterData {
    console.log('in filterData');
    // TODO: add if/else to do differnt filters depending on what the input and option properties are
    if (this.option === 'continent') {
      filtered = this.filter(function(model) {
        console.log(`in filter! model: ${model}`);
        return model.get('continent').includes(input);
      }) // _filter
      // return a new collection that contains all the trips that passed the filter
      return new TripList(filtered);
    } // if 'continent'
  } // filterData,
  option: "", // start as an empty string
  input: "",  // start as an empty string
});

export default TripList;
