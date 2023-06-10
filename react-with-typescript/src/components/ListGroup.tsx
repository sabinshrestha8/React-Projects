function ListGroup() {
    const items = [
        'New York',
        'San Francisco',
        'Tokyo',
        'London',
        'Paris' 
    ];

    return (
        <>
            <h1>List</h1>   {/* In react a component cannot return more than one element. To solve this problem we can wrap these markup inside <div> or fragment(<>). */}
            <ul className="list-group">
                {items.map((item) => (
                    <li key={item} className="list-group-item">{item}</li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;
 