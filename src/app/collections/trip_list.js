import Backbone from 'backbone';
import Trip from '../models/trip';

const TripList = Backbone.Collection.extend({
  model: Trip,
  url: 'https://ada-backtrek-api.herokuapp.com/trips',
  // default comparator so it sorts by name to start off
  comparator: name,
  // filterData is a collection method that I use to filter based on the input of the filter form (the data from the filter form is stored in filteredValues)
  filterData() {
    console.log('in filterData');
    // set filtered = to this (which is tripList) so that filtered list will be repeatedly filtered down if there are multiple attribute in filterValues
    let filtered = this;
    // only try to filter is there are key/value pairs in filterValues
    if (Object.keys(this.filterValues).length > 0 ) {
      for (var key in this.filterValues) {
        // if the key is one of these options filter for models whos attribute includes the string from the input form
        if (key === 'continent' || key === 'category'  || key === 'name') {
          // filtered will become equal to an array of all the models that passed the block passed to filter
          filtered = filtered.filter((model) => {
            console.log(`in filter for strings! model: ${model}`);
            return model.get(key).includes(this.filterValues[key]);
          }) // _filter
        } // if 'continent', 'name', or 'category'

        // if the key is one of these option filter the filtered array for models who have an attribute value that is less than or equal to the input value from the form
        if (key === 'weeks' || key === 'cost') {
          filtered = filtered.filter((model) => {
            console.log(`in filter for name/cost! model: ${model}`);
            return model.get(key) <= this.filterValues[key];
          }) // _filter
        } // if 'weeks', 'cost'
      } // for loop
    } // if filterValues is empty
    // return the final version of filtered, which is an array of all the models that passed ALL the filter options in filterValues
    return filtered;
  }, // filterData,
  // filterValues is a hash that has key/value pairs where the key is the option that was selected in the drop down in the filter form and the value is the value of the textbox in the filter form for that option. These key/value pairs are assigned in the keyup event and cleared when the clear filters button is clicked. 
  filterValues: {}, // set filter option
});

export default TripList;
