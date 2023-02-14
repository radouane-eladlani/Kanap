/* Récupération de l'id et savoir lequel des differents produits de l'API a afficher*/
const url = new URL(document.location);
const searchParams = url.searchParams;
const lienId = searchParams.get('id')
if (lienId != null) {
    let itemPrice = 0
    let imgUrl
    let altText
    let articleName

}
/* Récupération des données d'un produit de l'API avec l'id du produit*/
fetch(`http://localhost:3000/api/products/${lienId}`)
    .then((res) => res.json())
    .then((res) => afficherProduit(res))
/* creer et afficher des éléments produit dans la page produit*/
function afficherProduit(canape) {
    const { altTxt, colors, description, imageUrl, name, price } = canape
    altText = altTxt
    imgUrl = imageUrl
    articleName = name
    itemPrice = price
    /* on appel les fonctions pour afficher les elements html du produit*/
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
    /* si le parent est different de null alors il va ajouter l'image dans le parent*/
    if (parent != null) {
        parent.appendChild(image)
    }
}
/* afficher titre avec la recuperation du id #title*/
function creerTitre(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) {
        h1.textContent = name
    }
}
/* afficher le prix avec la recuperation du id #price*/
function creerPrix(price) {
    const span = document.querySelector("#price")
    if (span != null) {
        span.textContent = price
    }
}
/* afficher la description avec la recuperation du id #description*/
function creerDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) {
        p.textContent = description
    }
}
/* Recuperation du #colors*/
/* si il est different de null (select) alors on va creer une option pour chaque couleur*/
/* append option pour afficher les options colors*/
function creerColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        /* creer une option pour chaque couleur puis l'ajouter dans le select*/
        colors.forEach(color => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
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
    if (color == null || color === "" || quantity == null || quantity == "0") {
        alert("selectionnez une couleur et une quantité")
    }
    /* sinon on va ajouter le canape dans le panier*/
    else {
        ajouterAuPanier(color, quantity)
    }
})
function ajouterAuPanier(color, quantity) {
    const key = `${lienId}-${color}`
    const donnees = {
        id: lienId,
        colors: color,
        quantity: quantity,
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    /*stocker les donnees dans le localstorage puis 
    convertir les donnees en chaine json*/
    window.localStorage.setItem(key, JSON.stringify(donnees))

    /*Au clique sur (ajouter au panier) nous redirigera dans
     cart.html(panier) qui va recuperer les "donnees" dans le localstorage*/
    window.location.href = "cart.html"
}

