import { useEffect, useState } from "react";
import Create from "./Create";

const TodoList = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [index, setIndex] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/todos')
        .then(
            res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch todos'); 
                }

                return res.json();
            }
        )
        .then(
            data => {
                const sortedTodos = data.sort((c1, c2) => c2.id - c1.id);
                setData(sortedTodos);
            }
        )
    }, []);

    const handleAddTodo = (newTodo) => {
        setData(prevData => [newTodo, ...prevData]);
    }

    const handledeletetodo = (id) => {
        setData(data.filter(todo => id !== todo.id));  
    }

    const handleSelectTodo = (id) => {
        const newIndex = data.findIndex(todo => id === todo.id);
        setIndex(newIndex);
        setTitle(data[newIndex].title);
    }

    return (
        <div className="todo-list">
            <h2>myTODO</h2>
            <Create
                handleAddTodo={ handleAddTodo }
                title={ title }
                setTitle={ setTitle }
                handleSelectTodo={ handleSelectTodo }
                index={ index }
                setIndex={ setIndex }
                data={ data }
                setData={ setData }
            />
            { data && data.map(todo => (
                <ul key={`${todo.id}-${todo.title}`}>
                    <li>
                        <div>
                        <input type="checkbox" checked={todo.iscompleted} onChange={() => {
                            fetch(`http://localhost:8000/todos/${todo.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ...todo, iscompleted: !todo.iscompleted })
                            })
                            .then(
                                res => {
                                    if (!res.ok) {
                                        throw new Error('Failed to update todo'); 
                                    }
                                    
                                    return res.json();
                                }
                            )
                            .then(newTodo => {
                                const completedTodo = data.map(todo => {
                                    if (todo.id === newTodo.id) {
                                        return newTodo;
                                    } else {
                                        return todo;
                                    }
                                });

                                setData(completedTodo);
                            })
                            .catch(error => console.log(error));
                        }} />
                        <p className={todo.iscompleted ? "completed" : ""}>{todo.title}</p>
                        </div>
                        <div>
                            <button
                                onClick={ () => {
                                    fetch('http://localhost:8000/todos/' + todo.id, {
                                        method: 'DELETE'
                                    })
                                    .then(
                                        res => {
                                            if (!res.ok) {
                                                throw new Error('Failed to delete todo');
                                            }

                                            handledeletetodo(todo.id);
                                            console.log('todo deleted');
                                        }
                                    )
                                    .catch(error => console.log(error));
                                } }>delete</button>
                                <button
                                onClick={ () => {
                                    handleSelectTodo(todo.id);
                                } }
                                onChange={ () => setTitle(e.target.value) }>select</button>
                        </div>
                    </li>
                </ul>
            )) }
        </div>
    );
}
 
export default TodoList;