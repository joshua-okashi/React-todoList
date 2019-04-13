import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import 'reset.css';
import UserDialog from './UserDialog'
import {getCurrentUser,signOut} from './leanCloud'

//  在线存储
// var APP_ID = 'EckJaPUPPEdW19WxjJQa2EFe-gzGzoHsz'
// var APP_KEY = 'dtilTjwfUeEYq14HThDuu9nI'
// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// })


// 本地存储
function save(key, value){
  return window.localStorage.setItem(key, JSON.stringify(value))
}

function load(key){
  return JSON.parse(window.localStorage.getItem(key))
}


// 输入框组件
class TodoInput extends Component {
  render(){
    return (
      <div>
        <input type="text" defaultValue={this.props.content}
        onKeyPress={this.submit.bind(this)} className='TodoInput' placeholder='What needs to be done?'/>
      </div>
    )
  }
  submit(e){
    console.log(e)
    if(e.key === 'Enter') {
      this.props.onSubmit(e)
    }
  }
}


// 输入项目组件
class TodoItem extends Component {
  
  toggle(e){
    this.props.onToggle(e,this.props.todo)
  }
  delete(e){
    this.props.onDelete(e,this.props.todo)
  }
  render(){

    return (
      <div className='todoContent'>
        <div>
          <input type='checkbox' checked={this.props.todo.status === 'completed'} 
          onChange={this.toggle.bind(this)}/>
          <span className='title'>{this.props.todo.title}</span>
        </div>
          <button onClick={this.delete.bind(this)}>delete</button>
      </div>
    )
  }
}


// App
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: load('todoList') || []
    }
  }
 

  addTodo(event){
    this.state.todoList.push({
      id: idMaker,
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    save('todoList', this.state.todoList)
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed'? '': 'completed'
    this.setState(this.state)
    save('todoList', this.state.todoList)
  }

  delete(event,todo){
    todo.deleted = true
    this.setState(this.state)
    save('todoList', this.state.todoList)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state)) 
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  onSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state)) 
    stateCopy.user = user
    this.setState(stateCopy)
  }


  
  render() {
    let todos = this.state.todoList.filter((item)=> !item.deleted)
    .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)}/>
        </li>)
    })
    console.log(todos)

    return (
      <div className="App App-header">
        <header className="contains">

          <h1>
            {this.state.user.username||'我'}的待办事项
            {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
          </h1>

          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)} />
          </div>

          <ol className='todoList'>
          {todos}
          </ol>

          {this.state.user.id ? 
            null : 
            <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)} 
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
        </header>
      </div>
    );
  }
}

export default App

let id = 0
function idMaker(){
  id += 1
  return id
}