import React from 'react'
import Hero from '../components/Hero'
import Departments from '../components/Departments'
import Biography from '../components/Biography'
import MessageForm from '../components/MessageForm'
const Home = () => {
  return (
    <>   
    <Hero title={"Welcome To Medical Institute"} imageUrl={"/hero.png"}/>
    <Biography imageUrl={"/about.png"}/>
    <Departments/>
    <MessageForm/>
    </>

  )
}

export default Home