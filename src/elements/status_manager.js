import $ from 'jquery';

import TEMPLATES from 'elements/underscore_templates';

// ======================
// Global status messages
// ======================
class StatusManager {
  constructor(element) {
    this.element = $(element);
    this.element.find('button.clear').on('click', this.clear.bind(this));
  }
  report(status, message) {
    console.debug(`Reporting ${ status } message: ${ message }`);
    let generatedHTML = TEMPLATES.statusMessage({status: status, message: message});

    this.element.find('ul').append(generatedHTML);
    this.element.show();
  }
  clear() {
    this.element.find('ul').html('');
    this.element.hide();
  }
};

export default StatusManager;
