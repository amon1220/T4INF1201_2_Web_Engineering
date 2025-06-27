import '../App.css';
import '98.css';
/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in Desktop.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */

export default function MyComputerButton({ onOpen }) {
    return (
        <div className="mycomputer-icon">
            <button className="mycomputer-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/computer-3.png" alt="mycomputericon" />
                <br></br>
                <span>My Computer</span>
            </button>
        </div>
    );
}
