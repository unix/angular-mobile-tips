/**
 * Created by Witt on 2016/4/5.
 */
const tipsService = class self {
    constructor ($rootScope){
        this._root = $rootScope
    }
    static err (e = 'confirm或prompt至少需要指定一个成功回调函数'){
        throw new Error(e);
    }
    alert (title = '提示', content = undefined, callback = () => ''){
        this._root.$emit('alert', title, content, callback)
    }
    confirm (title = '提示', ensure = self.err(), cancel = () => ''){
        this._root.$emit('confirm', title, ensure, cancel)
    }
    prompt (title = '请输入', ensure = self.err(), cancel = () => ''){
        this._root.$emit('prompt', title, ensure, cancel)
    }
}

const tipsDirective = ($http, $templateCache, $compile, ngTips) => {
    return {
        resetrict: 'EA',
        link: (scope, element, attr) => {
            $http.get('ng-tips.html', {cache: $templateCache})
            .success(template => element.append($compile(template)(scope.$new())))
            .error(e => ngTips.constructor.err(e))
            const showBox = (name, status = true) => scope[name + 'BoxActive'] = status

            scope.$on('alert', (event, ...content) => {
                console.log(1323);
                scope.ngTipsOnlyTitle = !content[1]
                scope.ngTipsTitle = content[0]
                scope.ngTipsContent = content[1]
                showBox(event.name)
                scope.ngTipsCancel = () => {
                    showBox(event.name, false)
                    content[2]()
                }
            })
            scope.$on('confirm', (event, title, ...callback) => {
                scope.ngTipsTitle = title
                showBox(event.name)
                scope.ngTipsConfirm = status => {
                    showBox(event.name, false)
                    callback[status]()
                }
            })
            scope.$on('prompt', (event, title, ...callback) => {
                scope.ngTipsTitle = title
                showBox(event.name)
                scope.ngTipsPrompt = (status, value) => {
                    showBox(event.name, false)
                    callback[status](value)
                }
            })
        }
    }
}
tipsDirective.reject = ['$http', '$templateCache', '$compile', 'ngTips']
const templateCache = $templateCache => {
    const template = `<div class="ng-tips {{alertBoxActive || confirmBoxActive || promptBoxActive?'change':''}}"><div class="bg" ng-click="ngTipsCancel()"></div><div class="alert-box {{ngTipsOnlyTitle?'onlyTitle':''}} {{alertBoxActive?'change':''}}"><h2 ng-bind="ngTipsTitle"></h2><p ng-bind="ngTipsContent"></p></div><div class="confirm-box {{confirmBoxActive?'change':''}}"><h2 ng-bind="ngTipsTitle"></h2><div><button ng-click="ngTipsConfirm(0)">确认</button><button ng-click="ngTipsConfirm(1)">取消</button></div></div><div class="prompt-box {{promptBoxActive?'change':''}}"><h3 ng-bind="ngTipsTitle"></h3><input type="text" ng-model="ngTipsInput"/><div><button ng-click="ngTipsPrompt(0,ngTipsInput)">确认</button><button ng-click="ngTipsPrompt(1,ngTipsInput)">取消</button></div></div></div>`
    $templateCache.put('ng-tips.html',template)
}
templateCache.reject = ['$templateCache']

angular.module('ngTips', [])
    .run(['$templateCache', templateCache])
    .service('ngTips', tipsService)
    .directive('ngTips', tipsDirective)