var template = require('./template.marko');

module.exports = function (input, out) {
    // Just render the template to the provided output stream
    // using the provide template data...
    template.render(input, out);
};