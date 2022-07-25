/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;

  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  const values = Object.values(obj);

  return new proto.constructor(...values);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  element(value) {
    const retObj = Object.create(this);
    if (retObj.elementName) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (retObj.idName || retObj.className || retObj.attrName
      || retObj.pseudoClassName || retObj.pseudoElementName) {
      console.log(`id = ${retObj.idName}`);
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    retObj.elementName = value;
    return retObj;
  },

  id(value) {
    const retObj = Object.create(this);
    if (retObj.idName) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (retObj.className || retObj.attrName
      || retObj.pseudoClassName || retObj.pseudoElementName) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    retObj.idName = `#${value}`;
    return retObj;
  },

  class(value) {
    const retObj = Object.create(this);
    if (retObj.attrName
      || retObj.pseudoClassName || retObj.pseudoElementName) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (!retObj.className) {
      retObj.className = [];
    }
    retObj.className.push(`.${value}`);
    return retObj;
  },

  attr(value) {
    const retObj = Object.create(this);
    if (retObj.pseudoClassName || retObj.pseudoElementName) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (!retObj.attrName) {
      retObj.attrName = [];
    }
    retObj.attrName.push(`[${value}]`);
    return retObj;
  },

  pseudoClass(value) {
    const retObj = Object.create(this);
    if (retObj.pseudoElementName) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    if (!retObj.pseudoClassName) {
      retObj.pseudoClassName = [];
    }
    retObj.pseudoClassName.push(`:${value}`);
    return retObj;
  },

  pseudoElement(value) {
    const retObj = Object.create(this);
    if (retObj.pseudoElementName) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    retObj.pseudoElementName = `::${value}`;
    return retObj;
  },

  combine(selector1, combinator, selector2) {
    const ret = {
      val1: selector1.stringify(),
      val2: selector2.stringify(),
      com: combinator,
      stringify() {
        return `${this.val1} ${this.com} ${this.val2}`;
      },
    };


    return ret;
  },

  stringify() {
    let retStr = '';
    if (this.elementName) {
      retStr += this.elementName;
    }
    if (this.idName) {
      retStr += this.idName;
    }
    if (this.className) {
      retStr += this.className.join('');
    }
    if (this.attrName) {
      retStr += this.attrName.join('');
    }
    if (this.pseudoClassName) {
      retStr += this.pseudoClassName.join('');
    }
    if (this.pseudoElementName) {
      retStr += this.pseudoElementName;
    }

    return retStr;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
