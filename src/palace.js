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
    const div = document.createElement("div")
    ul.append(div)
    const button = document.createElement("button")
    const br = document.createElement("br")
    button.innerHTML = "See Me"
    button.addEventListener("click", (e) => renderShow(this))
    div.innerHTML = this.name
    let ulId = div.innerText
    ul.setAttribute("id", ulId)
    ul.append(br, button)
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
    const userInput = document.getElementById("palaceName").value
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

  // ADD NEW METHOD HERE
}

// EVERYTHING ABOVE HERE IS PALACE CLASS

function renderShow(palace){
  const page = document.getElementById("Palace")
  const title = document.getElementById("Title")

  let ulId = palace.name

  const page2 = page
  const title2 = title

  title.innerHTML = ""
  page.children[0].remove()
  const palaceDiv = document.getElementById("Title")
  const ul = document.createElement("ul")
  const div = document.createElement("div")
  
  const button = document.createElement("button")
  button.innerHTML = "go back"
  page.append(button)

  ul.append(div)
  ul.setAttribute("id", ulId)
  div.innerHTML = palace.name
  palaceDiv.append(ul)
  Loci.appendLocis(palace, palaceDiv)
  appendLocisForm()
}



