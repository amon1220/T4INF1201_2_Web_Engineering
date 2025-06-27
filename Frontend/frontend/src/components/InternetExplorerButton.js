import '../App.css';
import '98.css';
/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in Desktop.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function IExplorerButton({ onOpen }) {
    return (
        <div className="iexplorer-icon">
            <button className="iexplorer-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/msie1-2.png" alt="internetexplorericon" />
                <br></br>
                <span>Internet Explorer</span>
            </button>
        </div>
    );
}
