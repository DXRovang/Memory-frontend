const PalaceForm = document.getElementById("PalaceForm")

class Palace{

  constructor(palace){
    this.name = palace.name
    this.id = palace.id
    this.locis = palace.locis
  }

  appendPalace(){
    const palaceDiv = document.getElementById("Title")
    const ul = document.createElement("ul")
    ul.innerHTML = this.name
    palaceDiv.append(ul)

    appendLocis(this, palaceDiv)
  }

  // static are like class methods in ruby
  static fetchPalaces(){
    fetch("http://localhost:3000/palaces")
    // converts response from from json into js, no return necessary if no curly brackets
    .then(jsonToJS)
    // since we define this function below, we can just ref it
    .then(this.appendPalaces)
  }
  // find a DOM element and attach to it
  static appendPalaces(palaces){
    for (let palace of palaces){
      // need to create a frontend obj
      let newPalace = new Palace(palace)
      newPalace.appendPalace()
    }
  }

}

function appendLocis(palace, palaceDiv){
  for(let i = 0; i < palace.locis.length; i++){
    const li = document.createElement("li")
    const le = document.createElement("li")

    li.setAttribute("class", "loci")
    le.setAttribute("class", "item")

    li.innerHTML = palace.locis[i].name
    palaceDiv.append(li)
    le.innerHTML = palace.locis[i].item
    palaceDiv.append(le) 

    const bi = document.createElement("br")
    const be = document.createElement("br")

    const liDelete = document.createElement("button")
    liDelete.innerText = "Delete"
    // got lost here, CRD functionality 14:59
    liDelete.addEventListener("click", function(e){
      deleteLi(palace.id, li)})
    li.append(bi)
    li.append(liDelete)

    const leDelete = document.createElement("button")
    leDelete.innerText = "Delete"
    leDelete.addEventListener("click", function(e){
      deleteLe(palace.id, le)})
    le.append(be)
    le.append(leDelete)
  }
}


function deleteLi(palaceId, li){
  // debugger
  fetch(`http://localhost:3000/locis/${palaceId}`, {method: "DELETE"})
  .then(jsonToJS)
  .then(m => li.remove())
}
function deleteLe(lociId, le){
  fetch(`http://localhost:3000/locis/${palaceId}`, {method: "DELETE"})
  .then(jsonToJS)
  .then(m => le.remove())
}
// VERY tricky, look at this!!!
function postPalace(e){
  e.preventDefault()
  const userInput = e.target.children[2].value
  const options = {
    method: "POST", 
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({palace: {name: userInput}})
    }
    e.target.reset()
    fetch("http://localhost:3000/palaces", options)
    .then(jsonToJS)
    .then(palace => function(){
      let newPalace = new Palace
      newPalace.appendPalace()
    })
  }

