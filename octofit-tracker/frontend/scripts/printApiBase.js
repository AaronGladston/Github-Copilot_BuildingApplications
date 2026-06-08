const http = require('http')

function fetchApiConfig(){
  return new Promise((resolve, reject)=>{
    const req = http.get('http://localhost:8000/api/config', res=>{
      let data = ''
      res.on('data', chunk=> data += chunk)
      res.on('end', ()=>{
        try{ const json = JSON.parse(data); resolve(json) }
        catch(e){ reject(e) }
      })
    })
    req.on('error', reject)
    req.setTimeout(3000, ()=>{ req.abort(); reject(new Error('timeout')) })
  })
}

fetchApiConfig()
  .then(cfg=>{
    console.log('apiUrl=', cfg.apiUrl || '')
  })
  .catch(err=>{
    console.error('Could not fetch /api/config:', String(err))
    const codespace = process.env.VITE_CODESPACE_NAME
    if(codespace){
      console.log('Fallback apiUrl=', `https://${codespace}-8000.app.github.dev/api`)
    } else {
      console.log('Fallback apiUrl= /api')
    }
    process.exit(0)
  })
