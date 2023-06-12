import { useState } from "react";

function ListGroup() {
    let items = [
        'New York',
        'San Francisco',
        'Tokyo',
        'London',
        'Paris' 
    ];

    // useState() hook returns an array containing two elements which is then destructured as below:
    let [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            <h1>List</h1>   {/* In react a component cannot return more than one element. To solve this problem we can wrap these markup inside <div> or fragment(<>). */}
            { items.length === 0  && <p>No item found</p> }
            <ul className="list-group"> 
                {items.map((item, index) => ( // when mapping items we can opt add index as 2nd param & with this we can log index of an item that was clicked.
                    <li key={item} 
                        className={
                            selectedIndex === index 
                                ? 'list-group-item active' 
                                : 'list-group-item'
                        } 
                        onClick={() => setSelectedIndex(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;
 