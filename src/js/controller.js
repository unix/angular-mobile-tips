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


}