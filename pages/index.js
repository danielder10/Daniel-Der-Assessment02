import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [classFilters, setClassFilters] = useState({});
  const [correctClass, setCorrectClass] = useState("Fire");
  const [image, setImage] = useState("Fire-100.jpg");
  const [availableClasses, setAvailableClasses] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setClassFilters({
      1: { class: 'Fire' },
      4: { class: 'Water' },
      32: { class: 'Earth' },
      2: { class: 'Air' },
      64: { class: 'Electricity' },
      8: { class: 'Lava' },
      16: { class: 'Storm' }
    });
  }, []);

  useEffect(() => {
    const imageFileName = `${correctClass.toLowerCase()}-100.jpg`;
    setImage(imageFileName);
  }, [correctClass]);

  useEffect(() => {
    if (Object.keys(classFilters).length > 0) {
      const availableClasses = Object.values(classFilters).map(item => item.class);
      setAvailableClasses(availableClasses);
    }
  }, [classFilters]);

  const handleGuess = () => {
    const inputNumber = parseInt(input);

    if (!isNaN(inputNumber) && classFilters[inputNumber]) {
      const guessedClass = classFilters[inputNumber].class; 

      if (guessedClass === correctClass) {
        setMessage("Your guess was correct! :)");
        setPoints(prevPoints => prevPoints + 1);

        let newCorrectClass = correctClass;
        while (newCorrectClass === correctClass) {
          const randomIndex = Math.floor(Math.random() * availableClasses.length);
          newCorrectClass = availableClasses[randomIndex];
        }
        setCorrectClass(newCorrectClass);
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
      <title>Guess the Element</title>
      <meta name="description" content="Guess the character class game" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className={styles.header}>
      <h1>Guess the Element</h1>
    </header>
    <div className={styles.container}>
    <aside className={styles.sidebar}>
    <h3>List of possible elements</h3>
    <div className={styles.sidebarImages}>
    {availableClasses.map((classItem, index) => (
      <div key={index} className={styles.sidebarItem}>
        <img
          src={`/${classItem.toLowerCase()}-100.jpg`}
          alt={classItem}
          className={styles.sidebarImage}
        />
        <p>{classItem}</p> {}
      </div>
    ))}
  </div>
      </aside>
      <main className={styles.main}>
        <h1>Guess the Element:</h1>
        <h4>Hint: enter bit values only (the possible elements are not in order) </h4>
        <img src={`/${image}`} alt="Element" className={styles.characterImage} />
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
          <p>Points: {points}</p> {/* Display points */}
          {message && <p>{message}</p>}
      </main>
    </div>
    <footer className={styles.footer}>
      Made by: Daniel D. Set G 
    </footer>
  </>
  );
}
