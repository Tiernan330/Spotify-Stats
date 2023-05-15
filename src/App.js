import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import './CSS/App.css'
import './CSS/Themes.css'

//Route Paths
import MySpotifyData from './ParseData';
import FolderUpload from './FileUpload';

function TopNavBar(prop) {
  let {theme, toggleTheme, handleThemeChange} = prop
  return(
    <Navbar id={theme+'-Primary'} variant={theme} expand="xl" className='Main-NavBar Primary'>
      <div className='Nav-Bar-Container'>
        <div className='Nav-Bar-Left-Container'>
          <Navbar.Brand href="/">Spotify Stats</Navbar.Brand>
        </div>
        
        <div className='button-Container'>
          <Button variant={`outline-${theme === 'dark' ? 'light' : 'dark'}`} onClick={toggleTheme} onChange={handleThemeChange}>
            {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          </Button>
        </div>
      </div>
    </Navbar>
  )
}



function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {setTheme(theme === 'dark' ? 'light' : 'dark')};

  useEffect(() => {
    const savedMessage = localStorage.getItem('theme');
    if (savedMessage !== null) {setTheme(savedMessage)}
  }, []);

  useEffect(() => {localStorage.setItem('theme', theme)}, [theme]);

  const handleThemeChange = (event) => {setTheme(event.target.value)};

  return (
    <Router>
      <div className="App">

        <TopNavBar theme={theme} toggleTheme={toggleTheme} handleThemeChange={handleThemeChange}/>

        <Routes>

          <Route exact path="/" element={<FolderUpload theme={theme}/>}/>

          <Route exact path="/Data">
            <Route path="Extended" element={<MySpotifyData theme={theme}/>}/>
            <Route path="Account" element={<MySpotifyData theme={theme}/>}/>
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
