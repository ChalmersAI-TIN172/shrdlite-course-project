// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
var collections;
(function (collections) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    /**
     * Default function to compare element order.
     * @function
     */
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    }
    collections.defaultCompare = defaultCompare;
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals(a, b) {
        return a === b;
    }
    collections.defaultEquals = defaultEquals;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    collections.defaultToString = defaultToString;
    /**
    * Joins all the properies of the object using the provided join string
    */
    function makeString(item, join) {
        if (join === void 0) { join = ","; }
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return item.toString();
        }
        else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (has(item, prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
    collections.makeString = makeString;
    /**
     * Checks if the given argument is a function.
     * @function
     */
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    collections.isFunction = isFunction;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    collections.isUndefined = isUndefined;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    collections.isString = isString;
    /**
     * Reverses a compare function.
     * @function
     */
    function reverseCompareFunction(compareFunction) {
        if (!collections.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            };
        }
        else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    collections.reverseCompareFunction = reverseCompareFunction;
    /**
     * Returns an equal function given a compare function.
     * @function
     */
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    collections.compareToEquals = compareToEquals;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    var arrays;
    (function (arrays) {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;
        /**
         * Returns the position of the last occurrence of the specified element
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the last occurrence of the specified element
         * within the specified array or -1 if not found.
         */
        function lastIndexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.lastIndexOf = lastIndexOf;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;
        /**
         * Returns the number of elements in the specified array equal
         * to the specified object.
         * @param {Array} array the array in which to determine the frequency of the element.
         * @param {Object} item the element whose frequency is to be determined.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the number of elements in the specified array
         * equal to the specified object.
         */
        function frequency(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        }
        arrays.frequency = frequency;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;
        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(arrays = collections.arrays || (collections.arrays = {}));
    var LinkedList = (function () {
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        function LinkedList() {
            /**
            * First node in the list
            * @type {Object}
            * @private
            */
            this.firstNode = null;
            /**
            * Last node in the list
            * @type {Object}
            * @private
            */
            this.lastNode = null;
            /**
            * Number of elements in the list
            * @type {number}
            * @private
            */
            this.nElements = 0;
        }
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        LinkedList.prototype.add = function (item, index) {
            if (collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                // First node in the list.
                this.firstNode = newNode;
                this.lastNode = newNode;
            }
            else if (index === this.nElements) {
                // Insert at the end.
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            }
            else if (index === 0) {
                // Change first node.
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            }
            else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };
        /**
        * Returns the first element in this list.
        * @return {*} the first element of the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.first = function () {
            if (this.firstNode !== null) {
                return this.firstNode.element;
            }
            return undefined;
        };
        /**
        * Returns the last element in this list.
        * @return {*} the last element in the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.last = function () {
            if (this.lastNode !== null) {
                return this.lastNode.element;
            }
            return undefined;
        };
        /**
         * Returns the element at the specified position in this list.
         * @param {number} index desired index.
         * @return {*} the element at the given index or undefined if the index is
         * out of bounds.
         */
        LinkedList.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };
        /**
         * Returns the index in this list of the first occurrence of the
         * specified element, or -1 if the List does not contain this element.
         * <p>If the elements inside this list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} the index in this list of the first occurrence
         * of the specified element, or -1 if this list does not contain the
         * element.
         */
        LinkedList.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };
        /**
           * Returns true if this list contains the specified element.
           * <p>If the elements inside the list are
           * not comparable with the === operator a custom equals function should be
           * provided to perform searches, the function must receive two arguments and
           * return true if they are equal, false otherwise. Example:</p>
           *
           * <pre>
           * var petsAreEqualByName = function(pet1, pet2) {
           *  return pet1.name === pet2.name;
           * }
           * </pre>
           * @param {Object} item element to search for.
           * @param {function(Object,Object):boolean=} equalsFunction Optional
           * function used to check if two elements are equal.
           * @return {boolean} true if this list contains the specified element, false
           * otherwise.
           */
        LinkedList.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };
        /**
         * Removes the first occurrence of the specified element in this list.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to be removed from this list, if present.
         * @return {boolean} true if the list contained the specified element.
         */
        LinkedList.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (this.nElements < 1 || collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    }
                    else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };
        /**
         * Removes all of the elements from this list.
         */
        LinkedList.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this list is equal to the given list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {LinkedList} other the other list.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function used to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if this list is equal to the given list.
         */
        LinkedList.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || collections.defaultEquals;
            if (!(other instanceof collections.LinkedList)) {
                return false;
            }
            if (this.size() !== other.size()) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };
        /**
        * @private
        */
        LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };
        /**
         * Removes the element at the specified position in this list.
         * @param {number} index given index.
         * @return {*} removed element or undefined if the index is out of bounds.
         */
        LinkedList.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                //First node in the list.
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            }
            else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                }
                else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };
        /**
         * Executes the provided function once for each element present in this list in order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        LinkedList.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };
        /**
         * Reverses the order of the elements in this linked list (makes the last
         * element first, and the first element last).
         */
        LinkedList.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };
        /**
         * Returns an array containing all of the elements in this list in proper
         * sequence.
         * @return {Array.<*>} an array containing all of the elements in this list,
         * in proper sequence.
         */
        LinkedList.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };
        /**
         * Returns the number of elements in this list.
         * @return {number} the number of elements in this list.
         */
        LinkedList.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this list contains no elements.
         * @return {boolean} true if this list contains no elements.
         */
        LinkedList.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        LinkedList.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        /**
         * @private
         */
        LinkedList.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };
        /**
         * @private
         */
        LinkedList.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return LinkedList;
    })();
    collections.LinkedList = LinkedList; // End of linked list 
    var Dictionary = (function () {
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        Dictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        Dictionary.prototype.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        Dictionary.prototype.keys = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        Dictionary.prototype.values = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        Dictionary.prototype.containsKey = function (key) {
            return !collections.isUndefined(this.getValue(key));
        };
        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        Dictionary.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    collections.Dictionary = Dictionary; // End of dictionary
    // /**
    //  * Returns true if this dictionary is equal to the given dictionary.
    //  * Two dictionaries are equal if they contain the same mappings.
    //  * @param {collections.Dictionary} other the other dictionary.
    //  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
    //  * function used to check if two values are equal.
    //  * @return {boolean} true if this dictionary is equal to the given dictionary.
    //  */
    // collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
    // 	var eqF = valuesEqualFunction || collections.defaultEquals;
    // 	if(!(other instanceof collections.Dictionary)){
    // 		return false;
    // 	}
    // 	if(this.size() !== other.size()){
    // 		return false;
    // 	}
    // 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
    // }
    var MultiDictionary = (function () {
        /**
         * Creates an empty multi dictionary.
         * @class <p>A multi dictionary is a special kind of dictionary that holds
         * multiple values against each key. Setting a value into the dictionary will
         * add the value to an array at that key. Getting a key will return an array,
         * holding all the values set to that key.
         * You can configure to allow duplicates in the values.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to strings must be
         * provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
           *  return pet.name;
           * }
         * </pre>
         * <p>If the values are custom objects a function to check equality between values
         * must be provided. Example:</p>
         *
         * <pre>
         * function petsAreEqualByAge(pet1,pet2) {
           *  return pet1.age===pet2.age;
           * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
         * function to check if two values are equal.
         *
         * @param allowDuplicateValues
         */
        function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
            if (allowDuplicateValues === void 0) { allowDuplicateValues = false; }
            this.dict = new Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || collections.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        /**
        * Returns an array holding the values to which this dictionary maps
        * the specified key.
        * Returns an empty array if this dictionary contains no mappings for this key.
        * @param {Object} key key whose associated values are to be returned.
        * @return {Array} an array holding the values to which this dictionary maps
        * the specified key.
        */
        MultiDictionary.prototype.getValue = function (key) {
            var values = this.dict.getValue(key);
            if (collections.isUndefined(values)) {
                return [];
            }
            return collections.arrays.copy(values);
        };
        /**
         * Adds the value to the array associated with the specified key, if
         * it is not already present.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value the value to add to the array at the key
         * @return {boolean} true if the value was not already associated with that key.
         */
        MultiDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return false;
            }
            if (!this.containsKey(key)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            var array = this.dict.getValue(key);
            if (!this.allowDuplicate) {
                if (collections.arrays.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        };
        /**
         * Removes the specified values from the array of values associated with the
         * specified key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @param {Object=} value optional argument to specify the value to remove
         * from the array associated with the specified key.
         * @return {*} true if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the specified key.
         */
        MultiDictionary.prototype.remove = function (key, value) {
            if (collections.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !collections.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (collections.arrays.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        MultiDictionary.prototype.keys = function () {
            return this.dict.keys();
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        MultiDictionary.prototype.values = function () {
            var values = this.dict.values();
            var array = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                for (var j = 0; j < v.length; j++) {
                    array.push(v[j]);
                }
            }
            return array;
        };
        /**
         * Returns true if this dictionary at least one value associatted the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary at least one value associatted
         * the specified key.
         */
        MultiDictionary.prototype.containsKey = function (key) {
            return this.dict.containsKey(key);
        };
        /**
         * Removes all mappings from this dictionary.
         */
        MultiDictionary.prototype.clear = function () {
            this.dict.clear();
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        MultiDictionary.prototype.size = function () {
            return this.dict.size();
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        MultiDictionary.prototype.isEmpty = function () {
            return this.dict.isEmpty();
        };
        return MultiDictionary;
    })();
    collections.MultiDictionary = MultiDictionary; // end of multi dictionary 
    var Heap = (function () {
        /**
         * Creates an empty Heap.
         * @class
         * <p>A heap is a binary tree, where the nodes maintain the heap property:
         * each node is smaller than each of its children and therefore a MinHeap
         * This implementation uses an array to store elements.</p>
         * <p>If the inserted elements are custom objects a compare function must be provided,
         *  at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         *
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
         * reverse compare function to accomplish that behavior. Example:</p>
         *
         * <pre>
         * function reverseCompare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return 1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return -1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function Heap(compareFunction) {
            /**
             * Array used to store the elements od the heap.
             * @type {Array.<Object>}
             * @private
             */
            this.data = [];
            this.compare = compareFunction || collections.defaultCompare;
        }
        /**
         * Returns the index of the left child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the left child
         * for.
         * @return {number} The index of the left child.
         * @private
         */
        Heap.prototype.leftChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 1;
        };
        /**
         * Returns the index of the right child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the right child
         * for.
         * @return {number} The index of the right child.
         * @private
         */
        Heap.prototype.rightChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 2;
        };
        /**
         * Returns the index of the parent of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        Heap.prototype.parentIndex = function (nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        };
        /**
         * Returns the index of the smaller child node (if it exists).
         * @param {number} leftChild left child index.
         * @param {number} rightChild right child index.
         * @return {number} the index with the minimum value or -1 if it doesn't
         * exists.
         * @private
         */
        Heap.prototype.minIndex = function (leftChild, rightChild) {
            if (rightChild >= this.data.length) {
                if (leftChild >= this.data.length) {
                    return -1;
                }
                else {
                    return leftChild;
                }
            }
            else {
                if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                    return leftChild;
                }
                else {
                    return rightChild;
                }
            }
        };
        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        Heap.prototype.siftUp = function (index) {
            var parent = this.parentIndex(index);
            while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                collections.arrays.swap(this.data, parent, index);
                index = parent;
                parent = this.parentIndex(index);
            }
        };
        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} nodeIndex The index of the node to move down.
         * @private
         */
        Heap.prototype.siftDown = function (nodeIndex) {
            //smaller child index
            var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                collections.arrays.swap(this.data, min, nodeIndex);
                nodeIndex = min;
                min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            }
        };
        /**
         * Retrieves but does not remove the root element of this heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        Heap.prototype.peek = function () {
            if (this.data.length > 0) {
                return this.data[0];
            }
            else {
                return undefined;
            }
        };
        /**
         * Adds the given element into the heap.
         * @param {*} element the element.
         * @return true if the element was added or fals if it is undefined.
         */
        Heap.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return undefined;
            }
            this.data.push(element);
            this.siftUp(this.data.length - 1);
            return true;
        };
        /**
         * Retrieves and removes the root element of this heap.
         * @return {*} The value removed from the root of the heap. Returns
         * undefined if the heap is empty.
         */
        Heap.prototype.removeRoot = function () {
            if (this.data.length > 0) {
                var obj = this.data[0];
                this.data[0] = this.data[this.data.length - 1];
                this.data.splice(this.data.length - 1, 1);
                if (this.data.length > 0) {
                    this.siftDown(0);
                }
                return obj;
            }
            return undefined;
        };
        /**
         * Returns true if this heap contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this Heap contains the specified element, false
         * otherwise.
         */
        Heap.prototype.contains = function (element) {
            var equF = collections.compareToEquals(this.compare);
            return collections.arrays.contains(this.data, element, equF);
        };
        /**
         * Returns the number of elements in this heap.
         * @return {number} the number of elements in this heap.
         */
        Heap.prototype.size = function () {
            return this.data.length;
        };
        /**
         * Checks if this heap is empty.
         * @return {boolean} true if and only if this heap contains no items; false
         * otherwise.
         */
        Heap.prototype.isEmpty = function () {
            return this.data.length <= 0;
        };
        /**
         * Removes all of the elements from this heap.
         */
        Heap.prototype.clear = function () {
            this.data.length = 0;
        };
        /**
         * Executes the provided function once for each element present in this heap in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Heap.prototype.forEach = function (callback) {
            collections.arrays.forEach(this.data, callback);
        };
        return Heap;
    })();
    collections.Heap = Heap;
    var Stack = (function () {
        /**
         * Creates an empty Stack.
         * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
         * element added to the stack will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Stack() {
            this.list = new LinkedList();
        }
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.push = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.add = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Removes the object at the top of this stack and returns that object.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.pop = function () {
            return this.list.removeElementAtIndex(0);
        };
        /**
         * Looks at the object at the top of this stack without removing it from the
         * stack.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.peek = function () {
            return this.list.first();
        };
        /**
         * Returns the number of elements in this stack.
         * @return {number} the number of elements in this stack.
         */
        Stack.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this stack contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this stack contains the specified element,
         * false otherwise.
         */
        Stack.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this stack is empty.
         * @return {boolean} true if and only if this stack contains no items; false
         * otherwise.
         */
        Stack.prototype.isEmpty = function () {
            return this.list.isEmpty();
        };
        /**
         * Removes all of the elements from this stack.
         */
        Stack.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this stack in
         * LIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Stack.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Stack;
    })();
    collections.Stack = Stack; // End of stack 
    var Queue = (function () {
        /**
         * Creates an empty queue.
         * @class A queue is a First-In-First-Out (FIFO) data structure, the first
         * element added to the queue will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Queue() {
            this.list = new LinkedList();
        }
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.enqueue = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.add = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Retrieves and removes the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.dequeue = function () {
            if (this.list.size() !== 0) {
                var el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.peek = function () {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        };
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        Queue.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this queue contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this queue contains the specified element,
         * false otherwise.
         */
        Queue.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this queue is empty.
         * @return {boolean} true if and only if this queue contains no items; false
         * otherwise.
         */
        Queue.prototype.isEmpty = function () {
            return this.list.size() <= 0;
        };
        /**
         * Removes all of the elements from this queue.
         */
        Queue.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * FIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Queue.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Queue;
    })();
    collections.Queue = Queue; // End of queue
    var PriorityQueue = (function () {
        /**
         * Creates an empty priority queue.
         * @class <p>In a priority queue each element is associated with a "priority",
         * elements are dequeued in highest-priority-first order (the elements with the
         * highest priority are dequeued first). Priority Queues are implemented as heaps.
         * If the inserted elements are custom objects a compare function must be provided,
         * otherwise the <=, === and >= operators are used to compare object priority.</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two element priorities. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function PriorityQueue(compareFunction) {
            this.heap = new Heap(collections.reverseCompareFunction(compareFunction));
        }
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.enqueue = function (element) {
            return this.heap.add(element);
        };
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.add = function (element) {
            return this.heap.add(element);
        };
        /**
         * Retrieves and removes the highest priority element of this queue.
         * @return {*} the the highest priority element of this queue,
         *  or undefined if this queue is empty.
         */
        PriorityQueue.prototype.dequeue = function () {
            if (this.heap.size() !== 0) {
                var el = this.heap.peek();
                this.heap.removeRoot();
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the highest priority element of this queue.
         * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
         */
        PriorityQueue.prototype.peek = function () {
            return this.heap.peek();
        };
        /**
         * Returns true if this priority queue contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this priority queue contains the specified element,
         * false otherwise.
         */
        PriorityQueue.prototype.contains = function (element) {
            return this.heap.contains(element);
        };
        /**
         * Checks if this priority queue is empty.
         * @return {boolean} true if and only if this priority queue contains no items; false
         * otherwise.
         */
        PriorityQueue.prototype.isEmpty = function () {
            return this.heap.isEmpty();
        };
        /**
         * Returns the number of elements in this priority queue.
         * @return {number} the number of elements in this priority queue.
         */
        PriorityQueue.prototype.size = function () {
            return this.heap.size();
        };
        /**
         * Removes all of the elements from this priority queue.
         */
        PriorityQueue.prototype.clear = function () {
            this.heap.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        PriorityQueue.prototype.forEach = function (callback) {
            this.heap.forEach(callback);
        };
        return PriorityQueue;
    })();
    collections.PriorityQueue = PriorityQueue; // end of priority queue
    var Set = (function () {
        /**
         * Creates an empty set.
         * @class <p>A set is a data structure that contains no duplicate items.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStringFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives a onject and returns a
         * unique string must be provided.
         */
        function Set(toStringFunction) {
            this.dictionary = new Dictionary(toStringFunction);
        }
        /**
         * Returns true if this set contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this set contains the specified element,
         * false otherwise.
         */
        Set.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
         * Adds the specified element to this set if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this set did not already contain the specified element.
         */
        Set.prototype.add = function (element) {
            if (this.contains(element) || collections.isUndefined(element)) {
                return false;
            }
            else {
                this.dictionary.setValue(element, element);
                return true;
            }
        };
        /**
         * Performs an intersecion between this an another set.
         * Removes all values that are not present this set and the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.intersection = function (otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        };
        /**
         * Performs a union between this an another set.
         * Adds all values from the given set to this set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.union = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        };
        /**
         * Performs a difference between this an another set.
         * Removes from this set all the values that are present in the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.difference = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        };
        /**
         * Checks whether the given set contains all the elements in this set.
         * @param {collections.Set} otherSet other set.
         * @return {boolean} true if this set is a subset of the given set.
         */
        Set.prototype.isSubsetOf = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        };
        /**
         * Removes the specified element from this set if it is present.
         * @return {boolean} true if this set contained the specified element.
         */
        Set.prototype.remove = function (element) {
            if (!this.contains(element)) {
                return false;
            }
            else {
                this.dictionary.remove(element);
                return true;
            }
        };
        /**
         * Executes the provided function once for each element
         * present in this set.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one arguments: the element. To break the iteration you can
         * optionally return false.
         */
        Set.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };
        /**
         * Returns an array containing all of the elements in this set in arbitrary order.
         * @return {Array} an array containing all of the elements in this set.
         */
        Set.prototype.toArray = function () {
            return this.dictionary.values();
        };
        /**
         * Returns true if this set contains no elements.
         * @return {boolean} true if this set contains no elements.
         */
        Set.prototype.isEmpty = function () {
            return this.dictionary.isEmpty();
        };
        /**
         * Returns the number of elements in this set.
         * @return {number} the number of elements in this set.
         */
        Set.prototype.size = function () {
            return this.dictionary.size();
        };
        /**
         * Removes all of the elements from this set.
         */
        Set.prototype.clear = function () {
            this.dictionary.clear();
        };
        /*
        * Provides a string representation for display
        */
        Set.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        return Set;
    })();
    collections.Set = Set; // end of Set
    var Bag = (function () {
        /**
         * Creates an empty bag.
         * @class <p>A bag is a special kind of set in which members are
         * allowed to appear more than once.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to unique strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives an object and returns a
         * unique string must be provided.
         */
        function Bag(toStrFunction) {
            this.toStrF = toStrFunction || collections.defaultToString;
            this.dictionary = new Dictionary(this.toStrF);
            this.nElements = 0;
        }
        /**
        * Adds nCopies of the specified object to this bag.
        * @param {Object} element element to add.
        * @param {number=} nCopies the number of copies to add, if this argument is
        * undefined 1 copy is added.
        * @return {boolean} true unless element is undefined.
        */
        Bag.prototype.add = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                var node = {
                    value: element,
                    copies: nCopies
                };
                this.dictionary.setValue(element, node);
            }
            else {
                this.dictionary.getValue(element).copies += nCopies;
            }
            this.nElements += nCopies;
            return true;
        };
        /**
        * Counts the number of copies of the specified object in this bag.
        * @param {Object} element the object to search for..
        * @return {number} the number of copies of the object, 0 if not found
        */
        Bag.prototype.count = function (element) {
            if (!this.contains(element)) {
                return 0;
            }
            else {
                return this.dictionary.getValue(element).copies;
            }
        };
        /**
         * Returns true if this bag contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this bag contains the specified element,
         * false otherwise.
         */
        Bag.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
        * Removes nCopies of the specified object to this bag.
        * If the number of copies to remove is greater than the actual number
        * of copies in the Bag, all copies are removed.
        * @param {Object} element element to remove.
        * @param {number=} nCopies the number of copies to remove, if this argument is
        * undefined 1 copy is removed.
        * @return {boolean} true if at least 1 element was removed.
        */
        Bag.prototype.remove = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                return false;
            }
            else {
                var node = this.dictionary.getValue(element);
                if (nCopies > node.copies) {
                    this.nElements -= node.copies;
                }
                else {
                    this.nElements -= nCopies;
                }
                node.copies -= nCopies;
                if (node.copies <= 0) {
                    this.dictionary.remove(element);
                }
                return true;
            }
        };
        /**
         * Returns an array containing all of the elements in this big in arbitrary order,
         * including multiple copies.
         * @return {Array} an array containing all of the elements in this bag.
         */
        Bag.prototype.toArray = function () {
            var a = [];
            var values = this.dictionary.values();
            var vl = values.length;
            for (var i = 0; i < vl; i++) {
                var node = values[i];
                var element = node.value;
                var copies = node.copies;
                for (var j = 0; j < copies; j++) {
                    a.push(element);
                }
            }
            return a;
        };
        /**
         * Returns a set of unique elements in this bag.
         * @return {collections.Set<T>} a set of unique elements in this bag.
         */
        Bag.prototype.toSet = function () {
            var toret = new Set(this.toStrF);
            var elements = this.dictionary.values();
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                var value = elements[i].value;
                toret.add(value);
            }
            return toret;
        };
        /**
         * Executes the provided function once for each element
         * present in this bag, including multiple copies.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element. To break the iteration you can
         * optionally return false.
         */
        Bag.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                var value = v.value;
                var copies = v.copies;
                for (var i = 0; i < copies; i++) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        };
        /**
         * Returns the number of elements in this bag.
         * @return {number} the number of elements in this bag.
         */
        Bag.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this bag contains no elements.
         * @return {boolean} true if this bag contains no elements.
         */
        Bag.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Removes all of the elements from this bag.
         */
        Bag.prototype.clear = function () {
            this.nElements = 0;
            this.dictionary.clear();
        };
        return Bag;
    })();
    collections.Bag = Bag; // End of bag 
    var BSTree = (function () {
        /**
         * Creates an empty binary search tree.
         * @class <p>A binary search tree is a binary tree in which each
         * internal node stores an element such that the elements stored in the
         * left subtree are less than it and the elements
         * stored in the right subtree are greater.</p>
         * <p>Formally, a binary search tree is a node-based binary tree data structure which
         * has the following properties:</p>
         * <ul>
         * <li>The left subtree of a node contains only nodes with elements less
         * than the node's element</li>
         * <li>The right subtree of a node contains only nodes with elements greater
         * than the node's element</li>
         * <li>Both the left and right subtrees must also be binary search trees.</li>
         * </ul>
         * <p>If the inserted elements are custom objects a compare function must
         * be provided at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function BSTree(compareFunction) {
            this.root = null;
            this.compare = compareFunction || collections.defaultCompare;
            this.nElements = 0;
        }
        /**
         * Adds the specified element to this tree if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this tree did not already contain the specified element.
         */
        BSTree.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            if (this.insertNode(this.createNode(element)) !== null) {
                this.nElements++;
                return true;
            }
            return false;
        };
        /**
         * Removes all of the elements from this tree.
         */
        BSTree.prototype.clear = function () {
            this.root = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this tree contains no elements.
         * @return {boolean} true if this tree contains no elements.
         */
        BSTree.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Returns the number of elements in this tree.
         * @return {number} the number of elements in this tree.
         */
        BSTree.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this tree contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this tree contains the specified element,
         * false otherwise.
         */
        BSTree.prototype.contains = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            return this.searchNode(this.root, element) !== null;
        };
        /**
         * Removes the specified element from this tree if it is present.
         * @return {boolean} true if this tree contained the specified element.
         */
        BSTree.prototype.remove = function (element) {
            var node = this.searchNode(this.root, element);
            if (node === null) {
                return false;
            }
            this.removeNode(node);
            this.nElements--;
            return true;
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * in-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.inorderTraversal = function (callback) {
            this.inorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in pre-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.preorderTraversal = function (callback) {
            this.preorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in post-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.postorderTraversal = function (callback) {
            this.postorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * level-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.levelTraversal = function (callback) {
            this.levelTraversalAux(this.root, callback);
        };
        /**
         * Returns the minimum element of this tree.
         * @return {*} the minimum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.minimum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.minimumAux(this.root).element;
        };
        /**
         * Returns the maximum element of this tree.
         * @return {*} the maximum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.maximum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.maximumAux(this.root).element;
        };
        /**
         * Executes the provided function once for each element present in this tree in inorder.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        BSTree.prototype.forEach = function (callback) {
            this.inorderTraversal(callback);
        };
        /**
         * Returns an array containing all of the elements in this tree in in-order.
         * @return {Array} an array containing all of the elements in this tree in in-order.
         */
        BSTree.prototype.toArray = function () {
            var array = [];
            this.inorderTraversal(function (element) {
                array.push(element);
                return true;
            });
            return array;
        };
        /**
         * Returns the height of this tree.
         * @return {number} the height of this tree or -1 if is empty.
         */
        BSTree.prototype.height = function () {
            return this.heightAux(this.root);
        };
        /**
        * @private
        */
        BSTree.prototype.searchNode = function (node, element) {
            var cmp = null;
            while (node !== null && cmp !== 0) {
                cmp = this.compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                }
                else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.transplant = function (n1, n2) {
            if (n1.parent === null) {
                this.root = n2;
            }
            else if (n1 === n1.parent.leftCh) {
                n1.parent.leftCh = n2;
            }
            else {
                n1.parent.rightCh = n2;
            }
            if (n2 !== null) {
                n2.parent = n1.parent;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.removeNode = function (node) {
            if (node.leftCh === null) {
                this.transplant(node, node.rightCh);
            }
            else if (node.rightCh === null) {
                this.transplant(node, node.leftCh);
            }
            else {
                var y = this.minimumAux(node.rightCh);
                if (y.parent !== node) {
                    this.transplant(y, y.rightCh);
                    y.rightCh = node.rightCh;
                    y.rightCh.parent = y;
                }
                this.transplant(node, y);
                y.leftCh = node.leftCh;
                y.leftCh.parent = y;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.levelTraversalAux = function (node, callback) {
            var queue = new Queue();
            if (node !== null) {
                queue.enqueue(node);
            }
            while (!queue.isEmpty()) {
                node = queue.dequeue();
                if (callback(node.element) === false) {
                    return;
                }
                if (node.leftCh !== null) {
                    queue.enqueue(node.leftCh);
                }
                if (node.rightCh !== null) {
                    queue.enqueue(node.rightCh);
                }
            }
        };
        /**
        * @private
        */
        BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.rightCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
        };
        /**
        * @private
        */
        BSTree.prototype.minimumAux = function (node) {
            while (node.leftCh !== null) {
                node = node.leftCh;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.maximumAux = function (node) {
            while (node.rightCh !== null) {
                node = node.rightCh;
            }
            return node;
        };
        /**
          * @private
          */
        BSTree.prototype.heightAux = function (node) {
            if (node === null) {
                return -1;
            }
            return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        };
        /*
        * @private
        */
        BSTree.prototype.insertNode = function (node) {
            var parent = null;
            var position = this.root;
            var cmp = null;
            while (position !== null) {
                cmp = this.compare(node.element, position.element);
                if (cmp === 0) {
                    return null;
                }
                else if (cmp < 0) {
                    parent = position;
                    position = position.leftCh;
                }
                else {
                    parent = position;
                    position = position.rightCh;
                }
            }
            node.parent = parent;
            if (parent === null) {
                // tree is empty
                this.root = node;
            }
            else if (this.compare(node.element, parent.element) < 0) {
                parent.leftCh = node;
            }
            else {
                parent.rightCh = node;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.createNode = function (element) {
            return {
                element: element,
                leftCh: null,
                rightCh: null,
                parent: null
            };
        };
        return BSTree;
    })();
    collections.BSTree = BSTree; // end of BSTree
})(collections || (collections = {})); // End of module 
/// <reference path="../lib/typescript-collections/collections.ts" />
var graphmodule;
(function (graphmodule) {
    /** A node that has a string ID and holds some arbitrary data.
     * Also holds a map containing the heuristic to every other node (in a graph) */
    var GraphNode = (function () {
        function GraphNode(id, data) {
            this.id = id;
            if (data != undefined) {
                this.data = data;
            }
        }
        GraphNode.prototype.toString = function () {
            return this.id;
        };
        return GraphNode;
    })();
    graphmodule.GraphNode = GraphNode;
    /** An edge holds its two end-nodes and has a cost */
    var Edge = (function () {
        function Edge(from, to, cost) {
            this.from = from;
            this.to = to;
            this.cost = cost;
        }
        Edge.prototype.toString = function () {
            return this.from.toString() + "-" + this.to.toString();
        };
        return Edge;
    })();
    graphmodule.Edge = Edge;
    /** Holds a node and all the edges going out from it */
    var Adjacency = (function () {
        function Adjacency(node) {
            this.node = node;
            this.neighbours = new collections.Set();
        }
        Adjacency.prototype.toString = function () {
            return "Node: " + this.node.toString() + ": " + this.neighbours.toString();
        };
        return Adjacency;
    })();
    graphmodule.Adjacency = Adjacency;
    /** A Path is a list of edges. It also has a cost */
    var Path = (function () {
        function Path(newEdge, oldPath) {
            var _this = this;
            this.path = new collections.LinkedList();
            this.cost = 0;
            if (oldPath != undefined) {
                oldPath.path.forEach(function (item) {
                    _this.path.add(item);
                    return true;
                });
                this.cost += oldPath.cost;
            }
            if (newEdge != undefined) {
                this.path.add(newEdge);
                this.cost += newEdge.cost;
            }
        }
        Path.prototype.toString = function () {
            return "Path [" + this.cost + "] = " + this.printPath();
        };
        Path.prototype.isEmpty = function () {
            return this.path.size() == 0;
        };
        Path.prototype.printPath = function () {
            console.log("graph.Path.printPath: length=" + this.path.size());
            if (this.path.size() == 0) {
                return "NO PATH";
            }
            var retString = "";
            this.path.forEach(function (edge) {
                retString += edge.from.toString() + " ➔ ";
                return true;
            });
            console.log("graph.Path.printPath: last=" + this.path.last());
            retString += this.path.last().to.toString();
            return retString;
        };
        return Path;
    })();
    graphmodule.Path = Path;
    /** Function to compare two paths. Needs to know the goal node in order to use heuristics */
    function comparePath(first, second, hFun) {
        //returns cost of: second - first in regard of reaching the goal
        return (second.cost + hFun(second.path.last().to.data)) - (first.cost + hFun(first.path.last().to.data)); //, goal.data
    }
    graphmodule.comparePath = comparePath;
    /** Graph holding nodes and edges */
    var Graph = (function () {
        function Graph() {
            this.adjacencyMap = new collections.Dictionary();
            this.nodes = new collections.Set();
            this.edges = new collections.Set();
        }
        Graph.prototype.addNode = function (node) {
            var ret = this.nodes.add(node);
            this.adjacencyMap.setValue(node.id, new Adjacency(node));
            return ret;
        };
        Graph.prototype.addEdge = function (startId, endId, cost, bidirectional) {
            if (bidirectional === void 0) { bidirectional = false; }
            //Get the Adjacency<T> object for each node
            var adjacencyNodeStart = this.adjacencyMap.getValue(startId);
            var adjacencyNodeEnd = this.adjacencyMap.getValue(endId);
            //If any of them are null, fail
            if (adjacencyNodeStart === undefined || adjacencyNodeEnd === undefined) {
                return false;
            }
            //Get the actual nodes
            var startNode = adjacencyNodeStart.node;
            var endNode = adjacencyNodeEnd.node;
            //Create an Edge<T> from start to end
            var newEdge = new Edge(startNode, endNode, cost);
            //Add the Edge<T>
            this.edges.add(newEdge);
            this.adjacencyMap.getValue(startId).neighbours.add(newEdge);
            //In case the Edge<T> should be bidirectional, add an Edge<T>
            // in the other direction as well
            if (bidirectional) {
                var newEdge2 = new Edge(endNode, startNode, cost);
                this.edges.add(newEdge2);
                this.adjacencyMap.getValue(endId).neighbours.add(newEdge2);
            }
            return true;
        };
        Graph.prototype.setHeuristicsFun = function (callback) {
            this.nodes.forEach(callback);
        };
        Graph.prototype.toString = function () {
            return "---Graph<T>---\nNodes: " + this.arrayToString() + "\nEdges: " + this.edges.toString() + "\n----------";
        };
        Graph.prototype.arrayToString = function () {
            var retString = "[";
            this.nodes.forEach(function (node) {
                retString += node.toString() + "|";
                return true;
            });
            retString += "]";
            return retString;
        };
        return Graph;
    })();
    graphmodule.Graph = Graph;
})(graphmodule || (graphmodule = {}));
/// <reference path="../lib/typescript-collections/collections.ts" />
/// <reference path="graph.ts" />
var astar;
(function (astar) {
    var MAXIMUM_ASTAR_RUNTIME = 3000;
    /** Compute the a path from the given start node to the given end node and the given graph */
    function compute(graph, startID, isEndState, hFun, generateNeighbours) {
        //var goalNodeAd = graph.adjacencyMap.getValue(endID);
        var currentAd = graph.adjacencyMap.getValue(startID);
        if (currentAd === undefined) {
            return undefined;
        }
        //var goalNode = goalNodeAd.node;
        var pq = new collections.PriorityQueue(function comparePath(first, second) {
            //first: first path
            //second: second path
            //goalNode: The goal node
            //hFun: The heuristic function that should be used
            return graphmodule.comparePath(first, second, hFun); //goalNode, 
        });
        var visited = new collections.Set();
        var currentPath = new graphmodule.Path();
        var currentAd = graph.adjacencyMap.getValue(startID);
        var currentNode = currentAd.node;
        var previousNode;
        visited.add(currentNode);
        var startTime = new Date().getTime();
        while (!isEndState(currentNode)) {
            var nowTime = new Date().getTime();
            if ((nowTime - startTime) > MAXIMUM_ASTAR_RUNTIME) {
                //Not allowed to run any longer
                console.log("A* IS NOT ALLOWED TO RUN ANY LONGER!!");
                return undefined;
            }
            //Create next states
            generateNeighbours(currentNode, previousNode);
            currentAd.neighbours.forEach(function addEdge(edge) {
                var neighbour = edge.to;
                if (!visited.contains(neighbour)) {
                    var newPath = new graphmodule.Path(edge, currentPath);
                    pq.enqueue(newPath);
                }
                return true;
            });
            currentPath = pq.dequeue();
            //console.log("astar.comparePath: " + currentPath);
            if (currentPath == undefined) {
                //No path to the goal
                ////console.log("astar.comparePath: No path found to the goal");
                return undefined;
            }
            currentNode = currentPath.path.last().to;
            previousNode = currentPath.path.last().from;
            visited.add(currentNode);
            currentAd = graph.adjacencyMap.getValue(currentNode.id);
        }
        ////console.log("astar.comparePath:  *********************** End of astar ***********************");
        return currentPath;
    }
    astar.compute = compute;
})(astar || (astar = {}));
// Interface definitions for worlds
///<reference path="World.ts"/>
///<reference path="lib/node.d.ts"/>
var Parser;
(function (Parser) {
    //////////////////////////////////////////////////////////////////////
    // exported functions, classes and interfaces/types
    function parse(input) {
        var nearleyParser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
        var parsestr = input.toLowerCase().replace(/\W/g, "");
        try {
            var results = nearleyParser.feed(parsestr).results;
        }
        catch (err) {
            if ('offset' in err) {
                throw new Parser.Error('Parsing failed after ' + err.offset + ' characters', err.offset);
            }
            else {
                throw err;
            }
        }
        if (!results.length) {
            throw new Parser.Error('Incomplete input', parsestr.length);
        }
        return results.map(function (c) {
            return { input: input, prs: clone(c) };
        });
    }
    Parser.parse = parse;
    function parseToString(res) {
        return JSON.stringify(res.prs);
    }
    Parser.parseToString = parseToString;
    var Error = (function () {
        function Error(message, offset) {
            this.message = message;
            this.offset = offset;
            this.name = "Parser.Error";
        }
        Error.prototype.toString = function () {
            return this.name + ": " + this.message;
        };
        return Error;
    })();
    Parser.Error = Error;
    //////////////////////////////////////////////////////////////////////
    // Utilities
    function clone(obj) {
        if (obj != null && typeof obj == "object") {
            var result = obj.constructor();
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result[key] = clone(obj[key]);
                }
            }
            return result;
        }
        else {
            return obj;
        }
    }
})(Parser || (Parser = {}));
if (typeof require !== 'undefined') {
    // Node.JS way of importing external modules
    // In a browser, they must be included from the HTML file
    var nearley = require('./lib/nearley.js');
    var grammar = require('./grammar.js');
}
///<reference path="World.ts"/>
///<reference path="Parser.ts"/>
///<reference path="Utils.ts"/>
var Interpreter;
(function (Interpreter) {
    //////////////////////////////////////////////////////////////////////
    // exported functions, classes and interfaces/types
    function interpret(parses, currentState) {
        var interpretations = [];
        //Check if ambiguous
        if (parses.length > 1) {
            var ambiguousInterpretations = [];
            //The utterance is ambiguous, find out the different interpretations
            parses.forEach(function (parseresult) {
                var intprt = parseresult;
                var sentence = interpretCommandAmbiguous(intprt.prs, currentState);
                ambiguousInterpretations.push(sentence);
            });
            throw new Interpreter.AmbiguousError("Ambiguous result from the parses!", ambiguousInterpretations);
        }
        //The parse is not ambiguous, interpret as normal
        parses.forEach(function (parseresult) {
            var intprt = parseresult;
            intprt.intp = interpretCommand(intprt.prs, currentState);
            interpretations.push(intprt);
        });
        //Check if any interpretations was found
        if (interpretations.length) {
            return interpretations;
        }
        else {
            throw new Interpreter.Error("Found no interpretation");
        }
    }
    Interpreter.interpret = interpret;
    function interpretationToString(res) {
        return res.intp.map(function (lits) {
            return lits.map(function (lit) { return literalToString(lit); }).join(" & ");
        }).join(" | ");
    }
    Interpreter.interpretationToString = interpretationToString;
    function literalToString(lit) {
        return (lit.pol ? "" : "-") + lit.rel + "(" + lit.args.join(",") + ")";
    }
    Interpreter.literalToString = literalToString;
    var Error = (function () {
        function Error(message) {
            this.message = message;
            this.name = "Interpreter.Error";
        }
        Error.prototype.toString = function () {
            return this.name + ": " + this.message;
        };
        return Error;
    })();
    Interpreter.Error = Error;
    var AmbiguousError = (function () {
        function AmbiguousError(message, sentences) {
            this.message = message;
            this.sentences = sentences;
            this.name = "Interpreter.AmbiguousError";
        }
        AmbiguousError.prototype.toString = function () {
            return this.name + ": " + this.message;
        };
        return AmbiguousError;
    })();
    Interpreter.AmbiguousError = AmbiguousError;
    /** Returns a string representation of the given object.
     *  Will use as much information that is available */
    function findObject(object) {
        if (object == undefined)
            return "";
        var hasSize = object.size != null;
        var hasColor = object.color != null;
        var hasForm = object.form != null;
        var objectForm = hasForm ? object.form == "anyform" ? "object" : object.form : "";
        return (hasSize ? object.size + " " : "") + (hasColor ? object.color + " " : "") + objectForm;
    }
    /** Returns a string representation of the given relationship. */
    function getRelation(rel) {
        if (rel == undefined || rel == null)
            return "";
        switch (rel) {
            case "ontop":
            case "right":
            case "left":
                return rel + " of";
            default:
                return rel;
        }
    }
    /** Interpret an ambiguous parse by extracting the parse to a sentence */
    function interpretCommandAmbiguous(cmd, state) {
        var sentence = [];
        // What is the command?  (Move, pick up, etc)
        var command = cmd.cmd;
        // What is the quantifier?
        var quant = cmd.ent.quant;
        //Get hold of the object refered to, either
        // the objects object, or just the object itself
        var objectTemp = cmd.ent.obj;
        var objectToUse = objectTemp.obj == undefined ? objectTemp : objectTemp.obj;
        console.log("objectToUse: " + objectToUse);
        console.log("quant: " + quant);
        //Extract the information about the object
        var objectStr = findObject(objectToUse);
        objectStr = (objectToUse.form == "anyform" && quant == "all") ? (objectStr + "s") : objectStr;
        var objectLocation = objectTemp.loc;
        var objectHasLocation = objectTemp.loc != undefined;
        var objectLocationRelation = objectHasLocation ? objectLocation.rel : "";
        var objectLocationQuant = objectHasLocation ? objectLocation.ent.quant : "";
        var objectLocationStr = objectHasLocation ? findObject(objectLocation.ent.obj) : "";
        objectLocationStr = objectLocationQuant == "all" ? objectLocationStr + "s" : objectLocationStr;
        //Push all the information to the final sentence
        sentence.push(command);
        sentence.push(quant);
        sentence.push(objectStr);
        //If the object also has a location, add that.
        if (objectHasLocation) {
            if (quant == "all") {
                sentence.push("that are");
            }
            else {
                sentence.push("that is");
            }
            sentence.push(objectLocationRelation);
            sentence.push(objectLocationQuant);
            sentence.push(objectLocationStr);
        }
        //Then do nearly everything again, but for the location
        var location = cmd.loc;
        sentence.push(getLocationStr(cmd.loc));
        /*
        var locationRelation = getRelation(location.rel);
        var locationQuant = location.ent.quant;
        
        var locationTemp = location.ent.obj;
        var locationToUse = locationTemp.obj == undefined ? locationTemp : locationTemp.obj;
        
        var locationStr = findObject(locationToUse);
        locationStr = locationQuant == "all" ? locationStr + "s" : locationStr;
        var locationLocation = locationTemp.loc;
        var locationHasLocation = locationTemp.loc != undefined;
        var locationLocationRelation = locationHasLocation ? getRelation(locationLocation.rel) : "";
        var locationLocationQuant = locationHasLocation ? locationLocation.ent.quant : "";
        var locationLocationStr = locationHasLocation ? findObject(locationLocation.ent.obj) : "";
        
        sentence.push(locationRelation);
        sentence.push(locationQuant);
        sentence.push(locationStr);
        
        if(locationHasLocation){
            sentence.push("that is");
            sentence.push(locationLocationRelation);
            sentence.push(locationLocationQuant);
            sentence.push(locationLocationStr);
        }
        */
        //Join the list of words into a sentence
        return sentence.join(" ");
    }
    function getLocationStr(location) {
        var sentence = [];
        var locationRelation = getRelation(location.rel);
        var locationQuant = location.ent.quant;
        var locationTemp = location.ent.obj;
        var locationToUse = locationTemp.obj == undefined ? locationTemp : locationTemp.obj;
        var locationStr = findObject(locationToUse);
        locationStr = locationQuant == "all" ? locationStr + "s" : locationStr;
        var locationLocation = locationTemp.loc;
        var locationHasLocation = locationTemp.loc != undefined;
        var locationLocationRelation = locationHasLocation ? getRelation(locationLocation.rel) : "";
        var locationLocationQuant = locationHasLocation ? locationLocation.ent.quant : "";
        var locationLocationStr = locationHasLocation ? findObject(locationLocation.ent.obj) : "";
        sentence.push(locationRelation);
        sentence.push(locationQuant);
        sentence.push(locationStr);
        if (locationHasLocation) {
            sentence.push("that is");
            sentence.push(locationLocationRelation);
            sentence.push(locationLocationQuant);
            sentence.push(locationLocationStr);
        }
        //Join the list of words into a sentence
        return sentence.join(" ");
    }
    function getNoObjectFoundMessage(object) {
        var msg = "There is no " + findObject(object.obj ? object.obj : object);
        //Check if the object should have a location
        if (object.loc) {
            msg += " " + getLocationStr(object.loc);
        }
        msg += " within the current world";
        return msg;
    }
    function getNoLocactionFoundMessage(object) {
        //Get which object the user wanted
        var msg = "There is no " + findObject(object);
        //Check if the object should have a location
        /*
        if(object.loc){
            msg += " " + object.loc.rel + " " + findObject(object.loc);
        }
        */
        msg += " location within the current world";
        return msg;
    }
    //////////////////////////////////////////////////////////////////////
    // private functions
    function interpretCommand(cmd, state) {
        var intprt = [];
        //All objects in the world
        var objs = Array.prototype.concat.apply([], state.stacks);
        //If the arm is holding something, add that too
        if (state.holding != null) {
            objs.push(state.holding);
        }
        //The wanted object(s)
        var object = cmd.ent.obj;
        //First check if the object is inside the world...
        var objectKeys = getObjectKey(object, objs, state.objects, state.stacks, true);
        console.log("Object keys: " + objectKeys.toString());
        console.log("Quant: " + cmd.ent.quant);
        //...if this is not true, we did not find an object that matched
        if (rightNumberOfResults(cmd.ent.quant, objectKeys.length)) {
            switch (cmd.cmd) {
                case "take":
                    //If the quantifier is "all", then push all the found object keys
                    // to the interpreter list by using conjunction
                    if (cmd.ent.quant == "all") {
                        var temp = [];
                        objectKeys.forEach(function (key) {
                            temp.push({ pol: true, rel: "holding", args: [key] });
                        });
                        intprt.push(temp);
                    }
                    else {
                        //Just say that we should hold any of the found keys by
                        // pushing all the object keys using disjunction
                        objectKeys.forEach(function (key) {
                            intprt.push([{ pol: true, rel: "holding", args: [key] }]);
                        });
                    }
                    break;
                case "move":
                    //If we should move something, we need to know where to.
                    //So get the location(s)
                    var foundLocationKey = getObjectKey(cmd.loc.ent.obj, objs, state.objects, state.stacks, true);
                    //Just as before, check if we got enough results. Since we should move
                    // something, we need to have found some location (depending on the quantifier)
                    if (rightNumberOfResults(cmd.loc.ent.quant, foundLocationKey.length)) {
                        //If the quantifier is "all", we should push all combinations of 
                        // object keys and location keys 
                        if (cmd.ent.quant == "all") {
                            var locationLength = foundLocationKey.length;
                            for (var objectIndex = 0; objectIndex < objectKeys.length; objectIndex++) {
                                for (var locationIndex = 0; locationIndex < locationLength; locationIndex++) {
                                    var locationIndex2 = (locationIndex + objectIndex) % locationLength;
                                    var row = intprt[locationIndex];
                                    var lit = { pol: true, rel: cmd.loc.rel, args: [objectKeys[objectIndex], foundLocationKey[locationIndex2]] };
                                    if (row == undefined) {
                                        row = [lit];
                                    }
                                    else {
                                        row.push(lit);
                                    }
                                    intprt[locationIndex] = row;
                                }
                            }
                        }
                        else {
                            objectKeys.forEach(function (key) {
                                foundLocationKey.forEach(function (locationKey) {
                                    intprt.push([{ pol: true, rel: cmd.loc.rel, args: [key, locationKey] }]);
                                });
                            });
                        }
                    }
                    else if (foundLocationKey.length > 0) {
                        //We did not get the right number of results regarding the locations
                        var locationStr = findObject(cmd.loc.ent.obj);
                        switch (cmd.loc.ent.quant) {
                            case "the":
                                throw new Error("The parse is ambiguous! There are several " + locationStr + " locations in the current world. Please specify which one you meant");
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        throw new Error(getNoLocactionFoundMessage(cmd.loc.ent.obj));
                    }
                    break;
            }
        }
        else if (objectKeys.length > 0) {
            //We did not get the right number of results regarding the objects
            var objectStr = findObject(object);
            switch (cmd.ent.quant) {
                case "the":
                    throw new Error("The parse is ambiguous! There are several " + objectStr + "s in the current world. Please specify which one you meant");
                    break;
                default:
                    break;
            }
        }
        else {
            throw new Error(getNoObjectFoundMessage(object));
        }
        //Lastly, go over all the intepretations and filter out non valid ones
        var validInt = [];
        //First go over all the interpretations and filter out non-valid interpretations
        var numberOfOrs = intprt.length;
        intprt.forEach(function (ints) {
            var wasValid = true;
            numberOfOrs--;
            ints.forEach(function (int) {
                try {
                    var validIntFlag = validInterpretation(int, state.objects);
                }
                catch (err) {
                    //err instanceof ValidInterpretationError
                    if (err instanceof ValidInterpretationError && numberOfOrs == 0 && validInt.length == 0) {
                        throw err;
                    }
                }
                if (!validIntFlag) {
                    wasValid = false;
                }
                return true;
            });
            if (wasValid) {
                validInt.push(ints);
            }
            return true;
        });
        return validInt;
    }
    /** Goes through all the available objects (availableObjects), using the object definitions, to check if the wanted object (object)
    *    is inside the current world. If so, the key (character) for that object is added to the returnList and then returned */
    function getObjectKeysWithoutObject(object, availableObjects, objects) {
        //Array to return in the end
        var returnList = [];
        //Number which will be 2 if an object has form, size and color right
        var checked = 0;
        //Flag if we want to find something of a specific size
        var hasSize = object.size != null;
        //Flag if we want to find something of a specific color
        var hasColor = object.color != null;
        //Flags that says if an object (available in the world) has the right property
        var currentHasColor = false;
        var currentHasSize = false;
        availableObjects.forEach(function (availableObject) {
            //Get the properties of the current available object
            var availableObjectDef = objects[availableObject];
            if (object.form == availableObjectDef.form || object.form == "anyform") {
                if (hasSize && object.size == availableObjectDef.size) {
                    checked++;
                    currentHasSize = true;
                }
                if (hasColor && object.color == availableObjectDef.color) {
                    checked++;
                    currentHasColor = true;
                }
                if (checked == 2) {
                    returnList = [];
                    returnList.push(availableObject);
                    return false;
                }
                else {
                    if (hasColor && hasSize) {
                        returnList.push(availableObject);
                    }
                    else if (hasColor && currentHasColor && !currentHasSize) {
                        returnList.push(availableObject);
                    }
                    else if (hasSize && currentHasSize && !currentHasColor) {
                        returnList.push(availableObject);
                    }
                    else if (!hasColor && !hasSize) {
                        returnList.push(availableObject);
                    }
                }
            }
            else if (object.form == "floor") {
                //Check if the location is the floor
                returnList = [];
                returnList.push("floor");
                return false;
            }
            currentHasColor = false;
            currentHasSize = false;
            checked = 0;
            return true;
        });
        return returnList;
    }
    function getObjectKey(object, availableObjects, objects, stacks, filter) {
        //First check if the object contains any object
        if (object.obj) {
            var foundKeys = getObjectKeysWithoutObject(object.obj, availableObjects, objects);
            if (foundKeys.length > 0 && filter) {
                //Now, check which of all the objectKeys returned, fulfils
                // the location criteria.
                return filterOnLocation(foundKeys, object.loc, availableObjects, objects, stacks);
            }
            else {
                return foundKeys;
            }
        }
        else {
            return getObjectKeysWithoutObject(object, availableObjects, objects);
        }
        return [];
    }
    function filterOnLocation(foundKeys, loc, availableObjects, objects, worldStacks) {
        var returnList = [];
        //Get the object associated with the location
        var locationObjects = getObjectKeysWithoutObject(loc.ent.obj, availableObjects, objects);
        if (rightNumberOfResults(loc.ent.quant, locationObjects.length)) {
            locationObjects.forEach(function (locationObject) {
                foundKeys.forEach(function (foundKey) {
                    if (check(foundKey, loc.rel, locationObject, worldStacks)) {
                        returnList.push(foundKey);
                    }
                    return true;
                });
                return true;
            });
        }
        return returnList;
    }
    function rightNumberOfResults(quant, amount) {
        return quant == "the" && amount == 1 || quant != "the" && amount > 0;
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
})(Interpreter || (Interpreter = {}));
///<reference path="Interpreter.ts"/>
var pickDropCost = 100;
/** Generate new ID given a state */
function generateID(state) {
    return prettyMat(state);
}
function prettyMat(mat) {
    var prettyString = "[";
    for (var i = 0; i < mat.length; i++) {
        prettyString += "[";
        for (var j = 0; j < mat[i].length; j++) {
            prettyString += mat[i][j] + "";
            if (j != mat[i].length - 1) {
                prettyString += ",";
            }
        }
        prettyString += "]";
        if (i != mat.length - 1) {
            prettyString += ",";
        }
    }
    prettyString += "]";
    return prettyString;
}
/** Checks if the world (worldstate) is valid, given the top object, bottom object and the list of different objects */
function validPlacement(topObject, bottomObject, objects) {
    //Everything can be placed on the floor
    if (bottomObject == undefined || bottomObject == "floor") {
        return true;
    }
    //console.log("Utils.validPlacement topObject: " + topObject);
    //console.log("Utils.validPlacement bottomObject: " + bottomObject);
    //Balls can't support anything
    if (objects[bottomObject].form == "ball") {
        return false;
    }
    //Small objects can't support large objects
    if (objects[bottomObject].size == "small" && objects[topObject].size == "large") {
        return false;
    }
    // Boxes cannot contain pyramids, planks or boxes of the same size.
    if (objects[bottomObject].form == "box" && (objects[topObject].form == "pyramid" || objects[topObject].form == "plank" || objects[topObject].form == "box") && objects[bottomObject].size == objects[topObject].size) {
        return false;
    }
    //balls should be in boxes or on the floor
    if (objects[topObject].form == "ball" && objects[bottomObject].form != "box") {
        return false;
    }
    //Small boxes cannot be supported by small bricks or pyramids.
    if ((objects[bottomObject].form == "brick" || objects[bottomObject].form == "pyramid") && objects[topObject].form == "box" && objects[topObject].size == "small") {
        return false;
    }
    //Large boxes cannot be supported by large pyramids.
    if (objects[bottomObject].form == "pyramid" && objects[bottomObject].size == "large" && objects[topObject].form == "box" && objects[topObject].size == "large") {
        return false;
    }
    return true;
}
/** Checks if first is allowed to be placed on top of second */
function validPlacementAbove(first, second, objects) {
    if (second == "floor") {
        return true;
    }
    //If second is a ball, then no
    //console.log("Utils.validPlacementAbove objects[second].form=" + objects[second].form);
    if (objects[second].form == "ball") {
        //console.log("Utils.validPlacementAbove THE SECOND OBJECT IS OF FORM BALL! Return false");
        return false;
    }
    //second är small, så måste first vara small
    if (objects[second].size == "small" && objects[first].size != "small") {
        return false;
    }
    //om first är en ball, så måste det finnas en motsvarande box i rätt storlek
    if (objects[first].form == "ball") {
        if (objects[first].size == "large") {
        }
        else {
            //Nånstans i världen måste det finnas en box (valfri storlek)
            //boxElement
            var foundElement = null;
            for (var element in objects) {
                if (objects[element].form == "box") {
                    foundElement = element;
                    break;
                }
            }
            if (foundElement == null) {
                return false;
            }
            if (objects[second].size == "small") {
                //boxElement måste vara litet
                if (objects[foundElement].size != "small") {
                    return false;
                }
            }
            else {
            }
        }
    }
    //Om stor boll, så stor boxes
    //Om liten boll så måste det finnas en box. NEJ, är det undre elementet nått litet, så måste det vara en liten box
    return true;
}
function copyStack(original) {
    var newStack = [];
    for (var i = 0; i < original.length; i++) {
        newStack.push([]);
        for (var j = 0; j < original[i].length; j++) {
            var elementIJ = original[i][j];
            newStack[i].push(elementIJ);
        }
    }
    return newStack;
}
function ontop(first, second, stacks) {
    for (var i = 0; i < stacks.length; i++) {
        if (second == "floor") {
            if (stacks[i][0] == first) {
                return true;
            }
        }
        else {
            for (var j = 0; j < stacks[i].length; j++) {
                if (j < stacks[i].length - 1 && stacks[i][j + 1] == first && stacks[i][j] == second) {
                    return true;
                }
            }
        }
    }
    return false;
}
function above(first, second, stacks) {
    var bool = false;
    for (var i = 0; i < stacks.length; i++) {
        for (var j = 0; j < stacks[i].length; j++) {
            if (bool && stacks[i][j] == first) {
                return true;
            }
            if (j < stacks.length - 1 && stacks[i][j] == second) {
                bool = true;
            }
        }
        if (bool) {
            return false;
        }
    }
    return false;
}
function under(first, second, stacks) {
    return above(second, first, stacks);
}
function beside(first, second, stacks) {
    for (var i = 0; i < stacks.length; i++) {
        for (var j = 0; j < stacks[i].length; j++) {
            if ((stacks[i][j] == first || stacks[i][j] == second) && i < stacks.length - 1) {
                for (var k = 0; k < stacks[i + 1].length; k++) {
                    if (stacks[i + 1][k] == first || stacks[i + 1][k] == second) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
    return false;
}
function left(first, second, stacks) {
    for (var i = 0; i < stacks.length; i++) {
        for (var j = 0; j < stacks[i].length; j++) {
            if (stacks[i][j] == first && i < stacks.length - 1) {
                for (var k = 0; k < stacks[i + 1].length; k++) {
                    if (stacks[i + 1][k] == second) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
    return false;
}
function right(first, second, stacks) {
    return left(second, first, stacks);
}
function holding(first, stacks) {
    for (var i = 0; i < stacks.length; i++) {
        for (var j = 0; j < stacks[i].length; j++) {
            if (stacks[i][j] == first) {
                return j == stacks[i].length - 1;
            }
        }
    }
    return false;
}
function check(first, rel, second, stacks) {
    switch (rel) {
        case "ontop":
            return ontop(first, second, stacks);
        case "inside":
            return ontop(first, second, stacks);
        case "above":
            return above(first, second, stacks);
        case "under":
            return under(first, second, stacks);
        case "beside":
            return beside(first, second, stacks);
        case "leftof":
            return left(first, second, stacks);
        case "rightof":
            return right(first, second, stacks);
        case "holding":
            return holding(first, stacks);
        default:
            ////console.log("check no match");
            return false;
    }
}
var ValidInterpretationError = (function () {
    function ValidInterpretationError(message) {
        this.message = message;
        this.name = "Utils.ValidInterpretationError";
    }
    ValidInterpretationError.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    return ValidInterpretationError;
})();
function getObject(objectDef, id) {
    var object = objectDef[id];
    return object.size + " " + object.color + " " + object.form;
}
function validInterpretation(int, objectDef) {
    var ret = false;
    var extra = " ";
    if (int.args[0] != int.args[1]) {
        switch (int.rel) {
            case "ontop":
            case "inside":
                ret = validPlacement(int.args[0], int.args[1], objectDef);
                //console.log("Utils.validInterpretation ONTOP OR INSIDE RET:" + ret);
                extra = " of ";
                break;
            case "above":
                ret = validPlacementAbove(int.args[0], int.args[1], objectDef);
                break;
            case "under":
                //Same as above, just flipped order on the arguments
                ret = validPlacementAbove(int.args[1], int.args[0], objectDef);
                break;
            default:
                ret = true;
                break;
        }
    }
    //console.log("Utils.validInterpretation ret: " + ret + ". first: " + int.args[0] + " sec: " + int.args[1]);
    if (!ret) {
        throw new ValidInterpretationError("It is not possible to put the " + getObject(objectDef, int.args[0]) + " " + int.rel + extra + "the " + getObject(objectDef, int.args[1]));
    }
    return ret;
}
/// <reference path="../World.ts" />
/// <reference path="graph.ts" />
/// <reference path="../Utils.ts" />
/*
function permutate(initWorld: WorldState):graphmodule.Graph<string[][]>{

    var stack :string[][][] = [][][];
    var graph = new graphmodule.Graph<string[][]>();
    
    graph.addNode(new graphmodule.GraphNode(initWorld.stacks.toString(), initWorld.stacks));
    stack.push(initWorld.stacks);
    
    var columns = initWorld.stacks.length;
    var initState = stack.pop();
    var initStateID = initState.toString();
    while(initState != undefiend){
        for(var i = 0; i < columns; i++){
            
            var newState = copyStack(initState);
            
            if(newState[i].length > 0){
                var topObject = newState[i].pop();
            
                for(var j = 0; j < columns; j++){
                    if(j != i){
                        var newState2 = copyStack(newState);
                        
                        var lastElementInStack = newState2[i][newState[i].length-1];
                        if(newState2[j].length == 0 || objectAllowedOnTop(topObject, lastElementInStack, newState2[j])){
                            newState2[j].push(topObject);
                        
                            //Add the state to the graph
                            //Add the new state
                            var id = newState2.toString();
                            if(graph.addNode(new graphmodule.GraphNode(id, newState2))){
                                stack.push(newState2);
                            }
                            //Add an edge between the initState and the newState2
                            graph.addEdge(initStateID, id, 1, true);

                                
                        }
                        
                    }
                }
            }
            
        }
        initState = stack.pop();
        initStateID = initState.toString();
    }

}
*/
function permutateBasedOn(baseOn, prevNode, objects, graph) {
    //Get the data that the given node contains
    var baseOnState = baseOn.data;
    //Get the number of columns within this world
    var columns = baseOnState.length;
    console.log("permutate.permutateBasedOn starting permutation----------------------------");
    for (var i = 0; i < columns; i++) {
        //Copy the given state (given)
        var newState = copyStack(baseOnState);
        //If this column in the new state has any data, work on it
        // otherwise this column does not have any data, so continue
        // with the next column
        if (newState[i].length > 0) {
            //Get the top object from the current
            // column and remove it from the state
            var topObject = newState[i].pop();
            for (var j = 0; j < columns; j++) {
                ////console.log("permutate.permutateBasedOn.forloop J, j=" + j + ", i=" + i);
                //Only if the two columns are different, we do not
                // want to put the picked up object (topObject) back
                // to the same column that we took it from
                if (j != i) {
                    //Copy the newState (which now does not have the topObject)
                    var newState2 = copyStack(newState);
                    //console.log("permutate.permutateBasedOn.newState:   " + newState);
                    //console.log("permutate.permutateBasedOn.newState2:   " + newState2);
                    ////console.log("permutate.permutateBasedOn.stateSame1:   " + (newState2==newState));
                    ////console.log("permutate.permutateBasedOn.stateSame2:   " + (newState2===newState));
                    //Get the last (next top) object from the newState2, which
                    // is the state where the topObject is gone
                    var lastElementInStack = newState2[j][newState[j].length - 1];
                    //console.log("permutate.permutateBasedOn.newState2 l: " + lastElementInStack);
                    //In case that lastElementInStack is undefined, it means that the stack j
                    // is empty and the topObject should be able to be put to that column.
                    //This is also checked by the length == 0
                    if (newState2[j].length == 0 || validPlacement(topObject, lastElementInStack, objects)) {
                        //Push the topObject to the column (putting it there)
                        newState2[j].push(topObject);
                        //Add the state to the return list as a new valid state
                        var newId = generateID(newState2);
                        var newNode = new graphmodule.GraphNode(newId, newState2);
                        //Add the neighbour to the graph
                        graph.addNode(newNode);
                        //arm possition
                        var arm = i;
                        if (prevNode != undefined) {
                            arm = movedTo(prevNode.data, baseOnState);
                        }
                        //Add edge between current node and neighbour
                        graph.addEdge(baseOn.id, newNode.id, Math.abs(j - i) + pickDropCost + Math.abs(arm - i), true);
                    }
                }
            }
        }
    }
}
function movedTo(from, to) {
    for (var i = 0; i < from.length; i++) {
        if (to[i].length > from[i].length) {
            return i;
        }
    }
    return undefined;
}
///<reference path="../World.ts"/>
var heuristics;
(function (_heuristics) {
    function heuristicOntop(first, second, stacks) {
        var foundF = -1;
        var foundS = -1;
        var h = 0;
        if (second == "floor") {
            h = Number.POSITIVE_INFINITY;
            for (var i = 0; i < stacks.length; i++) {
                if (stacks[i].length < h) {
                    foundS = i;
                    h = stacks[i].length * (pickDropCost + 1);
                }
            }
        }
        for (var i = 0; i < stacks.length; i++) {
            for (var j = 0; j < stacks[i].length; j++) {
                if (stacks[i][j] == second) {
                    foundS = i;
                    if (stacks[i].length - 1 > j && stacks[i][j + 1] == first) {
                        return 0;
                    }
                    h += (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
                if (stacks[i][j] == first) {
                    if (j == 0 && second == "floor") {
                        return 0;
                    }
                    foundF = i;
                    h += (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
                if (foundF != -1 && foundS != -1) {
                    return h + Math.abs(foundS - foundF) + pickDropCost;
                }
            }
        }
        return h + Math.abs(foundS - foundF) + pickDropCost;
    }
    function heuristicAbove(first, second, stacks) {
        var foundF = -1;
        var foundS = -1;
        var h = 0;
        for (var i = 0; i < stacks.length; i++) {
            for (var j = 0; j < stacks[i].length; j++) {
                if (stacks[i][j] == second) {
                    foundS = i;
                    for (var k = j; k < stacks[i].length; k++) {
                        if (stacks[i][k] == first) {
                            return 0;
                        }
                    }
                }
                if (stacks[i][j] == first) {
                    foundF = i;
                    h = (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
                if (foundF != -1 && foundS != -1) {
                    return h + Math.abs(foundS - foundF) + pickDropCost;
                }
            }
        }
        return h + Math.abs(foundS - foundF) + pickDropCost;
    }
    function heuristicUnder(first, second, stacks) {
        return heuristicAbove(second, first, stacks);
    }
    function heuristicBeside(first, second, stacks) {
        var foundF = -1;
        var foundS = -1;
        var hF = 0;
        var hS = 0;
        for (var i = 0; i < stacks.length; i++) {
            for (var j = 0; j < stacks[i].length; j++) {
                if (stacks[i][j] == second) {
                    foundS = i;
                    if (!foundF && stacks.length - 1 > i) {
                        for (var k = 0; k < stacks[i + 1].length; k++) {
                            if (stacks[i + 1][k] == first) {
                                return 0;
                            }
                        }
                    }
                    hS = (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
                if (stacks[i][j] == first) {
                    foundF = i;
                    if (!foundS && stacks.length - 1 > i) {
                        for (var k = 0; k < stacks[i + 1].length; k++) {
                            if (stacks[i + 1][k] == first) {
                                return 0;
                            }
                        }
                    }
                    hF = (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
                if (foundF && foundS) {
                    return Math.min(hF, hS) + Math.abs(foundS - foundF) + pickDropCost;
                }
            }
        }
        return Math.min(hF, hS) + Math.abs(foundS - foundF) + pickDropCost;
    }
    function heuristicLeft(first, second, stacks) {
        var foundF = -1;
        var foundS = -1;
        var hF = 0;
        var hS = 0;
        for (var i = 0; i < stacks.length; i++) {
            for (var j = 0; j < stacks[i].length; j++) {
                if (stacks[i][j] == second) {
                    foundS = i;
                    hS = (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
                if (stacks[i][j] == first) {
                    foundF = i;
                    if (!foundS) {
                        for (var k = 0; k < stacks[i + 1].length; k++) {
                            if (stacks.length - 1 > i && stacks[i + 1][k] == first) {
                                return 0;
                            }
                        }
                    }
                    hF = (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
                if (foundF && foundS) {
                    return Math.min(hF, hS) + Math.abs(foundS - foundF) + pickDropCost;
                }
            }
        }
        return Math.min(hF, hS) + Math.abs(foundS - foundF) + pickDropCost;
    }
    function heuristicRight(first, second, stacks) {
        return heuristicLeft(second, first, stacks);
    }
    function heuristicHold(first, stacks) {
        for (var i = 0; i < stacks.length; i++) {
            for (var j = 0; j < stacks[i].length; j++) {
                if (stacks[i][j] == first) {
                    return (stacks[i].length - 1 - j) * (pickDropCost + 1);
                }
            }
        }
        return 0;
    }
    function heuristics(first, rel, second, stacks) {
        switch (rel) {
            case "ontop":
                return heuristicOntop(first, second, stacks);
            case "inside":
                return heuristicOntop(first, second, stacks);
            case "above":
                return heuristicAbove(first, second, stacks);
            case "under":
                return heuristicUnder(first, second, stacks);
            case "beside":
                return heuristicBeside(first, second, stacks);
            case "leftof":
                return heuristicLeft(first, second, stacks);
            case "rightof":
                return heuristicRight(first, second, stacks);
            case "holding":
                return heuristicHold(first, stacks);
            default:
                ////console.log("heuristics no match");
                return 0;
        }
    }
    _heuristics.heuristics = heuristics;
})(heuristics || (heuristics = {}));
/// <reference path="../../lib/typescript-collections/collections.ts" />
/// <reference path="../graph.ts" />
/// <reference path="../astar.ts" />
/// <reference path="../../World.ts"/>
/// <reference path="../permutate.ts"/>
/// <reference path="../../heuristic/Heuristic.ts"/>
/// <reference path="../../Utils.ts" />
/** A graph which has a worldstate as data for the nodes */
var StateGraph = (function () {
    function StateGraph() {
        this.startState = [["e"], ["g", "l"], [], ["k", "m", "f"], []];
        this.graph = new graphmodule.Graph();
        this.endWorld = {
            "stacks": [[], ["g", "l"], [], ["m", "f"], ["k", "e"]],
            "holding": null,
            "arm": 0,
            "objects": {
                "a": { "form": "brick", "size": "large", "color": "green" },
                "b": { "form": "brick", "size": "small", "color": "white" },
                "c": { "form": "plank", "size": "large", "color": "red" },
                "d": { "form": "plank", "size": "small", "color": "green" },
                "e": { "form": "ball", "size": "large", "color": "white" },
                "f": { "form": "ball", "size": "small", "color": "black" },
                "g": { "form": "table", "size": "large", "color": "blue" },
                "h": { "form": "table", "size": "small", "color": "red" },
                "i": { "form": "pyramid", "size": "large", "color": "yellow" },
                "j": { "form": "pyramid", "size": "small", "color": "red" },
                "k": { "form": "box", "size": "large", "color": "yellow" },
                "l": { "form": "box", "size": "large", "color": "red" },
                "m": { "form": "box", "size": "small", "color": "blue" }
            },
            "examples": [
                "put the brick that is to the left of a pyramid in a box",
                "put the white ball in a box on the floor",
                "move the large ball inside a yellow box on the floor",
                "move the large ball inside a red box on the floor",
                "take a red object",
                "take the white ball",
                "put all boxes on the floor",
                "put the large plank under the blue brick",
                "move all bricks on a table",
                "move all balls inside a large box"
            ]
        };
    }
    StateGraph.prototype.computePath = function (startPos, hFun) {
        var _this = this;
        //console.log("Start av computePath");
        return astar.compute(this.graph, startPos, function (currentNode) {
            return _this.matrixEquality(currentNode.data, _this.endWorld.stacks);
        }, hFun, function (baseOn) {
            //console.log("Generate next state");
            return permutateBasedOn(baseOn, _this.endWorld.objects);
        });
    };
    StateGraph.prototype.heuristicFunction = function (startNode) {
        return heuristics.worldHeuristics(startNode, [[], ["g", "l"], [], ["m", "f"], ["k", "e"]]);
    };
    StateGraph.prototype.matrixEquality = function (first, second) {
        for (var i = 0; i < first.length; i++) {
            if (first[i].length != second[i].length) {
                return false;
            }
            for (var j = 0; j < first[i].length; j++) {
                if (first[i][j] != second[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };
    return StateGraph;
})();
function runExample(element) {
    var stateGraph = new StateGraph();
    element.innerHTML += "Graph used (stateGraph):";
    element.innerHTML += "<br><br>";
    var startID = generateID(stateGraph.startState);
    var startNode = new graphmodule.GraphNode(startID, stateGraph.startState);
    stateGraph.graph.addNode(startNode);
    element.innerHTML += stateGraph.graph.toString();
    element.innerHTML += "<br>";
    var result = stateGraph.computePath(startID, stateGraph.heuristicFunction);
    element.innerHTML += "KLAR<br>";
    element.innerHTML += "<br>Result:";
    if (result != undefined) {
        element.innerHTML += result.toString();
    }
    else {
        element.innerHTML += "Result undefined, no path found... sucky AI";
    }
    element.innerHTML += "<br>End of result<br>";
    //console.log("Everything is DONE");
}
window.onload = function () {
    var el = document.getElementById('content');
    runExample(el);
};
