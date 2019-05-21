"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("../app/routes/routes"));

var _morgan = _interopRequireDefault(require("morgan"));

var _app = require("../app/config/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //#region Connection db

_app.config.connection.fractal(); //#endregion
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
    response: false,
    message: error.message,
    data: {
      message: error
    }
  }); //Response to us
}); //#endregion
//#region Server

app.listen(_app.config.server.app_port, function () {
  return console.log("".concat(_app.config.server.app_name, " app listening on port ").concat(_app.config.server.app_port, "!"));
}); //#endregion
