import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import {  Link } from "react-router-dom"
import AddBook from './AddBook'

const NavBar = ({ authors, books }) => {
  return (
    <>

      <BrowserRouter>

      <Link to="/books"><button>Books</button></Link>
      <Link to="/authors"><button>Authors</button></Link>
      <Link to="/addBook"><button>Add book</button></Link>

        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/authors" element={<Authors authors={authors} />} />
          <Route path="/addbook" element={<AddBook />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default NavBar