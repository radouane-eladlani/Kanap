/* la variable cart est un tableau d'éléments pour les produits qui represente le panier*/
const cart = []
/* Appel a la fonction pour afficher les elements du produit*/
recupererItems()
/* parcourir produit par produit pour les afficher */
cart.forEach((item) => afficherItem(item))

/* recuperer key (les elements du produit) et les mettres dans le localstorage 
pour afficher en un objet dans la variable "cart"*/
function recupererItems() {

    /* recuperer le nombre d'items dans le localstorage*/
    const nombresItems = localStorage.length
    for (let i = 0; i < nombresItems; i++) {
        /* recuperer sur le local storage avec la key (l'id du produit) en tant que chaine de caractere
        pour mettre le produit en tant qu'objet dans le panier*/
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }

}

/* creer un article et une img et la description et le input quantity 
pour chaque produit et rattacher imageDiv a article et cartItemsContent a article*/
function afficherItem(item) {
    const article = creerArticle(item)
    const imageDiv = creerImageDiv(item)
    article.appendChild(imageDiv)
    const cartItemsContent = creerCartContent(item)
    article.appendChild(cartItemsContent)
    /* appel aux fonctions pour afficher le produit dans la page html*/
    document.querySelector("#cart__items").appendChild(article)
    afficherTotalPrice()
    afficherTotalQuantity()
}

/* afficher le total de la quantité des produits dans la page html*/
function afficherTotalQuantity() {
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    /* parcourir le tableau pour calculer les quantités total des produits*/
    cart.forEach((item) => {
        const totalQuantity = + item.quantity
        total = total + totalQuantity
    })
    totalQuantity.innerHTML = total
}

/* aditionner les prix de chaque produit et afficher le total dans la page html*/
function afficherTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    /* parcourir le tableau pour calculer le total des prix des produits*/
    cart.forEach((item) => {
        const totalPrice = item.price * item.quantity
        total = total + totalPrice
    })
    totalPrice.innerHTML = total
}

/* rattacher description et settings a cartItemsContent
et retour cartItemsContent*/
function creerCartContent(item) {
    /* creer un div pour la description*/
    const cartItemsContent = document.createElement("div")
    /* ajouter la class cart__item__content dans cartItemsContent*/
    cartItemsContent.classList.add("cart__item__content")

    const description = creerDescription(item)
    const settings = creerSettings(item)

    cartItemsContent.appendChild(description)
    cartItemsContent.appendChild(settings)
    return cartItemsContent
}

function creerSettings(item) {
    /* creer une div pour settings*/
    const settings = document.createElement("div")
    /* ajouter la class cart__item__content__settings dans settings*/
    settings.classList.add("cart__item__content__settings")
    /* appel de la fonction pour ajouter la quantité et le bouton supprimer*/
    ajoutQuantityDansParam(settings, item)
    ajoutDeleteSettings(settings, item)
    return settings
}

/* fonction ajouter les parametres de supprimer le produit*/
function ajoutDeleteSettings(settings, item) {
    // creer un div pour le  "supprimer"
    const div = document.createElement("div")
    /* ajouter la class cart__item__content__settings__delete dans div*/
    div.classList.add("cart__item__content__settings__delete")
    /* ajouter un event listener a div pour la fonction "supprimerProduit" 
     pour pour que chaque evenement au click il supprimera le produit*/
    div.addEventListener("click", () => supprimerProduit(item))
    /* creer un p pour afficher supprimer*/
    const p = document.createElement("p")
    p.innerHTML = "Supprimer"
    /* rattacher p a div*/
    div.appendChild(p)
    /* rattacher div a settings*/
    settings.appendChild(div)
}

/*supprimer la carte du produit dans la page html*/
function supprimerProduit(item) {
    /* trouver l'index du produit dans cart*/
    const indexProduitASupprimer = cart.findIndex(
        (product) => product.id === item.id && product.color === item.color)
    /* supprimer le produit du tableau "cart" avec splice */
    /* deuxieme parametre "1" pour supprimer un seul element à partir de l'index indexProduitASupprimer*/
    cart.splice(indexProduitASupprimer, 1)
    /* appel de la fonction pour réafficher le total de la quantité 
    et le total du prix mise à jour*/
    afficherTotalQuantity()
    afficherTotalPrice()
    /* appel de la fonction pour supprimer le produit du panier de la page 
    et du localstorage*/
    supprimerProduitDuPanier(item)
    supprimerArticleDeLaPage(item)

}

/* supprimer le produit du localstorage*/
function supprimerProduitDuPanier(item) {
    /* La key permet d'identifier le produit dans le localStorage : 
        id du produit "-" couleur produit */
    const key = item.id + "-" + item.color

    localStorage.removeItem(key)
}

/* supprimer le produit de la page html*/
function supprimerArticleDeLaPage(item) {
    /* trouver l'article a supprimer*/
    const articleSupprimer = document.querySelector(
        'article[data-id="' + item.id + '"][data-color="' + item.color + '"]')
    articleSupprimer.remove()
}

/* creer un div pour la description*/
function ajoutQuantityDansParam(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.innerHTML = "Qté : "
    quantity.appendChild(p)
    /* creer un input pour la quantité*/
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    /* ajouter un event listener a input pour la fonction
    "misAJourAutoPriceEtQuantity"*/
    input.addEventListener("change", () => misAJourAutoPriceEtQuantity(item, input.value))
    /* rattacher input a quantity et quantity a settings*/
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

/* fonction pour mettre a jour la quantités lors du changement de quantité dans le champ*/
function misAJourAutoPriceEtQuantity(item, nouvelleQuantity) {
    item.quantity = nouvelleQuantity
    item.quantity = parseInt(item.quantity)

    /*mettre a jour l'item dans le localStorage*/
    sauvegarderNouvelleQuantity(item)
    /*réafficher le total de la quantité*/
    afficherTotalQuantity()
    afficherTotalPrice()
}

/* fonction pour sauvegarder la nouvelle donnees des produits dans le localstorage*/
function sauvegarderNouvelleQuantity(item,) {
    const donneesSauvegarder = JSON.stringify(item)
    const key = item.id + "-" + item.color
    localStorage.setItem(key, donneesSauvegarder,)


}

/* fonction pour creer la description*/
function creerDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.innerHTML = item.name

    const p = document.createElement("p")
    p.innerHTML = item.color

    const p2 = document.createElement("p")
    p2.innerHTML = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

/* fonction pour creer l'article*/
function creerArticle(item) {
    const article = document.createElement("article")
    /* ajouter la class card__item dans article*/
    article.classList.add("card__item")
    /* rajouter les attributs html "data-id" et "data-color" pour pouvoir identifier 
    l'article avec l'id du produit et sa color dans le html lors de la suppression*/
    article.dataset.id = item.id
    article.dataset.color = item.color

    return article
}
/* fonction pour creer une div pour l'image*/
function creerImageDiv(item) {
    const div = document.createElement("div")
    /* ajouter la class cart__item__img dans div*/
    div.classList.add("cart__item__img")
    /* creer la balise "img" pour l'image*/
    const image = document.createElement("img")
    /* Rajouter l'element html "src" pour recuperer l'url de l'image 
    et alt pour la description de image*/
    image.src = item.imageUrl
    image.alt = item.altTxt
    /* Ratacher image a div*/
    div.appendChild(image)

    return div
}

/* recuperer l'id de input "#order" dans le html */
const bouttonCommander = document.querySelector("#order")
/* ajouter un event listener a bouttonCommander pour la fonction "soumettreLeForm"*/
bouttonCommander.addEventListener("click", (e) => soumettreLeForm(e))

function soumettreLeForm(e) {
    /* empeche a rafraichir la page pour pas perdre les coordonnees */
    e.preventDefault()
    /* il va verifier si le panier est vide alors il va afficher l'alerte*/
    if (cart.length === 0) {
        alert("Votre panier est vide")
        return
    }
    /* il va verifier si le formulaire est invalide alors tu me return "c'est a dire tu va pas plus loin"*/
    if (etUnFormInvalide()) return
    if (etUnEmailInvalide()) return
    /* il va envoyer les informations du formulaire avec la methode POST*/
    const corpsDuTexte = recupererLesInfoDuFormulaire()
    console.log(corpsDuTexte);
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        /* il va convertir le corpsDuTexte en chaine de caractere*/
        body: JSON.stringify(corpsDuTexte),
        /* il va definir le type de contenu*/
        headers: { "Content-Type": "application/json" }
    })
        /* convertir en json*/
        .then((res) => res.json())
        .then((donnees) => {
            console.log(donnees)
            const orderId = donnees.orderId
            window.location.href = "confirmation.html" + "?orderId=" + orderId
        })
}
function etUnFormInvalide() {
    const form = document.querySelector(".cart__order__form")
    /* il va recuperer tous les inputs dans la balise form */
    const inputs = form.querySelectorAll("input")
    for (const input of inputs) {
        if (input.value === "") {
            alert("Veuillez remplir tous les champs")
            return true
        }
    }
    /* sinon tu me retourne false le formulaire est valide*/
    return false
}

function etUnEmailInvalide() {
    const email = document.querySelector("#email").value
    /* il va verifier si les caractere de l'email sont valide */
    const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    /* il va verifier si l'email est valide si true alors "veuiller remplir le champs" input vide */
    if (regex.test(email) === false) {
        alert("Veuillez entrer un email valide")
        return true
    }
    /* sinon tu me retourne false le formulaire est valide*/
    return false
}
/* il va recuperer les informations du form et les mettre dans le corpsDuTexte*/
function recupererLesInfoDuFormulaire() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const corpsDuTexte = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        /* il va recuperer les ids des produits dans le localstorage*/
        products: recupererLesIdsDuLocalStorage()
    }
    /* et il va retourner "corpsDuTexte"*/
    return corpsDuTexte

}
/* il va recuperer les ids des produits dans le localstorage*/
function recupererLesIdsDuLocalStorage() {
    const nombreDeProduits = localStorage.length
    /* il va creer un tableau vide pour mettre les ids des produits*/
    const ids = []
    /* il va recuperer les ids des produits dans le localstorage et supprimer le "-" et la color et renvoyer id du produit*/
    for (let i = 0; i < nombreDeProduits; i++) {
        const key = localStorage.key(i)
        const id = key.split('-')[0]
        ids.push(id)
    }
    return ids
}
