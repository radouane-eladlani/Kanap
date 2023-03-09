/*recuperer l'url de la page produit*/
const url = new URL(document.location)
/*recuperer les parametres de l'url*/
const searchParams = url.searchParams
/* recuperer l'id du produit*/
const lienId = searchParams.get('id')

/* Récupération des données d'un produit de l'API avec l'id du produit*/
fetch(`http://localhost:3000/api/products/${lienId}`)
    /* recuperer les donnees de la reponse de l'API des canapes*/
    .then((res) => res.json())
    .then((res) => afficherProduit(res))
/* creer la fonction pour afficher les éléments produit dans la page produit*/
function afficherProduit(canape) {
    /* variables locales de la fonction afficherProduit 
    pour pouvoir les utiliser que dans cette fonction*/
    const { altTxt, colors, description, imageUrl, name, price } = canape

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
    /* si le parent est different de null alors il va rattacher l'image dans le parent*/
    if (parent != null) {
        parent.appendChild(image)
    }
}
/* afficher le titre avec la recuperation du id #title*/
function creerTitre(name) {
    const h1 = document.querySelector("#title")
    /* si le h1 est different de null alors il va rattacher le name dans le h1*/
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
/* afficher les couleurs */
function creerColors(colors) {
    /* recuperer le select id colors*/
    const select = document.querySelector("#colors")
    /* si select est different de null alors on va creer une option pour chaque couleur*/
    if (select != null) {
        /* creer une option pour chaque couleur puis l'ajouter dans le select*/
        colors.forEach(color => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            /* on rattache l'option dans select pour afficher les differentes colors */
            select.appendChild(option)
        })
    }
}

/* recuperer le buton "addToCart" ajouter au panier*/
const button = document.querySelector("#addToCart")
/* chaque evenement click de (ajouter au panier) 
on va recuperer la couleur et la quantité du canape */
button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = parseInt(document.querySelector('#quantity').value);
    /*recuperer l'id du produit */
    const key = `${lienId}-${color}`
    /*localstorage.getitem,(key) pour recuperer les donnees du produit*/
    const itemString = localStorage.getItem(key)
    const itemObject = JSON.parse(itemString)
    if (color === "" || quantity < 1) {
        alert("selectionnez une couleur et une quantité de 1 à 100")
        return
    }
    if (itemObject != null) {
        /*si colors egale a null ou bien quantity alors afficher le msg d'alerte*/
        if (itemObject.quantity + quantity > 100) {
            alert(`La quantité de ce produit est limité a 100 (vous avez atteint la limite de ce produit)`)
        }
        /* sinon on va ajouter le canape dans le panier avec la couleur et la quantité*/
        else {
            ajouterAuPanier(color, quantity)
        }
    } else {
        /*si colors egale a null ou bien quantity alors afficher le msg d'alerte*/
        if (quantity > 100) {
            alert("selectionnez une couleur et une quantité de 1 à 100")
        }
        /* sinon on va ajouter le canape dans le panier avec la couleur et la quantité*/
        else {
            ajouterAuPanier(color, quantity)
        }
    }

})
/* fonction pour ajouter le canape dans le panier avec la couleur et la quantité 
a l'aide du localstorage*/
function ajouterAuPanier(color, quantity) {
    /* Une key qui contient pour chaque produit sont id et sa couleur dans le localstorage*/
    const key = `${lienId}-${color}`
    /* si le produit existe dans le localstorage alors on 
    additionne l'ancienne quantite avec la nouvelle quantite*/
    if (localStorage.getItem(key) != null) {
        /* recupere le produit dans le localstorage*/
        const itemString = localStorage.getItem(key)
        /* convertir itemString c'est a dire le (produit) en object 
        pour pourvoir calculer la quantite */
        const itemObject = JSON.parse(itemString)
        /*nouvelle quantite plus l'ancienne quantite dans panier*/
        itemObject.quantity = itemObject.quantity + parseInt(quantity)
        /* mettre a jour la valeur du meme produit 
        en rajoutant une nouvelle quantitty dans le localstorage
        car la key existe deja dans le localstorage */
        localStorage.setItem(key, JSON.stringify(itemObject))
        window.location.href = "cart.html"
    }
    else {
        const donnee = {
            id: lienId,
            quantity: parseInt(quantity),
            color: color
        }
        /*stocker les donnees dans le localstorage*/
        /*JSON.stringify pour convertir la donnee en chaine de caractere 
        et faciliter le stockage dans le localstorage. 
        L'inverse de JSON.stringify est JSON.parse pour convertir 
        la chaine de caractere en objet*/
        window.localStorage.setItem(key, JSON.stringify(donnee))
        /*Au clique sur (ajouter au panier) nous redirigera dans
         cart.html (panier) qui va recuperer les donnees dans le localstorage*/
        window.location.href = "cart.html"
    }


}

