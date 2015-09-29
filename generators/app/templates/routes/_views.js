'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/hellohbs',
    handler: (request, reply) => reply.view('hello', {
      name: '<%= author %>'
    })
  }

];
