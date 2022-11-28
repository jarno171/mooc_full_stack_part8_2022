import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import {  Link } from "react-router-dom"

const NavBar = ({ authors, books }) => {
  return (
    <>

      <BrowserRouter>

      <Link to="/books"><button>Books</button></Link>
      <Link to="/authors"><button>Authors</button></Link>

        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/authors" element={<Authors authors={authors} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default NavBar