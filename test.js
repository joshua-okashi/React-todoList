import React from 'react';
import ReactDOM from 'react-dom';

let span = React.creactElement('span',{className:'red',})
React.render(span,document.querySelector('#root'))



  class app extends React.Component{
    constructor(props){
    super(props)
    this.state ={
      number: 0
    }
  }
  add(){
    this.setState({
      number: this.state.number +1
    }

    )
  }
  render(){
    return (
      <div>
        app2
        {this.state.number}
        <button onClick={this.add.bind(this)}/>
      </div>
    )  
  }
}


function render(){
  ReactDOM.render(
  <app name="hi" age="1"/>,
  document.querySelector('#root'))
}