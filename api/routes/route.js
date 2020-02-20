'use strict';
module.exports = function(app) {
  var midi = require('../controllers/controller');
var path = require('path');

  // app.use("/", (req, res) => {
  //   res.sendFile(__dirname +'../../../index.html');
  // });

  // midi Routes
  app.route('/midi-input')
    .get(midi.list_all_tasks)
    .post(midi.create_a_task);

  app.route('/midi-input-last')
    .get(midi.list_last_task);

  app.route('/midi-input/:Id')
    .get(midi.read_a_task)
    .put(midi.update_a_task)
    .delete(midi.delete_a_task);
};
