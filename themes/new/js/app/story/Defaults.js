/**
 * Created by tazeb on 14.06.2016.
 */
var DefaultController =
{
    ctrlName: undefined,
    actName: undefined,
    prefix: undefined,
    getControls: function () {
        if (this.prefix === undefined) this.prefix = this.ctrlName.replace(/Controller/i, '') + '_';
        var ctrl = undefined;
        var tmpElements = document.querySelectorAll('[StartCtrl="' + this.prefix + this.actName + '"]');
        if (tmpElements.length < 1) {
            console.warn('По селектору [StartCtrl="' + this.prefix + this.actName + '"] - DOM объект не найден');
            return false;
        } else {
            return tmpElements;
        }
        return ctrl;
    },
    startModel: function (modelName, bodyScript) {
        if (typeof arguments[arguments.length - 1] === 'object') {
            var prop = arguments[arguments.length - 1];
        }
        var mN = modelName;
        var bS = bodyScript || false;
        this.start.loadModel(mN, bS, this.ctrlName, prop);
    },
    render: function (fileName) {
        if (this.start.views.hasOwnProperty(this.ctrlName)) {
            return this.start.loadActView(this.ctrlName, fileName);
        } else {

            this.start.includeJSView(this.ctrlName, fileName);
        }
    }
};
var DefaultModel = {
    modelName: undefined,
    prefix: undefined,
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

        var ajax = new XMLHttpRequest();
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
                    var tmpData = new Object();
                    var fileData = new FormData();
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
                                                fileData.append(opt.name, opt.files[i]);
                                            }

                                            break;
                                        } else {
                                            tmpData[optModel[prop]] = this[optModel[prop]].value;
                                        }
                                        break;
                                    default:
                                        if (this.hasOwnProperty(optModel[prop])) {
                                            tmpData[optModel[prop]] = this[optModel[prop]].value;
                                        }
                                }
                            }
                            break;
                    }
                    if (triger) {
                        for (var d in tmpData) {
                            fileData.append(d, tmpData[d]);
                        }
                        return fileData;
                    }
                    return tmpData;
                }
            });
        }
        return this.p;
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
                if (this.hasOwnProperty('attributes') === false) {
                    Object.defineProperty(this, 'attributes', {
                        value: new Object(),
                        enumerable: true
                    });
                }

                if (_get.test) {
                    this._defineGetSet(res, atr[res]);
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
    _defineGetSet: function (attr, val) {
        var _this = this;
        var func = function (f) {
            var tmp = _this.prototype._trimFunction(f.toString());
            var pAttr = /(\'\{attr\}\')/gm;
            var pVal = /(\'\{val\}\')/gm;
            tmp = tmp.replace(pAttr, attr);
            tmp = tmp.replace(pVal, val);
            var newFunc = new Function('obj', tmp);
            newFunc(_this);

        }
        func(function () {
            Object.defineProperty(obj, "'{attr}'", {
                set: function(value){
                    this.attributes["'{attr}'"] = value;
                },
                get: function(){
                    return this.attributes["'{attr}'"];
                }
            })
        })
    }
};
var DefaultView = {
    prefix: undefined,

    write: function (body) {
        if (body === undefined || body === '') return false;
        this.components.push(body);
        return this
    },
    create: function () {

    }
};
var Logistic = {
    if: function (body) {
        this.queue.push({'if': body, 'statusIF': 'started'});
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
        var _this = this;
        var q = this.queue;
        var argument = '';
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
            //console.log(result);
            return result;
        };
        var searchFunc = function (func) {
            var reg = {
                'object': /^(\w+)/,
                'method': /^(?:.\w+\.?)(\w+)/,
                'function': /(?:.[^\.\S])(((\w)+(\.)?)+)(\()(.+)?(\))/g,
                'true': /((\s*)return\s*true)/gm,
                'false': /((\s*)return\s*false)/gm
            };
            var res, newF, result = {};
            if (reg.false.test(func)) {
                func = func.replace(reg.false, '\r\nstartIfComplete.statusIF=false;\r\n' + '$2');
            }
            ;
            if ((reg.true.test(func))) {
                func = func.replace(reg.true, '\r\nstartIfComplete.statusIF=true;\r\n' + '$2')
            }
            while (res = reg.function.exec(func)) {
                var obj = reg.object.exec(res[1])[1];
                reg.function.lastIndex = res.index + res[0].length;

                if (window.hasOwnProperty(reg.object.exec(res[1])[1])) continue;
                if (reg.object.exec(res[1])[1] === 'function') continue;
                if (reg.object.exec(res[1])[1].search(/(if)|(else)|(for)|(while)|(switch)/) === 0) continue;
                if ((obj === 'this' || obj === '_this') && (
                        DefaultController.hasOwnProperty(reg.method.exec(res[1])[1]) ||
                        DefaultModel.hasOwnProperty(reg.method.exec(res[1])[1]) ||
                        DefaultView.hasOwnProperty(reg.method.exec(res[1])[1])
                    )) {
                    continue;
                }
                if (reg.object.exec(res[1])[1] === 'startModFunction') continue;
                //console.log(res);
                var v = res[6] != undefined ? ', ' + res[6] : '';
                var r = (res[6] + '').split(',');
                if (r[0] === '' || r[0] == 'undefined') {
                    delete r[0];
                }
                newF =
                    'var startOriginFunction = ' + res[1] + ';\r\n' +
                    'var startResultPreFunction  = startModFunction('.concat(res[1] + ');\r\n') +
                    'var startLastArguments = startModFunction(' + res[1] + ', true);\r\n' +
                    'var ar = startLastArguments != undefined ? \'startIfComplete ,startModFunction, \' + startLastArguments : \'startIfComplete ,startModFunction \'   ;\r\n' +
                    res[1] + ' = new Function(ar, startResultPreFunction.f);\r\n' +
                        //'console.log(String(' + res[1] +'));\r\n' +
                    res[1] + '(startIfComplete, startModFunction ' + v + ');\r\n' +
                    res[1] + ' = startOriginFunction;';
                var r = new RegExp('(' + res[1] + ')' + '(\\()(.+)?(\\))');
                result['f'] = func.replace(r, newF);
                result['r'] = res;
                result['obj'] = obj;
            }
            //console.log(func)
            if (result.f) return result;
            result.f = func;
            return result;
            //window.hasOwnProperty(reg.object.exec(res[1])[1]) проверка есть ли такой объек в окружении глобальных переменных
            //reg.object.exec(res[1])[1] === 'this' проверка является ли объект экземпляром текущей модели или контроллера
            //_this.__proto__.hasOwnProperty(reg.method.exec(res[1])[1]) проверка в свойстве прототипе объекта
        };
        var startModFunction = function (func, getArgs) {
            if (getArgs) {
                var args = preFunc(String(func), true)
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
        var si = setInterval(function () {
            //console.log(q.length)
            for (var i = 0; i < q.length; i++) {
                if (q[i].hasOwnProperty('statusIF') && q[i].statusIF === 'started') {
                    q[i].statusIF = 'load';
                    var func = String(q[i]['if']);
                    var result = searchFunc(preFunc(func));
                    var args = startModFunction(func, true);
                    var nArgs;
                    if (params) {
                        var args = '';
                        for (var p in params) {
                            args += ', ' + p;
                        }
                        nArgs = 'startIfComplete, startModFunction' + args;
                    } else nArgs = 'startIfComplete, startModFunction';
                    var runFunction = function (func, prop) {
                        var args = new Object();
                        var val = new Array;
                        var res;
                        for (res in prop) {
                            args[res] = prop[res];
                            val.push('args.' + res);
                        }
                        var completeArguments = val.length > 0 ? ', ' + val.join(', ') : '';
                        var compliteFunc = func + '(q[i], startModFunction ' + completeArguments + ')';
                        eval(compliteFunc);

                    };
                    q[i]['if'] = new Function(nArgs, result.f).bind(_this);
                    runFunction('q[i]["if"]', params);

                } else if (q[i].statusIF === true) {

                    if (q[i].hasOwnProperty('then')) {
                        q[i]['then']();
                        q.splice(i, 1);
                        clearInterval(si);
                    }
                } else if (q[i].statusIF === false) {
                    if (q[i].hasOwnProperty('else')) {
                        q[i]['else']();
                        q.splice(i, 1);
                        clearInterval(si);
                    }
                } else if (q[i].statusIF === 'error') {

                }
            }
        }, 5)
    },
    _trimFunction: function (func) {
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
    },
    _thisSetFinal: function () {

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
        setNewProperties(prop);
        searchElements();
        for (var i in _this.dataElements) {
            var text = _this.dataElements[i].text[0];
            var label = _this.dataElements[i].label;
            var input = _this.dataElements[i].input;
            if (_this.propError.dataError.hasOwnProperty(this.dataElements[i].key)) {
                _this.propError.showMethod(text, label, input);

            } else {
                _this.propError.hideMethod(label);
            }

        }
    };
    var setNewProperties = function (prop) {
        if (prop === undefined) {
            _this.propError.dataError = {};
            return false;
        }
        for (var p in prop) {
            if (_this.propError.hasOwnProperty(p.toString()) === false) {
                console.warn('Не существующее свойство "' + p.toString() + '" в методе "showErrors" объекта модели "' + _this.owner.modelName + '"')
            }
        }
        if (typeof prop.dataError === 'object') {
            _this.propError.dataError = prop.dataError;
        }
        if (typeof prop.errorPattern === 'object') {
            _this.propError.errorPattern = prop.errorPattern;
        }
        if (typeof prop.showMethod === 'function') {
            _this.propError.showMethod = prop.showMethod;
        }

    };
    var searchElements = function () {
        for (var i in _this.owner.properties) {
            for (var p in _this.propError.dataError) {
                var patt = new RegExp(_this.owner.properties[i].toString());

                if (patt.test(p)) {
                    if ('dataElements' in _this === false && typeof _this.dataElements != 'object') {
                        Object.defineProperty(_this, 'dataElements', {
                            value: new Object(),
                            enumerable: true,
                            writable: true,
                            configurable: true
                        })
                    }

                    Object.defineProperty(_this.dataElements, _this.owner.properties[i].toString(), {
                        value: {},
                        enumerable: true,
                        writable: true,
                        configurable: true
                    });


                    var tmpPat = '[startmodel="' + _this.owner.prefix + 'error_' + _this.owner.properties[i] + '"]';
                    var elem = document.querySelector(tmpPat.toString());
                    if (elem) {
                        Object.defineProperties(_this.dataElements[_this.owner.properties[i]], {
                            'label': {
                                value: elem
                            },
                            'input': {
                                value: _this.owner.p[_this.owner.properties[i]]
                            },
                            'text': {
                                value: _this.propError.dataError[p]
                            },
                            'key': {
                                value: p
                            }
                        });
                    } else {
                        if (_this.propError.errorPattern === undefined) {
                            if (_this.owner.start.debugMode) {
                                console.error('Не найден DOM элемент для "' + p + '", по "StartModel=' + _this.owner.prefix + 'error_' +
                                    _this.owner.properties[i] + ' и не указано свойство errorPattern" для метода "showAll"')
                            }
                            return false;
                        }
                        for (var tagName in _this.propError.errorPattern) {
                            switch (tagName.toLowerCase()) {
                                case 'id':
                                    var patternError = _this.propError.errorPattern[tagName].replace(new RegExp('{{prop}}'), _this.owner.properties[i]);
                                    elem = document.getElementById(patternError.toString());
                                    if (elem) {
                                        Object.defineProperties(_this.dataElements[_this.owner.properties[i]], {
                                            'label': {
                                                value: elem
                                            },
                                            'input': {
                                                value: _this.owner.p[_this.owner.properties[i]]
                                            },
                                            'text': {
                                                value: _this.propError.dataError[p]
                                            },
                                            'key': {
                                                value: p
                                            }
                                        })
                                    } else {
                                        if (_this.owner.start.debugMode) {
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
