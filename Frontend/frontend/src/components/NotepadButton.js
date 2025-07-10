import '../App.css';
import '98.css';
import notepadicon from '../assets/address_book_pad.png'

/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in Desktop.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function NotepadButton({ onOpen }) {
    return (
        <div className="desktop-icon">
            <button className="desktop-button" onClick={onOpen}>
                <img src={notepadicon} alt="notepadicon" />
                <br></br>
                <span>Notepad</span>
            </button>
        </div>
    );
}
