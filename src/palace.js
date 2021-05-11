const PalaceForm = document.getElementById("PalaceForm")

class Palace{
  constructor(palace){
    this.name = palace.name
    this.id = palace.id
    this.locis = palace.locis
    this.palaceMap = []
  }

  static fetchPalaces(){
    fetch('http://localhost:3000/palaces')
    .then(jsonToJS)
    .then(this.appendPalaces)
    .catch((error) => console.log("There was an error: ", error))
  }
  static appendPalaces(palaces){
    for (let palace of palaces){
      let newPalace = new Palace(palace)
      newPalace.appendPalace()
    }
  }
  appendPalace(){
    let palaceDiv = document.getElementById("Title")
    let ul = document.createElement("ul")
    let div = document.createElement("div")

    let button = document.createElement("button")
    button.innerHTML = "See Me"
    button.addEventListener("click", (e) => {
      this.renderShow()})

    div.addEventListener("click", (e) => {
      this.deletePalace()})

    div.innerHTML = this.name
    // let ulId = div.innerText
    let ulId = this.id

    ul.setAttribute("id", ulId)
    ul.append(div, button)
    palaceDiv.append(ul)
    Loci.appendLocis(this, palaceDiv)
  }
  static postPalace(e){
    e.preventDefault()
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
      })
      .catch((error) => console.log("There was an error: ", error))
    }
    renderShow(){ 

      let ulId = this.id
      // clears out Index DOM
      let palaceDiv = document.getElementById("Title")
      let page = document.getElementById("Palace")
      palaceDiv.innerText = ""
      // page.children[0] is the PalaceForm
      page.children[0].remove()
      // creates new Show DOM
      let ul = document.createElement("ul")
      let div = document.createElement("div")
    
      let button = document.createElement("button")
      button.innerText = "go back"

      // I feel like this button could be refactored
      button.addEventListener("click", (e) => {
        // clears out Show DOM
        let LociItem = document.getElementById("LociItem")
        LociItem.children[0].remove()
    
        let newPalaceDiv = document.getElementById("Title")
        newPalaceDiv.innerHTML = ""
        // reCreates Index DOM
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

        const PalaceForm2 = document.getElementById("PalaceForm")
        PalaceForm2.addEventListener('submit', (e) => {
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

      div.innerText = this.name

      palaceDiv.append(ul)
      page.append(button, button2)
    
      Loci.appendLocis(this, palaceDiv)
      Loci.appendLocisForm()
    }
    deletePalace(){
      fetch(`http://localhost:3000/palaces/${this.id}`, {method: "DELETE"})
      .then(jsonToJS)
      .then(resp => {
        let respID = resp.id
        let frontEndPalace = document.getElementById(respID)
        frontEndPalace.remove()
      })
      .catch((error) => console.log("There was an error: ", error))
    }
    deleteLoci(loci){
      let lociID = loci.id
      fetch(`http://localhost:3000/locis/${loci.id}`, {method: "DELETE"})
      .then(jsonToJS)
      .then(resp => {
        this.locis = this.locis.filter(loci => loci.id != lociID)
        let page = document.getElementById(lociID)
        page.remove()
      })
      .catch((error) => console.log("There was an error: ", error))
    } 
}




