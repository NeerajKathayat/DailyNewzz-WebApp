import React, { Component } from 'react'
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
export default class NavBar extends Component {

 constructor() {
    super()
    this.state={
      showMenuLink:false,
      color:false
    }
  }

  changeColor(){
    if(window.scrollY >= 70){
      this.setState({color:true});
    }
    else{
      this.setState({color:false})
    }
  }

  onClientEntry = () => {
  window.addEventListener('scroll',this.changeColor.bind(this))
  }

  componentDidMount(){
    this.onClientEntry();
  }

  render() {
    return (
      <div >
        <nav className={this.state.color ? 'main-nav fixed-top scrolling-active' : 'main-nav fixed-top'}>
          <div className="logo">
            <h2>
              <span>D</span>aily
              <span>N</span>ewzz
            </h2>
          </div>
          {/*  */}
          <div className={this.state.showMenuLink ? this.state.color?"menu-link mobile-menu-link dff":"menu-link mobile-menu-link" : "menu-link"}>
            <ul className={this.state.color? 'scc':'sbb'}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/business">Business</Link></li>
              <li><Link to="/general">General</Link></li>
              <li><Link to="/health">Health</Link></li>
              <li><Link to="/sports">Sports</Link></li>
              <li><Link to="/technology">Technology</Link></li>
              <li><Link to="/science">Science</Link></li>
              <li><Link to="/entertainment">Entertainment</Link></li>
            </ul>

          
          </div>

          <div className="hamburger-menu">
               <div onClick={() => { this.setState({showMenuLink: !this.state.showMenuLink}) }}>
               <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          
        </nav>
      </div>
    )
  }
}
