import React from "react"
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuid4 } from "uuid";
class TodoContainer extends React.Component{
    state = {
        todos: []
       };

    //    componentDidMount() {
    //        fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    //        .then(response => response.json())
    //        .then(data=>this.setState({todos: data}))
    //    }
       componentDidUpdate(prevProps, prevState) {
           if(prevState.todos !== this.state.todos){
               const temp = JSON.stringify(this.state.todos)
               localStorage.setItem("todos", temp)
           }
       }

       componentDidMount(){
           const temp = localStorage.getItem("todos")
           const loadedTodos = JSON.parse(temp)
           if(loadedTodos){
               this.setState({todos : loadedTodos})
           }
       }

       addTodoItem = title => {
           const newTodo = {
               id: uuid4(),
               title: title,
               completed: false
           }
           this.setState({
               todos: [...this.state.todos, newTodo]
           })
       }

       handleChange = id => {
          this.setState(prevState => ({
              todos: prevState.todos.map(todo => {
                  if(todo.id === id){
                      return{
                          ...todo,
                          completed: !todo.completed,
                      }
                  }
                  return todo;
              })
          }))
       }

       delTodo = id => {
           this.setState({
               todos: [
                   ...this.state.todos.filter(todo=> {
                       return todo.id !== id;
                   })
               ]
           })
       }

       setUpdate = (updatedTitle, id) => {
           this.setState({
               todos: this.state.todos.map(todo=> {
                   if(todo.id === id){
                       todo.title = updatedTitle
                   }
                   return todo
               })
           })
       }
    render(){
        
        return(
            <div className="container">
                   <div className="inner">
                    <Header/>
                    <InputTodo addTodoProps={this.addTodoItem}/>
                    <TodoList 
                        todos={this.state.todos} 
                        handleChangeProps={this.handleChange}
                        deleteTodoProps={this.delTodo}
                        setUpdate={this.setUpdate}
               />
           </div>
            </div>
        )
    }
}
export default TodoContainer;
