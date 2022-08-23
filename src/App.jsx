import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [cohort, setCohort] = useState("bhatia")
  const [inputValue, setInputValue] = useState("")

  function handleInput(e){
    setInputValue(e.target.value.toLowerCase())
  }

  function handleSubmit(e){
    e.preventDefault();
    setCohort(inputValue)
  }

  useEffect(()=>{
     async function fetchData(){
      const data = await fetch(`https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${cohort}/roster.json`)
      const json = await data.json()
      setStudents(json.students)
    }
    fetchData()
  }, [cohort])

  return (
    <div className="App">
      <h1>{cohort}</h1>
      {students.map(s => <p key={s.name}> {s.name}</p>)}
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} value={inputValue}/>
      </form>
    </div>
  )
}

export default App