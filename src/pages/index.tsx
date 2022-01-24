import { useEffect, useState } from 'react';

const App = () => {
  return (
    <>
      <h1 className="mt-16 text-6xl text-center">
        React Wordle Clone{' '}
        <a
          href="https://github.com/Tylopilus/wordle"
          className="underline"
          target="_blank"
          rel="noreferrer no-follow">
          Github
        </a>
      </h1>
      <div className="grid mt-16 place-items-center">
        <Grid />
      </div>
    </>
  );
};
export default App;
const Grid = () => {
  // list with 5 character english words
  const wordlist: string[] = ['hello', 'pizza', 'world', 'apple', 'press'];
  // word we are looking for
  const secret: string = 'apple';

  // past guesses
  // const guesses: string[] = ['hello', 'pizza', 'piano'];
  const [guesses, setGuesses] = useState<string[]>([]);

  // current guess
  const [attempt, setAttempt] = useState<string>('');

  // handle game state
  const [winnered, setWinnered] = useState<boolean>(false);

  // handle keydown events
  const handleKeyDown = (e: KeyboardEvent) => {
    // exit early if game is wonnered
    if (winnered) return;

    // get key pressed
    const key: string = e.key.toLowerCase();

    // check if key is a letter
    if (key.length === 1 && key.match(/[a-z]/) && attempt.length < 5) {
      setAttempt((attempt) => attempt + key);
    } else if (key === 'backspace') {
      setAttempt((attempt) => attempt.slice(0, -1));
    } else if (key === 'enter' && attempt.length === 5) {
      // check if guess is correct
      if (attempt === secret) {
        setGuesses((guesses) => [...guesses, attempt]);
        setAttempt('');
        setWinnered(true);
      } else if (!wordlist.includes(attempt)) {
        alert('Unknown word');
      } else {
        setGuesses((guesses) => [...guesses, attempt]);
        setAttempt('');
      }
    }
  };

  useEffect(() => {
    if (guesses.length === 6 && !winnered) {
      alert('You lose!');
    }
    if (winnered) {
      alert('You win!');
    }
  }, [guesses, winnered]);
  useEffect(() => {
    // add eventlistener to listen for keydown events
    document.addEventListener('keydown', handleKeyDown);
    // remove eventlistener on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  return (
    <div className="grid grid-cols-5 grid-rows-6 gap-4 max-w-[500px] max-h-[500px]">
      {[...Array(6)].map((_, i) => {
        let attempted = false;
        if (i < guesses.length ?? 0) {
          attempted = true;
        }
        return (
          <GridRow
            key={i}
            attempt={attempt}
            guesses={guesses}
            index={i}
            secret={secret}
            attempted={attempted}
          />
        );
      })}
    </div>
  );
};

const GridRow = ({
  attempt,
  guesses,
  index,
  secret,
  attempted,
}: {
  attempt: string;
  guesses: string[];
  index: number;
  secret: string;
  attempted: boolean;
}) => {
  const letters: string[] = [...Array(5)];
  // show current attempt
  if (index === guesses.length) {
    attempt.split('').forEach((letter, i) => (letters[i] = letter));
  }

  // show past guesses
  else guesses[index]?.split('').forEach((letter, i) => (letters[i] = letter));

  return (
    <>
      {letters.map((letter, i) => {
        let color = 'white';
        if (attempted) {
          if (letter === secret[i]) {
            color = 'green';
          } else if (secret.includes(letter)) {
            color = 'yellow';
          }
        }
        return (
          <div
            key={i}
            className="w-16 h-16 border leading-[4rem] flex items-center justify-center"
            style={{
              backgroundColor: color,
            }}>
            {letter}
          </div>
        );
      })}
    </>
  );
};
