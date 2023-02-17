const Button = ({counter, setCounter}) => {
    const buttons = ['+', 'reset', '-'];

    const handleCount = (e) => {
        switch (e.target.value) {
          case '+':
            setCounter(counter + 1);
            break;
          case '-':
            counter >= 1 ? setCounter(counter - 1) : setCounter(0);
            break;
          default:
            setCounter(0);
            break;
        }
    };

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