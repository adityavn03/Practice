import { useState,useContext,createContext } from 'react'

import './App.css'

const Skip=createContext()
function App() {
  const [toggle,settoggle]=useState(true);

  
  return (
    <>
      <Skip.Provider value={{toggle:toggle,settoggle:settoggle}}>
        <Middle_component/>
      </Skip.Provider>
     
    </>
  )
}

const Middle_component=()=>{
  return(
    <div>
      <Sub1/>
      <Sub2/>

    </div>
  )
}

const Sub1=()=>{
  const {toggle}=useContext(Skip)
  return(
    <div>
      toggle the  message {toggle?"on":"off"}

    </div>
  )
}

const Sub2=()=>{
  const {toggle,settoggle}=useContext(Skip);
  function toggle_function(){
    settoggle(!toggle)
  }
  return(
    <div>
      <button onClick={toggle_function}>toggle button</button>


    </div>
  )
}

export default App
