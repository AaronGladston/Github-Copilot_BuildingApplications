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

export default function Leaderboard(){
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const { apiBase } = useApi()

  useEffect(()=>{
    setLoading(true)
    fetch(`${apiBase}/leaderboard`)
      .then(r=>r.json())
      .then(json=>setItems(normalizeResponse(json)))
      .catch(err=>setError(String(err)))
      .finally(()=>setLoading(false))
  },[])

  if(loading) return <div>Loading leaderboard...</div>
  if(error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Leaderboard</h2>
      {items.length===0 && <p>No leaderboard entries.</p>}
      <ol>
        {items.map(l=> (
          <li key={l._id || l.id}>{l.user && l.user.name ? l.user.name : l.user} — {l.score}</li>
        ))}
      </ol>
    </section>
  )
}
