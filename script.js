console.log("Welcome to Spotify");

// Play button - edit <---------

const pauseAllSongs = (index) => {
    songItems.forEach((element, i) => {
        if (i !== index) {
            const playIcon = element.querySelector('.songItemPlay');
            playIcon.classList.remove('fa-pause-circle');
            playIcon.classList.add('fa-play-circle');
        }
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);
        if (songIndex !== clickedIndex) {
            // Pause the current song and reset its state
            audioElement.pause();
            audioElement.currentTime = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;

            // Update the audio element and play the new song
            audioElement.src = songs[clickedIndex].filePath;
            masterSongName.innerText = songs[clickedIndex].songName;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

            // Pause all other songs and reset their state
            pauseAllSongs(clickedIndex);
        } else {
            // Toggle pause/play for the same song
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            } else {
                audioElement.pause();
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }
        }
    });
});


// <----------

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Closer", filePath: "songs/1.mp3", coverPath: "cover/Closer1.jpeg"},
    {songName: "Dandelions", filePath: "songs/2.mp3", coverPath: "cover/Dandelions2.jpeg"},
    {songName: "Baby, I'm Yours", filePath: "songs/3.mp3", coverPath: "cover/Baby_Im_Yours3.jpeg"},
    {songName: "Let Me Down Slowly", filePath: "songs/4.mp3", coverPath: "cover/Let_Me_Down_Slowly4.jpeg"},
    {songName: "Lover", filePath: "songs/5.mp3", coverPath: "cover/Lover5.jpeg"},
    {songName: "Night Changes", filePath: "songs/6.mp3", coverPath: "cover/Night_Changes6.jpeg"},
    {songName: "Treat You Better", filePath: "songs/7.mp3", coverPath: "cover/Treat_You_Better7.jpeg"},
    {songName: "Heat Waves", filePath: "songs/8.mp3", coverPath: "cover/Heat_Waves8.jpg"},
    {songName: "Under The Influence", filePath: "songs/9.mp3", coverPath: "cover/Under_The_Influence9.jpeg"},
    {songName: "We Don't Talk Anymore", filePath: "songs/10.mp3", coverPath: "cover/We_Don't_Talk_Anymore10.jpeg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.target.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 10){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})
