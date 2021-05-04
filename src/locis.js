class Loci{
  constructor(loci){
    this.name = loci.name
    this.id = loci.id
    this.item = loci.item
    this.palace_id = loci.palace_id
  }

  appendLoci(){
    const ul = document.getElementsByTagName('ul')
    const li = document.createElement("li")
  
    li.innerHTML = this.name
    ul.append(li)
  }


}

function appendLocis(palace, palaceDiv){
  for(let i = 0; i < palace.locis.length; i++){
    const li = document.createElement("li")
    li.setAttribute("class", "loci")
    li.innerHTML = palace.locis[i].name
    palaceDiv.append(li)
    appendItem(i, palace, palaceDiv)

    // lociItemDelete(palace, li, le)
  }
}




function appendItem(i, palace, palaceDiv){
  const li = document.createElement("li")
  li.setAttribute("class", "item")
  li.innerHTML = palace.locis[i].item
  palaceDiv.append(li) 
}

function appendLocisForm(){
  const lc = document.getElementById("LeftContainer")
  const locisForm = `
    <form id="locisForm">
    <label></label>
    <input id="lociInput"/>
    <input type="submit" value="add loci"/>
    </form>
    `
  // note:  innerHTML recognizes the HMTL form elements
  lc.innerHTML += locisForm
  document.getElementById("locisForm").addEventListener("submit", addLoci)
}

function addLoci(e){
  e.preventDefault()
  // debugger
  const userInput = e.target.children[1].value
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
        palaceName: palaceName
        }
      })
    }
    e.target.reset()
    fetch("http://localhost:3000/locis", options)
    .then(jsonToJS)
    .then(loci => function(){
      let newLoci = new Loci
      newLoci.appendLoci()
      // Palace.fetchPalaces()
    })
}


function deleteLoci(palaceId, li){
  // debugger
  fetch(`http://localhost:3000/locis/${palaceId}`, {method: "DELETE"})
  .then(jsonToJS)
  .then(m => li.remove())
}
function deleteItem(palaceId, le){
  // debugger
  fetch(`http://localhost:3000/locis/${palaceId}`, {method: "DELETE"})
  .then(jsonToJS)
  .then(m => le.remove())
}

function lociItemDelete(palace, li, le){
  const bi = document.createElement("br")
  li.append(bi)
    // for deleting a loci
    const liDelete = document.createElement("button")
    liDelete.innerText = "DeleteLoci"
    // got lost here, CRD functionality 14:59
    liDelete.addEventListener("click", function(e){
      deleteLoci(palace.id, li)})
    li.append(liDelete)

    // for deleting an item, I think
  const be = document.createElement("br")
  le.append(be)
  
    const leDelete = document.createElement("button")
    leDelete.innerText = "DeleteItem"
    leDelete.addEventListener("click", function(e){
      deleteItem(palace.id, le)})
    le.append(leDelete)
    // debugger
}