/**
*  @author YUTAKA
*/
var HTML = function (content) {
	this.content = content;
	this.direction = "from";
	this._from = {};
	this._to = {};
	this.index = 0;
	this.log = false;
	this.position = 0;
}

/** 
 * Extract parts from long content
 * @param {string} content Text to parse
 * @return {object} the result of the exponential calculation
 */
HTML.parse = function (content) {
	return new HTML(content);
}

/**
 * 
 * @param {string} pattern 
 * @param {int} offset 
 * @returns 
 */
HTML.prototype.from = function (pattern, offset) {
	if (this.log) Logger.log("ParseUtil.from: " + pattern)
	this._from.text = pattern;
	this._from.offset = offset || 0
	return this;
}

/**
 * 
 * @param {string} pattern 
 * @param {int} offset 
 * @returns 
 */
HTML.prototype.to = function (pattern, offset) {
	if (this.log) Logger.log("ParseUtil.to: " + pattern);
	this._to.text = pattern;
	this._to.offset = offset || 0;
	return this;
}

/**
 * 
 * @param {int} index 
 * @returns 
 */
HTML.prototype.offset = function (index) {
	this.index = index
	return this;
}

/**
 * 
 * @param {string} way 
 * @returns 
 */
HTML.prototype.setDirection = function (way) {
	this.direction = way;
	return this;
}

/**
 * 
 * @returns 
 */
HTML.prototype.setLog = function () {
	this.log = true;
	return this;
}

/**
 * 
 * @returns 
 */
HTML.prototype.build = function () {

	var txt = this.content;
	var temp = 0;

	var obj = {}
	obj.from = this._from;
	obj.to = this._to
	obj.index = this.index;
	if (this.log) Logger.log("Index offset %s", this.index);

	var keyword = {};

	if (this.direction == "from") {
		if (this.log) Logger.log("from_mode");
		this.position = txt.indexOf(obj.from.text, obj.index);
		if (this.log) Logger.log("Iterate offset: %s", this.position);
		keyword.from = this.position + parseInt(obj.from.offset, 10) + obj.from.text.length;
		keyword.to = txt.indexOf(obj.to.text, keyword.from + 1) + parseInt(obj.to.offset, 10);
		if (this.log) Logger.log("to:" + txt.indexOf(obj.to.text, keyword.from + 1))
	} else {
		if (this.log) Logger.log("to_mode");
		keyword.to = txt.indexOf(obj.to.text) + parseInt(obj.to.offset, 10);
		keyword.from = txt.lastIndexOf(obj.from.text, keyword.to) + parseInt(obj.from.offset, 10) + obj.from.text.length;
	}
	if (this.log) Logger.log(keyword);

	this.end = keyword.to;
	this.last = txt.lastIndexOf(obj.from.text);
	return txt.substring(keyword.from, keyword.to);

}

/**
 * 
 * @returns 
 */
HTML.prototype.iterate = function () {

	var keywords = [];
	var start = true;

	while (start || this.last != this.position) {
		var keyword = this.build();
		if (this.log) {
			Logger.log("LastIndexOf: %s", this.last);
			Logger.log("Now indexOf: %s", this.position);
			Logger.log(keyword);
			Logger.log("End at %s", this.end)
			Logger.log("------------------------");
		}
		this.index = this.end;
		keywords.push(keyword);
		start = false;
	}
	return keywords;
}
