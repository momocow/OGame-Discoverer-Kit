import jquery from 'jquery'

jquery.fn.extend({
  expectOne (this: JQuery) {
    if (this.length !== 1) {
    }
  }
})
