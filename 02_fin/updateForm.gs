// References:
// [01] https://www.youtube.com/watch?v=o3AL7ASI_cA
// [02] http://wafflebytes.blogspot.com/2016/10/google-script-create-drop-down-list.html7
// [03] https://script.google.com/d/MtbmYNHcYimfFSKH2X2aVzs0lb_GGGp9Y/edit?mid=ACjPJvGMIrMwu7p2u61xorW2yk_X8qHJnF1C4Froc-tKSDyZbF0erUmPYkQynzvxITgJiIdrnFG5PohpFpHnQhcW-dPMu3M7OP1Z9dq_r5yUJ83G2jVZ-1cz4kkMcZsFo3p97As2CuKtm74&uiv=2

var ssID = "18q1s9zQY33miEMeo8vcjT0aJXeOvcnNAtE5RcaQw0t0";
var formID = "1etzkaHTQRmasbA9oQ2EZCoxK9VMhH2Pd8MP5nqfjrwc"; 

var wsData = SpreadsheetApp.openById(ssID).getSheetByName("categories")
var form = FormApp.openById(formID);

//////////////////////////////////////////////////////////////// Main function
function main() {
  
  // get labels from spreadsheet
  var labels = wsData.getRange(1, 1, 1, wsData.getLastColumn()).getValues()[0]
  
  // map labels to options
  labels.forEach(function(label,i){
  
    var options = wsData
                  .getRange(2, i + 1, wsData.getLastRow()-1, 1)
                  .getValues()
                  .map(function(o){return o[0]})
                  .filter(function(o){return o !== ""});
                  
    updateDropdownUsingTitle(label, options);
  
  });
    
}

//////////////////////////////////////////////////////////////// Sub functions
function updateDropdownUsingTitle(title,values){

  var items = form.getItems();
  var titles = items.map(function(item){
    return item.getTitle();
  });
  
  var pos = titles.indexOf(title);
  var item = items[pos];
  var itemID = item.getId().toString();
  
  Logger.log(itemID);
  Logger.log(values);
  
  updateDropdown(itemID, values);

}

function updateDropdown(id,values){

  var item = form.getItemById(id);
  // item.asListItem().setChoiceValues(values);
  item.asMultipleChoiceItem().setChoiceValues(values);

}
