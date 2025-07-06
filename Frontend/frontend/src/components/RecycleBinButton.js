import '../App.css';
import '98.css';
import recyclebinicon from '../assets/recycle_bin_empty_cool-2.png'
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
                <img src={recyclebinicon} alt="recyclebinicon" />
                <br></br>
                <span>Recycle Bin</span>
            </button>
        </div>
    );
}
