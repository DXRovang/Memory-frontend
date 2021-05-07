const PalaceForm = document.getElementById("PalaceForm")

class Palace{
  constructor(palace){
    this.name = palace.name
    this.id = palace.id
    this.locis = palace.locis
    this.palaceMap = []
  }
  appendPalace(){
  debugger
    let palaceDiv = document.getElementById("Title")
    let ul = document.createElement("ul")
    let div = document.createElement("div")

    let button = document.createElement("button")
    button.innerHTML = "See Me"
    button.addEventListener("click", (e) => {
      // debugger
      renderShow(this)})

    div.innerHTML = this.name
    let ulId = div.innerText

    ul.setAttribute("id", ulId)
    ul.append(div, button)
    palaceDiv.append(ul)
    Loci.appendLocis(this, palaceDiv)
  }
  static fetchPalaces(){
    // debugger
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

    // renderShow(palace){ 

    //   let ulId = palace.name
    
    //   let palaceDiv = document.getElementById("Title")
    //   let page = document.getElementById("Palace")
    //   palaceDiv.innerText = ""
    //   // page.children[0] is the PalaceForm
    //   page.children[0].remove()
    
    //   let ul = document.createElement("ul")
    //   let div = document.createElement("div")
    
    //   let button = document.createElement("button")
    //   button.innerText = "go back"
    
    //   button.addEventListener("click", (e) => {
    //     console.log("go back")
    
    //     let LociItem = document.getElementById("LociItem")
    //     LociItem.children[0].remove()
    
    //     let newPalaceDiv = document.getElementById("Title")
    //     newPalaceDiv.innerHTML = ""
    
    //     let newPage = document.getElementById("Palace")
    //     newPage.innerHTML = `
    //     <form id="PalaceForm">
    //     <h1><label>Create Your Palace</label></h1>
    //     <div><input type="text" id="palaceName">
    //     <input type="submit" value="submit"></div>
    //   </form>
    //   <div id="LeftContainer">
    //   <div id="Title"></div>
    //   </div>`
    
    //     PalaceForm.addEventListener('submit', (e) => {
    //       Palace.postPalace(e)
    //      })
    //     Palace.fetchPalaces()
    //   })
    
    //   let button2 = document.createElement("button")
    //   button2.innerText = "save map"
    //   button2.addEventListener("click", (e) => {
    //     console.log("save map")
    //     saveMap()
    //   })
      
    //   ul.append(div)
    //   ul.setAttribute("id", ulId)
    
    //   div.innerText = palace.name
    
    //   palaceDiv.append(ul)
    //   page.append(button, button2)
    
    //   Loci.appendLocis(palace, palaceDiv)
    //   appendLocisForm()
    
    // }
    
}

function renderShow(palace){ 

  let ulId = palace.name

  let palaceDiv = document.getElementById("Title")
  let page = document.getElementById("Palace")
  palaceDiv.innerText = ""
  // page.children[0] is the PalaceForm
  page.children[0].remove()

  let ul = document.createElement("ul")
  let div = document.createElement("div")

  let button = document.createElement("button")
  button.innerText = "go back"

  button.addEventListener("click", (e) => {
    console.log("go back")

    let LociItem = document.getElementById("LociItem")
    LociItem.children[0].remove()

    let newPalaceDiv = document.getElementById("Title")
    newPalaceDiv.innerHTML = ""

    let newPage = document.getElementById("Palace")
    newPage.innerHTML = `
    <form id="PalaceForm">
    <h1><label>Create Your Palace</label></h1>
    <div><input type="text" id="palaceName">
    <input type="submit" value="submit"></div>
  </form>
  <div id="LeftContainer">
  <div id="Title"></div>
  </div>`

    PalaceForm.addEventListener('submit', (e) => {
      Palace.postPalace(e)
     })
    Palace.fetchPalaces()
  })

  let button2 = document.createElement("button")
  button2.innerText = "save map"
  button2.addEventListener("click", (e) => {
    console.log("save map")
    saveMap()
  })
  
  ul.append(div)
  ul.setAttribute("id", ulId)

  div.innerText = palace.name

  palaceDiv.append(ul)
  page.append(button, button2)

  Loci.appendLocis(palace, palaceDiv)
  appendLocisForm()

}



