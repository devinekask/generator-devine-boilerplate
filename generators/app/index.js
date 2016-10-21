const Base = require(`yeoman-generator`).Base;
const chalk = require(`chalk`);
const yosay = require(`yosay`);
const path = require(`path`);

const fs = require(`fs`);
const mkdirp = require(`mkdirp`);

const spawn = require(`child_process`).spawnSync;
const exec = require(`child_process`).execSync;

module.exports = Base.extend({

  prompting: () => {

    const done = this.async();

    let defaultAuthor = exec(`npm config get init.author.name`, {encoding: `utf-8`}) || ``;

    if(defaultAuthor.indexOf(`\n`) !== -1){
      defaultAuthor = defaultAuthor.split(`\n`)[0];
    }

    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the splendid ${chalk.red(`Devine Project`)} generator!`
    ));

    const prompts = [
      {
        type: `input`,
        name: `projectname`,
        message: `Your project name`,
        default: process.cwd().split(path.sep).pop()
      }, {
        type: `input`,
        name: `author`,
        message: `Your name`,
        default: defaultAuthor
      }, {
        type: `confirm`,
        name: `test`,
        message: `Need testing (Jest)? (Yes)`,
        default: true
      }, {
        type: `confirm`,
        name: `react`,
        message: `Using React (with JSX)? (No)`,
        default: false
      }, {
        when: response => response.react,
        type: `confirm`,
        name: `reactRouter`,
        message: `Using React-Router? (No)`,
        default: false
      }, {
        when: response => response.react,
        type: `confirm`,
        name: `redux`,
        message: `Using Redux? (No)`,
        default: false
      }, {
        type: `confirm`,
        name: `node`,
        message: `Do you need a Node server (Hapi)? (Yes)`,
        default: true
      }, {
        when: response => response.node,
        type: `confirm`,
        name: `heroku`,
        message: `Make your project ready for Heroku deployment? (No)`,
        default: false
      }, {
        type: `confirm`,
        name: `git`,
        message: `create a git repository (+ initial commit)? (Yes)`,
        default: true
      }
    ];

    this.prompt(prompts, props => {

      this.props = props;

      if(!this.props.heroku){
        this.heroku = false;
      }

      if(!this.props.reactRouter){
        this.reactRouter = false;
      }

      if(!this.props.redux){
        this.redux = false;
      }

      if(!this.props.react){
        this.react = false;
      }

      if(!this.props.test){
        this.test = false;
      }

      for(const prop in this.props){
        this[prop] = this.props[prop];
      }

      this.year = new Date().getFullYear();
      this.pwd = Math.random().toString(36).substring(5);

      done();

    });

  },

  _copy: file => {
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(file),
      this,
      {
        interpolate: /<%=([\s\S]+?)%>/g
      }
    );
  },

  writing: {

    app: () => {

      const files = [
        `_js/script.js`,
        `_scss/style.scss`, `_scss/_reset.scss`
      ];

      if(this.hbsClient){
        files.push(`_hbs/helloworld.hbs`);
      }

      if(this.hbsClient && !this.hbsServer){

        this.fs.copyTpl(
          this.templatePath(`templates/helpers/uppercase.js`),
          this.destinationPath(`_helpers/uppercase.js`),
          this,
          {
            interpolate: /<%=([\s\S]+?)%>/g
          }
        );

      }

      if(!this.node){

        files.push(`index.html`);

      }else{

        if(this.hbsClient){
          fs.mkdir(`./_helpers`);
        }

        files.push(`server.js`, `routes/index.js`,
          `routes/static.js`,
          `plugins/index.js`, `plugins/helloplugin.js`,
          `modules/validateFileName.js`);

        if(this.mongoose){
          mkdirp(`./models/mongoose`);
        }

        files.push(`routes/api.js`);

        if(this.hbsServer){

          files.push(`routes/views.js`, `templates/index.hbs`,
            `templates/helpers/uppercase.js`, `templates/helpers/section.js`,
            `templates/partials/welcome.hbs`);

          this.fs.copyTpl(
            this.templatePath(`index.html`),
            this.destinationPath(`templates/layouts/layout.hbs`),
            this,
            {
              interpolate: /<%=([\s\S]+?)%>/g
            }
          );

        }else{

          this.fs.copyTpl(
            this.templatePath(`index.html`),
            this.destinationPath(`public/index.html`),
            this,
            {
              interpolate: /<%=([\s\S]+?)%>/g
            }
          );

        }

        fs.mkdir(`./models`);

      }

      if(this.test){
        fs.mkdir(`./test`);
      }

      if(this.react){

        files.push(`./_js/components/index.js`);
        files.push(`./_js/components/HelloWorld.jsx`);

        if(this.reactRouter){
          files.push(`./_js/router/index.js`);
          files.push(`./_js/pages/index.js`);
          files.push(`./_js/pages/Home.jsx`);
        }

        if(this.redux){
          mkdirp(`./_js/actions`);
          mkdirp(`./_js/constants`);
          mkdirp(`./_js/containers`);
          mkdirp(`./_js/reducers`);
          mkdirp(`./_js/store`);
        }


      }

      for(let i = 0; i < files.length; i++){
        this._copy(files[i]);
      }

    },

    projectfiles: () => {

      const files = [
        `.babelrc`, `.editorconfig`,
        `.eslintignore`,
        `_config.js`, `webpack.config.js`,
        `package.json`,
        `README.md`, `LICENSE`
      ];

      if(this.node){

        files.push(`nodemon.json`, `.env`);

        if(this.heroku){
          files.push(`Procfile`, `.slugignore`);
        }
      }

      for(let i = 0; i < files.length; i++){
        this._copy(files[i]);
      }

      this.fs.copyTpl(
        this.templatePath(`_.eslintrc`),
        this.destinationPath(`.eslintrc`),
        this,
        {
          interpolate: /<%=([\s\S]+?)%>/g
        }
      );

      if(this.git){

        this.fs.copyTpl(
          this.templatePath(`_gitignore`),
          this.destinationPath(`.gitignore`),
          this,
          {
            interpolate: /<%=([\s\S]+?)%>/g
          }
        );

      }

    }

  },

  install: () => {

    if(this.git){
      spawn(`git`, [`init`], {stdio: `inherit`});
    }

    spawn(`yarn`, {stdio: `inherit`});

    if(this.git){
      spawn(`git`, [`add`, `.`], {stdio: `inherit`});
      spawn(`git`, [`commit`, `-m`, `"initial commit"`], {stdio: `inherit`});
    }

    spawn(`npm`, [`run`, `development`], {stdio: `inherit`});

  }

});
