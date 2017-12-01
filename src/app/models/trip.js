import Backbone from 'backbone'

const Trip = Backbone.Model.extend({
  // NOTE: if I put this url is then the fetch() doesn't work to get the trip details, but it makes it so the 'update' action isn't run when I add a trip to tripList right before I save a new trip ...
  // use urlRoot instead
  // url: 'https://ada-backtrek-api.herokuapp.com/trips',
  validate(attributes) {
    const errors = {};

    if (!attributes.name) {
      errors.name = ['cannot be blank'];
    }

    if (!attributes.continent) {
      errors.continent = ['cannot be blank'];
    }

    if (!attributes.category) {
      errors.category = ['cannot be blank'];
    }

    if (!attributes.about) {
      errors.about = ['cannot be blank'];
    }

    if (!attributes.weeks) {
      errors.weeks = ['cannot be blank'];
    }

    if (!attributes.cost) {
      errors.cost = ['cannot be blank'];
    }

    if (Object.keys(errors).length < 1) {
      return false;
    }
    return errors;
  } // validate
});

export default Trip;
