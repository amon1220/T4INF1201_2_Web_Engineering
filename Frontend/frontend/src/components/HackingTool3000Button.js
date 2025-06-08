import '../App.css';
import '98.css';

export default function HackingTool3000Button({ onOpen }) {
    return (
        <div className="hackingtool3000-icon">
            <button className="hackingtool3000-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/window_red_hilights.png" alt="htool3000icon" />
                <br></br>
                <span>HackingTool 3000</span>
            </button>
        </div>
    );
}
