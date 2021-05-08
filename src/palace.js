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
    button.addEventListener("click", (e) => {
      // debugger
      this.renderShow()})

    div.addEventListener("click", (e) => {
      this.deletePalace()})

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
    .then(this.appendPalaces)
  }
  static appendPalaces(palaces){
    for (let palace of palaces){
      let newPalace = new Palace(palace)
      newPalace.appendPalace()
    }
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
        if(palace.error === undefined){
          let newPalace = new Palace(palace)
          newPalace.appendPalace()
        }
      })
    }

    renderShow(){ 
      let ulId = this.name
    
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
        let respName = resp.name
        let frontEndPalace = document.getElementById(respName)
        frontEndPalace.remove()
      })
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
    } 
}




