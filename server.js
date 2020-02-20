



var express = require('express');
app = express();
port = process.env.PORT || 8081;
mongoose = require('mongoose');
Task = require('./api/models/model'); //created model loading here
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/midi-data');

var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/route'); //importing route
routes(app); //register the route

app.use(function (req, res) {
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);


// Note that in your own project you should use:
var navigator = require('jzz');

console.log('Jazz MIDI version: ' + navigator.jazzMidi);

function onMIDIFailure(msg) {
    console.log(`Failed to get MIDI access - ${msg}`);
    process.exit(1);
}

function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    inputs = midi.inputs;
    outputs = midi.outputs;
    console.log("working ...!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    setTimeout(testOutputs, 500);
}

function testOutputs() {
    console.log('Testing MIDI-Out ports...');
    outputs.forEach((port) => {
        console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
        port.open();
        port.send([0x90, 60, 0x7f]);
    });
    setTimeout(stopOutputs, 1000);
}

function stopOutputs() {
    outputs.forEach((port) => {
        port.send([0x80, 60, 0]);
    });
    testInputs();
}

function onMidiIn(ev) {
    const arr = [];
    // console.log("^^^^^^^^^^"+ev.data);
    // for (let i = 0; i < ev.data.length; i++) {
    //     arr.push((ev.data[i] < 16 ? '0' : '') + ev.data[i].toString(16));
    // }
    // var inputValue =  {value : arr.join(' ')};

    // console.log('MIDI:', arr.join(' '));
    for (let i = 0; i < ev.data.length; i++) {
        arr.push(ev.data[i]);
    }
    console.log(arr);
    var inputValue = {value : arr};
    postTheMidiMessages(inputValue);
}

function postTheMidiMessages(value) {
    request({
        url: "http://localhost:8081/midi-input",
        method: "POST",
        json: true,   // <--Very important!!!
        body: value
    }, function (error, response, body) {
        console.log(response);
    });
}




function testInputs() {
    console.log('Testing MIDI-In ports...');
    inputs.forEach((port) => {
        console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
        port.onmidimessage = onMidiIn;
    });
    //setTimeout(stopInputs, 5000);
}

function stopInputs() {
    console.log('Thank you!');
    navigator.close(); // This will close MIDI inputs, otherwise Node.js will wait for MIDI input forever.
    process.exit(0);
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
