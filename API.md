<a name="module_pcb-stackup"></a>

## pcb-stackup
PCB Stackup


* [pcb-stackup](#module_pcb-stackup)
    * [~pcbStackup(layers, [options], done)](#module_pcb-stackup..pcbStackup) ⇒ <code>any</code>
    * [~Layer](#module_pcb-stackup..Layer) : <code>Object</code>
    * [~Callback](#module_pcb-stackup..Callback) : <code>function</code>
    * [~Stackup](#module_pcb-stackup..Stackup) : <code>Object</code>

<a name="module_pcb-stackup..pcbStackup"></a>

### pcb-stackup~pcbStackup(layers, [options], done) ⇒ <code>any</code>
The pcb-stackup converter function.

**Kind**: inner method of <code>[pcb-stackup](#module_pcb-stackup)</code>  
**Returns**: <code>any</code> - Whatever the "done" callback returns  

| Param | Type | Description |
| --- | --- | --- |
| layers | <code>array.&lt;Layer&gt;</code> | Array of layer objects |
| [options] | <code>Options</code> | Optional options, see [pcb-stackup-core-docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#options) |
| done | <code>Callback</code> | Callback function |

<a name="module_pcb-stackup..Layer"></a>

### pcb-stackup~Layer : <code>Object</code>
**Kind**: inner typedef of <code>[pcb-stackup](#module_pcb-stackup)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| gerber | <code>string</code> &#124; <code>NodeJS.ReadableStream</code> | The gerber data |
| filename | <code>string</code> | The filename so we can try and identify the type of the layer |
| layerType | <code>string</code> | The layer type, a valid layer type as given by [whats-that-gerber](https://github.com/tracespace/whats-that-gerber#layer-types-and-names) |

<a name="module_pcb-stackup..Callback"></a>

### pcb-stackup~Callback : <code>function</code>
**Kind**: inner typedef of <code>[pcb-stackup](#module_pcb-stackup)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error if something goes wrong |
| stackup | <code>Stackup</code> | The stackup data |

<a name="module_pcb-stackup..Stackup"></a>

### pcb-stackup~Stackup : <code>Object</code>
**Kind**: inner typedef of <code>[pcb-stackup](#module_pcb-stackup)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| top | <code>Object</code> | The top view SVG object, see [pcb-stackup-core docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#usage) for full details |
| top.svg | <code>string</code> | The top SVG string |
| bottom | <code>Object</code> | The bottom view SVG object, see [pcb-stackup-core docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#usage) for full details |
| bottom.svg | <code>string</code> | The bottom SVG string |
| layers | <code>Array.&lt;Layer&gt;</code> | A cache of the processed layers that you can pass back to pcbStackup |

