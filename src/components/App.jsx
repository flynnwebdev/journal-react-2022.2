import React, { useState } from "react"
import Navbar from "./Navbar"
import CategorySelection from "./CategorySelection"
import Home from "./Home"
import NewEntry from "./NewEntry"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import ShowEntry from "./ShowEntry"

const seedEntries = [
  { category: 'Food', content: 'Pizza is awesome!'},
  { category: 'Work', content: 'Another day, another dollar'},
  { category: 'Coding', content: 'React is cool!'}
]

const App = () => {
  const [entries, setEntries] = useState(seedEntries)

  // HOC (higher-order component)
  const ShowEntryWrapper = () => {
    const { id } = useParams()
    const the_entry = entries[id]
    return the_entry ? <ShowEntry entry={the_entry} /> : <h4>Entry not found!</h4>
  }
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home entries={entries} />} />
          <Route path="/category" element={<CategorySelection />} />
          <Route path="/entry/:id" element={<ShowEntryWrapper />} />
          <Route path="/entry/new/:category" element={<NewEntry entries={entries} setEntries={setEntries} />} />
          <Route path="*" element={<h4>Page not found!</h4>} />
        </Routes>
      </BrowserRouter>
      {/* <Home />
            <CategorySelection />
            <NewEntry /> */}
    </>
  )
}

export default App
