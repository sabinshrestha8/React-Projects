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

    const handledeletetodo = (id) => {
        setData(data.filter(todo => id !== todo.id));
    }

    return (
        <div className="todo-list">
            <h2>myTODO</h2>
            <Create handleAddTodo={ handleAddTodo } />
            { data && data.map(todo => (
                <ul key={`${todo.id}-${todo.title}`}>
                    <li>
                        <p>{todo.title}</p>
                        <button
                        onClick={ () => {
                            fetch('http://localhost:8000/todos/' + todo.id, {
                                method: 'DELETE'
                            })
                            .then(
                                () => {
                                    handledeletetodo(todo.id);
                                    console.log('todo deleted');
                                }
                            );
                        } }>delete</button>
                    </li>
                </ul>
            )) }
        </div>
    );
}
 
export default TodoList;