import React, { useState } from "react"
import Navbar from "./Navbar"
import CategorySelection from "./CategorySelection"
import Home from "./Home"
import NewEntry from "./NewEntry"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import ShowEntry from "./ShowEntry"

const App = () => {
  const [entries, setEntries] = useState([])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategorySelection />} />
          <Route path="/entry/:id" element={<ShowEntry entries={entries} />} />
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
