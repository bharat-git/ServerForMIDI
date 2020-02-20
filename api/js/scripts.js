var midi = require('web-midi-api');

console.log('Jazz MIDI version: ' + navigator.jazzMidi.version);

function onMIDIFailure(msg) {
    console.log(`Failed to get MIDI access - ${msg}`);
    process.exit(1);
}

function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    inputs = midi.inputs;
    outputs = midi.outputs;
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