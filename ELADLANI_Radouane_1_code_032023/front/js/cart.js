/*la variable cart est un tableau d'éléments pour les produits qui represente le panier*/
const cart = [];
/* Appel a la fonction pour afficher les elements du produit*/
(async () => {
    await recupererItems()
    console.log(cart);
    /* parcourir les tableaux pour afficher le produit*/
    cart.forEach((item) => afficherItem(item))
})()
/* parcourir produit par produit pour les affichées */
/* recuperer key (les elements du produit) et les mettres dans le localstorage 
pour afficher en un objet dans la variable "cart"*/
async function recupererItems() {

    /* recuperer le nombre d'items dans le localstorage*/
    const nombresItems = localStorage.length
    /* parcourir dans le localstorage produit par produit pour les affichées */
    for (let i = 0; i < nombresItems; i++) {
        let key = localStorage.key(i).split("-")[0]
        /* recuperer sur le local storage avec la key (l'id du produit) en tant que chaine de caractere
        pour mettre le produit en tant qu'objet dans le panier*/
        await fetch(`http://localhost:3000/api/products/${key}`)
            .then((response) => response.json())
            .then((donnee) => {
                /* recupere le produit dans le localstorage*/
                let itemString = localStorage.getItem(localStorage.key(i))
                /* convertir itemString en chaine objet pour recuperer la quantité et la couleur*/
                let itemObject = JSON.parse(itemString)
                donnee.quantity = itemObject.quantity
                donnee.color = itemObject.color
                cart.push(donnee)
            })
    }
}

/* creer un article et une img et la description et le input quantity 
pour chaque produit et rattacher imageDiv a article et cartItemsContent a article*/
function afficherItem(item) {
    /* creer un article pour chaque produit avec la function creerArticle*/
    const article = creerArticle(item)
    /* creer une image pour chaque produit avec la function creerImageDiv*/
    const imageDiv = creerImageDiv(item)
    /* rattacher imageDiv a article*/
    article.appendChild(imageDiv)
    /* creer le contenu de la cart produit avec la function creerCartContent*/
    const cartItemsContent = creerCartContent(item)
    /* rattacher cartItemsContent a article*/
    article.appendChild(cartItemsContent)
    /* recuperer la balise section avec l'id "#cart__items" et rattacher article*/
    document.querySelector("#cart__items").appendChild(article)
    article.classList.add("cart__item")
    /* appel aux fonctions pour afficher le total de la quantité et le total du prix*/
    afficherTotalPrice()
    afficherTotalQuantity()
}

/* afficher le total de la quantité des produits dans la page html*/
function afficherTotalQuantity() {
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    /* parcourir le tableau pour calculer les quantités total des produits*/
    cart.forEach((item) => {
        const totalQuantity = item.quantity
        total = total + totalQuantity
    })
    /* afficher le total de la quantité dans la page html*/
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
    /* afficher le total du prix dans la page html*/
    totalPrice.innerHTML = total
}

/* creer le contenu de la cart produit*/
function creerCartContent(item) {
    /* creer un div pour la description*/
    const cartItemsContent = document.createElement("div")
    /* ajouter la class cart__item__content dans cartItemsContent*/
    cartItemsContent.classList.add("cart__item__content")
    /* description et settings sont des functions qui seront rattacher a cartItemsContent*/
    const description = creerDescription(item)
    const settings = creerSettings(item)
    /* rattacher description et settings qui sont des function a cartItemsContent
    et retour cartItemsContent*/
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

/*supprimer la cart du produit dans la page html*/
function supprimerProduit(item) {
    /* trouver l'index du produit dans cart*/
    const indexProduitASupprimer = cart.findIndex(
        (product) => product.id === item._id && product.color === item.color)
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
    console.log(item);
    /* La key permet d'identifier le produit dans le localStorage : 
        id du produit "-" couleur produit */
    const key = item._id + "-" + item.color
    localStorage.removeItem(key)

}

/* supprimer le produit de la page html*/
function supprimerArticleDeLaPage(item) {
    /* trouver l'article a supprimer dans la page html*/
    const articleSupprimer = document.querySelector(
        'article[data-id="' + item._id + '"][data-color="' + item.color + '"]')
    articleSupprimer.remove()
}

/* fonction ajouter le parametre de quantité*/
function ajoutQuantityDansParam(settings, item) {
    /* creer un div pour la quantité*/
    const quantity = document.createElement("div")
    /* ajouter la class cart__item__content__settings__quantity dans quantity*/
    quantity.classList.add("cart__item__content__settings__quantity")
    /* creer un p pour afficher Qté : */
    const p = document.createElement("p")
    p.innerHTML = "Qté : "
    /* rattacher p a quantity*/
    quantity.appendChild(p)
    /* creer un input pour la quantité ou l'on ajoute la class itemQuantity*/
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

/*fonction pour mettre a jour la quantités lors du changement de quantité dans le champ*/
function misAJourAutoPriceEtQuantity(item, nouvelleQuantity) {
    item.quantity = parseInt(nouvelleQuantity)
    if (item.quantity < 1 || item.quantity > 100) {
        alert("La quantité doit être comprise entre 1 et 100")
        return
    }

    /*mettre a jour l'item dans le localStorage*/
    sauvegarderNouvelleQuantity(item)
    /*réafficher le total de la quantité et le total du prix mise à jour*/
    afficherTotalQuantity()
    afficherTotalPrice()
}

/* fonction pour sauvegarder la nouvelle donnees des produits dans le localstorage*/
function sauvegarderNouvelleQuantity(item) {
    /* sauvgarder les donnees dans le localStorage et les convertir en string chaine de caractere*/
    const donneesSauvegarder = JSON.stringify(item)
    const key = item._id + "-" + item.color
    console.log(localStorage.getItem(key));
    /* sauvegarder les données dans le localStorage */
    localStorage.setItem(key, donneesSauvegarder)
}

/* fonction pour creer la description name,color,price*/
function creerDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.innerHTML = item.name

    const p = document.createElement("p")
    p.innerHTML = item.color

    const p2 = document.createElement("p")
    p2.innerHTML = item.price + "€"
    /* rattacher h2,p,p2 a description*/
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    /* retourner la description*/
    return description
}

/* fonction pour creer l'article*/
function creerArticle(item) {
    const article = document.createElement("article")
    /* ajouter la class card__item dans article*/
    article.classList.add("card__item")
    /* rajouter les attributs html "data-id" et "data-color" pour pouvoir identifier 
    l'article avec l'id du produit et sa color dans le html lors de la suppression*/
    article.dataset.id = item._id
    article.dataset.color = item.color

    return article
}
/* fonction pour creer l'image*/
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
    effacerLesErreurs()
    /* il va envoyer les informations du formulaire avec la methode POST*/
    const body = recupererLesInfoDuFormulaire()
    /* la route pour envoyer les informations du formulaire avec id de commande*/
    fetch("http://localhost:3000/api/products/order", {
        /*il va envoyer au serveur les informations du formulaire avec la methode POST*/
        method: "POST",
        /* convertir le body en chaine de caractere 
        pour envoyer au serveur pour le traitement parce que
        le serveur ne peut pas traiter les objets*/
        body: JSON.stringify(body),
        /* il va definir le type de contenu et le type de contenu est application/json*/
        headers: { "Content-Type": "application/json" }
    })
        /* convertir en json pour pouvoir utiliser les donnees*/
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
    let estInvalide = false
    for (const input of inputs) {
        /*il va verifier si les inputs sont vide alors il va afficher l'alerte*/
        if (input.value.trim() === "") {
            input.nextElementSibling.innerHTML = "Veuillez remplir ce champ"
            estInvalide = true
        }
        /*il va verifier si l'inputs firstName et lastName ont des chiffres alors 
        il affichera l'erreur*/
        if (input.name === "firstName" || input.name === "lastName") {
            if (/[0-9]/.test(input.value)) {
                input.nextElementSibling.innerHTML = "Le champ ne dois pas contenir de chiffres"
                estInvalide = true
            }
        }
    }
    /* sinon tu me retourne false le formulaire est valide*/
    return estInvalide
}

function effacerLesErreurs() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    /*il va parcourir tous les inputs et effacer le contenu de la balise p*/
    for (const input of inputs) {
        /* si le type de l'input n'est pas submit */
        if (input.type !== "submit") {
            /* il va effacer le contenu de la balise p (l'erreur)*/
            input.nextElementSibling.innerHTML = ""
        }
    }
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
/* il va recuperer les informations du form et les mettre dans le body*/
function recupererLesInfoDuFormulaire() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value

    const body = {
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
    /* et il va retourner body car*/
    return body

}
/* il va recuperer les ids des produits dans le localstorage*/
function recupererLesIdsDuLocalStorage() {
    /* il va recuperer le nombre de produits dans le localstorage*/
    const nombreDeProduits = localStorage.length
    /* il va creer un tableau vide pour mettre les ids des produits*/
    const ids = []
    /* il va recuperer les ids des produits dans le localstorage 
    et supprimer le "-" et la color et renvoyer id du produit*/
    for (let i = 0; i < nombreDeProduits; i++) {
        const key = localStorage.key(i)
        const id = key.split('-')[0]
        /*il va envoyer les ids dans le tableau ids*/
        ids.push(id)
    }
    return ids

}
