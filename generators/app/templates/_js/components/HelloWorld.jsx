import React, {Component, PropTypes} from 'react';

class HelloWorld extends Component {

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

HelloWorld.propTypes = {
  author: PropTypes.string
};

export default HelloWorld;
