import '../App.css';
import '98.css';
import internetexplorericon from '../assets/msie1-2.png'

/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in Desktop.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function IExplorerButton({ onOpen }) {
    return (
        <div className="desktop-icon">
            <button className="desktop-button" onClick={onOpen}>
                <img src={internetexplorericon} alt="internetexplorericon" />
                <br></br>
                <span>Internet Explorer</span>
            </button>
        </div>
    );
}
