import React from 'react';
import logo from './logo.svg';
import './App.css';

const typeList = require('./typeList.json');
typeList.forEach((e,i) =>{
  typeList[i].checked = false
})
let asnwerStyle = [];
typeList.map((value,i)=>{
  asnwerStyle.push({});
  asnwerStyle[i].background = `#${typeList[i].color}`;
})

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.id = this.props.id;
    this.state = {
      checked : 0,
      types : typeList,
      good : [],
      bad : [],
      worst : [],
      style : []
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleAllRiset = this.handleAllRiset.bind(this)

    typeList.forEach((e,i) => {
      this.state.style.push({});
      this.state.style[i].border = `3px solid #${typeList[i].color}`;
    });
  }

  handleTypeChange(e){
    //二個以上チェックできないように
    if(this.state.checked>=2&&e.target.checked)return
    const name = Number(e.target.name);
    let checkedValue = this.state.checked;
    let g = [];
    let b = [];
    let w = [];
    let style = [];

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
        checked:(type.id===name)? !type.checked :type.checked,
      })
    });
    typesValue.forEach((type,i)=>{
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
        style.push({});
        style[i].background = `#${typeList[i].color}`;
        style[i].border = `3px solid #${typeList[i].color}`;
      }else{
        style.push({});
        style[i].background = `white`;
        style[i].border = `3px solid #${typeList[i].color}`;
      }
    })
    this.setState({good:g,bad:b,worst:w,checked:checkedValue,types:typesValue,style:style})
  }

  handleAllRiset(e){
    if(this.state.checked===0)return
    const style = []
    typeList.forEach((e,i) => {
      style.push({});
      style[i].background = `#fff`;
      style[i].border = `3px solid #${typeList[i].color}`;
    });
    const typesValue = this.state.types.map((type)=>{
      return({
        id: type.id,
        name: type.name,
        good: type.good,
        bad: type.bad,
        worst: type.worst,
        checked:false,
      })
    });
    this.setState({good:[],bad:[],worst:[],checked:0,types:typesValue,style:style})
  }

  render(){
    let types = this.state.types;
    //種類の数だけ１倍の配列を用意
    let typesPoint = this.state.types.map(()=>{
      return 1
    })
    let g = this.state.good;
    let b = this.state.bad;
    let w = this.state.worst;
    //各相性ごとに倍率を計算
    g.map((value)=>{
      typesPoint[value-1] *= 2
    })
    b.map((value)=>{
      typesPoint[value-1] *= 0.5
    })
    w.map((value)=>{
      typesPoint[value-1] *= 0
    })
    //倍率ごとに分けて変数に代入
    let a1 = []
    typesPoint.map((value,i)=>{
      if(value===4){
        a1.push(i + 1)
      }
    })
    let a2 = []
    typesPoint.map((value,i)=>{
      if(value===2){
        a2.push(i + 1)
      }
    })
    let a3 = []
    typesPoint.map((value,i)=>{
      if(value===0.5){
        a3.push(i + 1)
      }
    })
    let a4 = []
    typesPoint.map((value,i)=>{
      if(value===0.25){
        a4.push(i + 1)
      }
    })
    let a5 = []
    typesPoint.map((value,i)=>{
      if(value===0){
        a5.push(i + 1)
      }
    })
    
    return(
      <div className="wrap">
        <div className="displaySection">
          {a1.length!==0 &&(
          <div>
            <p>効果が抜群x4</p>
            <ul>
            {
              typesPoint.map((value,i)=>{
                if(value===4){
                  return(
                    <li style={asnwerStyle[i]}>
                      {types[i].name}
                    </li>
                  )
                }
              })
            }
            </ul>
          </div>
          )}
          {a2.length!==0 &&(
          <div>
            <p>効果が抜群x2</p>
            <ul>
            {
              typesPoint.map((value,i)=>{
                if(value===2){
                  return(
                    <li style={asnwerStyle[i]}>
                      {types[i].name}
                    </li>
                  )
                }
              })
            }
            </ul>
          </div>
          )}
          {a3.length!==0 &&(
          <div>
          <p>今ひとつx0.5</p>
            <ul>
            {
              typesPoint.map((value,i)=>{
                if(value===0.5){
                  return(
                    <li style={asnwerStyle[i]}>
                      {types[i].name}
                    </li>
                  )
                }
              })
            }
            </ul>
          </div>
          )}
          {a4.length!==0 &&(
          <div>
          <p>今ひとつx0.25</p>
            <ul>
            {
              typesPoint.map((value,i)=>{
                if(value===0.25){
                  return(
                    <li style={asnwerStyle[i]}>
                      {types[i].name}
                    </li>
                  )
                }
              })
            }
            </ul>
          </div>
          )}
          {a5.length!==0 &&(
          <div>
            <p>効果がない</p>
            <ul>
            {
              typesPoint.map((value,i)=>{
                if(value===0){
                  return(
                    <li style={asnwerStyle[i]}>
                      {types[i].name}
                    </li>
                  )
                }
              })
            }
            </ul>
          </div>
          )}
        </div>
        <div className="buttonSection">
          <ul>
          {
            types.map((type,index)=>{
              return(
                <li style={this.state.style[index]}>
                  <label>
                  <input type="checkbox" name={type.id} value={type.id} checked={type.checked} onChange={this.handleTypeChange}/>
                  {type.name}
                  </label>
                </li>
              )
            })
          }
          </ul>
          <div className="risetButton" onClick={this.handleAllRiset}>
            リセット
          </div>
        </div>
      </div>
    )
  }
}
