# Gatsby Plugin PurifyCSS
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
 [![npm version](https://badge.fury.io/js/gatsby-plugin-purify-css.svg)](https://badge.fury.io/js/gatsby-plugin-purify-css) [![dependencies Status](https://david-dm.org/rongierlach/gatsby-plugin-purify-css/status.svg)](https://david-dm.org/rongierlach/gatsby-plugin-purify-css) [![devDependencies Status](https://david-dm.org/rongierlach/gatsby-plugin-purify-css/dev-status.svg)](https://david-dm.org/rongierlach/gatsby-plugin-purify-css?type=dev)  
A [Gatsby](https://github.com/gatsbyjs/gatsby) post-build plugin that implements [PurifyCSS](https://github.com/purifycss/purifycss).  
Never worry about the size of your css framework again!  
It updates your html files directly, removing any unused inline styles.

## Install
`$ npm install gatsby-plugin-purify-css`

## Usage
In your `gatsby-config.js` file:
```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-purify-css'
      options: {
        purifyOptions: { /* ... */ }
      }
    }
  ]
}
```

## Options
PurifyCSS options are documented [here](https://github.com/purifycss/purifycss#the-optional-options-argument).
