'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var spawn = require('child_process').spawnSync;

module.exports = yeoman.generators.Base.extend({


  prompting: function(){

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the splendid ' + chalk.red('Devine Project') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectname',
        message: 'Your project name',
        default: process.cwd().split(path.sep).pop()
      },{
        type: 'input',
        name: 'author',
        message: 'Your name',
      },{
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '0.1.0'
      },{
        type: 'confirm',
        name: 'node',
        message: 'Do you need a Node server? (Yes)',
        default: true
      },{
        type: 'confirm',
        name: 'git',
        message: 'init an empty git repository? (Yes)',
        default: true
      }
    ];

    this.prompt(prompts, function(props){
      this.props = props;
      for(var prop in this.props){
        this[prop] = this.props[prop];
      }
      this.year = new Date().getFullYear();
      done();
    }.bind(this));

  },

  _copy: function(file){
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(file),
      this
    );
  },

  writing: {

    app: function(){

      var files = [
        '_hbs/helloworld.hbs',
        '_helpers/uppercase.js',
        '_js/script.js',
        '_scss/style.scss', '_scss/_reset.scss', '_scss/_mixins.scss',
      ];


      if(!this.node){
        files.push('index.html');
      }else{
        files.push('server.js');
        files.push('routes/index.js', 'routes/static.js');
      }

      for(var i = 0; i < files.length; i++){
        this._copy(files[i]);
      }

      if(this.node){
        this.fs.copyTpl(
          this.templatePath('index.html'),
          this.destinationPath('public/index.html'),
          this
        );
      }

    },

    projectfiles: function(){

      var files = [
        '.babelrc', '.editorconfig',
        '.eslintrc',
        '_config.js', 'webpack.config.js',
        'package.json', 'gulpfile.js',
        'README.md', 'LICENSE'
      ];

      if(this.node){
        files.push('.nodemonignore')
      }

      for(var i = 0; i < files.length; i++){
        this._copy(files[i]);
      }

      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore'),
        this
      );

    }

  },

  install: function(){

    if(this.git){
      spawn('git', ['init'], { stdio: 'inherit' });
      spawn('git', ['add', '.'], { stdio: 'inherit' });
      spawn('git', ['commit', '-m', '"initial commit"'], { stdio: 'inherit' });
    }

    spawn('npm', ['install'], { stdio: 'inherit' });
    spawn('npm', ['run', 'development'], { stdio: 'inherit' });

  }

});
