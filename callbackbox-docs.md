# callbackbox.module.node.js API documentation

<!-- div class="toc-container" -->

<!-- div -->

## `callbackbox`
* <a href="#callbackbox-aug">`callbackbox.aug`</a>
* <a href="#callbackbox-augBulk">`callbackbox.augBulk`</a>
* <a href="#callbackbox-con">`callbackbox.con`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `callbackbox`

<!-- div -->

### <a id="callbackbox-aug"></a>`callbackbox.aug(inObj, newAs, cb)`
<a href="#callbackbox-aug">#</a> [&#x24C8;](/#L26 "View in source") [&#x24C9;][1]

Creates a function that augments `inObj` with a new property (named with `newAs`) that is the result of callback. On an error, it logs the error to the console and passes the error to the callback.

#### Arguments
1. `inObj` *(object)*: - The current object
2. `newAs` *(string)*: - The name of the property which the new values will be stored. Anything already in that property will be overwritten.
3. `cb` *(function)*: - Error-first callback. The second argument will be inObj with an additional property *(`newAs`)*

#### Example
```js
var
 myObj = { someInformation : 123 };
 
fs.readFile('someText.txt',callbackbox.aug(myObj, 'textfile', function(err,values) {
 if (err) { throw err; } else {
   console.log(values); //will log { someInformation : 123, textfile '...' }
 }
}));
```
* * *

<!-- /div -->

<!-- div -->

### <a id="callbackbox-augBulk"></a>`callbackbox.augBulk(inObj, newAsArray, cb)`
<a href="#callbackbox-augBulk">#</a> [&#x24C8;](/#L66 "View in source") [&#x24C9;][1]

Works similarly to `callbackbox.aug` but with bulk responses / arrays.

#### Arguments
1. `inObj` *(object)*: - The current object
2. `newAsArray` *(string)*: - An array of arrays. Each sub-array should be a pair with the first element being the index of the element you want to access in the result and the second element being the property name in the new returned object
3. `cb` *(function)*: - Error-first callback. The second argument will be inObj with an additional properties

#### Example
```js
var
 myObj = { someInformation : 123 };
 
function bulkExample() { ... returns something like (null, ['volvo','blue','2014'])}

bulkExample(callbackbox.augBulk(inObj,[
 [0,'make'],
 [1,'colour'],
 [2,'year']
],function(err,newValues) {
 if (err) { throw err; } else {
   console.log(newValues); // { make : 'volvo', colour : 'blue', year : '2014' }
 }
});
```
* * *

<!-- /div -->

<!-- div -->

### <a id="callbackbox-con"></a>`callbackbox.con(inObj, cb)`
<a href="#callbackbox-con">#</a> [&#x24C8;](/#L92 "View in source") [&#x24C9;][1]

Simple factory that produces a callback that passes `inObj` without modification. Pass `cb` the error and log on failure.

#### Arguments
1. `inObj` *(object)*: - The current object
2. `cb` *(function)*: - Error-first callback.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #callbackbox "Jump back to the TOC."
