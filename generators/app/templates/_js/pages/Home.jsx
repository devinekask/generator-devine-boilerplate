import React, {Component} from 'react';

import {HelloWorld} from '../components/';

class Home extends Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <section>
        <HelloWorld author='<%= author %>'/>
      </section>
    );
  }

}

export default Home;
