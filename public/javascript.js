var dataNum;


$.getJSON("/all", function(data){
console.log(data[10])
dataNum = 10;
var oneData = data[dataNum];
var objectId =  oneData._id;

$("#headline").append(oneData.article)
$("#review").append('<form action="/review' + objectId + '" method="post">\
      <textarea rows="4" cols="50">  </textarea>\
      <button type="submit"> Comment on this headline </button>\
    </form>')
})


$("#next").on("click", function(){
$.getJSON("/all", function(data){
dataNum +=1;
var oneData = data[dataNum];
$("#headline, #review").empty()
var objectId =  oneData._id;
$("#headline").append(oneData.article);
$("#review").append('<form action="/review' + objectId + '" method="post">\
      <textarea rows="4" cols="50">  </textarea>\
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

