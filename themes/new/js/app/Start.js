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

    this.loadModel = function (modelName, bodyScript, ctrl) {
        var ctrl = findCtrlByName(ctrl);
        var addProperty = function (model) {
            Object.defineProperties(model, {
                    'ctrl': {
                        value: ctrl
                    },

                }
            );
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
                    },


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
        if (modelName === undefined || modelName.length === 0) {

        } else if (findModelByName(modelName) && _this.models[modelName].status === 'ready') {
            addProperty(_this.models[modelName].obj);
            bodyScript(_this.models[modelName].obj);
            return true;
        } else {
            includeJSModel(modelName);
            Object.defineProperty(_this.models[modelName], 'timer', {
                writable: true
            });
            _this.models[modelName].timer = setInterval(function () {
                if (_this.models[modelName].status === 'ready') {
                    clearInterval(_this.models[modelName].timer);
                    addProperty(_this.models[modelName].obj);
                    bodyScript(_this.models[modelName].obj);
                    return true;
                }
            }, 100)
        }
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
            window[fullCtrl.toString()].prototype = DefaultController;
            Object.defineProperty(_this.ctrls[scriptName], 'obj', {
                    value: new window[fullCtrl.toString()](),
                    writable: true
                }
            );
            _this.ctrls[scriptName].status = 'ready';

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
            window[modelName.toString()].prototype = DefaultModel;
            Object.defineProperty(_this.models[modelName.toString()], 'obj', {
                value: new window[modelName.toString()](),
                writable: true
            });
            _this.models[modelName.toString()].obj.modelName = modelName;
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

    var findModelByName = function (modelName) {
        if (_this.models.hasOwnProperty(modelName)) {
            return true;
        }
    };
    var findCtrlByName = function (name) {
        if (name === undefined || name === '') {
            return false;
        }
        if (_this.ctrls.hasOwnProperty(name.toString())) {
            return _this.ctrls[name.toString()].obj;
        } else {
            return false
        }
    }
}

