/**
 * Created by Witt on 2016/4/2.
 */
import 'angular'
import ctrl from './controller'
import ngTips from './ngTips'

angular.module('app', ['ngTips'])
	.controller('controller', ctrl)
angular.element(document).ready(() => angular.bootstrap(document, ['app']))
