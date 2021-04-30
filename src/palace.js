function fetchPalaces(){
  fetch("http://localhost:3000/palaces")
  // converts response from from json into js
  // no return necessary if no curly brackets
  .then(r => r.json())
  .then(palaces => appendPalaces(palaces))
}

// find a DOM element and attach to it
function appendPalaces(palaces){
  const palaceDiv = document.getElementById("Title")
  const lociDiv = document.getElementById("Locis")

  for (let palace of palaces){
    palaceDiv.innerHTML = palace.name
    for(let i = 0; i < palace.locis.length; i++){
      const li = document.createElement("li")
      li.innerHTML = palace.locis[i].name
      lociDiv.append(li)
    }
  
   
  }
}