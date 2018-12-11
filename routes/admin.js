var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer=require('multer');
var upload = multer({ dest: 'public/images/portfolio/' })

var connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'msin636',
  password:'msin636db',
  database:'msin636projects',
  port:3306
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM projects', function(err, rows, fields){
      if(err) throw err
      res.render('dashboard', { rows:rows });

  });
});

router.get('/new', function(req,res,next){
    res.render('new');
})

router.post('/new',upload.single('projectimage'), function(req,res,next){
    var title = req.body.title;

    var description= req.body.description;
    var service = req.body.service;
    var client = req.body.client;
    var projectdate = req.body.projectdate;
    console.log(projectdate);

    if(req.file){
      var projectImageName = req.file.filename;
    }else{
      var projectImageName = 'noimage.jpg';
    }

    //req.checkBody('title', 'Title field is required').notEmpty();
    //req.checkBody('service', 'Service field is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
       console.log(errors);
        res.render('new', {errors:errors});
    }else{
        project={
          title:title,
          description:description,
          service: service,
          client:client,
          image:projectImageName,
          date:projectdate
        };
        var query = connection.query('INSERT INTO projects SET ?', project, function(err, result) {
        })
        req.flash('success', 'Project Added');
        res.location('/admin');
        res.redirect('/admin');
    }
});



router.post('/edit/:id',upload.single('projectimage'), function(req,res,next){
    var title = req.body.title;

    var description= req.body.description;
    var service = req.body.service;
    var client = req.body.client;
    var projectdate = req.body.projectdate;
    console.log(projectdate);

    if(req.file){
      var projectImageName = req.file.filename;
    }else{
      var projectImageName = 'noimage.jpg';
    }

    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('service', 'Service field is required').notEmpty();

    var errors = req.validationErrors();
    if(errors){
       console.log(errors);
        res.render('edit', {errors:errors});
    }else{
        project={
          title:title,
          description:description,
          service: service,
          client:client,
          image:projectImageName,
          date:projectdate
        };
        var query = connection.query('UPDATE projects SET ? WHERE id = '+req.params.id, project, function(err, result) {
        })
        req.flash('success', 'Project Updated');
        res.location('/admin');
        res.redirect('/admin');
    }
});


router.get('/edit/:id', function(req, res, next) {
  connection.query('SELECT * FROM projects WHERE id = ' + req.params.id ,function(err, row, fields){
      if(err) throw err
      res.render('edit', { row:row[0] });
  });
});

router.delete('/delete/:id', function(req,res){
  connection.query('DELETE FROM projects WHERE id = ' + req.params.id, function(err,result){
    if(err) throw err;
  })
  req.flash('success', 'Project Deleted');
  res.location('/admin');
  res.redirect('/admin');

})
module.exports = router;
