const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

const filters = require('./filters');
const shortcodes = require('./shortcodes');

module.exports = function (eleventyConfig) {
    // Filters
    Object.keys(filters).forEach(filterName => {
        eleventyConfig.addFilter(filterName, filters[filterName]);
    });

    // Shortcodes
    Object.keys(shortcodes).forEach(shortcodeName => {
        let val = shortcodes[shortcodeName];
        let fn = val.isPaired ? 'addPairedShortcode' : 'addShortcode';
        eleventyConfig[fn](shortcodeName, val.fn);
    });

    // Plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(lazyImagesPlugin);

    // Collections
    const livePosts = post => post.date <= new Date() && !post.data.draft;
    eleventyConfig.addCollection('posts', collection => {
        return collection.getFilteredByGlob('**/posts/*.md').filter(livePosts).reverse();
    });

    // Transforms
    eleventyConfig.addTransform('htmlmin', filters.htmlmin);

    eleventyConfig
        .addPassthroughCopy('src/assets')
        .addPassthroughCopy('src/manifest.json')
        .addPassthroughCopy('src/_redirects');

    return {
        templateFormats: ['njk', 'md', 'html', '11ty.js'],
        dir: {
            input: 'src',
            includes: '_includes',
            data: '_data',
            output: 'www',
        },
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        passthroughFileCopy: true,
    };
};


