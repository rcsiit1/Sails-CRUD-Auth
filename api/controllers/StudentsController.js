

module.exports = {


  homepage: function (req, res) {

    Students.find({}).exec((err, students) => {
      if (err) {
        res.send(500, { error: 'Database Error Occured' });
      }

      res.view('pages/homepage', { students: students });

    });

  },
  deleteStudent: function (req, res) {

    Students.find({}).exec((err, students) => {
      if (err) {
        res.send(500, { error: 'Database Error Occured' });
      }

      res.view('pages/deleteStudent', { students: students });

    });

  },
  updateStudent: function (req, res) {

    Students.find({}).exec((err, students) => {
      if (err) {
        res.send(500, { error: 'Database Error Occured' });
      }

      res.view('pages/updateStudent', { students: students });

    });
  },
  addStudent: function (req, res) {
    res.view('pages/addStudent');
  },
  createStudent: function (req, res) {

    var name = req.body.fullname;
    Students.create({ name: name }).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database Error Occured' });
      }

      res.redirect('/');

    });
  },
  delete: function (req, res) {
    Students.destroy({ id: req.params.id }).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database Error Occured' });
      }

      res.redirect('/');

    });
  },
  updateInterim: function (req, res) {
    Students.findOne({ id: req.params.id }).exec((err, students) => {
      if (err) {
        res.send(500, { error: 'Database Error Occured' });
      }
      res.view('pages/studentInfo', { students: students });
      

    });
  },
  update: function (req, res) {
    Students.update({id: req.params.id},{name: req.body.fullname }).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database Error Occured' });
      }
      res.redirect('/');
      

    });
  },


};

