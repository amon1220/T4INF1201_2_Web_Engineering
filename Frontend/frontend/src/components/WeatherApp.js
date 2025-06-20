import React, {useState, useEffect} from "react";
import "../App.css";
import DraggableWindow from "./draggableWindow.js";


const weatherIconMap = {
    "clear-night": require('../assets/Clearnight.png'),
    "clear-day": require('../assets/Sunny.png'),
    "partly-cloudy-day": require('../assets/WeatherAppImage.png'),
    "partly-cloudy-night": require('../assets/Cloudynight.png'),
    "cloudy": require('../assets/Cloudy.png'),
    "fog": require('../assets/Fog.png'),
    "rain": require('../assets/Rainy.png'),
    "sleet": require('../assets/Snow.png'),
    "snow": require('../assets/Snow.png'),
    "thunder": require('../assets/Thunderstorm.png'),
};
const date = new Date();
const formattedDateYear = date.getFullYear();
const formattedDateMonth = date.getUTCMonth() + 1;
const formattedDateDay = date.getUTCDate();
const formattedDateReady = "" + formattedDateDay + "." + formattedDateMonth + "." + formattedDateYear;
export default function WeatherApp({onClose}) {
    const [weatherData, setWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [windows, setWindows] = useState([
        {
            id: 1,
            title: "Recycle Bin",
            icon: "https://win98icons.alexmeub.com/icons/png/msie1-4.png",
            minimized: false,
            visible: true
        },
        {
            id: 2,
            title: "Notepad",
            icon: "https://win98icons.alexmeub.com/icons/png/msie1-4.png",
            minimized: false,
            visible: true
        },
        {
            id: 3,
            title: "Internet Explorer",
            icon: "https://win98icons.alexmeub.com/icons/png/msie1-4.png",
            minimized: false,
            visible: true
        },
        {
            id: 4,
            title: "HackerTool3000 - The most useless Hacking Tool in the World!",
            icon: "https://win98icons.alexmeub.com/icons/png/msie1-4.png",
            minimized: false,
            visible: true
        },
        {
            id: 5,
            title: "Weather",
            icon: "",
            minimized: false,
            visible: true
        },
    ]);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const currentHour = today.getHours();

        // Timer für 1,5 Sekunden setzen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        fetch(`https://api.brightsky.dev/weather?lat=48.7758&lon=9.1829&date=${formattedDate}`)
            .then(res => res.json())
            .then(data => {
                const currentTimeIndex = data.weather.findIndex(entry => {
                    const entryHour = new Date(entry.timestamp).getHours();
                    return entryHour >= currentHour;
                });

                const startIndex = currentTimeIndex === -1 ? 0 : currentTimeIndex;
                const hourly = data.weather.slice(startIndex, startIndex + 5);
                setWeatherData(hourly);
            })
            .catch(err => console.error("Wetterdaten konnten nicht geladen werden:", err));

        // Cleanup-Funktion
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <DraggableWindow initialPosition={{x: 200, y: 100}} handleSelector=".title-bar">
                <div className="window" style={{position: "absolute"}}>
                    <div className="title-bar">
                        <div className="title-bar-text">Weather</div>
                        <div className="title-bar-controls">
                            <button aria-label="Minimize"></button>
                            <button aria-label="Maximize"></button>
                            <button aria-label="Close" onClick={onClose}></button>
                        </div>
                    </div>
                    <div className="window-body" style={{
                        padding: 3,
                        marginLeft: 7,
                        marginRight: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "200px"
                    }}>
                        <span id={"loadinggate"}>Loading...</span>
                    </div>
                </div>
            </DraggableWindow>
        );
    }

    return (
        <DraggableWindow initialPosition={{x: 200, y: 100}} handleSelector=".title-bar">
            <div className="window" style={{position: "absolute"}}>
                <div className="title-bar">
                    <div className="title-bar-text">Weather</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close" onClick={onClose}></button>
                    </div>
                </div>

                <div className="window-body" style={{
                    padding: 3,
                    marginLeft: 7,
                    marginRight: 10,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <span id={"date"}>Stuttgart, {formattedDateReady}</span>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span
                            id={"celsiusbig"}>{weatherData[0]?.temperature ? `${Math.round(weatherData[0].temperature)}°C` : '--°C'}</span>
                        <img id={"weathericon"}
                             src={weatherData[0]?.icon ? weatherIconMap[weatherData[0].icon] : weatherIconMap['clear']}
                             alt="Weather"/>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        {weatherData.map((entry, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '15px'
                            }}>
                                <span id={"time"}>{new Date(entry.timestamp).getHours()}:00</span>
                                <img
                                    src={weatherIconMap[entry.icon]}
                                    alt={entry.icon}
                                    style={{width: '50px', height: '67px'}}
                                />
                                <span id={"time"}>{Math.round(entry.temperature)}°C</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DraggableWindow>
    );
}