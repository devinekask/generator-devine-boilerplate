'use strict';

module.exports = function(name, options){

  console.log(this);

  if(!this._sections){
    this._sections = {};
  }
  this._sections[name] = options.fn(this);

  return null;

};
