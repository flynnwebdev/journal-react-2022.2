import React from 'react'
import { useParams } from 'react-router-dom'

const NewEntry = () => {
  const { category } = useParams()

  return (
    <h2>New Entry in {category} category</h2>
  )
}

export default NewEntry