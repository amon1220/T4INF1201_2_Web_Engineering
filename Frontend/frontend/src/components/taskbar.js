import '../App.css';
import '98.css';

export default function Taskbar() {
    return (
        <div className="taskbar">
            <button className="start-button">
                <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="start" />
                Start
            </button>
            <div className="spacer" />
            <div className="clock">8:25 PM</div> {/* später dynamisch */}
        </div>
    );
}
