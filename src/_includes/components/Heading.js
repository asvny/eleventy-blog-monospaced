module.exports = {
    isPaired: false,

    fn: (level = 'h1', title = '') => (`
    <h${level} class="">
      ${ title}
    </h${level}>
  `)
}
