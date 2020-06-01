# SimpleDOMTransmitter

A simple pattern for conveying events from one DOM element to the other

## 何をするものか

「『ある要素』の『何かのイベント』に対応して『何かする』」の書き方に新しいレールを作る。

## 使い方

 * SimpleDOMTransmitter を継承する
 * 継承した class に process() と handler() を定義して処理を記述する
 * 継承した class の run() と listen() を使って処理を開始する
    * 処理対象の要素はこれらのメソッドに src, target として与える
 * コード読み込み後すぐに動かしたいものは process() に定義して .run() で呼び出す
 * なんらかのイベントを待ちたい時は handler() に定義して .listen() で呼び出す

## デモの動かし方

 * git clone
 * yarn install
 * yarn run build
 * open examples/index.html

## 具体的なコード例

以下のような「処理対象」と「イベント」と「処理内容」が密結合したコードをやめて、

```javascript
$(selector).on(<event>, function(event) {
  ...
})
```

以下のような「処理対象の要素を特定するコード」と「処理を開始するためのコード」、および

```javascript
const backBtn = document.querySelector('#back-top-top')
const navBar = document.querySelector('.nav')

NavbarEventBindToButton.run({ src: navBar, target: backBtn })
HideBackButton.run({ src: backBtn })
HideBackButton.listen({ on: 'nav-is-back', src: backBtn })
ShowBackButton.listen({ on: 'nav-has-gone', src: backBtn })
BacktoTop.listen({ on: 'click', src: backBtn, target: window })
```

以下のような「処理を定義するコード」に分離する。

```javascript
class HideBackButton extends SimpleDOMTransmitter {
  hide () {
    this.target.style.display = 'none'
  }
  process () {
    this.hide()
  }
  handler () {
    this.hide()
  }
}
```

ここで大事なことは、process() や handler() およびそこから呼び出されるメソッドの中では最初に与える src か target 以外の要素に触れようとしないこと。あくまで処理対象の要素は最初に与えた二つだけにするというルールを守る。

## デモ

<a href="./examples/">ナビゲーションが隠れたら下に戻るボタンが出るデモ</a>

## 達成したいこと

上の制約によって

 * 複雑な処理を「二つの要素の関係性の組み合わせ」で記述することで一つ一つをシンプルに保つ
 * 処理の流れに適宜名前を付ける
 * 処理の中で他の要素を新たに呼ばない

を実現する。言い換えるとこの class は有名な SOLID の原則のうち、以下の二つを強制するものである。

 * Single Responsibility Principle
 * Dependency Inversion Principle

これらを守ることで、以下のようにコードリーディングを容易にする。

 * 最初にやりたいこと（意図）に名前が付くので目的を理解しやすい
 * 処理の流れを最後まで読まなくても最初に関係する要素が分かるので影響範囲を把握しやすい

この結果、

 * testability
 * reviewability
 * maintainnability

の三つを維持することを意図している。
