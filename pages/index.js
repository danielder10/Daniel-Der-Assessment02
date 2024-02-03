import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [classFilters, setClassFilters] = useState({});
  const possibleClasses = ['Magician', 'Thief', 'Warrior', 'Bowman', 'Pirate', 'Nothing'];
  let correctClass = '';

  useEffect(() => {
    // Define the class filters once the component mounts
    setClassFilters({
      1: { class: 'Magician' },
      2: { class: 'Thief' },
      4: { class: 'Warrior' },
      8: { class: 'Bowman' },
      16: { class: 'Pirate' },
      32: { class: 'Nothing' }
    });
  }, []);

  const handleGuess = () => {
    const inputNumber = parseInt(input);
  
    if (!isNaN(inputNumber) && classFilters[inputNumber]) {
      const guessedClass = classFilters[inputNumber].class; // Get the guessed class
  
      // Check if the guessed class matches the correct class
      const correctClass = "Warrior"; // Example correct class, replace with your correct class
      if (guessedClass === correctClass) {
        setMessage("Your guess was correct! :)");
      } else {
        setMessage("Your guess was incorrect :(");
      }
    } else {
      setMessage("Invalid class number. Please enter a valid number.");
    }
  };
  

  return (
    <>
      <Head>
        <title>Guess the Class</title>
        <meta name="description" content="Guess the character class game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Guess the Class</h1>
      </header>
      <main className={styles.main}>
        <p>Guess the character class:</p>
        <img src="fire.png"></img>
        <input
          id="input"
          type="number"
          placeholder="Enter a number"
          value={input}
          onChange={event => setInput(event.target.value)}
          className={styles.input}
        />
        <button onClick={handleGuess} className={styles.button}>
          Guess
        </button>
        {message && <p>{message}</p>}
      </main>
      <footer className={styles.footer}>
        Footer Area
      </footer>
    </>
  );
}
