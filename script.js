const rulesButton = document.getElementById('rules-button');
const soundButton = document.getElementById('sound-button');
const mainContainer = document.getElementById('main-container');
const array = ['paper', 'scissors','rock'];
const yourScore = document.getElementById('your-score');
const cpuScore = document.getElementById('cpu-score');
const win = document.getElementById('win');
const tie = document.getElementById('tie');
const lose = document.getElementById('lose');
const soundArray = ['win', 'tie', 'lose'];

rulesButton.addEventListener( 'click', () => {
    const divOverlay = document.createElement('div');
    divOverlay.classList.add('body-overlay');
    const divRules = document.createElement('div');
    divRules.classList.add('rules');
    divRules.innerHTML = `<div class="rules-header">
    <p class="rules-heading">Rules</p>
    <div class="close-button">
      <img src="images/icon-close.svg" alt="icon-close">
    </div> 
    </div>
    <img src="images/image-rules.svg" alt="image-rules">`
    divOverlay.appendChild(divRules);
    document.body.appendChild(divOverlay);

    const closeButton = document.querySelector('.close-button'); 
    closeButton.addEventListener('click', () => {
        divOverlay.remove();
    })
})

soundButton.addEventListener( 'click', () => {
  if(soundButton.innerHTML === 'sound: on'){
    soundButton.innerHTML = 'sound: off';
    soundArray.forEach( sound => {
      document.getElementById(sound).volume = 0.0;
    })
  }
  else if(soundButton.innerHTML === 'sound: off'){
    soundButton.innerHTML = 'sound: on';
    soundArray.forEach( sound => {
      document.getElementById(sound).volume = 1.0;
    })
  }
  else{
    console.log('Sound Button is not working');
  }
}) 

const currentScore = JSON.parse(localStorage.getItem('gameScore')); 
if(currentScore){
  LoadLS();
}
createTriangle();

function createTriangle(){
  const divTriangle = document.createElement('div');
  divTriangle.classList.add('triangle');
  divTriangle.style.backgroundImage = `url('images/bg-triangle.svg')`;

  array.forEach( option => {
    const mainBgTwo = document.createElement('div');
    mainBgTwo.classList.add(option, 'main-background-two');
    mainBgTwo.innerHTML = `<div class="main-background">
    <div class="background-two">
      <div class="background">
        <img src="images/icon-${option}.svg" alt="icon-${option}">
      </div>
    </div>
    </div>`;
    divTriangle.appendChild(mainBgTwo);
  })
  mainContainer.appendChild(divTriangle);

  const threeOptions = document.querySelectorAll('.main-background-two');
  threeOptions.forEach( option => { option.addEventListener('click', () => {
    const selection = option.classList[0];
    divTriangle.remove();
    const divPicked = document.createElement('div');
    divPicked.classList.add('picked');
    const divPickContainer = document.createElement('div');
    divPickContainer.classList.add('pick-container');
    divPickContainer.setAttribute('id', 'you-picked');
    divPickContainer.innerHTML = `<p class="pick-heading">you picked</p>
    <div class="${selection} main-background-two">
      <div class="main-background">
        <div class="background-two">
          <div class="background">
            <img src="images/icon-${selection}.svg" alt="icon-${selection}">
          </div>
        </div>
      </div>
    </div>`;
    divPicked.appendChild(divPickContainer);

    const divResults = document.createElement('div');
    divResults.setAttribute('id', 'result-container-location');
    divPicked.appendChild(divResults);

    const divHouseContainer = document.createElement('div');
    divHouseContainer.classList.add('pick-container');
    divHouseContainer.setAttribute('id', 'the-house-picked');
    divHouseContainer.innerHTML = `<p class="pick-heading">the house picked</p>
    <div class="blue-background"></div>`;
    divPicked.appendChild(divHouseContainer);

    mainContainer.appendChild(divPicked);

    const houseChoice = randomizer();
    setTimeout(()=>{
        divHouseContainer.innerHTML = `<p class="pick-heading">the house picked</p>
        <div class="${houseChoice} main-background-two">
          <div class="main-background">
            <div class="background-two">
              <div class="background">
                <img src="images/icon-${houseChoice}.svg" alt="icon-${houseChoice}">
              </div>
            </div>
          </div>
        </div>`;

        if(selection == houseChoice){
          console.log('It is a tie. Score does not need to be updated');
        }
        else if((selection == 'rock' && houseChoice == 'scissors') || (selection == 'scissors' && houseChoice == 'paper') || (selection == 'paper' && houseChoice == 'rock')){
          yourScore.innerText = `${+(yourScore.innerText) + 1}`; 
        }
        else if((selection == 'rock' && houseChoice == 'paper') || (selection == 'scissors' && houseChoice == 'rock') || (selection == 'paper' && houseChoice == 'scissors')){
          cpuScore.innerText = `${+(cpuScore.innerText) + 1}`;
          lose.play();
        }
        else{
          console.log('score problem');
        }
        
        const gameScore = [];
        gameScore.push({
          yourScore: yourScore.innerText,
          cpuScore: cpuScore.innerText
        })
        localStorage.setItem('gameScore', JSON.stringify(gameScore));         
    }, 1500);

    setTimeout(()=>{
      const resultContainer = document.createElement('div');
      resultContainer.classList.add('result-container');
      resultContainer.innerHTML = `<p class="result"></p>
      <button class="play-again" onclick="location.reload()">play again</button>`;
      divResults.appendChild(resultContainer);

      const result = document.querySelector('.result');

      //check result

      if(selection == houseChoice){
        result.innerHTML = "tie";
        tie.play();
      }
      else if((selection == 'rock' && houseChoice == 'scissors') || (selection == 'scissors' && houseChoice == 'paper') || (selection == 'paper' && houseChoice == 'rock')){
        result.innerHTML = "you win"; 
        win.play();
      }
      else if((selection == 'rock' && houseChoice == 'paper') || (selection == 'scissors' && houseChoice == 'rock') || (selection == 'paper' && houseChoice == 'scissors')){
        result.innerHTML = "you lose";
      }
      else{
        console.log('result problem');
      }
    },2500);
    
  }) })
}

function randomizer(){ 
  const number = Math.floor(Math.random() * (array.length - 0)) + 0;
  return array[number];
}
function LoadLS(){
  yourScore.innerText = currentScore[0].yourScore;
  cpuScore.innerText = currentScore[0].cpuScore;
}
