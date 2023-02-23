import { useEffect, useState } from "react";
import Create from "./Create";

const TodoList = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/todos')
        .then(
            (res) => {
                return res.json();
            }
        )
        .then(
            data => {
                setData(data);
                // console.log(data);
            }
        )
    }, []);

    const handleAddTodo = (newTodo) => {
        setData(prevData => [...prevData, newTodo]);
    }

    return (
        <div className="todo-list">
            <h2>myTODO</h2>
            <Create handleAddTodo={ handleAddTodo } />
            { data && data.map(todo => (
                <ul key={`${todo.id}-${todo.title}`}>
                    <li>
                        <p>{todo.title}</p>
                    </li>
                </ul>
            )) }
        </div>
    );
}
 
export default TodoList;