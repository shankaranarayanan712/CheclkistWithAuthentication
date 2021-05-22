import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { Button } from '@material-ui/core';

function TodoList() {
  const [todos, setTodos] = useState([]);

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
       <Button type="submit" fullWidth variant="contained" color="primary" >
            { 'Save Changes' }
        </Button>
      }
    </>
  );
}

export default TodoList;
