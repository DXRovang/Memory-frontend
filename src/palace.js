const PalaceForm = document.getElementById("PalaceForm")

function fetchPalaces(){
  fetch("http://localhost:3000/palaces")
  // converts response from from json into js, no return necessary if no curly brackets
  .then(r => r.json())
  // since we define this function below, we can just ref it
  .then(appendPalace)
}

// find a DOM element and attach to it
// function appendPalace(palaces){
//   const palaceDiv = document.getElementById("Title")
//   for (let palace of palaces){
//     const ul = document.createElement("ul")
//     ul.innerHTML = palace.name
//     palaceDiv.append(ul)
//     // appendLoci(palaces)
//     // appendItem(palaces)
//   }
//   appendLoci(palaces)
//   appendItem(palaces)
// }

// option 2 - less code but no separation
function appendPalace(palaces){
  const palaceDiv = document.getElementById("Title")
  const lociDiv = document.getElementById("Locis")
  const itemDiv = document.getElementById("Item")

  for (let palace of palaces){
    const ul = document.createElement("ul")
    ul.innerHTML = palace.name
    palaceDiv.append(ul)
    for(let i = 0; i < palace.locis.length; i++){
      
      const li = document.createElement("li")
      const le = document.createElement("li")
      li.setAttribute("class", "loci")
      le.setAttribute("class", "item")
      
      li.innerHTML = palace.locis[i].name
      le.innerHTML = palace.locis[i].item
      palaceDiv.append(li)
      palaceDiv.append(le) 
    } 

   
  }
}

function postPalace(e){
  e.preventDefault()
  const userInput = e.target.children[1].value
}