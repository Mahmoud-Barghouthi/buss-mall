'use strict'


let leftImage = document.getElementById('left-image');
let midImage = document.getElementById('mid-image');
let rightImage = document.getElementById('right-image');
let maxUserAttempts = 25;
let clickingUserAttempts = 0;
let leftImageIndex;
let midImageIndex;
let rightImageIndex;


let allImages = [];

function GetImage(name, source) {
    this.name = name;
    this.source = source;
    this.vote = 0;
    this.show = 0;
    allImages.push(this);

}


new GetImage('bag', 'img/bag.jpg');
new GetImage('banana', 'img/banana.jpg');
new GetImage('bathroom', 'img/bathroom.jpg');
new GetImage('boots', 'img/boots.jpg');
new GetImage('breakfast', 'img/breakfast.jpg');
new GetImage('bubblegum', 'img/bubblegum.jpg');
new GetImage('chair', 'img/chair.jpg');
new GetImage('cthulhu', 'img/cthulhu.jpg');

new GetImage('dog-duck', 'img/dog-duck.jpg');
new GetImage('dragon', 'img/dragon.jpg');
new GetImage('pen', 'img/pen.jpg');
new GetImage('pet-sweep', 'img/pet-sweep.jpg');
new GetImage('scissors', 'img/scissors.jpg');
new GetImage('shark', 'img/shark.jpg');
new GetImage('sweep', 'img/sweep.png');
new GetImage('tauntaun', 'img/tauntaun.jpg');
new GetImage('unicorn', 'img/unicorn.jpg');
new GetImage('water-can', 'img/water-can.jpg');
new GetImage('wine-glass', 'img/wine-glass.jpg');

console.log(allImages);
function generateRandomIndex() {
    return Math.floor(Math.random() * allImages.length);
}

function renderThreeImages() {
    leftImageIndex = generateRandomIndex();
    midImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();


    do {
        leftImageIndex = generateRandomIndex();
        rightImageIndex = generateRandomIndex();
    } while (leftImageIndex === midImageIndex || leftImageIndex === rightImageIndex || midImageIndex === rightImageIndex);

    // leftImage.src = allImages[leftImage].source;
    // midImage.src = allImages[midImage].source;
    // rightImage.src = allImages[rightImage].source;
    leftImage.src = allImages[leftImageIndex].source;
    midImage.src = allImages[midImageIndex].source;
    rightImage.src = allImages[rightImageIndex].source;

    allImages[leftImageIndex].show++;
    allImages[midImageIndex].show++;
    allImages[rightImageIndex].show++;

}

renderThreeImages();

leftImage.addEventListener('click', mouseClick);
midImage.addEventListener('click', mouseClick);
rightImage.addEventListener('click', mouseClick);

function mouseClick(event) {

    clickingUserAttempts = clickingUserAttempts + 1

    if (clickingUserAttempts <= maxUserAttempts) {

        if (event.target.id === 'left-Image') {
            allImages[leftImageIndex].vote = allImages[leftImageIndex].vote + 1;
        } else if (event.target.id === 'mid-Image') {
            allImages[midImageIndex].vote = allImages[midImageIndex].vote + 1;
        } else if (event.target.id === 'right-image') {
            allImages[rightImageIndex].vote = allImages[rightImageIndex].vote + 1;
        }
        renderThreeImages();
    } else {
        leftImage.removeEventListener('click', mouseClick);
        midImage.removeEventListener('click', mouseClick);
        rightImage.removeEventListener('click', mouseClick);

        let list = document.getElementById('list');
        let button = document.getElementById('button');
        button.addEventListener('click', result)

        function result() {
            let liElement;
            for (let i = 0; i < allImages.length; i++) {
                liElement = document.createElement('li');
                list.appendChild(liElement);
                liElement.textContent = `${allImages[i].name} are ${allImages[i].votes} votes, and was seen ${allImages[i].show} times`
            }
        }
    }
}
