var nameVar = document.querySelector('#name');
var authorVar = document.querySelector('#author');

function truncate(string, limit){
  if (nameVar.innerHTML.length <= limit){
    return string;
  }
  return string.slice(0, limit) + '...';
}


var nameVars = document.querySelectorAll('#name');

for (var a=0; a<=nameVars.length-1; a++) {
  nameVars[a].innerHTML = (truncate(nameVar.innerHTML,10));
}