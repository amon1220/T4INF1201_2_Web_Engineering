import '../App.css';
import '98.css';

export default function MyComputerButton({onOpen}) {
    return (
        <div className="mycomputer-icon">
            <button className="mycomputer-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/computer-3.png" alt="mycomputericon"/>
                <br></br>
                <span>My Computer</span>
            </button>
        </div>
    );
}
