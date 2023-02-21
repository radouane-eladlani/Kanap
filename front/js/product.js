/* Récupération de l'id du produit et savoir lequel des differents produits de l'API a afficher*/
const url = new URL(document.location)
const searchParams = url.searchParams
const lienId = searchParams.get('id')
/* declarer les variables global du produit pour pouvoir les utiliser dans toutes les fonctions*/
let altText = ""
let imgUrl = ""
let articleName = ""
let itemPrice = ""

/* Récupération des données d'un produit de l'API avec l'id du produit*/
fetch(`http://localhost:3000/api/products/${lienId}`)
    .then((res) => res.json())
    .then((res) => afficherProduit(res))
/* creer et afficher des éléments produit dans la page produit*/
function afficherProduit(canape) {
    /* variables locales de la fonction afficherProduit 
    pour pouvoir les utiliser que dans cette fonction*/
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
/* fonction pour ajouter le canape dans le panier*/
function ajouterAuPanier(color, quantity) {
    const key = `${lienId}-${color}`
    /* si le produit existe dans le localstorage alors on 
    additionne l'ancienne quantite avec la nouvelle quantite*/
    if (localStorage.getItem(key) != null) {
        /* recupere le produit dans le localstorage*/
        let itemString = localStorage.getItem(key)
        /* convertir itemString (produit) en object (item)*/ 
        let itemObject = JSON.parse(itemString)
        /*nouvelle quantite plus l'ancienne quantite dans panier*/
        itemObject.quantity = itemObject.quantity + parseInt(quantity)
        /* mettre a jour la valeur du produit dans le localstorage
        car la key existe deja dans le localstorage*/  
        localStorage.setItem(key,JSON.stringify(itemObject))
        window.location.href = "cart.html"
    }
    else{
        const donnees = {
        id: lienId,
        color: color,
        quantity: parseInt(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    /*stocker les donnees dans le localstorage*/
    /*JSON.stringify pour convertir la donnee en chaine de caractere et faciliter le stockage*/
    /*l'inverse de JSON.stringify est JSON.parse pour convertir la chaine de caractere en objet*/
    window.localStorage.setItem(key, JSON.stringify(donnees))
    /*Au clique sur (ajouter au panier) nous redirigera dans
     cart.html (panier) qui va recuperer les donnees dans le localstorage*/
    window.location.href = "cart.html"
    }
    
    
}

