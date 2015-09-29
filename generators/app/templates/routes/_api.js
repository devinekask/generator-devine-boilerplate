'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/helloapi',
    handler: (request, reply) => reply({
      'data': 'helloworld'
    })
  }

];
