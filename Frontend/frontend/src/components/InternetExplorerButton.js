import '../App.css';
import '98.css';

export default function IExplorerButton({onOpen}) {
    return (
        <div className="iexplorer-icon">
            <button className="iexplorer-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/msie1-2.png" alt="internetexplorericon"/>
                <br></br>
                <span>Internet Explorer</span>
            </button>
        </div>
    );
}
