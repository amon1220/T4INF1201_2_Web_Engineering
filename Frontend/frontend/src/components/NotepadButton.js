import '../App.css';
import '98.css';

export default function NotepadButton({onOpen}) {
    return (
        <div className="notepad-icon">
            <button className="notepad-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/address_book_pad.png" alt="notepadicon"/>
                <br></br>
                <span>Notepad</span>
            </button>
        </div>
    );
}
