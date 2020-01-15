module.exports = {
    isPaired: false,

    fn: (href = '', isExternal = false, content = '') => (`
    <a href="${href}" ${isExternal ? 'target="_blank"' : ''} class="">
      ${ content}
    </a>
  `)
}
