//constants
const container = document.querySelector(".container");
const videoContainer = document.createElement("div")
const videoEl = document.createElement("video")
const buttonsContainer = document.createElement("div")
const playEl = document.createElement("div")
const pauseEl = document.createElement("div")
const nextEl = document.createElement("div")
const prevEl = document.createElement("div")
const rangeEl = document.createElement("input");
const volumeEl = document.createElement("input");
const mockData = [
    {
        title: 'UFC',
        path: "video/video1.mp4"
    },
    {
        title: 'Природа',
        path: "video/video2.mp4"
    },
    {
        title: 'Video 3',
        path: "video/video3.mp4"
    },
    {
        title: 'Video 4',
        path: "video/video4.mp4"
    }
]
let currentPlayIndex = 0

//add classes
videoContainer.classList.add('video-container');
videoEl.classList.add('video');
buttonsContainer.classList.add('buttons-container')
playEl.classList.add("play");
pauseEl.classList.add("pause");
prevEl.classList.add('next')
nextEl.classList.add('prev')

//set elements attributes 
videoEl.setAttribute("src", mockData[currentPlayIndex]?.path);

const setAttributesToRangeElement = (element, minValue, maxValue, currentValue) => {
    element.setAttribute("type", "range");
    element.setAttribute("min", minValue);
    element.setAttribute("max", maxValue);
    element.setAttribute("value", currentValue);
}

setAttributesToRangeElement(rangeEl, 0, 100, 0)
setAttributesToRangeElement(volumeEl, 0, 100, 0)

//add listeners
playEl.addEventListener("click", function (e) {
    videoEl.play();
    playEl.hidden = true
    pauseEl.hidden = false
});

pauseEl.addEventListener("click", function (e) {
    videoEl.pause();
    pauseEl.hidden = true
    playEl.hidden = false
});

nextEl.addEventListener("click", function (e) {
    videoEl.pause();
    pauseEl.hidden = true
    playEl.hidden = false
    currentPlayIndex = currentPlayIndex + 1 === mockData.length ? 0 : currentPlayIndex + 1
    videoEl.setAttribute("src", mockData[currentPlayIndex]?.path);
});

prevEl.addEventListener("click", function (e) {
    videoEl.pause();
    pauseEl.hidden = true
    playEl.hidden = false
    currentPlayIndex = currentPlayIndex - 1 < 0 ? mockData.length - 1 : currentPlayIndex - 1
    videoEl.setAttribute("src", mockData[currentPlayIndex]?.path);
});

rangeEl.addEventListener("change", function (e) {
    videoEl.currentTime = (e.target.value / 100) * videoEl.duration;
});

videoEl.addEventListener("timeupdate", (e) => {
    rangeEl.setAttribute(
        "value",
        Math.round((e.target.currentTime / videoEl.duration) * 100)
    );
});

videoEl.addEventListener("loadeddata", (event) => {
    volumeEl.setAttribute("value", videoEl.volume * 100);
});

volumeEl.addEventListener("change", function (e) {
    videoEl.volume = e.target.value / 100;
    console.log(videoEl.volume);
});

//add elements to HTML
container.appendChild(videoContainer);
videoContainer.appendChild(videoEl)
container.appendChild(volumeEl);
container.appendChild(rangeEl);
videoContainer.appendChild(buttonsContainer)
buttonsContainer.appendChild(prevEl)
buttonsContainer.appendChild(playEl);
buttonsContainer.appendChild(pauseEl)
buttonsContainer.appendChild(nextEl)

//preset
pauseEl.hidden = true