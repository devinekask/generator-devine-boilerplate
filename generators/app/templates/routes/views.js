'use strict';

module.exports = [

  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply.view('index', {
      name: '<%= author %>',
      title: '<%= projectname %>'
    })
  }

];
