/** init */
function onOpen() {

	// Propertieの確認
	let initFlag = PropertiesService.getScriptProperties().getProperty("initFlag");

	if (initFlag == null) {

		let sheet = SpreadsheetApp.getActiveSheet();

		// シート名設定
		sheet.setName(sheetName);

		// ヘッダー・関数設定
		var headerCol = 1;

		sheet.getRange(1, headerCol).setValue("#");
		sheet.getRange(2, headerCol).setFormula('=ARRAYFORMULA(ROW($A2:$A)-1)');
		sheet.setColumnWidth(headerCol, 20);
		headerCol += 1;

		// ヘッダー：行固定・背景色設定
		sheet.setFrozenRows(1);
		sheet.getRange(1, 1, 1, sheet.getMaxColumns()).setBackground("#add6ff");
		sheet.getRange(1, 1, sheet.getLastRow(), sheet.getMaxColumns()).setVerticalAlignment("top");

		// Property設定
		PropertiesService.getScriptProperties().setProperty("initFlag", false);

	}

	// メニュー追加
	var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu("追加メニュー");
  menu.addItem("認証", "main");
  menu.addItem("アイテム1", "onClickItem1");
  menu.addToUi(); 

}