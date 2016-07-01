<a name="module_pcb-stackup"></a>

## pcb-stackup
PCB Stackup


* [pcb-stackup](#module_pcb-stackup)
    * [module.exports(layers, [options], done)](#exp_module_pcb-stackup--module.exports) ⇒ <code>any</code> ⏏
        * [~Layer](#module_pcb-stackup--module.exports..Layer) : <code>Object</code>
        * [~Callback](#module_pcb-stackup--module.exports..Callback) : <code>function</code>
        * [~Stackup](#module_pcb-stackup--module.exports..Stackup) : <code>Object</code>

<a name="exp_module_pcb-stackup--module.exports"></a>

### module.exports(layers, [options], done) ⇒ <code>any</code> ⏏
The pcb-stackup converter function.

**Kind**: Exported function  
**Returns**: <code>any</code> - Whatever the "done" callback returns  

| Param | Type | Description |
| --- | --- | --- |
| layers | <code>array.&lt;Layer&gt;</code> | Array of layer objects |
| [options] | <code>Options</code> | Optional options, see [pcb-stackup-core-docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#options) |
| done | <code>Callback</code> | Callback function |

<a name="module_pcb-stackup--module.exports..Layer"></a>

#### module.exports~Layer : <code>Object</code>
**Kind**: inner typedef of <code>[module.exports](#exp_module_pcb-stackup--module.exports)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| gerber | <code>string</code> &#124; <code>NodeJS.ReadableStream</code> | The gerber data |
| filename | <code>string</code> | The filename so we can try and identify the type of the layer |
| layerType | <code>string</code> | The layer type, a valid layer type as given by [whats-that-gerber](https://github.com/tracespace/whats-that-gerber#layer-types-and-names) |

<a name="module_pcb-stackup--module.exports..Callback"></a>

#### module.exports~Callback : <code>function</code>
**Kind**: inner typedef of <code>[module.exports](#exp_module_pcb-stackup--module.exports)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error if something goes wrong |
| stackup | <code>Stackup</code> | The stackup data |

<a name="module_pcb-stackup--module.exports..Stackup"></a>

#### module.exports~Stackup : <code>Object</code>
**Kind**: inner typedef of <code>[module.exports](#exp_module_pcb-stackup--module.exports)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| top | <code>Object</code> | The top view SVG object, see [pcb-stackup-core docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#usage) for full details |
| top.svg | <code>string</code> | The top SVG string |
| bottom | <code>Object</code> | The bottom view SVG object, see [pcb-stackup-core docs](https://github.com/tracespace/pcb-stackup-core/blob/master/README.md#usage) for full details |
| bottom.svg | <code>string</code> | The bottom SVG string |
| layers | <code>Array.&lt;Layer&gt;</code> | A cache of the processed layers that you can pass back to pcbStackup |

