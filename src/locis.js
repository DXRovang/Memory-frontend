function appendItem(palaces){
  const itemDiv = document.getElementById("Item")
  for(let palace of palaces){
    for(let i = 0; i < palace.locis.length; i++){
      const li = document.createElement("li")
      li.innerHTML = palace.locis[i].item
      itemDiv.append(li) 
    }
  }
}