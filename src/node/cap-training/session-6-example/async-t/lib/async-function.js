function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

const a1 = /*#__PURE__*/ function () {
  var _ref = _asyncToGenerator(function* () {
    return yield 1;
  });

  return function a1() {
    return _ref.apply(this, arguments);
  };
}();

const a2 = /*#__PURE__*/ function () {
  var _ref2 = _asyncToGenerator(function* () {
    const v = yield a1();
    return v;
  });

  return function a2() {
    return _ref2.apply(this, arguments);
  };
}();