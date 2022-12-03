import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import {  Link } from "react-router-dom"
import AddBook from './AddBook'
import LoginForm from './LoginForm'
import Logout from './Logout'
import Recommend from './Recommend'
import { useState, } from 'react'

const NavBar = ({ authors, books, token, setToken }) => {

  const [notify, setNofify] = useState('')

  return (
    <>
      <BrowserRouter>

      <Link to="/books"><button>Books</button></Link>
      <Link to="/authors"><button>Authors</button></Link>

      {token && <Link to="/addBook"><button>Add book</button></Link>}
      {token && <Link to="/recommend"><button>Recommend</button></Link>}
      {token && <Link to="/logout"><button>Logout</button></Link>}
      {!token && <Link to="/loginForm"><button>Login</button></Link>}

        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/authors" element={<Authors token={token} authors={authors} />} />

          {token && <Route path="/addbook" element={<AddBook />} />}
          {token && <Route path="/recommend" element={<Recommend />} />}

          <Route path="/loginForm" element={<LoginForm
                                              setToken={setToken}
                                              setError={setNofify}
                                              errorMessage={notify}
                                            />} />

          <Route path="/logout" element={<Logout token={token} setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default NavBar