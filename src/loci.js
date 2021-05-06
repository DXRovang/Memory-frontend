class Loci{
  constructor(loci){
    this.name = loci.name
    this.id = loci.id
    this.item = loci.item
    this.palace_id = loci.palace.id
  }
  appendLoci(){
    const ul = document.createElement("ul")
    const li = document.createElement("li")
    li.innerHTML = this.name
    ul.append(li) 
  }

  appendNewLoci(){
    const ul = document.getElementsByTagName("ul")[0]
    const li = document.createElement("li")

    const div = document.createElement("div")
    div.innerHTML = this.name
    div.setAttribute("class", "loci")
    li.append(div)

    const div2 = document.createElement("div")
    div2.innerHTML = this.item
    div2.setAttribute("class", "item")
    li.append(div2)

    ul.append(li)

  }
  static appendLocis(palace, palaceDiv){
    for(let i = 0; i < palace.locis.length; i++){
      let ul = document.getElementById(palace.name)
      let li = document.createElement("li")

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
// debugger - this is the problem spot
      ul.append(li)
    }
  }
  static addLoci(e){
    e.preventDefault()
    const userInput = e.target.children[1].value
    const itemInput = e.target.children[4].value
    // debugger
    // need to associate the palace id or palace name here
    const palaceName = document.getElementsByTagName("div")[3].innerText
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


