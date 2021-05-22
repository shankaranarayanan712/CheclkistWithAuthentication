import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { Checkbox } from '@material-ui/core';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
const Todo = ({ todos, completeTodo, removeTodo, updateTodo,getItemStyle,onDragEnd,getListStyle }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  return(
  <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {todos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                       {!item.isComplete &&
                            <Checkbox checked={item.isComplete} onClick={(event) => {
                              let checked = event.target.checked;
                              if(checked){
                              completeTodo(item.id)}
                            }
                            }/>
                        }
                        <ListItemText
                          primary={item.text}
                          secondary={item.secondary}
                        />
                        <ListItemSecondaryAction>
                        {!item.isComplete &&
                        <>
                          <IconButton onClick={() => setEdit({ id: item.id, value: item.text })} >
                            <EditIcon  />
                          </IconButton>
                          <IconButton   onClick={() => removeTodo(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                          </>
                           }
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
  )
};

export default Todo;
