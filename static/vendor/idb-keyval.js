function _slicedToArray(e, t) {
  return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) ||
    _unsupportedIterableToArray(e, t) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
  );
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    return "Map" ===
          (r = "Object" === r && e.constructor ? e.constructor.name : r) ||
        "Set" === r
      ? Array.from(e)
      : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      ? _arrayLikeToArray(e, t)
      : void 0;
  }
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _iterableToArrayLimit(e, t) {
  var r = null == e
    ? null
    : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (null != r) {
    var n, o, u = [], i = !0, a = !1;
    try {
      for (
        r = r.call(e);
        !(i = (n = r.next()).done) && (u.push(n.value), !t || u.length !== t);
        i = !0
      );
    } catch (e) {
      a = !0, o = e;
    } finally {
      try {
        i || null == r.return || r.return();
      } finally {
        if (a) throw o;
      }
    }
    return u;
  }
}
function _arrayWithHoles(e) {
  if (Array.isArray(e)) return e;
}
function promisifyRequest(r) {
  return new Promise(function (e, t) {
    r.oncomplete = r.onsuccess = function () {
      return e(r.result);
    },
      r.onabort = r.onerror = function () {
        return t(r.error);
      };
  });
}
function createStore(e, n) {
  var t = indexedDB.open(e),
    o = (t.onupgradeneeded = function () {
      return t.result.createObjectStore(n);
    },
      promisifyRequest(t));
  return function (t, r) {
    return o.then(function (e) {
      return r(e.transaction(n, t).objectStore(n));
    });
  };
}
var defaultGetStoreFunc;
function defaultGetStore() {
  return defaultGetStoreFunc = defaultGetStoreFunc ||
    createStore("keyval-store", "keyval");
}
function get(t) {
  return (1 < arguments.length && void 0 !== arguments[1]
    ? arguments[1]
    : defaultGetStore())("readonly", function (e) {
      return promisifyRequest(e.get(t));
    });
}
function set(t, r) {
  return (2 < arguments.length && void 0 !== arguments[2]
    ? arguments[2]
    : defaultGetStore())("readwrite", function (e) {
      return e.put(r, t), promisifyRequest(e.transaction);
    });
}
function setMany(e) {
  return (1 < arguments.length && void 0 !== arguments[1]
    ? arguments[1]
    : defaultGetStore())("readwrite", function (t) {
      return e.forEach(function (e) {
        return t.put(e[1], e[0]);
      }),
        promisifyRequest(t.transaction);
    });
}
function getMany(e) {
  return (1 < arguments.length && void 0 !== arguments[1]
    ? arguments[1]
    : defaultGetStore())("readonly", function (t) {
      return Promise.all(e.map(function (e) {
        return promisifyRequest(t.get(e));
      }));
    });
}
function update(n, o) {
  return (2 < arguments.length && void 0 !== arguments[2]
    ? arguments[2]
    : defaultGetStore())("readwrite", function (r) {
      return new Promise(function (e, t) {
        r.get(n).onsuccess = function () {
          try {
            r.put(o(this.result), n), e(promisifyRequest(r.transaction));
          } catch (e) {
            t(e);
          }
        };
      });
    });
}
function del(t) {
  return (1 < arguments.length && void 0 !== arguments[1]
    ? arguments[1]
    : defaultGetStore())("readwrite", function (e) {
      return e.delete(t), promisifyRequest(e.transaction);
    });
}
function delMany(e) {
  return (1 < arguments.length && void 0 !== arguments[1]
    ? arguments[1]
    : defaultGetStore())("readwrite", function (t) {
      return e.forEach(function (e) {
        return t.delete(e);
      }),
        promisifyRequest(t.transaction);
    });
}
function clear() {
  return (0 < arguments.length && void 0 !== arguments[0]
    ? arguments[0]
    : defaultGetStore())("readwrite", function (e) {
      return e.clear(), promisifyRequest(e.transaction);
    });
}
function eachCursor(e, t) {
  return e.openCursor().onsuccess = function () {
    this.result && (t(this.result), this.result.continue());
  },
    promisifyRequest(e.transaction);
}
function keys() {
  return (0 < arguments.length && void 0 !== arguments[0]
    ? arguments[0]
    : defaultGetStore())("readonly", function (e) {
      if (e.getAllKeys) return promisifyRequest(e.getAllKeys());
      var t = [];
      return eachCursor(e, function (e) {
        return t.push(e.key);
      }).then(function () {
        return t;
      });
    });
}
function values() {
  return (0 < arguments.length && void 0 !== arguments[0]
    ? arguments[0]
    : defaultGetStore())("readonly", function (e) {
      if (e.getAll) return promisifyRequest(e.getAll());
      var t = [];
      return eachCursor(e, function (e) {
        return t.push(e.value);
      }).then(function () {
        return t;
      });
    });
}
function entries() {
  var r = 0 < arguments.length && void 0 !== arguments[0]
    ? arguments[0]
    : defaultGetStore();
  return r("readonly", function (e) {
    if (e.getAll && e.getAllKeys) {
      return Promise.all([
        promisifyRequest(e.getAllKeys()),
        promisifyRequest(e.getAll()),
      ]).then(function (e) {
        var e = _slicedToArray(e, 2), t = e[0], r = e[1];
        return t.map(function (e, t) {
          return [e, r[t]];
        });
      });
    }
    var t = [];
    return r("readonly", function (e) {
      return eachCursor(e, function (e) {
        return t.push([e.key, e.value]);
      }).then(function () {
        return t;
      });
    });
  });
}
export {
  clear,
  createStore,
  del,
  delMany,
  entries,
  get,
  getMany,
  keys,
  promisifyRequest,
  set,
  setMany,
  update,
  values,
};
