import './style.css';

const scores=[100,20,50,78,12,77,42]
const leaders=document.querySelector('.leaders')

const generateScores = (data) => {
    data.forEach((item) => {
      const player = document.createElement('div');
      player.innerHTML = `
          <p> Name: ${item}</p>
          `;
      leaders.appendChild(player);
    });
  };

  generateScores(scores)