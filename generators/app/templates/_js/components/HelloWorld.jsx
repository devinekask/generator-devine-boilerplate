import React from 'react';

const HelloWorld = props => {

  let {author} = props;

  return (
    <header>
      <h1>Hello {author}</h1>
    </header>
  );

};

HelloWorld.propTypes = {
  author: PropTypes.string
};

export default HelloWorld;
