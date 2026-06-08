import React, {useEffect, useState} from 'react'
import { useApi } from '../lib/ApiContext'

function normalizeResponse(json){
  if(Array.isArray(json)) return json
  if(!json) return []
  if(json.data && Array.isArray(json.data)) return json.data
  if(json.results && Array.isArray(json.results)) return json.results
  // fallback - return array values if present
  const arr = Object.values(json).find(v=>Array.isArray(v))
  if(arr) return arr
  return []
}

export default function Users(){
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const { apiBase } = useApi()

  useEffect(()=>{
    setLoading(true)
    fetch(`${apiBase}/users`)
      .then(r=>r.json())
      .then(json=>setUsers(normalizeResponse(json)))
      .catch(err=>setError(String(err)))
      .finally(()=>setLoading(false))
  },[])

  if(loading) return <div>Loading users...</div>
  if(error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Users</h2>
      {users.length===0 && <p>No users found.</p>}
      <ul>
        {users.map(u=> (
          <li key={u._id || u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </section>
  )
}
