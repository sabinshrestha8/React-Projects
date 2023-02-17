const Button = ({counter, setCounter}) => {
    const buttons = ['+', 'reset', '-'];

    const handleCount = (e) => {
        /*  `valueMap` is an object that has +, - and reset as keys &
        each key has a value that corresponds to what the counter should
        be updated to when the respective button is clicked. */
        const valueMap = {
          '+': counter + 1,
          '-': counter >= 1 ? counter - 1 : 0,
          'reset': 0
        };
        
        /* So, valueMap[e.target.value] will retrieve the corresponding new value of
        the counter from the valueMap object based on the value of the clicked button.
        Finally, setCounter() is called with the new value to update the state of 
        the counter. */
        setCounter(valueMap[e.target.value]);

        /* Note: The bracket notation is useful when we need to access properties 
        dynamically, using a variable or an expression inside the brackets. */
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