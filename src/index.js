import "./style.css";


const scores = [100, 20, 50, 78, 12, 77, 42];
const leaders = document.querySelector(".leaders");

const generateScores = (data) => {
  data.forEach((item) => {
    const player = document.createElement("div");
    player.innerHTML = `
          <p> Name: ${item}</p>
          `;
    leaders.appendChild(player);
  });
};
let id;
const createNewGame = async () => {
  const res = await fetch(
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/",
    {
      method: "POST",
      body: JSON.stringify({
        name: "My cool new game",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }
  )
  const data=await res.json()
  id=data.result.replace(/(Game with ID:)|(added.)|(\W)/g,'')
};
createNewGame()
generateScores(scores);

