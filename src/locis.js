class Loci{
  constructor(loci){
    this.name = loci.name
    this.id = loci.id
    this.item = loci.item
  }
}

function appendLocis(palace, palaceDiv){
  for(let i = 0; i < palace.locis.length; i++){
    const li = document.createElement("li")
    const le = document.createElement("li")

    li.setAttribute("class", "loci")
    le.setAttribute("class", "item")
    li.innerHTML = palace.locis[i].name
    palaceDiv.append(li)
    le.innerHTML = palace.locis[i].item
    palaceDiv.append(le) 

    deleteLi(palace, li, le)
  }
}

function deleteLi(palace, li, le){
    const bi = document.createElement("br")
    const be = document.createElement("br")
    const liDelete = document.createElement("button")
    const leDelete = document.createElement("button")
    
    liDelete.innerText = "Delete"
    // got lost here, CRD functionality 14:59
    liDelete.addEventListener("click", function(e){
      deleteLi(palace.id, li)})
    li.append(bi)
    li.append(liDelete)

    leDelete.innerText = "Delete"
    leDelete.addEventListener("click", function(e){
      deleteLe(palace.id, le)})
    le.append(be)
    le.append(leDelete)
}