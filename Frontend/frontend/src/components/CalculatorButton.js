import '../App.css';
import '98.css';
import caluclator from '../assets/calculator.png'

/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in App.js to open the tab

 * @returns a button with an icon that registers if clicked, connected to Desktop.js
 */
export default function CalculatorButton({ onOpen }) {
    return (
        <div className="desktop-icon">
            <button className="desktop-button" onClick={onOpen}>
                <img src={caluclator} alt="calulatoricon" />
                <br></br>
                <span>Calculator</span>
            </button>
        </div>
    );
}
