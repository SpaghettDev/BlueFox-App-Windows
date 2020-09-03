const moment = require('moment');

module.exports = (client) => {

    client.wait = (ms) => {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime()
        }
        return;
    }

    client.log = (msg) => {
        let time = moment().format(client.config.timeFormat);
        console.log(`${time} [LOG] ${msg}`);
    };

}