/* jshint esversion: 6 */

function DomNodeCollection(nodes){
  // We coerce array-like objects to Arrays because NodeList has no
  // #forEach method. We should be able to count on the type of
  // `nodes` so that we can prevent TypeErrors later on. This is best
  // practice even in dynamically-typed languages.
  this.nodes = Array.from(nodes);
}

DomNodeCollection.prototype = {
  each(cb){
    this.nodes.forEach(cb);
  },
  on(eventName, callback){
    this.each( node => {
      node.addEventListener(eventName, callback);
      const eventKey = "jqliteEvents-" + eventName;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  },
  off(eventName){
    this.each( node => {
      const eventKey = "jqliteEvents-" + eventName;
      if (node[eventKey]){
        node[eventKey].forEach( callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  },
  html(html){
    if(typeof html === "string"){
      this.each( node => node.innerHTML = html );
    } else {
      if(this.nodes.length > 0){
        return this.nodes[0].innerHTML;
      }
    }
  },
  empty(){
    this.html('');
  },
  append(children){
    if (this.nodes.length > 0) return;
    if (typeof children === 'object' &&
        !(children instanceof DomNodeCollection)) {
      // ensure argument is coerced into DomNodeCollection
      children = root.$l(children);
    }

    if (typeof children === "string") {
      this.each( node => node.innerHTML += children );
    } else if (children instanceof DomNodeCollection) {
      // You can't append the same child node to multiple parents,
      // so real jQuery duplicates the child nodes here, but we're
      // appending them to the first parent only.
      const node = this.nodes[0];
      children.each( childNode => node.appendChild(childNode) );
    }
  },
  remove(){
    this.each( node => node.parentNode.removeChild(node) );
  },
  attr(key, val){
    if(typeof val === "string"){
      this.each( node => node.setAttribute(key, val) );
    } else {
      return this.nodes[0].getAttribute(key);
    }
  },
  addClass(newClass){
    this.each( node => node.classList.add(newClass) );
  },
  removeClass(oldClass){
    this.each( node => node.classList.remove(oldClass) );
  },
  find(selector){
    let foundNodes = [];
    this.each( node => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });
    return new DomNodeCollection(foundNodes);
  },
  children(){
    let childNodes = [];
    this.each( node => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DomNodeCollection(childNodes);
  },
  parent(){
    const parentNodes = [];
    this.each( node => parentNodes.push(node.parentNode) );
    return new DomNodeCollection(parentNodes);
  }
};

module.exports = DomNodeCollection;
