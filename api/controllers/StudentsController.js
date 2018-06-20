
function addStudent(req, res) {
  res.view('pages/addStudent');
};


function homepage(req, res) {

  Students.find({}).exec((err, students) => {
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }

    res.view('pages/homepage', { students: students });

  });

};
function deleteStudent(req, res) {

  Students.find({}).exec((err, students) => {
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }

    res.view('pages/deleteStudent', { students: students });

  });

};
function updateStudent(req, res) {

  Students.find({}).exec((err, students) => {
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }

    res.view('pages/updateStudent', { students: students });

  });
};

function createStudent(req, res) {

  var name = req.body.fullname;
  //var profile_pic = req.body.profile_pic;
  Students.create({
    name: name,
    profile_pic: req.file('profile_pic').upload({
      adapter: require('skipper-gridfs'),
      uri: 'mongodb://localhost:27017/mydb.students'
    }, (err) => {
      if (err) { return res.serverError(err); }
      return res.ok();
    })
  }).exec((err) => {
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }

    res.redirect('/');

  });
};
function deleteEntry(req, res) {
  Students.destroy({ id: req.params.id }).exec((err) => {
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }

    res.redirect('/');

  });
};

function updateInterim(req, res) {
  Students.findOne({ id: req.params.id }).exec((err, students) => {
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }
    res.view('pages/studentInfo', { students: students });


  });
};
function update(req, res) {
  Students.update({ id: req.params.id }, { name: req.body.fullname }).exec((err) => {
    if (err) {
      res.send(500, { error: 'Database Error Occured' });
    }
    res.redirect('/');


  });
};


module.exports = {
  homepage: homepage,
  deleteStudent: deleteStudent,
  updateStudent: updateStudent,
  createStudent: createStudent,
  delete: deleteEntry,
  updateInterim: updateInterim,
  update: update,
  addStudent: addStudent,

};

