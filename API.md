## Functions

<dl>
<dt><a href="#pcbStackup">pcbStackup(layers, [options], done)</a> ⇒ <code>any</code></dt>
<dd><p>The pcb-stackup converter function.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Layer">Layer</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Done">Done</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#Stackup">Stackup</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="pcbStackup"></a>

## pcbStackup(layers, [options], done) ⇒ <code>any</code>
The pcb-stackup converter function.

**Kind**: global function  
**Returns**: <code>any</code> - Whatever the "done" callback returns.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| layers | <code>[array.&lt;Layer&gt;](#Layer)</code> |  | Array of layer objects |
| [options] | <code>Options</code> | <code>{id: shortId.generate()}</code> | Optional options, see [pcb-stackup-core-docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#options). |
| done | <code>[Done](#Done)</code> |  | Callback function. |

<a name="Layer"></a>

## Layer : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| gerber | <code>string</code> &#124; <code>NodeJS.ReadableStream</code> | The gerber data as a string or [ReadableStream](https://nodejs.org/api/stream.html#stream_readable_streams) |
| filename | <code>string</code> | The filename so we can try and identify the type of the layer. You either have to provide this or the layerType. |
| layerType | <code>string</code> | The layer type, a valid layer type as given by [whats-that-gerber](https://github.com/tracespace/whats-that-gerber#layer-types-and-names). |

<a name="Done"></a>

## Done : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error if something goes wrong. |
| stackup | <code>[Stackup](#Stackup)</code> | The stackup data. |

<a name="Stackup"></a>

## Stackup : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| top | <code>object</code> | The top view SVG object, see [pcb-stackup-core docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#usage) for full details. |
| top.svg | <code>string</code> | The top SVG string. |
| bottom | <code>object</code> | The bottom view SVG object, see [pcb-stackup-core docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#usage) for full details. |
| bottom.svg | <code>string</code> | The bottom SVG string. |
| layers | <code>[Array.&lt;Layer&gt;](#Layer)</code> | A cache of the processed layers that can be passed back to pcbStackup. |

