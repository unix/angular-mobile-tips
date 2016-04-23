(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Witt on 2016/4/5.
 */
var tipsService = function () {
    function self($rootScope) {
        _classCallCheck(this, self);

        this._root = $rootScope;
    }

    _createClass(self, [{
        key: 'alert',
        value: function alert() {
            var title = arguments.length <= 0 || arguments[0] === undefined ? '提示' : arguments[0];
            var content = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
            var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {
                return '';
            } : arguments[2];

            this._root.$emit('alert', title, content, callback);
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            var title = arguments.length <= 0 || arguments[0] === undefined ? '提示' : arguments[0];
            var ensure = arguments.length <= 1 || arguments[1] === undefined ? self.err() : arguments[1];
            var cancel = arguments.length <= 2 || arguments[2] === undefined ? function () {
                return '';
            } : arguments[2];

            this._root.$emit('confirm', title, ensure, cancel);
        }
    }, {
        key: 'prompt',
        value: function prompt() {
            var title = arguments.length <= 0 || arguments[0] === undefined ? '请输入' : arguments[0];
            var ensure = arguments.length <= 1 || arguments[1] === undefined ? self.err() : arguments[1];
            var cancel = arguments.length <= 2 || arguments[2] === undefined ? function () {
                return '';
            } : arguments[2];

            this._root.$emit('prompt', title, ensure, cancel);
        }
    }], [{
        key: 'err',
        value: function err() {
            var e = arguments.length <= 0 || arguments[0] === undefined ? 'confirm或prompt至少需要指定一个成功回调函数' : arguments[0];

            throw new Error(e);
        }
    }]);

    return self;
}();

var tipsDirective = function tipsDirective($http, $templateCache, $compile, ngTips) {
    return {
        resetrict: 'EA',
        link: function link(scope, element, attr) {
            $http.get('ng-tips.html', { cache: $templateCache }).success(function (template) {
                return element.append($compile(template)(scope.$new()));
            }).error(function (e) {
                return ngTips.constructor.err(e);
            });
            var showBox = function showBox(name) {
                var status = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                return scope[name + 'BoxActive'] = status;
            };

            scope.$on('alert', function (event) {
                for (var _len = arguments.length, content = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    content[_key - 1] = arguments[_key];
                }

                scope.ngTipsOnlyTitle = !content[1];
                scope.ngTipsTitle = content[0];
                scope.ngTipsContent = content[1];
                showBox(event.name);
                scope.ngTipsCancel = function () {
                    showBox(event.name, false);
                    content[2]();
                };
            });
            scope.$on('confirm', function (event, title) {
                for (var _len2 = arguments.length, callback = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                    callback[_key2 - 2] = arguments[_key2];
                }

                scope.ngTipsTitle = title;
                showBox(event.name);
                scope.ngTipsConfirm = function (status) {
                    showBox(event.name, false);
                    callback[status]();
                };
            });
            scope.$on('prompt', function (event, title) {
                for (var _len3 = arguments.length, callback = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                    callback[_key3 - 2] = arguments[_key3];
                }

                scope.ngTipsTitle = title;
                showBox(event.name);
                scope.ngTipsPrompt = function (status, value) {
                    showBox(event.name, false);
                    callback[status](value);
                };
            });
        }
    };
};
tipsDirective.reject = ['$http', '$templateCache', '$compile', 'ngTips'];
var templateCache = function templateCache($templateCache) {
    var template = '<div class="ng-tips {{alertBoxActive || confirmBoxActive || promptBoxActive?\'change\':\'\'}}"><div class="bg" ng-click="ngTipsCancel()"></div><div class="alert-box {{ngTipsOnlyTitle?\'onlyTitle\':\'\'}} {{alertBoxActive?\'change\':\'\'}}"><h2 ng-bind="ngTipsTitle"></h2><p ng-bind="ngTipsContent"></p></div><div class="confirm-box {{confirmBoxActive?\'change\':\'\'}}"><h2 ng-bind="ngTipsTitle"></h2><div><button ng-click="ngTipsConfirm(0)">确认</button><button ng-click="ngTipsConfirm(1)">取消</button></div></div><div class="prompt-box {{promptBoxActive?\'change\':\'\'}}"><h3 ng-bind="ngTipsTitle"></h3><input type="text" ng-model="ngTipsInput"/><div><button ng-click="ngTipsPrompt(0,ngTipsInput)">确认</button><button ng-click="ngTipsPrompt(1,ngTipsInput)">取消</button></div></div></div>';
    $templateCache.put('ng-tips.html', template);
};
templateCache.reject = ['$templateCache'];

angular.module('ngTips', []).run(['$templateCache', templateCache]).service('ngTips', tipsService).directive('ngTips', tipsDirective);

},{}]},{},[1])


//# sourceMappingURL=ngTips.js.map
