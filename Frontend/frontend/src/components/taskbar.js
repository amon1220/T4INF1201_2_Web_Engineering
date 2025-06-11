import '../App.css';
import '98.css';

export default function Taskbar() {

    function updateTime() {
        const currenttime = new Date().toLocaleTimeString();
        //var datetime = currentdate.getHours() + ":" + currentdate.getMinutes();
        document.getElementById("currenttime").textContent = currenttime;
    }
    setInterval(updateTime, 1000);

    return (

        <div className="taskbar">
            <button className="start-button">
                <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="start" />
                Start
            </button>
            <div className="spacer" />

            <div className="clock">
                <div id="currenttime"></div>
            </div>

        </div>
    );
}
