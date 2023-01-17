import React, { useEffect, useReducer } from "react"
import Navbar from "./Navbar"
import CategorySelection from "./CategorySelection"
import Home from "./Home"
import NewEntry from "./NewEntry"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import ShowEntry from "./ShowEntry"
import reducer from '../reducer'
import JournalContext from "../context"

const initialState = {
  entries: [],
  categories: [],
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { entries, categories } = state

  const nav = useNavigate()

  useEffect(() => {
    async function getCategories() {
      const res = await fetch("http://localhost:4001/categories")
      const data = await res.json()
      // setCategories(data)
      dispatch({
        type: "setCategories",
        categories: data,
      })
    }
    getCategories()
  }, [])

  // Only on mount
  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch("http://localhost:4001/entries")
      const data = await res.json()
      // setEntries(data)
      dispatch({
        type: "setEntries",
        entries: data,
      })
    }
    fetchEntries()
  }, [])

  // HOC (higher-order component)
  const ShowEntryWrapper = () => {
    const { id } = useParams()
    const the_entry = entries[id]
    return the_entry ? <ShowEntry entry={the_entry} /> : <h4>Entry not found!</h4>
  }

  const addEntry = async (category, content) => {
    const id = entries.length
    // const categoryObject = categories.find((cat) => cat.name === category)
    // Add a new entry
    const newEntry = {
      category: category,
      content: content,
    }
    // Post new entry to API
    const returnedEntry = await fetch("http://localhost:4001/entries", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
    const data = await returnedEntry.json()
    // setEntries([...entries, data])
    dispatch({
      type: "addEntry",
      newEntry: data,
    })
    nav(`/entry/${id}`)
  }

  return (
    <JournalContext.Provider value={{ state, dispatch }} >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategorySelection />} />
        <Route path="/entry/:id" element={<ShowEntryWrapper />} />
        <Route path="/entry/new/:category" element={<NewEntry addEntry={addEntry} />} />
        <Route path="*" element={<h4>Page not found!</h4>} />
      </Routes>
    </JournalContext.Provider>
  )
}

export default App
