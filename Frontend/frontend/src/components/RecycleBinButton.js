import '../App.css';
import '98.css';

export default function RecycleBinButton({ onOpen }) {
    return (
        <div className="recyclebin-icon">
            <button className="recyclebin-button" onClick={onOpen}>
                <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty_cool-2.png" alt="recyclebinicon" />
                <br></br>
                <span>Recycle Bin</span>
            </button>
        </div>
    );
}
