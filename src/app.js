// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

const TRIP_FIELDS = ['name', 'category', 'continent', 'weeks', 'budget']

$(document).ready( () => {
  // Populate table headers and filter fields
  const headerRow = $('#trip-table thead tr');
  const filterDropDown = $('#trip-table .filter select');
  TRIP_FIELDS.forEach((field) => {
    headerRow.append(`<th>${ field }</th>`);
    filterDropDown.append(`<option value="${ field }">${ field }</option>`);
  });


});
