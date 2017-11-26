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

  validate: function(attributes) {
    const errors = {};

    if (!attributes.name) {
      errors.name = ['can\'t be blank'];
    }

    if (!attributes.email) {
      errors.email = ['can\'t be blank'];
    }

    // Return false if it's valid,
    // or something truthy (i.e. the errors) if it's not valid
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return false;
    }
  }
});

export default Reservation;
