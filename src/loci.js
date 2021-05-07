class Loci{
  constructor(loci){
    this.name = loci.name
    this.id = loci.id
    this.item = loci.item
    this.palace_id = loci.palace.id
  }
  appendLoci(){
    let ul = document.createElement("ul")
    let li = document.createElement("li")
    li.innerHTML = this.name
    ul.append(li) 
  }
  appendNewLoci(){
    let ul = document.getElementsByTagName("ul")[0]
    let li = document.createElement("li")

    let div = document.createElement("div")
    div.innerHTML = this.name
    div.setAttribute("class", "loci")
    li.append(div)

    let div2 = document.createElement("div")
    div2.innerHTML = this.item
    div2.setAttribute("class", "item")
    li.append(div2)

    ul.append(li)

  }
  static appendLocis(palace, palaceDiv){
    for(let i = 0; i < palace.locis.length; i++){
      let ul = document.getElementById(palace.name)
      let li = document.createElement("li")
      let liID = palace.locis[i].id

      li.setAttribute("id", liID)

      let div = document.createElement("div")
      div.innerHTML = palace.locis[i].name
      div.setAttribute("class", "loci")
      li.append(div)

      let div2 = document.createElement("div")
      div2.innerHTML = palace.locis[i].item
      div2.setAttribute("class", "item")
      li.append(div2)

      let button = document.createElement("button")
      button.setAttribute("class", "btn1 delete")
      button.innerHTML = "x"
      li.append(button)

      let loci = palace.locis[i]
      button.addEventListener("click", (e) => {
        deleteLoci(loci)
      })
      ul.append(li)
    }
  }
  static addLoci(e){
    e.preventDefault()
    let userInput = e.target.children[1].value
    let itemInput = e.target.children[4].value

    let palaceName = document.getElementsByTagName("div")[3].innerText
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
        newLoci.appendNewLoci()
      })
  }
  // ADD METHOD HERE
}

// EVERYTHING ABOVE HERE IS CLASS

function deleteLoci(loci){
  let lociID = loci.id
  fetch(`http://localhost:3000/locis/${loci.id}`, {method: "DELETE"})
  .then(jsonToJS)
  .then(resp => {
    let page = document.getElementById(lociID).children
    // INTERESTING!!!!
    // removing-htmlcollection-elements-from-the-dom
    for (let i = page.length - 1; i >= 0; --i) {
      page[i].remove();
    }
  })
}

function appendLocisForm(){
  let lc = document.getElementById("LeftContainer")
  let locisForm = `
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


