import _ from "underscore";
import wxShareView from './app.html';
export default class wxShareCommon {
	constructor(data) {
		this.data = data;
		this.container = $("body");
		this.compiled = _.template(wxShareView);
		this.render();
	}
	render() {
		let wxShareHtml = this.compiled({
			data: this.data || {}
		});
		this.container.append(wxShareHtml);
	}
}