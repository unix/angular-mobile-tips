/**
 * Created by Witt on 2016/4/23.
 */
export default class self {
	constructor (ngTips){
		this._ngTips = ngTips
		this._ngTips.alert(1)
	}
	demoAlert (t, c){
		this._ngTips.alert(t, c)
	}
	demoConfirm (t){
		this._ngTips.confirm(t, () =>{
			console.log('您按下了确认');
		}, () =>{
			console.log('您按下了取消');
		})
	}
	demoPrompt (t){
		this._ngTips.prompt(t, text =>{
			console.log('您输入了' + text);
		})
	}


}