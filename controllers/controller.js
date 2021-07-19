const countriesModel = require('../models/countries');
const languagesModel = require('../models/languages');
const continentsModel = require('../models/continents');
let xlsx = require('../utils/xlsxHelper');
module.exports = {

    insertCountries: () => {
        try {
            let data = xlsx.loadDataFromCSV('./assets/countries.csv'); // Importing Data from CSV
            data.forEach(item =>
                item.languages = item.languages ? item.languages.split(",") : []
            )
            countriesModel.insertMany(data, (err, result) => {
                if (err) {
                    console.log("Error from DB", err)
                } else {
                    console.log("Countries Insertion Successful")
                }
            }); //Inserting in DB

        } catch (err) {
            console.log("Error while Inserting Countries", err)
        }
    },
    insertContinents: () => {
        try {
            let data = xlsx.loadDataFromCSV('./assets/continents.csv'); // Importing Data from CSV
            continentsModel.insertMany(data, (err, result) => {
                if (err) {
                    console.log("Error from DB", err)
                } else {
                    console.log("Continents Insertion Successful")
                }
            }); //Inserting in DB

        } catch (err) {
            console.log("Error while Inserting Continents", err)
        }
    },
    insertLanguages: () => {
        try {
            let data = xlsx.loadDataFromCSV('./assets/languages.csv'); // Importing Data from CSV
            languagesModel.insertMany(data, (err, result) => {
                if (err) {
                    console.log("Error from DB", err)
                } else {
                    console.log("Languages Insertion Successful")
                }
            }); //Inserting in DB

        } catch (err) {
            console.log("Error while Inserting Languages", err)
        }
    },
    fetchByCountry: async (id) => {
        try {
            let data = await countriesModel.aggregate([
                { "$match": { code: id } },
                {
                $lookup: {
                    from: "languages",
                    localField: "languages",
                    foreignField: "code",
                    as: "languages"
                }
            },
             {
                $project: {
                    _id: 0,
                    name: 1,
                    native: 1,
                    capital: 1,
                    currency: 1,
                    "languages.code": 1,
                    "languages.name": 1
                },
            }
        ])
            return data;
        } catch (err) {
            console.log("Error while fetching records", err)
        }
    }

}