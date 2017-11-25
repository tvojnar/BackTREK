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
    return `http://localhost:3000/trips/${ this.get('tripId') }/reservations`;
  }
});

export default Reservation;
