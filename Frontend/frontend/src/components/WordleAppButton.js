import '../App.css';
import '98.css';
import wordleIcon from '../assets/WordleIcon.png'; // Wordle App Icon may be changed in the future
/**
 * WordleAppButton
 *
 * Basic UI component representing the Wordle game icon inside the Game Center.
 *
 * @param onOpen - Callback function triggered when the button is clicked to open the Wordle game.
 *
 * @returns a button with a Wordle icon and label that opens the Wordle game window when clicked.
 */
export default function WordleAppButton({ onOpen }) {
    return (
        <div className="wordleapp-icon">
            <button className="wordleapp-button" onClick={onOpen}>
                <img id="biggericon" src={wordleIcon} alt="Symbol für Wordle-Spiel" />
                <br />
                <span>Wordle</span>
            </button>
        </div>
    );
}