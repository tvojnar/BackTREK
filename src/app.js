// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

// collections
import TripList from 'app/collections/trip_list';


// create the tripList to store the trips we access from the API
const tripList = new TripList();

// define the allTripsTemplate at a global level so we can access it in the render function
let allTripsTemplate;

// define a render function to call when tripList is updated or sorted
const render = function render(tripList) {
  // select the tbody element to append to
  const tripListElement = $('#trip-list')

  // empty the tbody before rendering
  tripListElement.empty();

  // make a tr for each trip
  tripList.forEach((trip) => {
    // use the underscore function to generate HTML for each trip
    let tripHTML = allTripsTemplate(trip.attributes);
    // append the tr with HTML for each trip to the tbody
    tripListElement.append($(tripHTML));
  }) // forEach
} // render


$(document).ready(() => {
    // make the underscore function to list all the trips
    console.log('in .ready!');
    allTripsTemplate = _.template($('#display-trips').html());

    // get the trips from the api. This will cause the update event to be triggered
    tripList.fetch();

    // when we update tripList we will rerender the page
    tripList.on('update', render)
  }); // .ready
