import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  async function searchUser() {
    if (!username.trim()) {
      setError('Please enter a GitHub username')
      setUser(null)
      return
    }

    setError('')
    setUser(null)

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}`
      )

      if (!response.ok) {
        throw new Error('GitHub user not found')
      }

      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>GitHub Profile Finder</h1>
      <p>Discover GitHub developers around the world</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={searchUser}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {user && (
        <div className="profile">
          <img src={user.avatar_url} alt={user.login} />
          <h2>{user.name || user.login}</h2>
          <p>@{user.login}</p>
          <p>{user.bio || 'No bio available'}</p>

          <div className="stats">
            <p>Repositories: {user.public_repos}</p>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
          </div>

          <a href={user.html_url} target="_blank" rel="noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  )
}

export default App