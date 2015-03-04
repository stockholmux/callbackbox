var
  callbackbox = {};

/**
 * Creates a function that augments `inObj` with a new property (named with `newAs`) that is the result of callback. On an error, it logs the error to the console and passes the error to the callback.
 *
 * @static
 * @memberOf callbackbox
 * @param {object} inObj - The current object
 * @param {string} newAs - The name of the property which the new values will be stored. Anything already in that property will be overwritten.
 * @param {function} cb - Error-first callback. The second argument will be inObj with an additional property (`newAs`)
 * @returns function
 *
 * @example
 *
 * var
 *  myObj = { someInformation : 123 };
 *  
 * fs.readFile('someText.txt',callbackbox.aug(myObj, 'textfile', function(err,values) {
 *  if (err) { throw err; } else {
 *    console.log(values); //will log { someInformation : 123, textfile '...' }
 *  }
 * }));
 *
 */
function aug(inObj,newAs,cb) {
  return function(err,values) {
    if (err) {
      console.error('err @',newAs);
      console.info(inObj);
      cb(err);
    } else {
      inObj[newAs] = values;
      cb(err,inObj);
    }
  }
}

/**
 * Works similarly to `callbackbox.aug` but with bulk responses / arrays.
 *
 * @static
 * @memberOf callbackbox
 * @param {object} inObj - The current object
 * @param {string} newAsArray - An array of arrays. Each sub-array should be a pair with the first element being the index of the element you want to access in the result and the second element being the property name in the new returned object
 * @param {function} cb - Error-first callback. The second argument will be inObj with an additional properties
 * @returns function
 *
 * @example
 * var
 *  myObj = { someInformation : 123 };
 *  
 * function bulkExample() { ... returns something like (null, ['volvo','blue','2014'])}
 *
 * bulkExample(callbackbox.augBulk(inObj,[
 *  [0,'make'],
 *  [1,'colour'],
 *  [2,'year']
 * ],function(err,newValues) {
 *  if (err) { throw err; } else {
 *    console.log(newValues); // { make : 'volvo', colour : 'blue', year : '2014' }
 *  }
 * });
 *
 */
function augBulk(inObj,newAsArray,cb) {
  return function(err,values) {
    if (err) {
      console.error('err @',newAsArray);
      console.info(inObj);
      cb(err);
    } else {
      newAsArray.forEach(function(aDestinationArr) {
        inObj[aDestinationArr[1]] = values[aDestinationArr[0]]
      })

      cb(err,inObj);
    }
  }
}

/**
 * Simple factory that produces a callback that passes `inObj` without modification. Pass `cb` the error and log on failure.
 *
 * @static
 * @memberOf callbackbox
 * @param {object} inObj - The current object
 * @param {function} cb - Error-first callback.
 * @returns function
 *
 */
function con(inObj,cb) {
  return function(err) {
    if (err) {
      console.error('err',err);
      console.info(inObj);
    } else {
      cb(err,inObj)
    }
  }
}

callbackbox.aug = aug;
callbackbox.con = con;
callbackbox.augBulk = augBulk;

module.exports = callbackbox;