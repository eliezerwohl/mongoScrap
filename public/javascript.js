var dataNum;


$.getJSON("/all", function(data){
console.log(data[10])
dataNum = 10;
var oneData = data[dataNum];
$("#headline").append(oneData.article)
})


$("#next").on("click", function(){
$.getJSON("/all", function(data){
dataNum +=1;
var oneData = data[dataNum];
$("#headline").empty()

$("#headline").append(oneData.article)
})

})
// psuedo code.

// display

// store as a var
// when press button, +1 to the var

