const schedule = require('node-schedule');
const speedTest = require('speedtest-net');
const firebase = require('firebase');
const config = require('./firebase-config.json');

firebase.initializeApp(config);
var database = firebase.database();

function doSpeedTest() {
    console.log("Running new test");
    var test = speedTest({maxTime: 10000});

    test.on('data', data => {
        var now = new Date(); 
        firebase.database().ref('speedtest/' + now).set({
            speeds: data.speeds,
            client: data.client,
            server: data.server
        });
    });

    test.on('error', err => {
        console.error(err);
    });

    setTimeout(doSpeedTest, 60 * 1000);
}

doSpeedTest();