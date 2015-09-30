'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/hello',
    handler: (request, reply) => reply({
      'data': 'hello'
    })
  }

];
