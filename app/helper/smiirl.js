const { Counter } = require("@smiirl/smiirl-library-js");
// Get the real values from your counter in https://my.smiirl.com
const mac = process.env.COUNTER_MAC;
const token = process.env.COUNTER_TOKEN;
const counter = new Counter(mac, token);


const Smiirl = {
    async setCounter(score) {
        counter.push(score).then(function(json) {
            console.log("Counter Push Response", json)
            return json
        })
    },

    async add(score) {
        counter.add(score).then(function(json) {
            console.log("Counter Add Response", json)
        })
    }
};


module.exports = Smiirl;
