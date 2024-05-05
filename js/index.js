var nameVar = document.querySelector('#name-player');
var authorVar = document.querySelector('#author-player');
var menuVar = document.querySelector('#menu');
var playlist = document.querySelector('.playlist');
var audio = new Audio();

function truncate(string, limit) {
  if (string.length <= limit) {
    return string;
  }
  return string.slice(0, limit) + '...';
}

var nameVars = document.querySelectorAll('.item-playlist h3');

nameVars.forEach(function(name) {
  name.innerHTML = truncate(name.innerHTML, 10);
});

menuVar.addEventListener('click', function() {
  var menu = document.querySelector('.menu');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
    menuVar.style.position = 'absolute';
    menuVar.style.zIndex = '100';
  }
});

var audioArr = [
  { name: 'song1', author: 'author1', src: '../assets/audio/Warriyo - Mortals (feat. Laura Brehm) [NCS Release](MP3_320K).mp3', img: '../assets/bg.jpg' },
  { name: 'song2', author: 'author2', src: '../assets/audio/Beautiful Recitation of Quran _ Innal muslimina wal muslimati _status _quran _recitation _tilawat(M4A_128K).m4a', img: '../assets/bgg.jpg' },
  { name: 'song3', author: 'author3', src: '../assets/audio/Maula Kardo Karam _ New Ramadan Kalaam 2023 _ Hammad Ali(M4A_128K).m4a', img: '../assets/bggg.jpg' }
];

function addElems() {
  var clutter = '';
  audioArr.forEach(function(elem, index) {
    clutter += `
        <div class="item-playlist" id="${index}">
          <div class="left-playlist">
            <h3>${elem.name}</h3>
            <b>${elem.author}</b>
          </div>
          <div class="right-playlist">
            <div class="circle-dark btn">
              <img class="start" src="assets/icons/icons8-play-60.png" alt="">
            </div>
          </div>
        </div>`;
  });
  playlist.innerHTML = clutter;

  playlist.addEventListener('click', function(dets) {
    var target = dets.target;
    var parent = target.closest('.item-playlist');
    var id = parent.id;

    var starts = document.querySelectorAll('.start');
    if (target.classList.contains('start')) {
      audio.src = audioArr[id].src;
      audio.play();
      document.querySelector('#play').src = 'assets/icons/icons8-pause-60.png';
      document.querySelector('.active-img').src = audioArr[id].img;
      nameVar.innerHTML = audioArr[id].name;
      authorVar.innerHTML = audioArr[id].author;

      starts.forEach(function(start) {
        start.src = 'assets/icons/icons8-play-60.png';
      });
      target.src = 'assets/icons/icons8-pause-60.png';

      var activeItem = document.querySelector('.active');
      if (activeItem) {
        activeItem.classList.remove('active');
      }
      parent.classList.add('active');
    }
  });
}

function move() {
  var timeLine = document.querySelector('#time-line');
  var timeLineLine = document.querySelector('#time-line-line');
  var timeLineCircle = document.querySelector('#time-line-circle');

  audio.addEventListener('timeupdate', function() {
    var width = (audio.currentTime / audio.duration) * 100;
    timeLineLine.style.width = width + '%';
    timeLineCircle.style.left = width + '%';
    document.querySelector('#current').textContent = formatTime(audio.currentTime);
    document.querySelector('#complete').textContent = formatTime(audio.duration);
  });

  timeLine.addEventListener('click', function(e) {
    var width = e.offsetX / timeLine.offsetWidth;
    timeLineLine.style.width = width * 100 + '%';
    timeLineCircle.style.left = width * 100 + '%';
    audio.currentTime = audio.duration * width;
  });
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

function audioControl() {
  var play = document.querySelector('#play');
  var backward = document.querySelector('#backward');
  var start = document.querySelector('#start');
  var back = document.querySelector('#back');

  play.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      play.src = 'assets/icons/icons8-pause-60.png';
    } else {
      audio.pause();
      play.src = 'assets/icons/icons8-play-60.png';
    }
  });

  backward.addEventListener('click', function() {
    audio.currentTime -= 10;
  });

  start.addEventListener('click', function() {
    audio.currentTime += 10;
  });

  back.addEventListener('click', function() {
    window.history.back();
  });
}

audioControl();
move();
addElems();
