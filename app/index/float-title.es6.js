'use strict';

export default class FloatTitle{

  constructor( title = 'Hello World' ){
    this.title = title;
  }

  run() {
  }
  *[Symbol.iterator](){
    let arr = [1, 2, 3, 4, 5];
    for(let item of arr){
      yield item;
    }
  }
}
