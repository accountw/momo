
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/PlayUI.ui
*/



@UIBind('UI/PlayUI.ui')
export default class PlayUI_Generate extends UIScript {
		private jumpCanvas_Internal: mw.Canvas
	public get jumpCanvas(): mw.Canvas {
		if(!this.jumpCanvas_Internal&&this.uiWidgetBase) {
			this.jumpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/jumpCanvas') as mw.Canvas
		}
		return this.jumpCanvas_Internal
	}
	private jumpBtn_Internal: mw.Button
	public get jumpBtn(): mw.Button {
		if(!this.jumpBtn_Internal&&this.uiWidgetBase) {
			this.jumpBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/jumpCanvas/jumpBtn') as mw.Button
		}
		return this.jumpBtn_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 