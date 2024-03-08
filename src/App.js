import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News  from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  state={
    progress:10
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {   
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
        color='#f11946'
        height={3}
        loaderSpeed={100}
        progress={this.state.progress}
        
      />
          <Routes>
            <Route exact path="/general" element={<News setProgress={this.setProgress} pageSize={9}  key={"general"} country={'in'} category={'general'} />} />
            <Route exact path="/science"  element={<News setProgress={this.setProgress} pageSize={9} key={"science"} country={'in'}  category={'science'} />} />
            <Route exact path="/entertainment"  element={<News setProgress={this.setProgress} pageSize={9} key={"entertainment"} country={'in'} category={'entertainment'} />} />
            <Route exact path="/business"  element={<News setProgress={this.setProgress} pageSize={9} key={"business"} country={'in'} category={'business'} />} />
            <Route exact path="/technology"  element={<News setProgress={this.setProgress} pageSize={9} key={"technology"} country={'in'} category={'technology'} />} />
            <Route exact path="/sports"  element={<News setProgress={this.setProgress} pageSize={9} key={"sports"} country={'in'} category={'sports'} />} />
            <Route exact path="/health"  element={<News setProgress={this.setProgress} pageSize={9} key={"health"}country={'in'} category={'health'} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
