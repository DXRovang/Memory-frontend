const PalaceForm = document.getElementById("PalaceForm")

class Palace{
  constructor(palace){
    this.name = palace.name
    this.id = palace.id
    this.locis = palace.locis
    this.palaceMap = []
  }
  appendPalace(){
    let palaceDiv = document.getElementById("Title")
    let ul = document.createElement("ul")
    let div = document.createElement("div")

    let button = document.createElement("button")
    button.innerHTML = "See Me"
    button.addEventListener("click", (e) => renderShow(this))

    div.innerHTML = this.name
    let ulId = div.innerText

    ul.setAttribute("id", ulId)
    ul.append(div, button)
    palaceDiv.append(ul)

    Loci.appendLocis(this, palaceDiv)
  }
  static fetchPalaces(){
    fetch('http://localhost:3000/palaces')
    .then(jsonToJS)
    // since we define this function below, we can just ref it
    .then(this.appendPalaces)
  }
  // find a DOM element and attach to it
  static appendPalaces(palaces){
    for (let palace of palaces){
      let newPalace = new Palace(palace)
      newPalace.appendPalace()
    }
  }
  static postPalace(e){
    e.preventDefault()
    // why didn't e.target.children[1].value work here?
    let userInput = document.getElementById("palaceName").value
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
      fetch('http://localhost:3000/palaces', options)
      .then(jsonToJS)
      .then(palace => {
        let newPalace = new Palace(palace)
        newPalace.appendPalace()
        // add catch?
      })
    }
  // ADD renderShow HERE
}

function renderShow(palace){ 
  // debugger
  let ulId = palace.name
  // gets rid of current HTML
  let palaceDiv = document.getElementById("Title")
  let page = document.getElementById("Palace")
  palaceDiv.innerHTML = ""
  page.children[0].remove()
  // creates new HTML
  let ul = document.createElement("ul")
  let div = document.createElement("div")
  let button = document.createElement("button")
  button.innerHTML = "go back"
  // debugger
  // not working, why?
  button.addEventListener("click", (e) => {
    console.log("hello")
    Palace.fetchPalaces()
  })
  
  ul.append(div)
  ul.setAttribute("id", ulId)
  div.innerHTML = palace.name

  palaceDiv.append(ul, button)
  Loci.appendLocis(palace, palaceDiv)
  appendLocisForm()
}



