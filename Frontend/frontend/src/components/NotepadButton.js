import '../App.css';
import '98.css';
/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in Desktop.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function NotepadButton({ onOpen }) {
    return (
        <div className="notepad-icon">
            <button className="notepad-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/address_book_pad.png" alt="notepadicon" />
                <br></br>
                <span>Notepad</span>
            </button>
        </div>
    );
}
