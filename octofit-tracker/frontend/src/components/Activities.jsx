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

export default function Activities(){
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const { apiBase } = useApi()

  useEffect(()=>{
    setLoading(true)
    fetch(`${apiBase}/activities`)
      .then(r=>r.json())
      .then(json=>setItems(normalizeResponse(json)))
      .catch(err=>setError(String(err)))
      .finally(()=>setLoading(false))
  },[])

  if(loading) return <div>Loading activities...</div>
  if(error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Activities</h2>
      {items.length===0 && <p>No activities found.</p>}
      <ul>
        {items.map(a=> (
          <li key={a._id || a.id}>
            <strong>{a.type}</strong> — {a.durationMinutes} min {a.calories? `— ${a.calories} kcal`: ''}
            {a.user && (typeof a.user === 'object') && <div>By: {a.user.name}</div>}
          </li>
        ))}
      </ul>
    </section>
  )
}
