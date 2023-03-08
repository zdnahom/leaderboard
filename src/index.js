import "./style.css";

const scores = [100, 20, 50, 78, 12, 77, 42];
const leaders = document.querySelector(".leaders");

const generateScores = (data) => {
  data.forEach((item) => {
    const player = document.createElement("div");
    player.innerHTML = `
          <p> Name: ${item.user}</p>
          `;
    leaders.appendChild(player);
  });
};

const createNewGame = async () => {
  await fetch(
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/",
    {
      method: "POST",
      body: JSON.stringify({
        name: "Beat Nahom's score",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
};

const refreshBoard = async () => {
  const res = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BwlgxYvt8p5JJSu0N3Ht/scores`);
  const data=await res.json()
  generateScores(data.result);
};

const addScore= async (userName,score)=>{
   await fetch(
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BwlgxYvt8p5JJSu0N3Ht/scores",
    {
      method: "POST",
      body: JSON.stringify({
        user: userName,
        score:score
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}

refreshBoard()
