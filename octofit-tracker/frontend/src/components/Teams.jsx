import React, {useEffect, useState} from 'react'
import { useApi } from '../lib/ApiContext'

function normalizeResponse(json){
  if(Array.isArray(json)) return json
  if(!json) return []
  if(json.data && Array.isArray(json.data)) return json.data
  if(json.results && Array.isArray(json.results)) return json.results
  const arr = Object.values(json).find(v=>Array.isArray(v))
  if(arr) return arr
  return []
}

export default function Teams(){
  const [teams,setTeams]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const { apiBase } = useApi()

  useEffect(()=>{
    setLoading(true)
    fetch(`${apiBase}/teams`)
      .then(r=>r.json())
      .then(json=>setTeams(normalizeResponse(json)))
      .catch(err=>setError(String(err)))
      .finally(()=>setLoading(false))
  },[])

  if(loading) return <div>Loading teams...</div>
  if(error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Teams</h2>
      {teams.length===0 && <p>No teams found.</p>}
      <ul>
        {teams.map(t=> (
          <li key={t._id || t.id}>
            <strong>{t.name}</strong>
            {t.members && t.members.length>0 && (
              <div>Members: {t.members.map(m=>m.name||m).join(', ')}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
