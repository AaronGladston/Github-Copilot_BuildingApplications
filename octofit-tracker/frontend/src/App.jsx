import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'
import { ApiProvider } from './lib/ApiContext'
import ApiStatus from './components/ApiStatus'

export default function App(){
  return (
    <ApiProvider>
    <div className="app">
      <header>
        <h1>OctoFit Tracker</h1>
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/users"> Users</Link> |
          <Link to="/teams"> Teams</Link> |
          <Link to="/activities"> Activities</Link> |
          <Link to="/workouts"> Workouts</Link> |
          <Link to="/leaderboard"> Leaderboard</Link>
        </nav>
        <ApiStatus />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/workouts" element={<Workouts/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </main>
    </div>
    </ApiProvider>
  )
}

function Home(){
  return (
    <section>
      <h2>Welcome</h2>
      <p>OctoFit Tracker frontend (Vite + React 19). Configure VITE_CODESPACE_NAME in .env.local when running in Codespaces for the API base URL.</p>
    </section>
  )
}
