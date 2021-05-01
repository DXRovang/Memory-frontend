const PalaceForm = document.getElementById("PalaceForm")

function fetchPalaces(){
  fetch("http://localhost:3000/palaces")
  // converts response from from json into js, no return necessary if no curly brackets
  .then(jsonToJS)
  // since we define this function below, we can just ref it
  .then(appendPalaces)
}

// find a DOM element and attach to it
function appendPalaces(palaces){
  for (let palace of palaces){
    appendPalace(palace)
  }
}

// adds a single palace > try & split this into append loci & item
function appendPalace(palace){
  const palaceDiv = document.getElementById("Title")
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

// VERY tricky, look at this!!!
function postPalace(e){
  e.preventDefault()
  const userInput = e.target.children[1].value
  const options = {
    method: "POST", 
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({palace: {name: userInput}})
    }
    e.target.reset()
    fetch("http://localhost:3000/palaces", options)
    .then(jsonToJS)
    .then(appendPalace)
  }

