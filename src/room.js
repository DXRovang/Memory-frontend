function loadRoom(){
  const rc = document.getElementById("RightContainer")
  let button = document.createElement("button")
  button.innerHTML = "save"
  rc.append(button)
  button.addEventListener("click", (e) => {
    addMap()
  })

  for(let j=0; j< 20; j++){
    const tr = document.createElement("tr")

    tr.innerHTML = ""
    rc.append(tr)
    for(let i = 0; i < 20; i++){
      const td = document.createElement("td")
      td.setAttribute("class", "block firstColor")
      // SO COOL
      td.setAttribute("onclick", "changeColor(this)")
      td.innerHTML = ""
      tr.append(td)
    }
   }
  }

function changeColor(tdObj){
  tdObj.classList.toggle("secondColor")
}

function addMap(){
  console.log("clicked!")
  let palaceMap = document.getElementsByClassName("secondColor")
  let palaceName = document.getElementsByTagName("ul")[0].id
  // debugger
  // const options = {
//   method: "PATCH", 
//   headers: {
//     "Content-type": "application/json", 
//     "Accept": "application/json"
//     },
//   body: JSON.stringify({
//         palace: {
//           palaceMap: palaceMap,
//           palaceName: palaceName
//         }
//       })
//     }
// fetch("http://localhost:3000/palaces/ how to get a palace id? ", options)
// .then(jsonToJS)
// .then()
}


// does the array need to be in the DB?
// if yes, fetch PATCH to palace
// push the map into the array (on the FrontEnd or the Backend?)
// note:  this button should only be availabe on the show page
