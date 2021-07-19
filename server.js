var express = require('express');
var {
    graphqlHTTP
} = require('express-graphql');
var {
    buildSchema
} = require('graphql');
const mongoose = require('mongoose');
const controller = require('./controllers/controller');
const bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();

let dbUrl = 'mongodb+srv://poulu:password@1234@cluster0.j1jen.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if (err) {
        console.log("Database connection Error")
    } else {
        // controller.insertContinents();
        // controller.insertCountries();
        // controller.insertLanguages();
        console.log("Database connection Succesful");
    }
})


// GraphQL schema
var schema = buildSchema(`
  type language {
    code:String
    name: String
  }
  type Country {
    name: String
    native: String
    capital: String
    currency: String
    languages: [language]
  }
  type Query {
    country(code: String): Country
  }`);

// Root resolver
var root = {
    country:  async (args) => {
        let data = await controller.fetchByCountry(args.code);
        console.log(data);
        return data;
    }
};

// var root = {
//     country: (args) => {
//       var output = [];
//       for (var i = 0; i < args.numDice; i++) {
//         output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
//       }
//       return output;
//     }
//   };

app.use(logger('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.get('/hi', async (req, res, next) => {
    let data = await controller.fetchByCountry("BR");
    //console.log("data from ..............", data)
    res.status(200).send({
        msg: "data sucees",
        data: data
    });
})
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));