var nameVar = document.querySelector('#name');
var authorVar = document.querySelector('#author');
var menuVar = document.querySelector('#menu');
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

menuVar.addEventListener('click', function(){
  var menu = document.querySelector('.menu');
  if(menu.style.display === 'block'){
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
    menuVar.style.position = 'absolute';
    menuVar.style.zIndex = '100';
  }
});