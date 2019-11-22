import React from 'react';
import logo from './logo.svg';
import './App.css';

const typeList = require('./typeList.json');
typeList.forEach((e,i) =>{
  typeList[i].checked = false
})
console.log(typeList)
const style = []
typeList.forEach((e,i) => {
  style.push({});
  style[i].background = `#${typeList[i].color}`;
});

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.id = this.props.id;
    this.state = {
      checked : 0,
      types : typeList,
      good : [],
      bad : [],
      worst : []
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
    
  console.log(this.state)
  }

  handleTypeChange(e){
    //二個以上チェックできないように
    if(this.state.checked>=2&&e.target.checked)return
    const name = Number(e.target.name);
    let checkedValue = this.state.checked;
    let g = [];
    let b = [];
    let w = [];
    const typesValue = this.state.types.map((type)=>{
      if(type.id===name){
        //チェック数カウンター
        (!type.checked)?checkedValue=checkedValue+1:checkedValue=checkedValue-1;
      }
      return({
        id: type.id,
        name: type.name,
        good: type.good,
        bad: type.bad,
        worst: type.worst,
        checked:(type.id===name)? !type.checked :type.checked
      })
    });
    console.log(typesValue)
    typesValue.forEach((type)=>{
      if(type.checked){
        type.good.forEach((value)=>{
          g.push(value)
        })
        type.bad.forEach((value)=>{
          b.push(value)
        })
        type.worst.forEach((value)=>{
          w.push(value)
        })
      }
    })
    this.setState({good:g,bad:b,worst:w,checked:checkedValue,types:typesValue})
  }

  render(){
    let types = this.state.types;
    console.log(types)
    return(
      <div>
        <div>
          {this.state.good}<br/>
          {this.state.bad}<br/>
          {this.state.worst}<br/>
        </div>
        <ul>
        {
          types.map((type,index)=>{
            return(
              <li style={style[index]}>
                <input type="checkbox" name={type.id} value={type.id} checked={type.checked} onChange={this.handleTypeChange}/>
                {type.name}
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}
