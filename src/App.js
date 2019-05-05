import React, { Component } from 'react';
import classNames from "classnames";
import './App.css';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: 0,
      adult: 0,
      children: 0
    }
    this.roomsChange = this.roomsChange.bind(this)
    this.adultsChange = this.adultsChange.bind(this)
    this.childrenChange = this.childrenChange.bind(this)
  }
  roomsChange(val) {

    if (val < 0) return
    if (val > 5) return
    if (val == 0) {
      this.setState({ adult: 0, children: 0, rooms: 0 })
      return
    }
    this.setState({ rooms: val })
    let { children, rooms, adult } = this.state
    if (val > adult) {
      this.setState({ adult: adult + 1 })
    }
    else if (val < adult && val * 4 < adult + children) {
      let diff = (adult + children) - (val * 4)
      let tempAdult = this.state.adult,
        tempChild = this.state.children
      for (let i = 0; i < diff; i++) {
        if (tempChild > 0)
          tempChild += -1
        else
          tempAdult += -1
      }
      this.setState({ children: tempChild, adult: tempAdult })
    }
  }
  adultsChange(val) {
    let{ children, rooms } = this.state,
       total = val + children, idealTotal = rooms * 4
      if (total > idealTotal) return
    if(val < rooms) return
     this.setState({ adult: val })
  }
  childrenChange(val) {
    let { adult, rooms } = this.state,
      total = val + adult, idealTotal = rooms * 4
    if (total > idealTotal) return
    this.setState({ children: val })
  }
  render() {
    const { rooms, adult, children } = this.state


    return (
      <div className="App">
        <p>Choose number of <b>people</b></p>
        <div className="box">
          <div className="flex borderBottom">
            <i class="fas main icon fa-bed"></i>
            <h2 className="flex1">ROOMS 
            </h2>
            <div className="flex">
              <div
                className="padding05"
                onClick={() => this.roomsChange(rooms - 1)}
              ><i className={classNames("fas icon_minus fa-minus-circle", {"disabled_minus": rooms == 0})}></i></div>
              <div
                className="padding05"
              >{rooms}</div>
              <div
                className="padding05"
                onClick={() => {
                  if (rooms <= 4)
                    this.roomsChange(rooms + 1)
                }}
              ><i className={classNames("fas icon fa-plus-circle", {"disabled_plus": rooms == 5})}></i></div>
            </div>
          </div>

          <div className="flex borderBottom">
          <i class="fas main icon fa-user"></i>
            <h2 className="flex1">ADULTS</h2>
            <div className="flex">
              <div
                className="padding05"
                onClick={() => {
                  if (adult >= 1) {
                    this.adultsChange(adult - 1)
                  }
                }}
                ><i className={classNames("fas icon_minus fa-minus-circle", {"disabled_minus": rooms == adult})}></i></div>
                <div
                className="padding05"              
              >{adult}</div>
              <div
                className="padding05"
                onClick={() => {
                  this.adultsChange(adult + 1)
                }}
                ><i className={classNames("fas icon fa-plus-circle", {"disabled_plus": (children + adult) == rooms*4})}></i></div>
                </div>
          </div>

          <div style={{margin:' 0'}}className="flex">
          <i class="fas main icon fa-child"></i>
            <h2 className="flex1">CHILDREN</h2>
            <div className="flex">
              <div
                className="padding05"
                onClick={() => {
                  if (children >= 1) {
                    this.childrenChange(children - 1)
                  }
                }}
                ><i className={classNames("fas icon_minus fa-minus-circle", {"disabled_minus": children == 0})}></i></div>
                <div
                className="padding05"
                >{children}</div>
              <div
                className="padding05"
                onClick={() => {
                  this.childrenChange(children + 1)
                }}
                ><i className={classNames("fas icon fa-plus-circle", {"disabled_plus": (children + adult) == rooms*4})}></i></div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
