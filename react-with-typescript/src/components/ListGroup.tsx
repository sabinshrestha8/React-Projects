import { MouseEvent } from "react";

function ListGroup() {
    let items = [
        'New York',
        'San Francisco',
        'Tokyo',
        'London',
        'Paris' 
    ];

    // To create an event handler fn, by convention we start with the word handle & then we specify the type of event
    const handleClick = (event: MouseEvent) => { /* Using `Type Annotation` to specify the type of event param */
        console.log(event);
    };

    return (
        <>
            <h1>List</h1>   {/* In react a component cannot return more than one element. To solve this problem we can wrap these markup inside <div> or fragment(<>). */}
            { items.length === 0  && <p>No item found</p> }
            <ul className="list-group"> 
                {items.map((item, index) => ( // when mapping items we can opt add index as 2nd param & with this we can log index of an item that was clicked.
                    <li key={item} 
                        className="list-group-item" 
                        // onClick={(event) => console.log(item, index, event)}
                        onClick={handleClick}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;
 