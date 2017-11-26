import $ from 'jquery';
import _ from 'underscore';

// ======================
// Underscore template management
// ======================
const TEMPLATES = {
  // Automatically find and compile all Underscore templates
  // Why isn't this built into Underscore? I don't know.
  compile() {
    $('script[type="text/template"]').each((index, element) => {
      // Dashes to camelCase - thanks SO
      // https://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
      let templateName = element.id.replace('-template', '')
        .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

      console.debug(`Converting template ${ element.id } to generator ${ templateName }`);
      this[templateName] = _.template($(element).html());
    });
  }
};

// Since this is linked from app.js, this code is bound
// first, which means the handler will be run first
$(document).ready(() => {
  TEMPLATES.compile();
});

export default TEMPLATES;
