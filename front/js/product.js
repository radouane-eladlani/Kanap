const url = new URL(document.location);
const searchParams = url.searchParams;
const lienId = searchParams.get('id')

fetch(`http://localhost:3000/api/products/${lienId}`)
  .then((res) => res.json())
  .then((res) => donnees(res)) 

function donnees(canape) {
  const altTxt = canape.altTxt
  const colors = canape.colors
  const description = canape.description
  const imageUrl = canape.imageUrl
  const  name = canape.name
  const price = canape.price
  const _id = canape._id
creerImage(imageUrl, altTxt)
creerTitre(name)
creerPrix(price)
creerDescription(description)
creerColors(colors)
}
function creerImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}
function creerTitre(name){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}
function creerPrix (price) {
const span = document.querySelector("#price")
if (span != null) span.textContent = price
}
function creerDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
function creerColors(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach(colors => {
        const option = document.createElement("option")
        option.value = colors
        option.textContent = colors 
        select.appendChild(option) 
        })
    }
}

