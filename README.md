# Dommus - Remote module

> Dommus is an Arduino based home automation system prototype using MEAN Stack. More informations about this module will be provided later.

## Run the project locally

1. Install [Node.js](https://nodejs.org/en/)
2. Install [MongoDB](https://www.mongodb.com/)
3. Install nodemon globally

```sh
npm install -g nodemon
```

4. Clone the project and install the dependencies

```sh
git clone https://github.com/mateusrdgs/dommus-remote.git
cd dommus-remote
npm install
```

5. Run the project

```sh
npm start
```

## Project stack

- Platform: [Node.js](https://nodejs.org/en/)
- Web framework: [Express](http://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)

## Folders structure

    .
    ├── api/
    |   ├── config/
    |   |   └── database.js
    |   ├── controllers/
    |   |   └── account.js
    |   |   └── board.js
    |   |   └── component.js
    |   |   └── residence.js
    |   |   └── room.js
    |   |   └── user.js
    |   ├── helper/
    |   |   └── componentGenerator.js
    |   |   └── helper.js
    |   |   └── pinGenerator.js
    |   ├── middlewares/
    |   |   └── account.js
    |   |   └── board.js
    |   |   └── component.js
    |   |   └── residence.js
    |   |   └── room.js
    |   |   └── user.js
    |   ├── models/
    |   |   └── account.js
    |   |   └── board.js
    |   |   └── component.js
    |   |   └── residence.js
    |   |   └── room.js
    |   |   └── user.js
    |   ├── routes/
    |   |   └── index.js
    ├── .babelrc
    ├── .eslintrc
    ├── .gitignore
    ├── CONTRIBUTING.md
    ├── index.js
    ├── LICENSE
    ├── nodemon.json
    ├── package.json
    ├── README.md
    └── yarn.lock

## Versioning

To keep better organization of releases we follow the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## Contributing

Find on our [roadmap](https://github.com/mateusrdgs/Remote/issues/1) the next steps of the project ;)

Want to contribute? [Follow these recommendations](https://github.com/mateusrdgs/Remote/blob/master/CONTRIBUTING.md).

## History

See [Releases](https://github.com/mateusrdgs/Remote/releases) for detailed changelog.

## License

[MIT License](https://github.com/mateusrdgs/Remote/blob/master/LICENSE) © [mateusrdgs](https://mateusrdgs.github.io)