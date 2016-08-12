/**
 * Created by tazeb on 14.06.2016.
 */
var DefaultController = {
    ctrlName: undefined,
    actName: undefined,
    prefix: undefined,
    getControls: function (actionName) {
        if (this.prefix === undefined) this.prefix = this.ctrlName.replace(/Controller/i, '') + '_';
        var tmpElements = document.querySelectorAll('[StartCtrl="' + this.prefix + this.actName + '"]');
        if (tmpElements.length < 1) {
            console.warn('По селектору [StartCtrl="' + this.prefix + this.actName + '"] - DOM объект не найден');
            return false;
        } else {
            return tmpElements;
        }
    },
    startModel: function (modelName, bodyScript) {
        if (typeof arguments[arguments.length - 1] === 'object') {
            var prop = arguments[arguments.length - 1];
        }
        var mN = modelName;
        var bS = bodyScript || false;
        this.start.loadModel(mN, bS, this.ctrlName, prop);
    },
    render: function (fileName, property) {
        var renderProperty = {
            ctrl: undefined,
            data: undefined
        };
        var self = this;
        (function () {
            if (property && typeof property === 'object') {
                var prop;
                for (prop in property) {
                    if (renderProperty.hasOwnProperty(prop) === false) {
                        if (self.start.debugMode) {
                            console.warn('Не существующее свойство "' + prop + '" для метода "render" контроллера "' + self.ctrlName + '"')
                        }
                        continue;
                    }
                    switch (prop) {
                        case 'ctrl':
                            if (typeof property[prop] === 'string') {
                                renderProperty[prop] = property[prop]
                            } else {
                                if (self.start.debugMode) {
                                    console.warn('Свойство "' + prop + '" объекта "render" должно быть строкой')
                                }
                            }
                            break;
                        default:
                            if (property[prop]) {
                                renderProperty[prop] = property[prop]
                            }
                    }
                }
            }
        })();
        if (this.hasOwnProperty('_queueRender') === false) {
            Object.defineProperties(this, {
                '_queueRender': {
                    value: new Array
                },
                '_renderTimeInterval': {
                    value: undefined,
                    writable: true
                }
            });
        }
        if (!renderProperty.ctrl) {
            renderProperty.ctrl = this.ctrlName;
        }
        this._queueRender.push({
            'ctrl': renderProperty.ctrl,
            'act': fileName,
            'property': renderProperty.data,
            'toReturn': function (a, b, c) {
                return self.start.loadActView(a, b, c);
            },
            status: 'start'
        });
        this.startViewQueue = function (self) {
            if (this._renderTimeInterval) clearInterval(this._renderTimeInterval);
            this._renderTimeInterval = setInterval(function () {
                if (self._queueRender.length < 1) {
                    clearInterval(self._renderTimeInterval);
                    return false;
                }
                var i = 0, queue = self._queueRender;
                for (; i < queue.length; i++) {
                    if (queue[queue.length - 1].status === 'ready') {
                        clearInterval(self._renderTimeInterval);
                    }
                    if (queue[i].status === 'start') {
                        queue[i].status = 'load';
                    }
                    if (queue[i].status === 'load') {
                        if (self.start.views.hasOwnProperty(queue[i].ctrl)) {
                            if (self.start.views[queue[i].ctrl].status === 'ready') {
                                queue[i].toReturn(queue[i].ctrl, queue[i].act, queue[i].property);
                                queue[i].status = 'ready';
                                break;
                            } else {
                                break;
                            }
                        } else {
                            self.start.includeJSView(queue[i].ctrl);
                        }
                    }
                    if (queue[i].status != 'ready') {
                        break;
                    }
                }
            }, 5)
        };
        this.startViewQueue(self);
        /*if (this.start.views.hasOwnProperty(renderProperty.ctrl)) {
         return this.start.loadActView(renderProperty.ctrl, fileName, renderProperty.data);
         } else {
         this.start.includeJSView(renderProperty.ctrl || this.ctrlName, fileName, renderProperty.data);
         }*/
    },

};
var DefaultModel = {
    /*p: new Object(),
     P: undefined,*/
    errors: function () {
        if ('e' in this) {
            return this.e;
        } else {
            Object.defineProperty(this, 'e', {
                value: new Errors(this)
            });
            return this.e;
        }

    },
    message: function (msg, to) {

    },
    beforeAjax: function (data) {
    },
    progress: function (prop) {
        progress.call(this);
        var res = this.progress(prop);
        if (res) {
            return res;
        }
    },
    ajax: function (property) {
        var model = this;
        var prop =
            {
                type: 'GET',
                url: '',
                data: '',
                async: true,
                dataType: 'html',
                dataEncode: true,
                success: function () {
                    return false;
                },
                beforeSend: function () {
                }
            }
            ;
        for (var par in property) {
            if (prop.hasOwnProperty(par)) {
                switch (par) {
                    case 'data':
                        var params = [];
                        var eachData = function (dObject, prefix) {
                            if (dObject instanceof FormData) {
                                if (property.dataEncode === undefined) {
                                    prop.dataEncode = false;
                                }
                                return dObject;
                            } else {
                                for (var name in dObject) {
                                    var key = prefix ? prefix + '[' + name + ']' : name;
                                    var value = dObject[name];
                                    if (typeof value === 'object') {
                                        eachData(value, key);
                                    } else {
                                        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                                    }
                                }
                                return params.join('&');
                            }
                        };
                        prop.data = eachData(property[par]);
                        break;
                    default:
                        prop[par] = property[par];
                        break;
                }
            } else {
                console.error('Не найдено свойство - "' + par + '" в методе "ajax" объекта "'
                    + this.modelName + '"')
            }
        }
        var ajax;
        if (window.XMLHttpRequest) {

            ajax = new XMLHttpRequest();
        }
        else {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                var data = ajax.responseText;
                if (prop.dataType === 'json') {
                    data = JSON.parse(ajax.responseText)
                }
                if (prop.success(data) === false) {
                    model.beforeAjax(data);
                }
            }
        };
        ajax.onload = function () {
            prop.beforeSend(ajax);
        };
        var g = new RegExp('get', 'i');

        if (g.test(prop.type && prop.data != '')) {
            prop.url += '?' + prop.data;
            prop.data = null;
        }

        if (prop.url === '') {
            prop.url = window.location.pathname;
        }
        ajax.open(prop.type, prop.url, prop.async);
        if (prop.dataEncode) {
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        ajax.send(prop.data);
    },
    /**
     * @var getProperties Ищет в структуре DOM элементы, указанные в модели в свойстве properties
     * @returns {boolean}
     */
    getProperties: function () {
        var _this = this;
        if ('p' in this == false) {
            Object.defineProperty(this, 'p', {
                value: new Object(),

            });
        }
        if (this.prefix === undefined) this.prefix = this.modelName + '_';
        if (this.properties === undefined) {
            return false;
        }
        for (var i = 0; i < this.properties.length; i++) {

            var tmpElement = document.querySelector('[StartModel="' + this.prefix + this.properties[i] + '"]');
            if (tmpElement) {
                Object.defineProperty(this.p, this.properties[i], {
                    writable: true,
                    value: tmpElement
                })
            } else {
                if (this.start.debugMode) {
                    console.warn('Не наден DOM елемент с селектором [StartModel="' + this.prefix + this.properties[i] +
                        '"]", для модели "' + this.modelName + '"')
                }
            }
        }
        this.P = this.p;
        if ('model' in this.p === false) {
            Object.defineProperty(this.p, 'model', {
                value: this
            });
        }
        if ('allPropertiesTo' in this.p === false) {
            Object.defineProperty(this.p, 'allPropertiesTo', {
                value: function (type) {
                    var optModel = this.model.properties;
                    var _tmpData = new Object();
                    var _fileData = new FormData();
                    var triger = false;
                    switch (type) {
                        default:
                            for (var prop in optModel) {
                                var opt = this[optModel[prop]];
                                if (!opt)break;
                                switch (opt.localName) {
                                    case 'input':
                                        if (opt.type === 'file') {
                                            triger = true;
                                            for (var i = 0; i < opt.files.length; i++) {
                                                _fileData.append(opt.name, opt.files[i]);
                                            }

                                            break;
                                        } else {
                                            _tmpData[optModel[prop]] = this[optModel[prop]].value;
                                        }
                                        break;
                                    default:
                                        if (this.hasOwnProperty(optModel[prop])) {
                                            _tmpData[optModel[prop]] = this[optModel[prop]].value;
                                        }
                                }
                            }
                            break;
                    }
                    if (triger) {
                        for (var d in _tmpData) {
                            _fileData.append(d, _tmpData[d]);
                        }
                        return _fileData;
                    }
                    return _tmpData;
                }
            });
        }
        return _this.p;
    },
    getProperty: function (prop) {
        if ('p' in this == false) {
            Object.defineProperty(this, 'p', {
                value: new Object(),

            });
        }
        if (this.prefix === undefined) this.prefix = this.modelName + '_';
        if (this.properties === undefined) {
            return false;
        }

        var tmpElement = document.querySelector('[StartModel="' + this.prefix + prop + '"]');
        if (tmpElement) {
            Object.defineProperty(this.p, prop, {
                writable: true,
                value: tmpElement
            })
            return this.p[prop];
        } else {
            if (this.start.debugMode) {
                console.warn('Не наден DOM елемент с селектором [StartModel="' + this.prefix + prop +
                    '"]", для модели "' + this.modelName + '"')
            }
            return false;
        }
    },
    setAttributes: function (attributes) {
        var atr = attributes;
        var lab = this.labels;

        if (atr != undefined && typeof atr === 'object') {
            var _get = {
                get test() {
                    return true;
                }
            };
            for (var res in atr) {

                if (this.start.array.findValue(lab, res) === false) continue;

                if (_get.test) {
                    this._defineGetSet(res);
                    this[res] = atr[res];
                    /*if(this.attributes.hasOwnProperty(res)){delete this.attributes[res]}
                     Object.defineProperty(this, res, {
                     get : function(){
                     return this[res.toString()];
                     },
                     set : function(value){
                     this.attributes[res] = value;
                     id = value;
                     }
                     });
                     this[res] = atr[res];*/
                }

            }
        }
    },
    newModel: function (modelName) {
        var model = new window[modelName.toString()];
        this.start._setModelValues(model, modelName, this.ctrl);
        if (model.hasOwnProperty('labels') && model.labels.length > 0) {
            var l = model.labels;
            for (var p in l) {
                this._defineGetSet(l[p], model);
            }
        }
        return model;
    },
    _defineGetSet: function (attr, model) {
        if ({}.__defineGetter__ === false) {
            return;
        }
        var _this = this;
        var func = function (f) {
            var tmp = _this.prototype._trimFunction(f.toString());
            var pAttr = /(\'\{attr\}\')/gm;
            tmp = tmp.replace(pAttr, attr);
            var newFunc = new Function('obj', tmp);
            newFunc(model || _this);
        };
        func(function () {
            if (obj.hasOwnProperty("'{attr}'")) {
                return false
            }
            Object.defineProperty(obj, "'{attr}'", {
                enumerable: true,
                set: function (value) {
                    this.attributes["'{attr}'"] = value;
                },
                get: function () {
                    if (this.attributes["'{attr}'"] === undefined || this.attributes["'{attr}'"] === null) return '';
                    return this.attributes["'{attr}'"];
                }
            })
        })
    }
};
var DefaultView = {
    prefix: undefined,

    show: function (newNode) {
        var tmp = document.createElement('div');
        var re = [], i = 0, a = this._renderEffects, autoApply = [], bin = {};
        for (; i < a.length; i++) {
            for (var block in a[i]) {
                re[block] = {};
                autoApply[block] = {};
                for (var comp in a[i][block]) {
                    re[block][comp] = {};
                    re[block][comp]['func'] = a[i][block][comp].func;
                    re[block][comp]['_bind'] = a[i][block][comp].bind;
                    re[block][comp]['parent'] = a[i][block][comp].parent;
                    re[block][comp]['apply'] = function(){
                        var _this = this, func = this._func;
                        var res = document.querySelectorAll(this._bind);
                        if (res.length === 1) res = res[0];
                        _this.func(res, this.parent);
                        return _this;
                    };
                    bin[block] = a[i][block][comp].bind;
                    autoApply[block][comp] = a[i][block][comp].autoApply;
                }
            }
        }
        tmp.innerHTML = newNode;
        if (tmp.children.length === 1) {
            tmp = tmp.children[0];
        }
        var _renderComplete = {
            result: tmp,
            effects: re,
            _autoApplyList: autoApply,
            _bindList: bin,
            append: function (nodeElement) {
                nodeElement.appendChild(this.result);
                this._autoApply();
            },
            bind: function (group, event, action) {
                if (this._bindList.hasOwnProperty(group) === false) {
                    console.log('error')
                }
                var selector = this._bindList[group];
                var element = document.querySelector(selector);
                if (!selector) {
                    console.log('Нет элементов');
                }
                element[event] = action;
            },
            _autoApply: function () {
                if (this._autoApplyList === undefined) return false;
                var list = this._autoApplyList;
                for (var block in list) {
                    for (var element in list[block]) {
                        if (list[block][element] === true) {
                            this.effects[block][element].apply();
                        }
                    }
                }
            }
        };
        this._renderEffects.length = 0;
        return _renderComplete;
    },
    addEffect: function (nameGroup, element, effects) {
        if (!element || element === '') throw new Error('Первый параметр метода "addEffect" объекта "" является обязательным');
        if (typeof element != 'string') throw new Error('Первый параметр метода "addEffect" объекта "" должен быть строкой');
        if (!effects || effects.length === 0 || !Array.isArray(effects)) throw new Error('Третий параметр метода "addEffect" объекта "" является обязательным и должен быть массивом');
        var _this = this;
        var regexp = /^(<\w+(?:[^\>])*(?=\>)\1)/;
        var tmpBlock = document.createElement('div');
        tmpBlock.innerHTML = element;
        var resElem = tmpBlock.children;
        var fix =  Math.round(Math.random() * 100000);;
        var arrayEffects = [];
        if(_this._groupNames.hasOwnProperty(nameGroup))fix = _this._groupNames[nameGroup];
        this._groupNames[nameGroup] = fix;
        var selector = '[StartViewEffectsId="' + this.prefix + nameGroup + '_' + fix + '"]';
        if (resElem.length > 1) {
            var i = 0;
            var data = [];
            for (; i < resElem.length; i++) {
                data.push(resElem[i].outerHTML.replace(regexp, '$1 StartViewEffectsId="' + this.prefix + nameGroup + '_' + fix + '"'));
            }
            element = data.join('\r\n')
        } else {
            element = element.replace(regexp, '$1 StartViewEffectsId="' + this.prefix + nameGroup + '_' + fix + '"');
        }
        this.test = function (nameG, ef, ar, sl, fix) {
            if (nameG in ar === false) {
                ar[nameG] = {};
            }
            if (nameG in _this._effectsAutocomplete === false) {
                _this._effectsAutocomplete[nameG] = [];
            }
            ar[nameG][ef[0]] = {'fix':fix};
            ar[nameG][ef[0]]['selector'] = sl;
            ar[nameG][ef[0]]['func'] = ef[1];
            ar[nameG][ef[0]]['parent'] = _this;
            ar[nameG][ef[0]]['bind'] = selector;
            if (ef[2] != undefined && ef[2] === false) {
                ar[nameG][ef[0]]['autoApply'] = false;
            } else {
                ar[nameG][ef[0]]['autoApply'] = true;
            }
        };
        if (Array.isArray(effects[0])) {
            for (i = 0; i < effects.length; i++) {
                if (effects[i].length === 0) continue;
                this.test(nameGroup, effects[i], arrayEffects, selector, fix);
            }
        } else {
            this.test(nameGroup, effects, arrayEffects, selector, fix);

        }
        this._renderEffects.push(arrayEffects);
        return element;
    },
}
var Logistic = {
    if: function (body) {
        this.queue.push({'if': body, 'statusIF': 'started', 'resultIF': 'startNullResultIF', 'params': false});
        return this;
    },
    then: function (body) {
        this.queue[this.queue.length - 1].then = body;
        this.queue[this.queue.length - 1].statusTHEN = false;
        return this;
    },
    else: function (body) {
        this.queue[this.queue.length - 1].else = body;
        this.queue[this.queue.length - 1].statusELSE = false;
        return this;
    },
    end: function (params) {
        //console.log(params)
        if (this.hasOwnProperty('startSetIntervalEnd')) clearInterval(this.startSetIntervalEnd);
        var q = this.queue;
        q[q.length - 1].params = params;
        q[q.length - 1].end = true;
        var _this = this;
        var preFunc = function (func, retArgs) {
            var pattern = /(function)(\s)*((\()(.*)*(\)))(\s)?\{/i;
            var mat = pattern.exec(func);
            if (retArgs) {
                if (mat) {
                    return mat[5];
                }
                return false
            }
            var data = _this._trimFunction(func);
            var pFunc = /return \'\{true\}\'\s*(;)*/gm;
            var result = data.replace(pFunc, 'startIfComplete.statusIF=true;\r\n');
            return result;
        };
        var searchFunc = function (func) {
            //console.log(func);
            var reg = {
                'object': /^(\w+)/,
                'method': /^(?:\w+\.?)(\w+)/,
                'commentLine': /\/\/.*/g,
                'commentBlock': /(?:\/\*)(?:([\w\s\S]*(?=\*\/)\1))(\*\/)/gm,
                'function': /^(?:[\s]*)(([\w\[\]\'\"\+\-]+)(?:((?:\.[\w\[\]\'\"\+\-]+(?:\(.*\))?(?=\.))*)(?:(?:\.)([\w\[\]\+\-]+))?)?)\s*(?:\()(.*)(?:\))(?!\s*[\{\.])/gm,
                'true': /((\s*)return\s*true)/gm,
                'false': /((\s*)return\s*false)/gm,
                'returnData': /(?:(?:\s*return\s*)(?!startIfComplete\.resultIF)([^_;]+)*)(?:(?:;)|(?:\r\n))/g,
            };
            var res, ret, newF, resCom, result = {}, commentPosition = new Array;
            while (resCom = reg.commentBlock.exec(func)) {
                commentPosition.push({'a': resCom.index, 'b': resCom.index + resCom[0].length})
            }
            while (resCom = reg.commentLine.exec(func)) {
                commentPosition.push({'a': resCom.index, 'b': resCom.index + resCom[0].length})
            }
            while (ret = reg.returnData.exec(func)) {
                //console.log(ret[1])
                var compliteReturn = '\r\n;startIfComplete.resultIF=' + ret[1] + ';\r\n' + 'return startIfComplete.resultIF;\r\n';
                reg.returnData.lastIndex = ret.index + compliteReturn.length;
                func = func.substr(0, ret.index) + compliteReturn + func.substr(ret.index + ret[0].length);
            }
            glob: while (res = reg.function.exec(func)) {
                //console.log(res[1]);
                var fullName = res[1], obj = res[2], lastMethod = res[4], val = res[5];
                for (var i = 0; i < commentPosition.length; i++) {
                    if (res.index > commentPosition[i].a && res.index < commentPosition[i].b) {
                        continue glob;
                    }
                }
                if (window.hasOwnProperty(obj)) {
                    continue;
                }
                if (
                    Array.prototype.hasOwnProperty(lastMethod) ||
                    String.prototype.hasOwnProperty(lastMethod) ||
                    Object.prototype.hasOwnProperty(lastMethod) ||
                    FormData.prototype.hasOwnProperty(lastMethod)
                ) {
                    continue;
                }
                if (obj === 'function') continue;
                if (obj.search(/(if)|(else)|(for)|(while)|(switch)/) === 0) continue;
                if (
                    (DefaultController.hasOwnProperty(lastMethod) ||
                    DefaultModel.hasOwnProperty(lastMethod) ||
                    DefaultView.hasOwnProperty(lastMethod)) &&
                    lastMethod[0] === '_'
                ) {
                    continue;
                }
                if (obj === 'startModFunction') continue;
                //console.log(res[1]);
                var value = val != undefined && val != '' ? ', ' + val : '';
                var r = (val + '').split(',');
                if (r[0] === '' || r[0] == 'undefined') {
                    delete r[0];
                }
                newF =
                    'var startOriginFunction = ' + fullName + ';\r\n' +
                    'var startResultPreFunction  = startModFunction('.concat(fullName + ');\r\n') +
                    'var startLastArguments = startModFunction(' + fullName + ', true);\r\n' +
                    'var startNewFunctionArguments = startLastArguments != undefined ? \'startIfComplete ,startModFunction, \' + startLastArguments : \'startIfComplete ,startModFunction \'   ;\r\n' +
                    fullName + ' = new Function(startNewFunctionArguments, startResultPreFunction.f);\r\n' +
                    //'console.log(String(' + fullName +'));\r\n'+
                    fullName + '(startIfComplete, startModFunction ' + value + ');\r\n' +
                    fullName + ' = startOriginFunction;';
                var r = new RegExp('(' + fullName + ')(' + fullName + ')' + '(\\()(.+)?(\\))');
                result['f'] = func.replace(res[0], newF);
                result['r'] = res;
                result['obj'] = obj;
            }
            if (result.f) {
                return result;
            }
            result.f = func;
            return result;
        };
        var startModFunction = function (func, getArgs) {
            if (getArgs) {
                var args = preFunc(String(func), true);
                var dataArguments = new Array;
                if (args) {
                    var arr = args.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        dataArguments.push('\'' + arr[i] + '\'');
                    }
                    return args.split(',');
                }
                return undefined;
            }
            var data = preFunc(String(func));
            var result = searchFunc(data);
            var origin = {f: ''};
            origin.f = data;
            return result;
        };
        this.startSetIntervalEnd = setInterval(function () {
            for (var i = 0; i < q.length; i++) {
                if (q[i].hasOwnProperty('statusIF') && q[i].statusIF === 'started' && q[i].end === true) {
                    q[i].statusIF = 'load';
                    var func = String(q[i]['if']);
                    var result = searchFunc(preFunc(func));
                    var args = startModFunction(func, true);
                    var nArgs;
                    if (q[i].params) {
                        var args = '';
                        for (var p in q[i].params) {
                            args += ', ' + p;
                        }
                        nArgs = 'startIfComplete, startModFunction' + args;
                    } else nArgs = 'startIfComplete, startModFunction';
                    var runFunction = function () {
                        var args = new Object();
                        var val = new Array;
                        var res;
                        for (res in q[i].params) {
                            args[res] = q[i].params[res];
                            val.push('args.' + res);
                        }
                        var completeArguments = val.length > 0 ? ', ' + val.join(', ') : '';
                        var completeFunc = 'q[i]["if"]' + '(q[i], startModFunction ' + completeArguments + ')';
                        eval(completeFunc);
                    };
                    q[i]["if"] = new Function(nArgs, result.f).bind(_this);
                    runFunction();
                }else if ((q[i].resultIF) && q[i].resultIF != 'startNullResultIF' && q[i].end === true) {
                    try {
                        if (q[i].hasOwnProperty('then')) {
                            var result = {'if': q[i].resultIF};
                            q[i]['then'](result);
                        }
                    } catch (e) {
                        if (_this.start.debugMode) {
                            console.error(e + '\r\n' +
                                'Было выброшенно исключение с ошибкой в функции \r\n"' + q[i]['then'] + '"');
                        } else {
                            console.warn('Было полученно исключение в коде, рекомендуем проверить fraemwork в debugMode')
                        }
                    } finally {
                        q.splice(i, 1);
                        continue;
                    }
                } else if ((q[i].resultIF === false || q[i].resultIF === undefined) && q[i].resultIF != 'startNullResultIF' && q[i].end === true) {
                    try {
                        if (q[i].hasOwnProperty('else')) {
                            var result = {'if': q[i].resultIF};
                            q[i]['else'](result);
                        }
                    } catch (e) {
                        if (_this.start.debugMode) {
                            console.error(e + '\r\n' +
                                'Было выброшенно исключение с ошибкой в функции \r\n"' + q[i]['else'] + '"');
                        } else {
                            console.warn(_this.start.ERROR_WARN_MSG)
                        }
                    } finally {
                        q.splice(i, 1)
                        continue;
                    }
                }
                if (q.length < 1) {
                    clearInterval(_this.startSetIntervalEnd)
                }
            }
        }, 10)
    },
    _trimFunction: function (func) {
        var s = new Start();
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
        var completeFunc = 'try{';
        var endFunc = '}catch(e){' +
            'if(this.start.debugMode){' +
            'console.error(e + "\\r\\n' + s.string.trimS(s.string.addSlash(data, ['\'', '"'])) + '")' +
            '}else{' +
            'console.warn("Было полученно исключение в коде, рекомендуем проверить fraemwork в debugMode")' +
            '}' +
            '}';
        completeFunc += String(data) + endFunc;

        return data;
    },
};

function progress() {
    var _this = this;
    this.progress = function (p) {
        switch (p.type) {
            case 'ajax1':
                var pBlock = document.createElement('span');
                pBlock.className = 'progress-bar3';
                return pBlock;
                break;
        }
    }
}
/**Errors object...
 * Объект ошибок для вывода сообщений пользователю. На данный момент разрабаытвается для ajax запросов
 * После вызова в модели метода this.errors() можно срау вызывать методы объекта errors "this.errors().showAll(object 'prop')"
 * Для методов показывающих ошибки нужно передать оъект настроек:
 * {
 *  dataError: {},
 *  errorPattern: {}
 * }
 *
 * В "dataError" передается объект, где в ключе должно содержаться имя свойства модели, описанное в свойстве properties.
 *      Ключ dataErrors может содеражать любые преписки к свойству, главное что бы там содеражалось его название,
 *      в качестве значение -  сообщение об ошибке;
 * В "errorPattern" передается объект формата "{ID: 'Pattern_{{prop}}'}" или {Class: 'Pattern_{{prop}}'}
 *      или {myTagName: 'Pattern_{{prop}}'}. В качестве ключа передается имя тэга, в значении находится строковое представление
 *      шаблона, ключевое слово {{prop}} будет заменено на имя свойства модели, найденное в ключе дата dataError.
 *      После замены ключевого слова, функция будет искать в DOM эелемент например с id="Pattern_text".
 *      В найденные элементы будет помещено текстовое сообщение переданное в значении dataError.
 *      Стоит обратить особое внимение на то, что сначала ищется предполагаемое стандартное свойство на дом элементе
 *      например StartModel="Prefix_error_propertyName" - здесь prefix -  описывается в модели или будет по умолчанию как название
 *      самой модели. _error_ - добавляется автоматически, без него не будет найден DOM элемент. propertyName - имя свойства,
 *      для которого ищется поле для вывода ошибки
 * **/
function Errors(obj) {
    var _this = this;
    this.owner = obj;
    this.loaded = true;
    this.propError = {
        dataError: undefined,
        errorPattern: undefined,
        showMethod: function (text, label, input) {
            label.style.color = 'red';
            label.innerHTML = text.toString();
        },
        hideMethod: function (label) {
            label.innerHTML = '';
        }
    };


    this.showAll = function (prop) {
        this._setNewProperties(prop);
        this._searchElements();
        for (var i in this.dataElements) {
            var text = this.dataElements[i].text[0];
            var label = this.dataElements[i].label;
            var input = this.dataElements[i].input;
            if (this.propError.dataError.hasOwnProperty(this.dataElements[i].key)) {
                this.propError.showMethod(text, label, input);

            } else {
                this.propError.hideMethod(label);
            }

        }
    };
    this._setNewProperties = function (prop) {
        if (prop === undefined) {
            this.propError.dataError = {};
            return false;
        }
        for (var p in prop) {
            if (this.propError.hasOwnProperty(p.toString()) === false) {
                console.warn('Не существующее свойство "' + p.toString() + '" в методе "showErrors" объекта модели "' + _this.owner.modelName + '"')
            }
        }
        if (typeof prop.dataError === 'object') {
            this.propError.dataError = prop.dataError;
        }
        if (typeof prop.errorPattern === 'object') {
            this.propError.errorPattern = prop.errorPattern;
        }
        if (typeof prop.showMethod === 'function') {
            this.propError.showMethod = prop.showMethod;
        }

    };
    this._searchElements = function () {
        for (var i in this.owner.properties) {
            for (var p in this.propError.dataError) {
                var patt = new RegExp(this.owner.properties[i].toString());

                if (patt.test(p)) {
                    if ('dataElements' in this === false && typeof this.dataElements != 'object') {
                        Object.defineProperty(this, 'dataElements', {
                            value: new Object(),
                            enumerable: true,
                            writable: true,
                            configurable: true
                        })
                    }

                    Object.defineProperty(this.dataElements, this.owner.properties[i].toString(), {
                        value: {},
                        enumerable: true,
                        writable: true,
                        configurable: true
                    });


                    var tmpPat = '[startmodel="' + this.owner.prefix + 'error_' + this.owner.properties[i] + '"]';
                    var elem = document.querySelector(tmpPat.toString());
                    if (elem) {
                        Object.defineProperties(this.dataElements[this.owner.properties[i]], {
                            'label': {
                                value: elem
                            },
                            'input': {
                                value: this.owner.p[this.owner.properties[i]]
                            },
                            'text': {
                                value: this.propError.dataError[p]
                            },
                            'key': {
                                value: p
                            }
                        });
                    } else {
                        if (this.propError.errorPattern === undefined) {
                            if (this.owner.start.debugMode) {
                                console.error('Не найден DOM элемент для "' + p + '", по "StartModel=' + this.owner.prefix + 'error_' +
                                    this.owner.properties[i] + ' и не указано свойство errorPattern" для метода "showAll"')
                            }
                            return false;
                        }
                        for (var tagName in this.propError.errorPattern) {
                            switch (tagName.toLowerCase()) {
                                case 'id':
                                    var patternError = this.propError.errorPattern[tagName].replace(new RegExp('{{prop}}'), this.owner.properties[i]);
                                    elem = document.getElementById(patternError.toString());
                                    if (elem) {
                                        Object.defineProperties(this.dataElements[this.owner.properties[i]], {
                                            'label': {
                                                value: elem
                                            },
                                            'input': {
                                                value: this.owner.p[this.owner.properties[i]]
                                            },
                                            'text': {
                                                value: this.propError.dataError[p]
                                            },
                                            'key': {
                                                value: p
                                            }
                                        })
                                    } else {
                                        if (this.owner.start.debugMode) {
                                            console.warn('Не найден дом элемент с ID="' + patternError + '". Вывод ошибки для "' +
                                                p + '" не возможен')
                                        }
                                    }
                            }
                        }
                    }
                }
            }
        }
    }

}
function Messages(obj) {
    var _this = this;
    this.obj = obj;

    this.showOne = function (prop) {
        var labelName = _this.obj.prefix + 'msg_' + prop.label
        var label = document.querySelector('[StartModel="' + labelName + '"]')
        label.innerHTML = prop.text;

    }
}