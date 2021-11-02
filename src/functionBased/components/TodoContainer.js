import React, { useState, useEffect } from "react"
import {Route, Switch} from "react-router-dom"
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuid4 } from "uuid";
import About from "../pages/About";
import NotMatch from "../pages/NotMatch";

const TodoContainer = () => {
    const [todos, setTodos] = useState(getInitialTodos())  

     const  addTodoItem = title => {
           const newTodo = {
               id: uuid4(),
               title: title,
               completed: false
           }
           setTodos([...todos, newTodo])
       }

       const handleChange = id => {
          setTodos(prevState => 
              prevState.map(todo => {
                  if(todo.id === id){
                      return{
                          ...todo,
                          completed: !todo.completed,
                      }
                  }
                  return todo;
              })
          )
       }

      const delTodo = id => {
           setTodos([
                  ...todos.filter(todo=> {
                       return todo.id !== id;
                   })
               ])
       }

      const setUpdate = (updatedTitle, id) => {
           setTodos(todos.map(todo=> {
                   if(todo.id === id){
                       todo.title = updatedTitle
                   }
                   return todo
               })
           )
       }
    
    function getInitialTodos(){
        const temp = localStorage.getItem("todos")
        const savedTodos = JSON.parse(temp)
        return savedTodos || []
    }

    useEffect(() => {
        const temp = JSON.stringify(todos)
        localStorage.setItem("todos", temp)
    },[todos])

        return (
        <Switch>
         <Route exact path="/">
                <div className="container">
                   <div className="inner">
                    <Header/>
                    <InputTodo addTodoProps={addTodoItem}/>
                    <TodoList 
                        todos={todos} 
                        handleChangeProps={handleChange}
                        deleteTodoProps={delTodo}
                        setUpdate={setUpdate}
               />
           </div>
            </div>
         </Route>
         <Route path = "/about">
             <About />
         </Route>
         <Route path = "/*">
             <NotMatch />
         </Route>
         </Switch>
        )
}
export default TodoContainer;
