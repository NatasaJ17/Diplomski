import './App.css';
import { authContext } from './authConext';
import { useState } from 'react';
import Naviagtion from './Navigation';


function App() {

  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(undefined);
  const [role, setRole] = useState('');

  return (
    <div className="App">
      <authContext.Provider value={{ logged, setLogged, user, setUser, role, setRole }}>
        <Naviagtion></Naviagtion>
      </authContext.Provider>
    </div>
  );
}

export default App;
