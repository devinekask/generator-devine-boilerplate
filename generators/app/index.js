const generator = require(`yeoman-generator`);

const spawn = require(`child_process`).spawnSync;

module.exports = generator.Base.extend({

  _copy(file){
    console.log(this.props);
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(file),
      this.props
    );
  },

  initializing(){

    this.props = {

      react: false,
      redux: false,
      reactRouter: false,

      node: false,
      mongoose: false,
      heroku: false,

      jest: false

    };

  },

  prompting(){

    return this.prompt([{
      type: `input`,
      name: `name`,
      message: `Your project name`,
      default: this.appname
    }, {
      type: `confirm`,
      name: `react`,
      default: false,
      message: `Do you need a React? (No)`
    }, {
      when: r => r.react,
      type: `confirm`,
      name: `reactRouter`,
      default: false,
      message: `with React-Router? (No)`
    }, {
      when: r => r.react,
      type: `confirm`,
      name: `redux`,
      default: false,
      message: `with Redux? (No)`
    }, {
      type: `confirm`,
      name: `node`,
      default: false,
      message: `Do you need a Node server? (Hapi) (No)`
    }, {
      when: r => r.node,
      type: `confirm`,
      name: `mongoose`,
      default: false,
      message: `with MongoDB? (Mongoose) (No)`
    }, {
      when: r => r.node,
      type: `confirm`,
      name: `heroku`,
      default: true,
      message: `ready for deployment to Heroku? (Yes)`
    }, {
      type: `confirm`,
      name: `jest`,
      default: false,
      message: `need testing? (Jest) (No)`
    }]).then(props => {
      this.props = Object.assign(this.props, props);
    });

  },

  writing: {

    app(){

    },

    settings(){

      const eslint = [
        `.eslintignore`,
        `.eslintrc`,
      ];

      const git = [
        `README.md`,
        `.gitignore`
      ];

      const babel = [
        `.babelrc`
      ];

      const postcss = [
        `postcss.config.js`
      ];

      const stylelint = [
        `.stylelintrc`
      ];

      const webpack = [
        `webpack.config.js`
      ];

      const npm = [
        `package.json`
      ];

      let files = [
        ...eslint,
        ...git,
        ...babel,
        ...postcss,
        ...stylelint,
        ...webpack,
        ...npm
      ];

      if(this.props.node){

        const node = [
          `.env`,
          `nodemon.json`,
        ];

        files = [...files, ...node];

      }

      files.forEach(f => this._copy(f));

    }

  },

  install(){

    spawn(`git`, [`init`], {stdio: `inherit`});

    spawn(`git`, [`add`, `.`], {stdio: `inherit`});
    spawn(`git`, [`commit`, `-m`, `"initial commit"`], {stdio: `inherit`});

  }

});
