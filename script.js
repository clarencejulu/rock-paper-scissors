const rulesButton = document.querySelector('.rules-button');
const mainContainer = document.getElementById('main-container');
const array = ['paper', 'scissors','rock'];
const yourScore = document.querySelector('.your-score');
const cpuScore = document.querySelector('.cpu-score');

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
      }
      else if((selection == 'rock' && houseChoice == 'scissors') || (selection == 'scissors' && houseChoice == 'paper') || (selection == 'paper' && houseChoice == 'rock')){
        result.innerHTML = "you win"; 
        yourScore.innerText = `${+(yourScore.innerText) + 1}`;
      }
      else if((selection == 'rock' && houseChoice == 'paper') || (selection == 'scissors' && houseChoice == 'rock') || (selection == 'paper' && houseChoice == 'scissors')){
        result.innerHTML = "you lose";
        cpuScore.innerText = `${+(cpuScore.innerText) + 1}`;
      }
      else{
        console.log('result problem');
      }
      
      const gameScore = [];
      gameScore.push({
        yourScore: yourScore.innerText,
        cpuScore: cpuScore.innerText
      })
      localStorage.setItem('gameScore', JSON.stringify(gameScore));
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
