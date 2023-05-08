import React from 'react';
import './App.css';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";

function App() {
  return (
    <div className="App">
        <Navbar />
        <HomePage name={"Travis"} />
    </div>
  );
}

export default App;
