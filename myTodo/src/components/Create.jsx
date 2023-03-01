const Create = ({ handleAddTodo, setTitle, title, index, setIndex, data, setData, iscompleted }) => {

    const handleSubmit = (e) => {  
        e.preventDefault();

        const todo = { title, iscompleted };

        if (index !== null) {
            fetch('http://localhost:8000/todos/' + data[index].id, {
                method: 'PATCH',
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({...data[index], title})
            })
            .then(
                res => res.json()
            )
            .then((newTodo) => {
                // const editTodo = data.map((todo) => {
                //     if (todo.id === data[index].id) {
                //         // todo.title = title
                //         return {...todo, title: title}
                //     }

                //     return todo;
                // })

                const editedTodo = data.map((todo) => {
                    if (todo.id === newTodo.id) {
                        return {...todo, title: title};
                    }

                    return todo;
                })

                setData(editedTodo);

                // setData(...data, {...newTodo, title: title});

                // console.log({...newTodo, title: title});

                setIndex(null);
                setTitle('');
                console.log('todo updated');
            });
        } else {
            fetch('http://localhost:8000/todos', {
                method: 'post',
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(todo)
            })
            .then(
                res => res.json()
            )
            .then(
                (data) => {
                    // console.log(data);
                    handleAddTodo(data);
                    setTitle('');
                    console.log("todo added");
                }
            )
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