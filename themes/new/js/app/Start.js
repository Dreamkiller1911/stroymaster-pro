/**
 * Created by tazeb on 12.06.2016.
 */
function Start(prop) {
    var _this = this;

    this.debugMode = prop.debugMode != undefined ? prop.debugMode : false;
    this.appPath = undefined;//Путь к корню приложения
    this.paths = {models: undefined, views: undefined, ctrls: undefined};
    this.queue = new Array();
    this.models = new Object();
    this.views = new Object();
    this.ctrls = new Object();

    /**
     *
     * @type {{findValue: Start.array.'findValue'}}
     * Функция "findValue(array, value, [moreInfo])" ищет в массиве "array" значение "value" и возвращает true или false
     */
    this.array = {
        'findValue': function (array, value) {
            var a = array, v = value, t = false;
            var p = new RegExp("^(" + v + ")$");
            for (var r in a) {
                if (p.test(a[r])) t = true;
            }
            if (t === false && _this.debugMode) {
                console.warn('В массиве не было найдено значение "' + v + '"')
            }
            return t;
        }
    };


    this.init = function (ctrl, act, p) {

        try {
            if (_this.appPath === undefined) {
                var script = document.getElementById('start');
                var pattern = new RegExp('start.js', 'i');
                var sep = pattern.exec(script.src);
                _this.appPath = script.src.substring(0, sep.index);
                _this.paths.ctrls = _this.appPath + 'controllers/';
                _this.paths.models = _this.appPath + 'models/';
                _this.paths.views = _this.appPath + 'views/';
            }
            var startInit = function (ctrl, act, prop) {
                _this.queue.push({ctrl: ctrl, act: act, prop: prop, statusC: 'load', statusA: false});
                var iLoadTimer = setInterval(function () {
                    if (_this.queue[_this.queue.length - 1].statusC === 'load') {
                        for (var i = 0; i < _this.queue.length; i++) {

                            var c = _this.queue[i].ctrl;
                            var a = _this.queue[i].act;
                            var p = _this.queue[i].prop;

                            if (_this.ctrls.hasOwnProperty(c) === false) {
                                includeJSCtrl(c, a, p);
                            } else {
                                if (_this.queue[i].statusC === 'load') {
                                    if (_this.ctrls[c].status === 'ready') {
                                        if (p) {
                                            if ('properties' in _this.ctrls[c].obj === false) {
                                                Object.defineProperty(_this.ctrls[c].obj, 'properties', {
                                                    value: new Object(),
                                                });
                                            }
                                            if (_this.ctrls[c.toString()].obj.properties.hasOwnProperty(a.toString())) {
                                                delete _this.ctrls[c.toString()].obj.properties[a.toString()]
                                            }
                                            Object.defineProperty(_this.ctrls[c].obj['properties'], a, {
                                                value: p,
                                                writable: true,
                                                configurable: true
                                            });
                                        }
                                        if (_this.loadAct(c, a, p)) {
                                            _this.queue[i].statusC = 'ready';
                                        } else {
                                            _this.queue[i].statusC = 'error';
                                            throw new Error('Метод объекта уже обявлен и не является функцией');
                                        }


                                    } else {
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        clearInterval(iLoadTimer);
                    }
                }, 100);
            };
            if (typeof ctrl === 'object') {
                for (var c in ctrl) {
                    if (typeof ctrl[c] === 'string') {
                        if (typeof act === 'object') {

                        }
                        startInit(c, ctrl[c], p);
                    } else {
                        for (var i = 0; i < ctrl[c].length; i++) {
                            if (typeof act === 'object') {
                                var prop = act[ctrl[c][i]];
                            }
                            startInit(c, ctrl[c][i], prop);
                        }
                    }
                }
            } else {
                startInit(ctrl, act, p);
            }
        } catch (e) {
            console.warn(e)
        }
    };
    this.loadAct = function (ctrl, act, p) {

        if (_this.ctrls.hasOwnProperty(ctrl)) {
            var ctrlN = _this.ctrls[ctrl.toString()].obj;
            /*if (p) {
             if ('properties' in ctrlN === false) {
             Object.defineProperty(ctrlN, 'properties', {
             value: new Object(),
             });
             }
             if(ctrlN.properties.hasOwnProperty(act.toString())){
             delete ctrlN.properties[act.toString()]
             }
             Object.defineProperty(ctrlN['properties'], act, {
             value: p,
             writable: true,
             configurable: true
             });

             }*/
            if (ctrlN.hasOwnProperty(act.toString())) {
                ctrlN.ctrlName = ctrl;
                ctrlN.actName = act;
                ctrlN.start = _this;
                if (ctrlN[act] instanceof Function === false) {
                    return false;
                }
                ctrlN[act]();
                return true;
            } else {
                console.info('В объекте \'' + ctrl + 'Controller\' не найдена функция с именем \'' + act + '\'');
            }
        } else {
            console.info('Функция с именем \'' + ctrl + 'Controller.js\' не найдена, и не может  быть объявлена. Полный путь \''
                + _this.paths.ctrls + ctrl + 'Controller.js\'');
        }
    };
    this.loadActView = function (fileName, view) {
        if (_this.views.hasOwnProperty(fileName) === false || _this.views[fileName].hasOwnProperty('obj') === false) {
            if (_this.debugMode) {
                throw new Error('Файл представления ' + fileName + 'View.js, не был подключен или не существует');
            }
            return false;
        }
        var obj = _this.views[fileName].obj;
        var method = 'view' + view;
        if (obj.hasOwnProperty(method) === false) {
            if (_this.debugMode) {
                throw new Error('В представлении ' + fileName + 'View() не найден метод View' + view + ', путь до файла \r\n' +
                    _this.paths.views + fileName + 'View.js')
            }
            return false;
        }
        obj[method]()
        if (obj.components.length > 0) {
            var data = obj.components.join('\r\n');
            console.log(data)
            obj.components = new Array;
            return data;
        }
    };
    this.loadModel = function (modelName, bodyScript, ctrl, prop) {
        var ctrl = this._findCtrlByName(ctrl);
        var addProperty = function (model) {
            Object.defineProperties(model, {
                    'ctrl': {
                        value: ctrl
                    },
                }
            );
            if (model.hasOwnProperty('attributes') === false) {
                Object.defineProperty(model, 'attributes', {
                    value: new Object(),
                    enumerable: true
                });
            }
            if (('messages' in model && Object.getOwnPropertyDescriptor(model, 'messages').writable) || 'messages' in model === false) {
                Object.defineProperty(model, 'messages', {
                    value: function () {
                        if ('m' in model) {
                            return model.m;
                        } else {
                            Object.defineProperty(model, 'm', {
                                value: new Messages(model)
                            });
                            return model.m;
                        }
                    }
                })
            }
            /*if(model.hasOwnProperty('messages') && this.m instanceof Messages){
             model.messages();
             }else {
             console.log(this.m);

             Object.defineProperty(model, 'messages', {
             value: function(){
             model.m = new Messages();
             console.log(model.m)
             }
             });
             model.messages();

             }*/
        };
        var setGetSet = function (model) {
            if (model.labels.length > 0) {
                for (var i in model.labels) {
                    model._defineGetSet(model.labels[i])
                }
            }
        };
        if (modelName === undefined || modelName.length === 0) {

        } else if (findModelByName(modelName) && _this.models[modelName].status === 'ready') {
            var model = _this.models[modelName].obj;
            this._setModelValues(model, modelName, ctrl)
            setGetSet(_this.models[modelName].obj);
            bodyScript(_this.models[modelName].obj);
            return true;
        } else {
            includeJSModel(modelName);
            Object.defineProperty(_this.models[modelName], 'timer', {
                writable: true
            });
            _this.models[modelName].timer = setInterval(function () {
                if (_this.models[modelName].status === 'ready') {
                    var model = _this.models[modelName].obj;
                    _this._setModelValues(model, modelName, ctrl)
                    clearInterval(_this.models[modelName].timer);
                    setGetSet(_this.models[modelName].obj);
                    bodyScript(_this.models[modelName].obj, prop);
                    return true;
                }
            }, 100)
        }
    };
    this._trimFunction = function (func) {
        var pattern = /(function)(\s)*((\()(.*)*(\)))(\s)?\{/i;
        var data = func.replace(pattern, '');
        var p = 0;
        do {
            var x = data.indexOf('}', p);
            if (x === -1) {
                var a = data.slice(0, p - 2);
                var b = data.slice(p);
                data = a.concat('', b);
            }
            p = x + 1;
        } while (x != -1);
        return data;
    };

    var includeJSCtrl = function (scriptName, a, p) {
        _this.ctrls[scriptName] = new Object();
        var script = document.createElement('script');
        Object.defineProperty(_this.ctrls[scriptName], 'status', {
            value: 'load',
            writable: true
        });
        script.onload = function () {
            var fullCtrl = scriptName + 'Controller';
            var o = _this.ctrls[scriptName];
            DefaultController.prototype = Logistic;

            cloningObject(DefaultController, Logistic);
            window[fullCtrl.toString()].prototype = DefaultController;


            Object.defineProperty(o, 'obj', {
                    value: new window[fullCtrl.toString()](),
                    writable: true
                }
            );
            Object.defineProperty(o.obj, 'queue', {
                value: new Array,
            });
            o.status = 'ready';

        };
        script.src = _this.paths.ctrls + scriptName + 'Controller.js?' + Math.random();
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);

    };
    var includeJSModel = function (modelName) {
        _this.models[modelName] = new Object();
        var script = document.createElement('script');
        Object.defineProperty(_this.models[modelName], 'status', {
            value: 'load',
            writable: true
        });
        script.onload = function () {
            DefaultModel.prototype = Logistic;
            window[modelName.toString()].prototype = DefaultModel;
            Object.defineProperty(_this.models[modelName.toString()], 'obj', {
                value: new window[modelName.toString()](),
                writable: true
            });

            _this.models[modelName.toString()].obj.start = _this;
            _this.models[modelName].status = 'ready';
        };
        script.onerror = function () {
            _this.models[modelName].status = 'error';
            console.error('Не удалось загрузить модель \'' + modelName
                + '\'. Полный путь \'' + _this.paths.models + modelName + '.js\'')
        };

        script.src = _this.paths.models + modelName + '.js?' + Math.random();
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    this.includeJSView = function (fileName, view) {
        var pathView = this.paths.views + fileName + 'View.js?' + Math.random();
        var script = document.createElement('script');
        var head = document.getElementsByTagName('head');
        var fullName = fileName.toString() + 'View';

        script.onload = function () {
            window[fullName.toString()].prototype = DefaultView;

            Object.defineProperty(_this.views[fileName], 'obj', {
                value: new window[fullName.toString()](),
                enumerable: true
            });
            Object.defineProperties(_this.views[fileName].obj, {
                'components': {
                    value: new Array,
                    writable: true,
                    enumerable: true
                },
                'nameFunction': {
                    value: view,
                    writable: true,

                },
                'start': {
                    value: _this
                },
                'ctrl': {
                    value: _this.ctrls[fileName].obj
                }
            });

            _this.loadActView(fileName, view)
        };
        Object.defineProperty(_this.views, fileName, {
            value: new Object(),
            enumerable: true
        });
        Object.defineProperty(_this.views[fileName], 'status', {
            value: 'load',
            writable: true
        });
        script.src = pathView;
        head[0].appendChild(script);
    };
    var findModelByName = function (modelName) {
        if (_this.models.hasOwnProperty(modelName)) {
            return true;
        }
    };
    this._findCtrlByName = function (name) {
        if (name === undefined || name === '') {
            return false;
        }
        if (_this.ctrls.hasOwnProperty(name.toString())) {
            return _this.ctrls[name.toString()].obj;
        } else {
            return false
        }
    };
    this._setModelValues = function (obj, modelName, ctrl) {
        console.log(Object.getOwnPropertyDescriptor(obj, 'modelName'));

        if (Object.getOwnPropertyDescriptor(obj, 'modelName').configurable === true) {
            delete obj.modelName;
        }


    };
    var cloningObject = function (a, b) {
        for (var i in b) {
            if (a.hasOwnProperty(i) || i in a) break;
            a[i] = b[i];
        }
    }


}

