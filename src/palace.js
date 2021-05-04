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
    
    // separate this out into an appendButton function
    // unfortunately it can't move from this spot
    const button = document.createElement("button")
    const br = document.createElement("br")
    button.innerHTML = "See Me"
    button.addEventListener("click", (e) => renderShow(this))

    ul.innerHTML = this.name
    ul.append(br, button)
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

function renderShow(palace){
  const page = document.getElementById("Palace")
  const title = document.getElementById("Title")
  title.innerHTML = ""
  page.children[0].remove()
  // debugger
  // Palace.appendPalace()
  const palaceDiv = document.getElementById("Title")
  const ul = document.createElement("ul")

  ul.innerHTML = palace.name
  palaceDiv.append(ul)
  appendLocis(palace, palaceDiv)
  appendLocisForm()
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
    body: JSON.stringify({
      palace: {
        name: userInput
      }
    })
    }
    e.target.reset()
    fetch("http://localhost:3000/palaces", options)
    .then(jsonToJS)
    .then(palace => function(){
      let newPalace = new Palace(palace)
      newPalace.appendPalace()
    })
  }

