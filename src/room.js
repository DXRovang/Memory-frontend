function loadRoom(){
  const rc = document.getElementById("RightContainer")
  for(let j=0; j< 20; j++){
  const tr = document.createElement("tr")
  tr.setAttribute("class", "block")
  tr.innerHTML = "bk"
  rc.append(tr)
  for(let i = 0; i < 20; i++){
    const td = document.createElement("td")
    td.setAttribute("class", "block")
    td.innerHTML = "bk"
    tr.append(td)
    }
   }
  }