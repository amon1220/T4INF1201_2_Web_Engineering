import '../App.css';
import '98.css';
/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in Desktop.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function RecycleBinButton({ onOpen }) {
    return (
        <div className="recyclebin-icon">
            <button className="recyclebin-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty_cool-2.png" alt="recyclebinicon" />
                <br></br>
                <span>Recycle Bin</span>
            </button>
        </div>
    );
}
