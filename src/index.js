 Palace.fetchPalaces()

 loadRoom()

 PalaceForm.addEventListener('submit', (e) => {
   debugger
  Palace.postPalace(e)
 })
 
 function jsonToJS(r){
  return r.json()
 }

  