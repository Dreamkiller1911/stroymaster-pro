/**
 * Created by tazeb on 12.06.2016.
 */
function Start(prop) {
    var _this = this;

    this.debugMode = prop != undefined && prop.hasOwnProperty('debugMode') ? prop.debugMode : false;
    this.appPath = undefined;//Путь к корню приложения
    this.paths = {models: undefined, views: undefined, ctrls: undefined};
    this.queue = new Array();
    this.models = new Object();
    this.views = new Object();
    this.ctrls = new Object();

    this.ERROR_WARN_MSG = 'Было полученно исключение в коде, рекомендуем проверить fraemwork в debugMode';

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
    this.string = {
        addSlash: function (string, symbol) {
            try {
                var beginMessage = 'Вы воспользовались обработчиком строк "addSlash" для экранирования символов';
                var result = '';
                if(!string){
                    throw new Error(beginMessage + '\r\n необходимо передать первый парамет в качестве строки в которой будут ' +
                        'экранироваться символы');
                }
                if (!symbol) {
                    throw new Error(beginMessage + '\r\n необходимо передать второй параметр в качестве стоки для одного символа' +
                        'или в качестве массива для множественного экранирования')
                }
                if(typeof symbol === 'string'){
                    result = string.replace(new RegExp('(' + symbol + ')', 'gm'), '\\$1');
                }
                if(typeof symbol === 'object'){
                    var i, data;
                    for (i = 0; i < symbol.length; i++){
                        string = string.replace(new RegExp('(' + symbol[i] + ')', 'gm'), '\\$1')
                    }
                    result = string
                }
            } catch (e) {
                if(this.debugMode){
                    console.error(e.message);
                }else {
                    console.warn(this.ERROR_WARN_MSG)
                }
            } finally {

                if (result === ''){
                    return false;
                }
                return result;
            }
        },
        trimS: function(str){
            return str.replace(new RegExp("\\s", "gm"), '');
        }
    };


    this.init = function (ctrl, act, p) {
        var _this = this;

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
                                _this._includeJSCtrl(c, a, p);
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
        if (this.views.hasOwnProperty(fileName) === false || this.views[fileName].hasOwnProperty('obj') === false) {
            /*if (this.debugMode) {
                throw new Error('Файл представления ' + fileName + 'View.js, не был подключен или не существует');
            }*/
            return false;
        }
        var obj = this.views[fileName].obj;
        var method = 'view' + view;
        if (obj.hasOwnProperty(method) === false) {
            if (this.debugMode) {
                throw new Error('В представлении ' + fileName + 'View() не найден метод View' + view + ', путь до файла \r\n' +
                    this.paths.views + fileName + 'View.js')
            }
            return false;
        }
        obj[method]()
        if (obj.components.length > 0) {
            var data = obj.components.join('\r\n').toString();
            obj.components = new Array;
            return obj;
        } else{
            console.log('false')
            return false;
        }
    };
    this.loadModel = function (modelName, bodyScript, ctrl, prop) {
        var ctrl = this._findCtrlByName(ctrl);
        var addProperty = function (model) {

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
            if (model.hasOwnProperty('labels') && model.labels.length > 0) {
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
            this._includeJSModel(modelName);
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
            }, 10)
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

    this._includeJSCtrl = function (scriptName, a, p) {
        this.ctrls[scriptName] = new Object();
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
    this._includeJSModel = function (modelName) {
        this.models[modelName] = new Object();
        var script = document.createElement('script');
        Object.defineProperty(_this.models[modelName], 'status', {
            value: 'load',
            writable: true
        });
        script.onload = function () {

            DefaultModel.prototype = Logistic;
            cloningObject(DefaultModel, Logistic);
            window[modelName.toString()].prototype = DefaultModel;
            Object.defineProperty(_this.models[modelName.toString()], 'obj', {
                value: new window[modelName.toString()](),
                writable: true
            });
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
        var _this = this;
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
            });
            _this.loadActView(fileName, view)
        };
        script.onerror = function () {
            console.error('Не удалось найти файл отображения с именем "' + fileName + 'View.js"\r\nПолный путь к файлу "' + pathView + '"')
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
        if (obj.hasOwnProperty('modelName')) {
            if (Object.getOwnPropertyDescriptor(obj, 'modelName').configurable === true) {
                delete obj.modelName;
                Object.defineProperty(obj, 'modelName', {
                    value: modelName,
                    enumerable: true

                });
            }
        } else {
            Object.defineProperty(obj, 'modelName', {
                value: modelName,
                enumerable: true

            });
        }
        if (obj.hasOwnProperty('ctrl')) {
            if (Object.getOwnPropertyDescriptor(obj, 'ctrl').configurable === true) {
                delete obj.ctrl;
                Object.defineProperty(obj, 'ctrl', {
                    value: ctrl,
                    enumerable: true

                });
            }
        } else {
            Object.defineProperty(obj, 'ctrl', {
                value: ctrl,
                enumerable: true

            });
        }
        if (obj.hasOwnProperty('start')) {
            if (Object.getOwnPropertyDescriptor(obj, 'start').configurable === true) {
                delete obj.start;
                Object.defineProperty(obj, 'start', {
                    value: this,
                    enumerable: true

                });
            }
        } else {
            Object.defineProperty(obj, 'start', {
                value: this,
                enumerable: true

            });
        }
        if (obj.hasOwnProperty('attributes')) {
            if (Object.getOwnPropertyDescriptor(obj, 'attributes').configurable === true) {
                delete obj.attributes;
                Object.defineProperty(obj, 'attributes', {
                    value: new Object(),
                    enumerable: true

                });
            }
        } else {
            Object.defineProperty(obj, 'attributes', {
                value: new Object(),
                enumerable: true

            });
        }
        if (obj.hasOwnProperty('queue')) {
            if (Object.getOwnPropertyDescriptor(obj, 'queue').configurable === true) {
                delete obj.queue;
                Object.defineProperty(obj, 'attributes', {
                    value: new Array(),
                    enumerable: true

                });
            }
        } else {
            Object.defineProperty(obj, 'queue', {
                value: new Array(),
                enumerable: true

            });
        }


    };
    var cloningObject = function (a, b) {
        for (var i in b) {
            if (a.hasOwnProperty(i) || i in a) break;
            a[i] = b[i];
        }
    }


}

