const Button = ({counter, setCounter}) => {
    const buttons = ['+', 'reset', '-'];

    const handleCount = (e) => {   
        if (e.target.value === '+') {
            return setCounter(counter + 1);
        }
        
        if (counter >= 1 && e.target.value === '-') {
            return setCounter(counter - 1);
        }

        setCounter(0);
    }

    return (
        <div className="btn">
            { 
                buttons && buttons.map((btn) => 
                    <button onClick={ handleCount } value={btn} key={btn.toString()}>
                        { btn }
                    </button>
                )
            }
        </div>
    );
}
 
export default Button;