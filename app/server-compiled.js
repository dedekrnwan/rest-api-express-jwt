"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var _morgan = _interopRequireDefault(require("morgan"));

var _app = require("./config/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //#region Connection db

_mongoose["default"].connect('mongodb://localhost:27017/apiproject', {
  useNewUrlParser: true
}, function (err) {
  if (!err) {
    console.log('MongoDB Connection Succeeded');
  } else {
    console.log("Error in connection : ".concat(err));
  }
}); //#endregion
//#region Middlewares


app.use((0, _morgan["default"])('combined'));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json()); //#endregion
//#region Routes

app.use(_routes["default"]); //#endregion
//#region 4040 error handler

app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 400;
  return next(error);
}); //#endregion
//#region Error handler

app.use(function (err, req, res, next) {
  var error = app.get('env') == 'development' ? err : {};
  var status = err.status || 500; //Response to client

  res.status(status).json({
    error: {
      message: error.message
    }
  }); //Response to us
}); //#endregion
//#region Server

app.listen(_app.config.server.APP_PORT, function () {
  return console.log("".concat(_app.config.server.APP_NAME, " app listening on port ").concat(_app.config.server.APP_PORT, "!"));
}); //#endregion
