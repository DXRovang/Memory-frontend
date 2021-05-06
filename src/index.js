 Palace.fetchPalaces()

 loadRoom()

 PalaceForm.addEventListener('submit', (e) => {
  Palace.postPalace(e)
 })
 
 function jsonToJS(r){
  return r.json()
 }

  