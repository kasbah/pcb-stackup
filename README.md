# pcb stackup

[![npm](https://img.shields.io/npm/v/pcb-stackup.svg?style=flat-square)](https://www.npmjs.com/package/pcb-stackup)
[![Travis](https://img.shields.io/travis/tracespace/pcb-stackup.svg?style=flat-square)](https://travis-ci.org/tracespace/pcb-stackup)
[![Coveralls](https://img.shields.io/coveralls/tracespace/pcb-stackup.svg?style=flat-square)](https://coveralls.io/github/tracespace/pcb-stackup)
[![David](https://img.shields.io/david/tracespace/pcb-stackup.svg?style=flat-square)](https://david-dm.org/tracespace/pcb-stackup)
[![David](https://img.shields.io/david/dev/tracespace/pcb-stackup.svg?style=flat-square)](https://david-dm.org/tracespace/pcb-stackup#info=devDependencies)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/pcb-stackup.svg)](https://saucelabs.com/u/pcb-stackup)

Generate beautiful, precise SVG renders of printed circuit boards given a set
of Gerber and drill files. Powered by
[gerber-to-svg](https://github.com/mcous/gerber-to-svg) and
[pcb-stackup-core](https://github.com/tracespace/pcb-stackup-core).

Install with:

```
$ npm install --save pcb-stackup
```

## example

![arduino-uno-top](https://cloud.githubusercontent.com/assets/2963448/16046141/5bfba2d2-3219-11e6-8131-92c769218d62.png)

1. `$ git clone https://github.com/tracespace/pcb-stackup`
2. `$ cd pcb-stackup && npm install`
3. `$ npm run example`

[The example script](./example/arduino.js) builds a render of the [Arduino
Uno](https://www.arduino.cc/en/Main/ArduinoBoardUno) PCB. Arduino Uno design
files copyright by Arduino and shared under the terms of a Creative Commons
Attribution Share-Alike license (https://www.arduino.cc/en/Main/FAQ).

## usage

This module is designed to work in Node or in the browser with Browserify or
Webpack. The  function takes three parameters: an array of layer objects an
optional settings object and a callback function.


``` javascript
var pcbStackup = require('pcb-stackup')
var fs = require('fs')

var fileNames = [
  'board-F.Cu.gtl',
  'board-F.Mask.gts',
  'board-F.SilkS.gto',
  'board-F.Paste.gtp',
  'board-B.Cu.gbl',
  'board-B.Mask.gbs',
  'board-B.SilkS.gbo',
  'board-B.Paste.gbp',
  'board-Edge.Cuts.gm1',
  'board.drl',
  'board-NPTH.drl'
]

var layers = fileNames.map(function (path) {
  return {gerber: fs.createReadStream(path), filename: path}
})

pcbStackup(layers, function (error, stackup) {
  if (error) {
    throw error
  }

  console.log(stackup.top.svg) // logs "<svg ... </svg>"
  console.log(stackup.bottom.svg) // logs "<svg ... </svg>"
})

```

### layers array

** TODO: update layers information **

The first parameter to the function is an array of layer objects. A layer
object is an object with a `type` key and a `converter` key, where `type` is a
Gerber filetype as output by
[whats-that-gerber](https://www.npmjs.com/package/whats-that-gerber) and
`converter` is the converter object returned by gerber-to-svg for that Gerber
file.

It is expected that the converters will have already finished before being
passed to `pcbStackup`. This can be done by listening for the converter's `end`
event or by using `gerber-to-svg` in callback mode, as shown in the example
above.

``` javascript
var topCopperLayer = {
  type: GERBER_FILE_TYPE,
  converter: FINISHED_GERBER_TO_SVG_CONVERTER
}
```

### options

** TODO: update options information **

The second parameter of the pcbStackup function is an options object. The only
required option is the `id` options. For ease, if no other options are being
specified, the id string may be passed as the second parameter directly.

``` javascript
// stackup 1 and 2 are equivalent
var stackup1 = pcbStackup(layers, 'my-unique-board-id')
var stackup2 = pcbStackup(layers, {id: 'my-unique-board-id'})
```

key             | default   | description
----------------|-----------|-----------------------------------------------------------
id              | N/A       | Unique board identifier
color           | see below | Colors to apply to the board render by layer type
maskWithOutline | false     | Use the board outline layer as a mask for the board shape

#### id

The board ID is a string that is prefixed to `id` and `class` attributes of the
internal nodes to the SVG documents. The IDs of any two stackups that may
appear on the same web-page must be unique to avoid id collisions and
potentially weird styling issues.

This option is required and the function will throw if it is missing.

#### color

The color object allows the user to override the default styling of the
stackup. It consists of layer identifiers as the keys and CSS colors as the
values. Any to all layers may be overridden. The default color object is:

``` javascript
var DEFAULT_COLOR = {
  fr4: '#666',
  cu: '#ccc',
  cf: '#c93',
  sm: 'rgba(0, 66, 0, 0.75)',
  ss: '#fff',
  sp: '#999',
  out: '#000'
}
```

The keys represent the following layers:

layer | component        
------|------------------
fr4   | Substrate
cu    | Copper
cf    | Copper (finished)
sm    | Soldermask
ss    | Silkscreen
sp    | Solderpaste
out   | Board outline

If a value is falsey (e.g. an empty string), the layer will not be added to the
style node. This is useful if you want to add styles with an external
stylesheet. If applying colors with an external stylesheet, use the following
classnames and specify the `color` attribute:

layer | classname   | example (id = 'my-board')
------|-------------|-------------------------------------------------
fr4   | id + `_fr4` | `.my-board_fr4 {color: #666;}`
cu    | id + `_cu`  | `.my-board_cu {color: #ccc;}`
cf    | id + `_cf`  | `.my-board_cf {color: #c93;}`
sm    | id + `_sm`  | `.my-board_sm {color: #rgba(0, 66, 0, 0.75);}`
ss    | id + `_ss`  | `.my-board_ss {color: #fff;}`
sp    | id + `_sp`  | `.my-board_sp {color: #999;}`
out   | id + `_out` | `.my-board_out {color: #000;}`

#### mask board shape with outline

When constructing the stackup, a "mechanical mask" is built and applied to the final image to remove the image wherever there are drill hits. If the `maskWithOutline` option is passed as true, the stackup function will also add the board outline to this mechanical mask, effectively (but not literally) using the outline layer as a [clipping path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath) for the final image.

`maskWithOutline` works best if the outline layer is one or more fully-enclosed loops. If your board outline is not working, please open an issue to see if we can improve the masking process.

### layer types

The stackup can be made up of the following layer types:

layer type               | abbreviation
-------------------------|--------------
top / bottom copper      | tcu / bcu
top / bottom soldermask  | tsm / bsm
top / bottom silkscreen  | tss / bss
top / bottom solderpaste | tsp / bsp
board outline            | out      
drill hits               | drl      

## developing and contributing

Clone and then `$ npm install`. Please accompany all PRs with applicable tests.
Please test your code in browsers, as Travis CI cannot run browser tests for
PRs.

### unit testing

This module uses [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/)
for unit testing, [Istanbul](https://github.com/gotwarlost/istanbul) for
coverage, and [ESLint](http://eslint.org/) for linting.

* `$ npm test` - run the tests, calculate coverage, and lint
* `$ npm run test:watch` - run the tests on code changes (does not lint nor cover)
* `$ npm run lint` - lint the code (will be run as a pre-commit script)

### integration testing

The integration tests run the example code on a variety of gerber files to
ensure proper interfacing with `gerber-to-svg` and proper rendering of
different stackups.

1. `$ npm run test:integration`
2. Open http://localhost:8001 in a browser

### browser testing

Browser tests are run with [Zuul](https://github.com/defunctzombie/zuul) and [Sauce Labs](https://saucelabs.com/opensauce/).

* `$ npm run test:browser` - run the unit tests in a local browser
* `$ npm run test:sauce` - run the units tests in several browsers using Open Sauce (Sauce Labs account and local
[.zuulrc](https://github.com/defunctzombie/zuul/wiki/Zuulrc) required)
<a name="pcbStackup"></a>

## pcbStackup(layers, options, done) ⇒ <code>any</code>
The pcb-stackup converter function.

**Kind**: global function  
**Returns**: <code>any</code> - - Whatever the last callback returned  

| Param | Type | Description |
| --- | --- | --- |
| layers | <code>string</code> | Array of layer objects |
| options | <code>string</code> | Options or a callback function |
| done | <code>string</code> | Array of layer objects |

