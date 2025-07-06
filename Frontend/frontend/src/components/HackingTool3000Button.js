import '../App.css';
import '98.css';
import htool3000icon from '../assets/window_red_hilights.png'

/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in App.js to open the tab

 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function HackingTool3000Button({ onOpen }) {
    return (
        <div className="hackingtool3000-icon">
            <button className="hackingtool3000-button" onClick={onOpen}>
                <img src={htool3000icon} alt="htool3000icon" />
                <br></br>
                <span>HackingTool 3000</span>
            </button>
        </div>
    );
}
