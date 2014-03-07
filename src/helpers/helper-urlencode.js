module.exports.register = function(Handlebars, options) {

  // Customize this helper
  Handlebars.registerHelper('urlencode', function(str) {
    return escapeHtml(str);
  });

};

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}