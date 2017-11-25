// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

// Backbone Modules
import TripCollection from 'collections/trip_collection';
import Reservation from 'models/reservation';

// "Views" (not quite views)
import StatusManager from 'elements/status_manager';
import ManagedForm from 'elements/managed_form';
import TEMPLATES from 'elements/underscore_templates';

// ======================
// Global variables (sorry mom)
// ======================
const TRIP_FIELDS = ['name', 'category', 'continent', 'weeks', 'cost'];
const tripList = new TripCollection();
let selectedTrip;
let statusManager;

// ======================
// Random helper functions
// ======================
const selectTrip = function(trip) {
  if (selectedTrip) {
    selectedTrip.set('selected', false);
  }
  trip.set('selected', true);
  selectedTrip = trip;
};

const tripSelected = function(trip) {
  return selectedTrip == trip;
};

const genericBackboneErrorHandler = function(target, response) {
  if (response.readyState == 4) {
    console.log('Got regular type error');
    console.log(response);
    statusManager.report('error', response.responseText);
  } else {
    console.log('Request did not complete round-trip! Networking error?');
    statusManager.report('error', 'Could not connect to server');
  }
}

// ======================
// Trip table management
// ======================
const buildTripTable = function() {
  // Populate table headers and filter fields
  const headerRow = $('#trip-table thead tr');
  const filterDropDown = $('#trip-table .filter select');
  TRIP_FIELDS.forEach((field) => {
    const header = $(TEMPLATES.tripTableHeader({ field: field }));
    header.on('click', function(event) {
      console.log(`Sorting by ${ field }`);
      tripList.comparator = field;
      tripList.sort();
    });
    headerRow.append(header);
    filterDropDown.append(`<option value="${ field }">${ field }</option>`);
  });
};

const renderTripTable = function(tripList) {
  const tripTable = $('#trip-table tbody');
  tripTable.html('');

  tripList.getFiltered().forEach((trip) => {
    const generatedHTML = $(TEMPLATES.tripSummary({
      fields: TRIP_FIELDS,
      trip: trip
    }));
    // dat closure doe
    generatedHTML.on('click', function(event) {
      selectTrip(trip);
      trip.fetch({
        success: renderTripDetails,
        error: genericBackboneErrorHandler
      });
      $('#trip-table tbody tr').removeClass('selected');
      $(this).addClass('selected');
    });
    tripTable.append(generatedHTML);
  });

  // Apply styling to the current sort field
  $('#trip-table th.sort').removeClass('selected');
  $(`#trip-table th.sort.${ tripList.comparator }`).addClass('selected');
};

const filterTrips = function(event) {
  console.log(`Filtering trips. Keycode is ${ event.keyCode }`);
  if (event.keyCode == 27) {
    // ESC key. Reset the filter.
    $('#trip-table .filter input').val('');
  }

  const field = $('#trip-table .filter-field').val();
  const value = $('#trip-table .filter input[name="filter-value"]').val();
  tripList.filter(field, value);
};

// ======================
// Trip details management
// ======================
const renderTripDetails = function(trip, element) {
  // There's a potential race condition here where two selections
  // come in quick succession, and the second gets handled before the first.
  if (!tripSelected(trip)) {
    return;
  }

  const generatedHTML = $(TEMPLATES.tripDetails({trip: trip}));

  const reservation = new Reservation({ tripId: trip.id });
  const form = new ManagedForm(reservation, statusManager, { submitText: 'Reserve'} );
  generatedHTML.find('.register').append(form.$el);
  $('#trip-details').html(generatedHTML);
  $('#trip-details').show();
};

// ======================
// OK GO!!!!!
// ======================
$(document).ready( () => {
  // Compile all templates
  TEMPLATES.compile();

  statusManager = new StatusManager($('#status-messages'));

  // Register random one-off DOM event handlers

  $('#trip-table tbody tr').on('click', renderTripDetails);
  $('#trip-table .filter input').on('keyup', filterTrips);
  $('#trip-table .filter-field').on('change', filterTrips);
  $('#trip-table .filter').on('submit', event => event.preventDefault());

  buildTripTable();

  // Register event handlers on our trip list
  tripList.on('update sort filter', renderTripTable);

  // Start fetching trip data
  console.log('About to fetch data');
  console.log(tripList.url);

  tripList.fetch({
    success: (collection, response) => {
      console.log(`Successfully fetched ${collection.length} trips`);
    },
    error: genericBackboneErrorHandler
  });
});
