import '../App.css';
import '98.css';
import gamecentericon from '../assets/game_center_icon.png';

/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in Desktop.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function GameCenterButton({ onOpen }) {
    return (
        <div className="iexplorer-icon">
            <button className="iexplorer-button" onClick={onOpen}>
                <img src={gamecentericon} alt="game_center_icon" />
                <br></br>
                <span>Game Center</span>
            </button>
        </div>
    );
}
