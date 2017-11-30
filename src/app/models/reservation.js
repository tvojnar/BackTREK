import Backbone from 'backbone';

const Reservation = Backbone.Model.extend({
  baseUrl: "https://ada-backtrek-api.herokuapp.com/trips/",
  url: function() {
    // QUESTION: how do I make 'this.trip_id' not be 'undefined'?
    return this.baseUrl + this.trip_id + "reservations";
  }, // url
});

export default Reservation
