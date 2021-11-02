 Palace.fetchPalaces()

 loadRoom()

//  let button = document.createElement("button")
//  button.addEventListener("click",()=>{ 
//   fetch('http://localhost:3000/palaces')
//   .then(jsonToJS)
//   .then((data) => {
//     let palaces = data.filter(palace => palace.locis.length <= 2)
//     Palace.appendPalaces(palaces)
//   })
//   .catch((error) => alert(`${error}`))
//  })
//  button.innerText = "Two"
//  body.append(button)

 PalaceForm.addEventListener('submit', (e) => {
  Palace.postPalace(e)
 })
 
 function jsonToJS(r){
  return r.json()
 }

  