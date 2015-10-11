'use strict';

import React, {Component, PropTypes} from 'react';

export default class HelloWorld extends Component {

  static propTypes = {
    author: PropTypes.string
  }

  constructor(props, context){
    super(props, context);
  }

  render() {
    let {author} = this.props;
    return (
      <header>
        <h1>Hello {author}</h1>
      </header>
    );
  }

}
