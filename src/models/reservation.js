import Backbone from 'backbone';

const Reservation = Backbone.Model.extend({
  // Blegh. Guess this has to be encoded somewhere
  formFields: [
    {
      name: 'name',
      type: 'text',
    }, {
      name: 'age',
      type: 'number',
    }, {
      name: 'email',
      type: 'text',
    }
  ],

  urlRoot: function() {
    const tripId = this.get('tripId');
    if (isNaN(tripId)) {
      throw 'Cannot make a reservation w/o trip ID';
    }
    return `http://localhost:3000/trips/${ tripId }/reservations`;
  },

  validate: function() {

  }
});

export default Reservation;
