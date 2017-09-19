# Gatsby Plugin Uncss
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
 [![npm version](https://badge.fury.io/js/gatsby-plugin-uncss.svg)](https://badge.fury.io/js/gatsby-plugin-uncss) [![dependencies Status](https://david-dm.org/rongierlach/gatsby-plugin-uncss/status.svg)](https://david-dm.org/rongierlach/gatsby-plugin-uncss) [![devDependencies Status](https://david-dm.org/rongierlach/gatsby-plugin-uncss/dev-status.svg)](https://david-dm.org/rongierlach/gatsby-plugin-uncss?type=dev)  
A [Gatsby](https://github.com/gatsbyjs/gatsby) post-build plugin that implements [Uncss](https://github.com/giakki/uncss).  
Never worry about the size of your css framework again!  
It updates your html files directly, removing any unused inline styles.

## Install
`$ npm install gatsby-plugin-uncss`

## Usage
In your `gatsby-config.js` file:
```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-uncss'
      options: {
        uncssOptions: { /* ... */ }
      }
    }
  ]
}
```

## Options
Uncss options are documented [here](https://github.com/giakki/uncss#within-nodejs).
