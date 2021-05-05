class Loci{
  constructor(loci){
    this.name = loci.name
    this.id = loci.id
    this.item = loci.item
    this.palace_id = loci.palace_id
  }
  appendLoci(){
    // const ul = document.getElementsByTagName('ul')
    const ul = document.createElement("ul")
    const li = document.createElement("li")
    li.innerHTML = this.name
    // this is a problem
    ul.append(li) 
  }
  static appendLocis(palace, palaceDiv){
    for(let i = 0; i < palace.locis.length; i++){
      const li = document.createElement("li")
      li.setAttribute("class", "loci")
      li.innerHTML = palace.locis[i].name
      const button = document.createElement("button")
      button.innerHTML = "x"
      button.setAttribute("class", "btn1 delete")
      li.append(button)
      const loci = palace.locis[i]
      button.addEventListener("click", (e) => {
        deleteLoci(loci)
      })
      palaceDiv.append(li)
      appendItem(i, palace, palaceDiv)
    }
  }
  static addLoci(e){
    e.preventDefault()
    const userInput = e.target.children[1].value
    const itemInput = e.target.children[4].value
    const palaceName = document.getElementsByTagName('ul')[0].innerText
    const options = {
      method: "POST", 
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        loci: {
          name: userInput,
          item: itemInput,
          palaceName: palaceName
          }
        })
      }
      e.target.reset()
      fetch('http://localhost:3000/locis', options)
      .then(jsonToJS)
      .then(loci => {
        let newLoci = new Loci(loci)
        newLoci.appendLoci()
        // Palace.fetchPalaces()
      })
  }
  // ADD METHOD HERE
}

// EVERYTHING ABOVE HERE IS CLASS

function deleteLoci(loci){
  fetch(`http://localhost:3000/locis/${loci.id}`, {method: "DELETE"})
}

function appendLocisForm(){
  const lc = document.getElementById("LeftContainer")
  const locisForm = `
  <div id="LociItem">
    <form id="locisForm">
    <label class="lociLabel">Loci</label>
    <input id="lociInput"/><br>
    <label class="lociLabel">Item</label>
    <input id="itemInput"/><br>
    <input type="submit" value="add loci"/>
    </form>
    </div>
    `
  // note:  innerHTML recognizes the HMTL form elements
  lc.innerHTML += locisForm
  document.getElementById("locisForm").addEventListener("submit", Loci.addLoci)
}


