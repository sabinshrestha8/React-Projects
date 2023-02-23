import { useState } from "react";

const Create = ({ handleAddTodo }) => {
    const [title, setTitle] = useState("");
    const [iscompleted, setIsCompleted] = useState(false);

    const handleSubmit = (e) => {  
        e.preventDefault();
        const todo = { title, iscompleted };
        
        fetch('http://localhost:8000/todos', {
            method: 'post',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(todo)
        })
        .then(
            () => {
                handleAddTodo(todo);
                setTitle('');
                console.log("todo added");
            }
        )
    }

    return (
        <div className="add-todo">
            <h3>AddTodo</h3>
            <form onSubmit={ handleSubmit }>
                <input
                    type="text"
                    value={ title }
                    onChange={ e => setTitle(e.target.value) }
                    placeholder="add todo"
                    required
                />
            </form>
            <p>{ title }</p>
        </div>
    );
}
 
export default Create;