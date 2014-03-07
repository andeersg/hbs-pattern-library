/**
 * http://stackoverflow.com/a/19023007/437385
 *
 * Code from this comment.
 */

var glob = require('glob');
var fs = require('fs');
var yamlFront = require('yaml-front-matter');

module.exports.register = function(Handlebars, options) {

  // Customize this helper
  Handlebars.registerHelper('md-posts', function(str, options) {

    var files = glob.sync(str);
    var out = '';
    var context = {};
    var data = null;
    var template = null;

    var _i;
    for(_i = 0; _i < files.length; _i++) {
      data = yamlFront.loadFront(fs.readFileSync(files[_i]), 'src');

      template = Handlebars.compile(data.src); // Compile the source

      context = data; // Copy front matter data to Handlebars context
      context.file = files[_i].replace('.hbs', '').replace('src/patterns/', '');
      context.body = template(data); // render template

      out += options.fn(context);
    }

    return out;
  });

};