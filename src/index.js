/* eslint no-unused-vars: 0 */
import './style.css';

const refreshButton = document.querySelector('.recent-scores button');
const leaders = document.querySelector('.leaders');
const form = document.querySelector('form');
const { name, score } = form.elements;

const generateScores = (data) => {
  data.forEach((item) => {
    const player = document.createElement('div');
    player.innerHTML = `
          <p> ${item.user} : ${item.score}</p>
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
  generateScores(data.result);
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
});
window.addEventListener('DOMContentLoaded', () => {
  refreshBoard();
});
