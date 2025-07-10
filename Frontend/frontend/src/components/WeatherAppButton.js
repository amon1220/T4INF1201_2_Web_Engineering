import '../App.css';
import '98.css';
import weatherIcon from '../assets/WeatherAppImage.png';
/**
 *  Just the basic UI button
 * @param OnOpen just determines the component thats called on in App.js to open the tab
 *
 * @returns a button with an icon that registers if clicked, connected to App.js
 */
export default function WeatherAppButton({ onOpen }) {
    return (
        <div className="desktop-icon">
            <button className="desktop-button" onClick={onOpen}>
                <img id={"biggericon"} src={weatherIcon} alt="Wetter-Symbol zur Anzeige der Wettervorhersage" />
                <br></br>
                <span>Weather</span>
            </button>
        </div>
    );
}