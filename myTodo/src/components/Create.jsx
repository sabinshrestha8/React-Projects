const Create = ({ handleAddTodo, setTitle, title, index, setIndex, data, setData }) => {

    const handleSubmit = (e) => {  
        e.preventDefault();

        const todo = { title, iscompleted: false };

        if (index) {
            fetch('http://localhost:8000/todos/' + data[index].id, {
                method: 'PATCH',
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({...data[index], title})
            })
            .then(
                res => {
                    if (!res.ok) {
                        throw new Error('Failed to update todo');
                    }

                    return res.json();
                }   
            )
            .then((newTodo) => {
                const editedTodo = data.map((todo) => {
                    if (todo.id === newTodo.id) {
                        return {...todo, title: title};
                    }

                    return todo;
                })

                setData(editedTodo);
                setIndex(null);
                setTitle('');
                console.log('todo updated');
            })
            .catch(error => console.log(error))
            .finally(
                () => {
                    setTitle('');
                }
            );
        } else {
            fetch('http://localhost:8000/todos', {
                method: 'post',
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(todo)
            })
            .then(
                res => {
                    if (!res.ok) {
                        throw new Error('Failed to add todo');
                    }

                    return res.json();
                }      
            )
            .then(
                data => {
                    handleAddTodo(data);
                    setTitle('');
                    console.log("todo added");
                }
            )
            .catch(error => console.log(error));
        }
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
        </div>
    );
}
 
export default Create;