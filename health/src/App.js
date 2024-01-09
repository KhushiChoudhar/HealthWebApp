import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Calender from './pages/moodTracker/Calender';
import Register from './pages/register/Register';
function App() {
  /*return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    
  );*/
  return(
    <Router>
      <Routes>
        <Route path='/'element={<Calender></Calender>}/>
        <Route path='/register' element={<Register></Register>}></Route>

      </Routes>
    </Router>
  )
}

export default App;
