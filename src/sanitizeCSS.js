import stripComments from 'strip-css-comments'

export default css => (
  stripComments(css, { preserve: false })
    .replace(/\n/g, '')
)
