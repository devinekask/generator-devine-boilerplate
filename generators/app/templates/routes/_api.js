'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/helloworld',
    handler: (request, reply) => {
      return reply({
        'data': 'helloworld'
      });
    }
  }

];
