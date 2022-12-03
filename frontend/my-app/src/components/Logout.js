import { useNavigate, } from 'react-router-dom'
import { useApolloClient, } from '@apollo/client'
import { useEffect } from 'react'

const Logout = ({ token, setToken }) => {
  const navigate = useNavigate()

  const client = useApolloClient()

  useEffect(() => {
    logout()
  }, [token]) //eslint-disable-line

  const logout = () => {
    navigate("/")

    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
    </>
  )
}

export default Logout