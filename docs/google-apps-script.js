/**
 * Google Apps Script for Ali Raza Bright Academy MCQ results.
 *
 * 1. Create a new Google Sheet.
 * 2. In row 1 type these exact headers (one per column):
 *    Submitted at | Name | Score | Out of | Percentage | Chemistry | Time taken | Incorrect questions
 * 3. Extensions → Apps Script, paste this whole file, replace PASTE_SHEET_ID_HERE
 *    with the Sheet ID (the long string in the sheet URL between /d/ and /edit).
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL and put it into SHEET_URL in the test HTML file.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1xBf9YoS8WLz97InO3KWW_sqvDWrvz6encL5wU_jqqfE").getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submitted_at || new Date().toLocaleString(),
      data.student_name || "",
      data.score || "",
      data.out_of || "",
      data.percent != null ? data.percent + "%" : (data.percentage || ""),
      data.chemistry || "",
      data.time_taken || "",
      data.incorrect_answers || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
