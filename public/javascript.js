var dataNum;


$.getJSON("/all", function(data){
dataNum = 10;
var oneData = data[dataNum];

for (var i = 0; i < oneData.notes.length; i++) {

  console.log(oneData.notes[i])
  var noteNumber = oneData.notes[i]
    var address = "/notes/";
    var address2 = address + noteNumber;
  $.getJSON(address2, function(data){
    console.log(data[0]._id)
      var deleted = "/delete/";
      var deleteNumber = data[0]._id;
    var deletedAddress = deleted + deleteNumber ;
    $("#revNum").append(data[0].noteReview).append("<br>");
    $("#revNum").append('<form action="'+ deletedAddress + '" method="post">\
      <button type="submit">Deleted this comment</button></form>')
  })
}

$("#headline, #review, #revNum").empty()
var objectId =  oneData._id;
// console.log(oneData.notes.length);

$("#headline").append(oneData.article);
$("#review").append('<form action="/review/' + objectId + '" method="post">\
      <textarea rows="4" cols="50" name="review">  </textarea><br>\
      <button class="btn btn-md" type="submit"> Comment on this headline </button>\
    </form>')
})

$("#next").on("click", function(){
$.getJSON("/all", function(data){
dataNum +=1;
var oneData = data[dataNum];

for (var i = 0; i < oneData.notes.length; i++) {

  console.log(oneData.notes[i])
  var noteNumber = oneData.notes[i]
    var address = "/notes/";
    var address2 = address + noteNumber;
  $.getJSON(address2, function(data){
    console.log(data[0]._id)
      var deleted = "/delete/";
      var deleteNumber = data[0]._id;
    var deletedAddress = deleted + deleteNumber ;
    $("#revNum").append(data[0].noteReview).append("<br>");
    $("#revNum").append('<form action="'+ deletedAddress + '" method="post">\
      <button type="submit">Deleted this comment</button></form>')
  })
}

$("#headline, #review, #revNum").empty()
var objectId =  oneData._id;
// console.log(oneData.notes.length);

$("#headline").append(oneData.article);
$("#review").append('<form action="/review/' + objectId + '" method="post">\
      <textarea rows="4" cols="50" name="review">  </textarea><br>\
      <button type="submit" class="btn btn-md"> Comment on this headline </button>\
    </form>')
})
})

