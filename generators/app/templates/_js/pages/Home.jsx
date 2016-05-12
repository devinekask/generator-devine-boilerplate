import React from 'react';

import {HelloWorld} from '../components/';

const Home = () => {
  return (
    <section>
      <HelloWorld author='<%= author %>'/>
    </section>
  );
};

export default Home;
