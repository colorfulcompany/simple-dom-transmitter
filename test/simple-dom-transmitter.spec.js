/* global describe, it */

import assert from 'power-assert'

import SimpleDOMTransmitter from '@/simple-dom-transmitter'

describe('SimpleDOMTransmitter', () => {
  describe('element is null', () => {
    it('throws ElementUndefined', () => {
      assert.throws(
        () => SimpleDOMTransmitter.init({ src: null }),
        { name: 'ElementUndefined' }
      )
    })
  })

  describe('element is Array', () => {
    it('not throws', () => {
      assert(SimpleDOMTransmitter.init({ src: [] }))
    })
  })
})
