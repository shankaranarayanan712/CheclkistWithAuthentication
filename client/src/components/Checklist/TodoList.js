import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { createPost,getPosts,updatePost }  from '../../actions/posts';
import Todo from './Todo';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function TodoList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState("");
 
  useEffect( ()=>{
    async function fetchData() {
      const result = await dispatch(getPosts());
      if(result && result.length >0){
      setTodos(result[0].todos);
      setTodoId(result[0]._id)
      }
    }
    fetchData();
  
  },[])
  const user = JSON.parse(localStorage.getItem('profile'))
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    let result1 = [], result2 = [];
    for (var i = 0; i < updatedTodos.length; i++) {
      if (updatedTodos[i].isComplete) {
        result1.push(updatedTodos[i]);
      } else {
        result2.push(updatedTodos[i]);
      }
    }
    let result = result2.concat(result1);
    
    setTodos(result);
  };

  // a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const onDragEnd = (result)=> {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const items = reorder(
    todos,
    result.source.index,
    result.destination.index
  );

  setTodos(items)
}
const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});



const saveChecklist = ()=> {
  const request ={ todos, userId :user.result._id  } ;
  if(todoId){
    dispatch(updatePost(todoId,request));
  } else{
   dispatch(createPost(request));
  }
  history.push('/success');
  
}
  return (
    <>
     
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        getItemStyle={getItemStyle}
        onDragEnd={onDragEnd}
        getListStyle={getListStyle}
      />
      {todos && todos.length >0 &&
       <Button fullWidth variant="contained" color="primary"  onClick={()=> saveChecklist()}>
            { 'Save Changes' }
        </Button>
      }
    </>
  );
}

export default TodoList;
