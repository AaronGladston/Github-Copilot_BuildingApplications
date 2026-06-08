import React, { createContext, useContext, useEffect, useState } from 'react'

const ApiContext = createContext({ apiBase: '/api' })

export function ApiProvider({ children }){
  const envCodespace = import.meta.env.VITE_CODESPACE_NAME
  const initial = envCodespace ? `https://${envCodespace}-8000.app.github.dev/api` : '/api'
  const [apiBase, setApiBase] = useState(initial)

  useEffect(()=>{
    // If VITE_CODESPACE_NAME is set, prefer it and skip detection
    if(envCodespace) return

    // Try to detect backend via local /api/config (useful when frontend is proxied)
    let cancelled = false
    ;(async ()=>{
      try{
        const resp = await fetch('/api/config')
        if(!resp.ok) return
        const json = await resp.json()
        if(json && json.apiUrl && !cancelled){
          // Ensure url ends with /api
          const url = json.apiUrl.replace(/\/$/, '') + '/api'
          setApiBase(url)
        }
      }catch(_){
        // ignore — keep fallback
      }
    })()
    return ()=>{ cancelled = true }
  },[envCodespace])

  return (
    <ApiContext.Provider value={{ apiBase }}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi(){
  return useContext(ApiContext)
}
