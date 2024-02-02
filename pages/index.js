import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [createdElements, setCreatedElements] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const classFilters = {
    Fire: { number: 1, points: 10 },
    Water: { number: 2, points: 15 },
    Earth: { number: 4, points: 20 },
    Air: { number: 8, points: 25 },
    Electricity: { number: 16, points: 30 },
    Mud: { number: 32, points: 35 },
    Lava: { number: 64, points: 40 },
    Storm: { number: 128, points: 45 },
    Volcano: { number: 256, points: 50 }
  };

  const fusionCombinations = {
    Mud: ["Water", "Earth"],
    Electricity: ["Air", "Fire"],
    Lava: ["Earth", "Fire"],
    Volcano: ["Earth", "Lava"],
    Storm: ["Electricity", "Air"]
  };

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    const inputAsNumber = parseInt(value);
    if (!isNaN(inputAsNumber)) {
      // Check if the input is a number
      for (const element in classFilters) {
        if (classFilters[element].number === inputAsNumber) {
          const newElement = element;
          const pointsEarned = classFilters[element].points;
          setTotalPoints(totalPoints + pointsEarned);
          setCreatedElements([...createdElements, newElement]);
          setInput("");
          return;
        }
      }
    } else {
      // Check if the input is a string
      if (fusionCombinations[value]) {
        const [element1, element2] = fusionCombinations[value];
        const newElement = value;
        const pointsEarned =
          classFilters[element1].points + classFilters[element2].points;
        setTotalPoints(totalPoints + pointsEarned);
        setCreatedElements([...createdElements, newElement]);
        setInput("");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Element Fusion Game</title>
        <meta
          name="description"
          content="Create new elements by combining existing ones!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header class="header">Header Area</header>
      <main className={styles.main}>
        <input
          id="input"
          type="text"
          placeholder="Enter element name or number"
          value={input}
          onChange={handleInputChange}
          class="input"
        />
        <div className={styles.createdElements}>
          <h2>Created Elements:</h2>
          <ul>
            {createdElements.map((element, index) => (
              <li key={index}>
                <img
                  src={`/images/${element.toLowerCase()}.png`}
                  alt={element}
                  width="50"
                  height="50"
                />
                {element} - Points: {classFilters[element].points}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.totalPoints}>
          Total Points: {totalPoints}
        </div>
      </main>
      <footer>Footer Area</footer>
    </>
  );
}
