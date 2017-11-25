// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

// Backbone Modules
import TripCollection from 'collections/trip_collection';

// ======================
// Global variables (sorry mom)
// ======================
const TRIP_FIELDS = ['name', 'category', 'continent', 'weeks', 'cost'];
const tripList = new TripCollection();


// ======================
// Underscore template management
// ======================
const TEMPLATES = {
  // Automatically find and compile all Underscore templates
  // Why isn't this built into Underscore? I don't know.
  compile() {
    $('script[type="text/template"]').each((index, element) => {
      // Dashes to camelCase - thanks SO
      // https://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
      let templateName = element.id.replace('-template', '')
        .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
      this[templateName] = _.template($(element).html());
    });
  }
};

// ======================
// Global status messages
// ======================
const reportStatus = function(status, message) {
  console.log(status);
  console.log(message);
  let generatedHTML = TEMPLATES.statusMessage({status: status, message: message});

  console.log("In report status, generated html is");
  console.log(generatedHTML);

  $('#status-messages ul').append(generatedHTML);

  $('#status-messages').show();
};

const clearStatus = function() {
  $('#status-messages ul').html('');
  $('#status-messages').hide();
};

// ======================
// Trip table management
// ======================
const buildTripTable = function() {
  // Populate table headers and filter fields
  const headerRow = $('#trip-table thead tr');
  const filterDropDown = $('#trip-table .filter select');
  TRIP_FIELDS.forEach((field) => {
    headerRow.append(TEMPLATES.tripTableHeader({ field: field }));
    filterDropDown.append(`<option value="${ field }">${ field }</option>`);
  });
};

const renderTripTable = function(tripList) {
  const tripTable = $('#trip-table tbody');
  tripTable.html('');

  tripList.forEach((trip) => {
    const generatedHTML = TEMPLATES.tripSummary({
      fields: TRIP_FIELDS,
      trip: trip
    });
    tripTable.append(generatedHTML);
  });
};

// ======================
// OK GO!!!!!
// ======================
$(document).ready( () => {
  // Compile all templates
  TEMPLATES.compile();

  // Register random one-off DOM event handlers
  $('#status-messages button.clear').on('click', clearStatus);

  buildTripTable();

  // Register event handlers on our trip list
  tripList.on('update', renderTripTable);

  // Start fetching trip data
  console.log('About to fetch data');
  console.log(tripList.url);

  tripList.fetch({
    success: (collection, response) => {
      console.log(`Successfully fetched ${collection.length} trips`);
    },
    error: (collection, response) => {
      if (response.readyState == 4) {
        console.log('Got regular type error');
        console.log(response);
        reportStatus('error', response.responseText);
      } else {
        console.log('Request did not complete round-trip! Networking error?');
        reportStatus('error', 'Could not connect to server');
      }
    }
  });
});
