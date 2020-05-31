class ElementUndefined extends Error {
  get name () { return 'ElementUndefined' }
}
class NotImplemented extends Error {
  get name () { return 'NotImplemented' }
}

/**
 * 一つあるいは複数の要素の関係する単純な flip や reaction の類のコードにパターンを与えるクラス
 *
 * 使用例
 *
 * 1. ある要素のあるイベントに応じて他の要素に変更を加える
 *     * 同じく、自身に変更を加える
 * 2. DOMを読み込んだら特定の要素の特定の値を読み取って他の要素に変更を加える
 *     * 同じく、自身に変更を加える
 *
 * このクラスを継承してロジックを書く。内容は以下の通り。
 *  a) init を override する
 *  b) 目的に応じて handler() / process()  を定義
 *  c) event に対応する場合は static listen() を利用して初期化
 *     event がない場合は static run() を利用して即時に実行
 *
 * このクラスはロジックを担うものであり、継承したクラスも export する
 * ことが前提であり、entry point で即時実行してはならない。即時実行す
 * るとテストが難しくなってしまう。
 */
class SimpleDOMTransmitter {
  /**
   * @param {object} args
   * @param {object} args.src
   * @param {object} args.target
   */
  constructor ({ src, target = undefined }) {
    this._src = src
    this._target = target || src

    if (!this._src) throw new ElementUndefined(`src element is ${this._src}`)
  }

  /**
   * @return {object}
   */
  get src () {
    return this._src
  }

  /**
   * @return {object}
   */
  get target () {
    return this._target
  }

  /**
   * @param {Function} callback
   * @return {object}
   */
  static extend (callback) {
    return callback.call(this)
  }

  /**
   * @param {object} child
   * @return {object}
   */
  static bless (child) {
    child.prototype = Object.create(this.prototype)
    child.prototype.constructor = child
    child.init = this.init
    child.listen = this.listen
    child.run = this.run

    return child
  }

  /**
   * @param {object} args
   * @param {object} args.src
   * @param {object} args.target
   * @return {object}
   */
  static init ({ src, target = undefined }) {
    return new this({ src, target })
  }

  /**
   * @param {object} args
   * @param {string} args.on
   * @param {object} args.src
   * @param {object} args.target
   * @return {object}
   */
  static listen ({ on, src, target = undefined }) {
    const transmitter = this.init({ src, target })
    transmitter.on(on, transmitter.handler.bind(transmitter))

    return transmitter
  }

  /**
   * @param {object} args
   * @param {object} args.src
   * @param {object} args.target
   * @return {object}
   */
  static run ({ src, target = undefined }) {
    const transmitter = this.init({ src, target })
    transmitter.process(transmitter.src)

    return transmitter
  }

  /**
   * @param {object} src
   */
  process (src) {
    throw new NotImplemented()
  }

  /**
   * @param {object} event
   */
  handler (event) {
    throw new NotImplemented()
  }

  /**
   * @param {string} event
   * @param {Function} func
   * @return {void}
   */
  on (event, func) {
    if (this.src.forEach instanceof Function) {
      this.src.forEach((e) => {
        e.addEventListener(event, func)
      })
    } else {
      this.src.addEventListener(event, func)
    }
  }
}

export default SimpleDOMTransmitter
