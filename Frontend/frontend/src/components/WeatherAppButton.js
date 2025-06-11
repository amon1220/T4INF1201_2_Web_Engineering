import '../App.css';
import '98.css';
import weatherIcon from '../assets/WeatherAppImage.png';
export default function WeatherAppButton({ onOpen }) {
    return (
        <div className="weatherapp-icon">
            <button className="weatherapp-button" onClick={onOpen}>
                <img id={"biggericon"} src={weatherIcon} alt="Wetter-Symbol zur Anzeige der Wettervorhersage" />
                <br></br>
                <span>Weather</span>
            </button>
        </div>
    );
}