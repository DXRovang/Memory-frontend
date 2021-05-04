function appendItem(i, palace, palaceDiv){
  const li = document.createElement("li")
  li.setAttribute("class", "item")
  li.innerHTML = palace.locis[i].item

  const button = document.createElement("button")
  button.innerHTML = "x"
  button.setAttribute("class", "btn delete")
  const loci = palace.locis[i]
  button.addEventListener("click", (e) => {
    deleteItem(loci, palace)})
  li.append(button)
  palaceDiv.append(li) 
}


function deleteItem(loci, palace){
  // debugger
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