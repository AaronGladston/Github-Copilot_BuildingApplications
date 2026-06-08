import React from 'react'
import { useApi } from '../lib/ApiContext'

export default function ApiStatus(){
  const { apiBase } = useApi()
  const codespace = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div style={{marginTop:8, fontSize:12, color:'#666'}}>
      <div>Active API base: <code>{apiBase}</code></div>
      <div>{codespace ? `Codespace: ${codespace}` : 'Running locally (no VITE_CODESPACE_NAME)'} </div>
    </div>
  )
}
