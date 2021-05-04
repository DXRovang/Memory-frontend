function appendItem(i, palace, palaceDiv){
  const li = document.createElement("li")
  li.setAttribute("class", "item")
  li.innerHTML = palace.locis[i].item

  const button = document.createElement("button")
  if (li.innerHTML === ""){
    button.innerHTML = "+"
    button.setAttribute("class", "btn add")
    button.addEventListener("click", (e) => {
      addItem(loci, palace)})
  }else{
    button.innerHTML = "x"
    button.setAttribute("class", "btn delete")
    button.addEventListener("click", (e) => {
      deleteItem(loci, palace)})
  }
 
  const loci = palace.locis[i]
  li.append(button)
  palaceDiv.append(li) 
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

function addItem(loci, palace){
  // const options = {
  //   method: "PATCH", 
  //   headers: {
  //     "Content-type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify({
  //     loci: {
  //       name: loci.name,
  //       item: loci.item,
  //       palace_id: palace.id
  //       }
  //     })
  //   }
  // fetch(`http://localhost:3000/locis/${loci.id}`, options)
}