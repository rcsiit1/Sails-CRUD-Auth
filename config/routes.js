
module.exports.routes = {

  '/': {

    controller: 'StudentsController',
    action: 'homepage'
  },
  '/students/deleteStudent/': {

    controller: 'StudentsController',
    action: 'deleteStudent'
  },
  '/students/updateStudent/': {

    controller: 'StudentsController',
    action: 'updateStudent'
  },
  '/students/addStudent/': {

    controller: 'StudentsController',
    action: 'addStudent'
  },
  '/students/createStudent/': {

    controller: 'StudentsController',
    action: 'createStudent'
  },
  '/students/delete/:id': {

    controller: 'StudentsController',
    action: 'delete'
  },
  '/students/updateInterim/:id': {

    controller: 'StudentsController',
    action: 'updateInterim'
  },
  '/students/update/:id': {

    controller: 'StudentsController',
    action: 'update'
  },




};
