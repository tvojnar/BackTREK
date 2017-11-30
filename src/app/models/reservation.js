import Backbone from 'backbone';

const Reservation = Backbone.Model.extend({
  // baseUrl: "https://ada-backtrek-api.herokuapp.com/trips/",
  // tripIdAttribute: this.get('trip_id'),
  //QUESTION: can I access trip_id in here and have it be differnt for each model? Or do I need to have a more complex function to set the url that takes an argument (the trip_id) and then I can set it for each instance of the model before I call .save()?
  urlRoot() {
    // QUESTION: how do I make 'this.trip_id' not be 'undefined'?
    return `https://ada-backtrek-api.herokuapp.com/trips/${this.get('trip_id')}/reservations`
  }, // urlRoot
});

export default Reservation
