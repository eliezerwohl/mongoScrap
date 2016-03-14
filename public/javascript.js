var dataNum;


$.getJSON("/all", function(data){ 
  debugger
console.log(data[10])
dataNum = 10;
var oneData = data[dataNum];
var objectId =  oneData._id;

$("#headline").append(oneData.article)
$("#review").append('<form action="/review/' + objectId + '" method="post">\
      <textarea rows="4" cols="50" name="review">  </textarea>\
      <button type="submit"> Comment on this headline </button>\
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
   
    console.log(data[0].noteReview) 
    $("#revNum").append(data[0].noteReview).append("<br>")
  })
}

$("#headline, #review, #revNum").empty()
var objectId =  oneData._id;
// console.log(oneData.notes.length);

$("#headline").append(oneData.article);
$("#review").append('<form action="/review/' + objectId + '" method="post">\
      <textarea rows="4" cols="50" name="review">  </textarea>\
      <button type="submit"> Comment on this headline </button>\
    </form>')
})

})

// <form action="/submit" method="post">
    
//       <textarea rows="4" cols="50">  </textarea>
//       <button type="submit"> Comment on this headline </button>
//     </form>


// <form action="/review/objectId" method="post">
// psuedo code.

// display

// store as a var
// when press button, +1 to the var

