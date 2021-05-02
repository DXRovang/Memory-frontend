function loadRoom(){
  const rc = document.getElementById("RightContainer")
  for(let j=0; j< 20; j++){
    const tr = document.createElement("tr")
    // tr.setAttribute("class", "block")
    tr.innerHTML = ""
    rc.append(tr)
    for(let i = 0; i < 20; i++){
      const td = document.createElement("td")
      td.setAttribute("class", "block firstColor")
      // look this up!!!!
      td.setAttribute("onclick", "changeColor(this)")
      td.innerHTML = ""
      tr.append(td)
    }
   }
  }

// look this up!!!!
function changeColor(tdObj){
  tdObj.classList.toggle("secondColor")
}
