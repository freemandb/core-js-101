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

const builder = cssSelectorBuilder;

// builder.element('table').element('div');
// builder.id('id1').id('id2');
builder.pseudoElement('after').pseudoElement('before');

// console.log(builder.combine(
//   builder.element('div').id('main').class('container').class('draggable'),
//   '+',
//   builder.combine(
//     builder.element('table').id('data'),
//     '~',
//     builder.combine(
//       builder.element('tr').pseudoClass('nth-of-type(even)'),
//       ' ',
//       builder.element('td').pseudoClass('nth-of-type(even)'),
//     ),
//   ),
// ).stringify());
