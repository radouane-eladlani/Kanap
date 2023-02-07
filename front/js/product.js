/* Récupération de l'id et savoir lequel des diferents produits de l'API a afficher*/
const url = new URL(document.location);
const searchParams = url.searchParams;
const lienId = searchParams.get('id')
/* Récupération des données de l'API avec l'id du produit*/
fetch(`http://localhost:3000/api/products/${lienId}`)
  .then((res) => res.json())
  .then((res) => donnees(res)) 
/* afficher des éléments produit dans la page produit*/
function donnees(canape) {
  const altTxt = canape.altTxt
  const colors = canape.colors
  const description = canape.description
  const imageUrl = canape.imageUrl
  const  name = canape.name
  const price = canape.price
  
creerImage(imageUrl, altTxt)
creerTitre(name)
creerPrix(price)
creerDescription(description)
creerColors(colors)
}
/* afficher le titre avec la Création de l'img*/
function creerImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}
/* afficher titre avec la recuperation du id #title*/
function creerTitre(name){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}
/* afficher le prix avec la recuperation du id #price*/
function creerPrix (price) {
const span = document.querySelector("#price")
if (span != null) span.textContent = price
}
/* afficher la description avec la recuperation du id #description*/
function creerDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
/* Recuperation du id #colors*/
/* si il est pas egaux Executer une boucle pour afficher les options colors */
/* append option pour afficher les options colors*/
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
const button = document.querySelector("#addToCart")
/* chaque evenement click (ajouter au panier) 
on va recuperer la couleur et la quantité du canape */
button.addEventListener("click", (e) => {
const color = document.querySelector("#colors").value
const quantity = document.querySelector("#quantity").value
/*si colors egale a null ou bien quantity alors afficher le msg d'alerte*/
if (color == null || color == "" || quantity == null || quantity == "0") {
    alert("selectionnez une couleur et une quantité")}
    return 
}) 
const donnees = { 
    id: lienId, 
    color: colors, 
    quantity: number(quantity) }

    /*stocker les donnees dans le localstorage puis convertir les donnees en chaine json*/
    window.localStorage.setItem(lienId, JSON.stringify(donnees))
    /* ensuite on rajoute l'URL cart.html(panier).
    Au clique sur (ajouter au panier) nous redirigera dans cart.html(panier) avec les "donnees" */
    window.location.href = "cart.html"

