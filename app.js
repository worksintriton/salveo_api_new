var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');	
var fileUpload = require('express-fileupload');
var patientRouter = require('./routes/Patient.routes');
var doctorRouter = require('./routes/Doctor.routes');
var CompanyRouter = require('./routes/Company.routes');
var UserRouter = require('./routes/User.routes');
var FamilyRouter = require('./routes/Family.routes');
var PaymentRouter = require('./routes/Payment.routes');
var HomebannerRouter = require('./routes/Homebanner.routes');
var DoctorTypeRouter = require('./routes/Doctortype.routes');
var DoctorAvailable = require('./routes/Doctor_available.routes');
var AppointmentRouter = require('./routes/Appointment.routes');
var AdminRouter  = require('./routes/Admin.routes');
var RoleRouter  = require('./routes/Role.routes');
var SpecializationRouter  = require('./routes/Specialization.routes');
var SymptomsRouter  = require('./routes/Symtoms.routes');
var PrescriptionRouter  = require('./routes/Prescription.routes');
var responseMiddleware = require('./middlewares/response.middleware');
var LanguagesRouter  = require('./routes/Languages.routes');

var MsgchatRouter  = require('./routes/Msgchat.routes');
var ComSpecializationRouter = require('./routes/ComSpecialization.routes');






var BaseUrl = "http://54.214.141.11:3000"; 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/Salveo'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

app.use(fileUpload());
app.use(responseMiddleware());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

  next();
});



app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.error(300,'No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/public/uploads/' + sampleFile.name;

  var Finalpath =  BaseUrl +'/uploads/'+ sampleFile.name;
   console.log("uploaded path",uploadPath )


  sampleFile.mv(uploadPath, function(err) {
    if (err) {
   console.log(err)
   return res.error(500, "Internal server error");
    }
   res.json({Status:"Success",Message:"file upload success", Data :Finalpath,Code:200});
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', patientRouter);
app.use('/user',UserRouter);
app.use('/doctor', doctorRouter);
app.use('/company',CompanyRouter);
app.use('/family',FamilyRouter);
app.use('/payment',PaymentRouter);
app.use('/homebanner',HomebannerRouter);
app.use('/doctortype',DoctorTypeRouter);
app.use('/doctortime',DoctorAvailable);
app.use('/appointment',AppointmentRouter);
app.use('/admin',AdminRouter);
app.use('/role',RoleRouter);
app.use('/specialization',SpecializationRouter);
app.use('/prescription',PrescriptionRouter);
app.use('/symptoms',SymptomsRouter);
app.use('/languages',LanguagesRouter);
app.use('/msgchat',MsgchatRouter);
app.use('/comSpecializationRouter',ComSpecializationRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
