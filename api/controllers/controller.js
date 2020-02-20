'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.list_last_task = function (req, res) {
  // Task.findOne()
  //   .sort({ "_id": -1 })
  //   .exec(function (err, data) {
  //     if (err) {
  //       console.log('Error getting data..');
  //     }
  //     if (data) {
  //       res.json(data);
  //     }
  //     else {
  //       console.log('No data found!');
  //     }
  //   });

  Task.findOneAndDelete()
    .sort({ "_id": -1 })
    .exec(function (err, data) {
      if (err) {
        console.log('Error getting data..');
      }
      if (data) {
        console.log(data);
        res.json(data);
      }
      else if (data == null){
        console.log('No data found!');
      }
    });
};


exports.create_a_task = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function (req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};