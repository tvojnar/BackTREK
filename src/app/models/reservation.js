import Backbone from 'backbone';

const Reservation = Backbone.Model.extend({
  baseUrl: "https://ada-backtrek-api.herokuapp.com/trips/",
  url: function() {
    return this.baseUrl + this.trip_id + "reservations";
  }, // url
});

export default Reservation
