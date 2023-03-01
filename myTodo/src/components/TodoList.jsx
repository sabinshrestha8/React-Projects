import { useEffect, useState } from "react";
import Create from "./Create";

const TodoList = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [index, setIndex] = useState(null);
    const [iscompleted, setIsCompleted] = useState(false);

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
                iscompleted={ iscompleted }
                setIsCompleted={ setIsCompleted }
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
                            .then(res => res.json())
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
                        }} />


                        {/* <input type="checkbox" onClick={ () => {
                            // setIsCompleted(() => {
                            //     todo.iscompleted = true;
                            // });

                            // setIsCompleted(!todo.iscompleted);

                            fetch('http://localhost:8000/todos/' + todo.id, {
                                method: 'PATCH',
                                headers: { "content-Type": "application/json" },
                                body: JSON.stringify({...todo, iscompleted: !todo.iscompleted })
                            })
                            .then(
                                res => res.json()
                            )
                            .then((newTodo) => {
                                // setIsCompleted({...newTodo, iscompleted: !iscompleted});
                                // setIsCompleted(() => {
                                //     newTodo.iscompleted = iscompleted ? !iscompleted : iscompleted;
                                // });
                                
                                const completedTodo = data.map((todo) => {
                                    if (todo.id === newTodo.id) {
                                        return {...todo, iscompleted: !newTodo.iscompleted };
                                    }
                
                                    return todo;
                                })
                
                                setData(completedTodo);
                            });
                        } } /> */}
                        <p className={todo.iscompleted ? "completed" : ""}>{todo.title}</p>
                        </div>
                        <div>
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