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

// define the underscore templates at a global level so we can access it in the render function and other functions
let allTripsTemplate;
let tripDetailsTemplate;

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

  // click event to get the details for a trip
  $('.trip').on('click', function(event) {
    console.log('in the trip click');

    // get the id of the trip you clicked on
    let tripId = $(this).attr('data-id')

    // fetch the trip details of the trip you clicked on from the api
    // the new attributes fetch sets for the model need to be access in a callback function
    let trip = tripList.get(tripId)
    trip.fetch({
      success: function(model) {

        console.log(model.attributes);

        // generate the HTML for the trip details
        let detailsHTML = tripDetailsTemplate(model.attributes)
        console.log(detailsHTML);

        // prepend the trip detail inside the trip-details article. Need to change classes as well to make foundation styling work
        $('#trip-table').addClass("large-5 column")
        $('#trip-details').addClass("large-5 column");
        $('#trip-details').empty();
        $('#trip-details').prepend(detailsHTML);

      } // function
    }); // fetch
  })
} // render

// function to show all the trips when the 'Explore our trips' button is clicked
const showAllTrips = function showAllTrips() {
  // get all the trips from the API
  // fetch will cause the update event to be triggered
  tripList.fetch();
  // Hide the button
  $(this).hide();
}

// function to show the trip details when a tr is clicked on
const showTripDetails = function showTripDetails() {
  console.log('got into the showTripDetails function!');

  alert('in the showTripDetails function')
} // showTripDetails

$(document).ready(() => {
    // make the underscore function to list all the trips
    allTripsTemplate = _.template($('#display-trips').html());

    // underscore function to display the trip details
    tripDetailsTemplate = _.template($('#trip-details-template').html());

    // get the trips from the api when the user clicks the 'Explore our trips!'.
    $('#get-trips').on('click', showAllTrips)

    // when we update tripList we will rerender the page
    tripList.on('update', render)


  }); // .ready
