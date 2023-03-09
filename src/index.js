/* eslint no-unused-vars: 0 */
import './style.css';

const refreshButton = document.querySelector('.recent-scores button');
const leaders = document.querySelector('.leaders');
const form = document.querySelector('form');
const successElement=document.querySelector('form span')

const { name, score } = form.elements;

const generateScores = (data) => {
  data.forEach((item) => {
    const player = document.createElement('div');
    player.innerHTML = `
          <span>${item.user}</span>  <span>${item.score}</span>
          `;
    leaders.appendChild(player);
  });
};

const createNewGame = async () => {
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      body: JSON.stringify({
        name: "Beat Nahom's score",
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
};

const refreshBoard = async () => {
  const res = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BwlgxYvt8p5JJSu0N3Ht/scores');
  const data = await res.json();
  const result = data.result
  
  result.sort((a,b)=>{
    if ( Number(a.score) > Number(b.score )){
     return -1;
   }
   if ( Number(a.score) > Number(b.score )){
     return 1;
   }
   return 0;
   
   })

  generateScores(result);
};

const addScore = async (userName, score) => {
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BwlgxYvt8p5JJSu0N3Ht/scores',
    {
      method: 'POST',
      body: JSON.stringify({
        user: userName,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
};
refreshButton.addEventListener('click', () => {
  leaders.innerHTML = '';
  refreshBoard();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addScore(name.value, score.value);
  name.value = '';
  score.value = '';
  successElement.textContent="Successfully added score to the game!"
});
window.addEventListener('DOMContentLoaded', () => {
  refreshBoard();
});
