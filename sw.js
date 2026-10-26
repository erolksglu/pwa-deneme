// Bu kod PWA'dan gelen verileri Google Etabloya yazar ve okur
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  if (data.action === "veriEkle") {
    sheet.appendRow([new Date(), data.miktar, data.fiyat, data.toplam]);
    return ContentService.createTextOutput(JSON.stringify({"status":"başarılı"})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var data = [];
  for (var i = 1; i < rows.length; i++) {
    data.push({tarih: rows[i][0], miktar: rows[i][1], fiyat: rows[i][2], toplam: rows[i][3]});
  }
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
