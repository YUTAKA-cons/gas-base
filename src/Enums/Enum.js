/**
 * Enumの実装クラス
 */
Enum = function () {
	this._enums = [];
};

/**
 * Enum定義
 * @param  {object} definition 定義内容
 * @return {object} enum
 */
function defineEnum(definition) {
	var k;
	var e = new Enum();
	for (k in definition) {
		var j = definition[k];
		e[k] = j;
		e.addEnum(j);
	}
	return e;
}

/**
 * Enum取得
 * @return {array} enumオブジェクト
 */
Enum.prototype.getEnums = function () {
	return _enums;
};

/**
 * 繰り返し処理
 * @param {array} callback コールバック
 */
Enum.prototype.forEach = function (callback) {
	var length = this._enums.length;
	for (var i = 0; i < length; ++i) {
		callback(this._enums[i]);
	}
};

/**
 * Enum追加
 * @param {object} e enumの追加情報
 */
Enum.prototype.addEnum = function (e) {
	this._enums.push(e);
};

/**
 * 値取得
 * @param {string} name 名前
 * @return {string} 値
 */
Enum.prototype.getByName = function (name) {
	return this[name];
};

/**
 *  要素判定
 * @param {String} name 名前
 * @return {boolean} 
 */
Enum.prototype.contain = function (name) {
	if (this.getByName(name)) {
		return true;
	}
	return false;
};
