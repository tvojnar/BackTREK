import $ from 'jquery';
import _ from 'underscore';

import TEMPLATES from 'elements/underscore_templates';

class ManagedForm {
  constructor(model, statusManager, options={}) {
    _.defaults(options, {
      submitText: 'Submit',
      successText: 'Successfully saved',
      formClass: '',
      formId: '',
    });
    this.model = model;
    this.collection = options.collection;
    this.statusManager = statusManager;

    options.fields = this.model.formFields;
    this.el = TEMPLATES.managedForm(options);
    this.$el = $(this.el);

    // Registering a submit handler should keep us around at least
    // as long as the form is in the DOM. Not sure how memory management
    // works once the DOM object is removed - I would expect that if
    // the form is only referenced from the event handler, we'll just
    // be gced, but I'm not sure.
    // TODO DPR: use the chrome heap snapshot feature to investigate
    this.$el.on('submit', this.submitHandler.bind(this));
  }

  submitHandler(event) {
    event.preventDefault();
    this.readData();
    if (this.model.isValid()) {
      // Client-side validations passed, send to server
      if (this.collection) {
        this.collection.add(this.model);
      }
      this.model.save({}, {
        error: this.errorHandler.bind(this),
        success: this.successHandler.bind(this)
      });
    } else {
      // Client-side validation failure
      this.handleValidationFailure();
    }
  }

  successHandler(model, response) {
    console.log('Successfully saved!');
    this.statusManager.report('success', `Successfully saved ${ model.name }`);
    this.resetModel();
    this.clearData();
  }

  errorHandler(model, response) {
    console.log('Failed to save!');
    if (this.collection) {
      this.collection.remove(model);
    }
    if (response.readyState == 4) {
      this.handleValidationFailure(response.responseJSON['errors']);
    } else {
      console.log('Something else happened - networking problem?');
      this.statusManager.report('error', 'Could not connect to server. Check your network.');
    }
  }

  resetModel() {
    // clone in case the model lives in a collection
    this.model = this.model.clone();
    this.model.formFields.forEach((field) => {
      this.model.unset(field.name);
    });
  }

  getInputElement(name) {
    return this.$el.find(`.form-input[name="${ name }"]`);
  }

  readData() {
    this.model.formFields.forEach((field) => {
      const value = this.getInputElement(field.name).val();
      this.model.set(field.name, value);
    });
  }

  clearData() {
    this.model.formFields.forEach((field) => {
      this.getInputElement(field.name).val('');
    });
    this.clearErrors();
  }

  clearErrors() {
    this.$el.find('.input-container').removeClass('error');
    this.$el.find('.error-message').remove();
  }

  handleValidationFailure(errors=null) {
    errors = errors || this.model.validationError;
    console.log('Handling validation errors');
    console.log(errors);

    this.clearErrors();

    for (let field in errors) {
      const container = this.$el.find(`.input-container.${ field }`);
      container.addClass('error');
      const errorElem = TEMPLATES.managedFormError({ problems: errors[field] });
      container.find('label').append(errorElem);
    }
  }
}

export default ManagedForm;
