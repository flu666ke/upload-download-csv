const fs = require('fs');
const csv = require('csv-parser');
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
    parseCSVfile(CSVfile) {
        const parsedCSVfile = [];

        fs.createReadStream(CSVfile)
            .pipe(csv())
            .on('data', (data) => parsedCSVfile.push(data))
            .on('end', async () => {

                await User.insertMany(parsedCSVfile);
            });
    }

    async createCSVfile() {
        const usersData = await User.find();

        if (isEmpty(usersData)) {
            throw new Error(RECORD_NOT_FOUND);
        }

        const convertDataToCSV = new Parser({ fields });

        return convertDataToCSV.parse(usersData);
    }

    async deleteDataFromDB() {
        await User.deleteMany();
    }
}

module.exports = new UploadCSVService();