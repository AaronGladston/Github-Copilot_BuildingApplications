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

export default function Workouts(){
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const { apiBase } = useApi()

  useEffect(()=>{
    setLoading(true)
    fetch(`${apiBase}/workouts`)
      .then(r=>r.json())
      .then(json=>setItems(normalizeResponse(json)))
      .catch(err=>setError(String(err)))
      .finally(()=>setLoading(false))
  },[])

  if(loading) return <div>Loading workouts...</div>
  if(error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Workouts</h2>
      {items.length===0 && <p>No workouts found.</p>}
      <ul>
        {items.map(w=> (
          <li key={w._id || w.id}>
            <strong>{w.title}</strong> — {w.durationMinutes || 'n/a'} min
            {w.exercises && w.exercises.length>0 && (
              <div>Exercises: {w.exercises.map(e=>e.name).join(', ')}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
