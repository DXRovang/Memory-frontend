function appendItem(i, palace, palaceDiv){
  const li = document.createElement("li")
  li.setAttribute("class", "item")
  li.innerHTML = palace.locis[i].item

  const button = document.createElement("button")
  if (li.innerHTML === ""){
     // adds an element
    button.innerHTML = "+"
    button.setAttribute("class", "btn add")
    button.addEventListener("click", (e) => {
      appendItemForm(loci, palace, li, button)})
  }else{
    // deletes an element
    button.innerHTML = "-"
    button.setAttribute("class", "btn delete")
    button.addEventListener("click", (e) => {
      deleteItem(loci, palace)})
  }
  const loci = palace.locis[i]
  li.append(button)
  palaceDiv.append(li) 
}


function appendItemForm(loci, palace, li, button){
  // debugger
li.setAttribute("id", "itemID")
button.remove()

const itemForm = `
<div id="Item">
  <form id="itemForm">
  <input type="text" size="8" id="itemInput"/>
  <input type="submit" value="o"/>
  </form>
</div>`

const myLi = document.getElementById("itemID")
myLi.innerHTML += itemForm
const itemInput = document.getElementById("itemInput")
document.getElementById("itemForm").addEventListener("submit", (e) => {
  addItem(loci, palace, itemInput)})
}


function addItem(loci, palace, itemInput){
  const item = itemInput.value
  const options = {
    method: "PATCH", 
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      loci: {
        name: loci.name,
        item: item,
        palace_id: palace.id
        }
      })
    }
  fetch(`http://localhost:3000/locis/${loci.id}`, options)
}


function deleteItem(loci, palace){
  const options = {
    method: "PATCH", 
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      loci: {
        name: loci.name,
        item: "",
        palace_id: palace.id
        }
      })
    }
  fetch(`http://localhost:3000/locis/${loci.id}`, options)
  }