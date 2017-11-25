import Backbone from 'backbone';

const Trip = Backbone.Model.extend({
  formFields: [
    {
      name: 'name',
      type: 'text',
    }, {
      name: 'category',
      type: 'text',
    }, {
      name: 'continent',
      type: 'select',
      values: ['Africa', 'Antartica', 'Asia', 'Australasia', 'Europe', 'North America', 'South America'],
    }, {
      name: 'weeks',
      type: 'number',
    }, {
      name: 'cost',
      type: 'number',
    }, {
      name: 'about',
      type: 'textarea',
    },
  ],
});

export default Trip;
