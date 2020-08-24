const csv = require('csvtojson');
const { Parser } = require('json2csv');
const { isEmpty } = require('lodash')
const { RECORD_NOT_FOUND } = require('../core/response-templates')

const User = require('../models/user.model');

const fields = [
    { label: 'UserName', value: 'UserName' },
    { label: 'FirstName', value: 'FirstName' },
    { label: 'LastName', value: 'LastName' },
    { label: 'Age', value: 'Age' },
];

class UploadCSVService {
    async parseCSVfile(CSVfile) {

        const parsedCSVfile = await csv().fromFile(CSVfile);

        await User.insertMany(parsedCSVfile);

        return this.getUserCollection();
    }

    async createCSVfile() {
        const usersData = await this.getUserCollection();

        if (isEmpty(usersData)) {
            throw new Error(RECORD_NOT_FOUND);
        }

        const serializeDataToCSVfile = new Parser({ fields });

        return serializeDataToCSVfile.parse(usersData);
    }

    async deleteDataFromDB() {
        await User.deleteMany();
    }

    async getUserCollection() {
        return await User.find({}, 'UserName FirstName LastName Age');
    }
}

module.exports = new UploadCSVService();