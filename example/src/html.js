import React from 'react'

let styles
if (process.env.NODE_ENV === 'production') {
  try {
    styles = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

const Html = ({ headComponents, body, postBodyComponents }) => (
  <html>
    <head>
      { headComponents }
      { process.env.NODE_ENV === 'production'
        ? <style
          id='gatsby-inlined-css'
          dangerouslySetInnerHTML={{ __html: styles }}
        />
        : null
      }
    </head>
    <body>
      <div
        id='___gatsby'
        dangerouslySetInnerHTML={{ __html: body }}
      />
      { postBodyComponents }
    </body>
  </html>
)

export default Html
