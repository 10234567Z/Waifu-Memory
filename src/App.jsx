import { useState , useEffect } from 'react'
import './Styles/App.css'
import Header from './Components/header'
import Main from './Components/main'
import Footer from './Components/footer'

function App() {

  return (
    <>
      <div className="bgWrap">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
