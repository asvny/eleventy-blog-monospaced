const glob = require('glob');
const path = require('path');

const shortcodes = {};

glob.sync(path.join(__dirname, '../src/_includes/components/*.js')).forEach(function (file) {
    let shortcode = file.split("/").slice(-1).join().split(".").shift();
    let shortcodeFile = require(path.resolve(file));

    shortcodes[shortcode] = shortcodeFile;
});

module.exports = shortcodes;