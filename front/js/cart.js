const cart = []

recupererItems()
cart.forEach((items) => afficherItem(items))

/* recuperer items(elements du produit) et les afficher en objet dans la variable "cart"*/
function recupererItems() {
    const nombresItems = localStorage.length
    for (let i = 0; i < nombresItems; i++) {
        const items = localStorage.getItem(localStorage.key(i))
        const itemsObject = JSON.parse(items)
        cart.push(itemsObject)
    }
}

function afficherItem(items) {
    const article = creerArticle(items)
    const imageDiv = creerImageDiv(items)
    article.appendChild(imageDiv)
    const cartItemsContent = creerCartContent(items)
    article.appendChild(cartItemsContent)
    afficherArticle(article)
    afficherTotalPrice()
    afficherTotalQuantity()

}
function afficherTotalQuantity() {
    let total = 0
    const totalQuantity = document.querySelector("#totalQuantity")
    cart.forEach((items) => {
        const totalQuantity =+ items.quantity
        total = total + totalQuantity
    })
    totalQuantity.innerHTML = total

}
function afficherTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach((items) => {
        const totalPrice = items.price * items.quantity
        total = total + totalPrice
    })
    totalPrice.innerHTML = total
}
function creerCartContent(items) {
    const cartItemsContent = document.createElement("div")
    cartItemsContent.classList.add("cart__item__content")

    const description = creerDescription(items)
    const settings = creerSettings(items)

    cartItemsContent.appendChild(description)
    cartItemsContent.appendChild(settings)
    return cartItemsContent
}
function creerSettings(items) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    ajoutQuantityDansParam(settings, items)
    ajoutDeleteSettings(settings,items)
    return settings
}
function ajoutDeleteSettings(settings, items) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => supprimerProduit(items))
    const p = document.createElement("p")
    p.innerHTML = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}
function supprimerProduit(items) {
    const produitSuprimer = cart.findIndex(
        (product) => product.id === items.id && product.color === items.color)
    cart.splice(produitSuprimer, 1)
    afficherTotalQuantity() 
    afficherTotalPrice()
    supprimerProduitDuPanier(items)
    supprimerArticleDeLaPage(items)
    
    
}
function supprimerProduitDuPanier(items) {
    const key = `${items.id}-${items.colors}`
    console.log("retire cette key", key)
    localStorage.removeItem(key)

}
function supprimerArticleDeLaPage(items) {
    const articleSupprimer = document.querySelector(
        `article[data-id="${items.id}"][data-color="${items.color}"]`)
    articleSupprimer.remove()

}

function ajoutQuantityDansParam(settings, items) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.innerHTML = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = "item.quantity"
    input.addEventListener("input",() => misAJourAutoPriceEtQuantity(items.id, input.value, items))
    quantity.appendChild(input)
    settings.appendChild(quantity)

}
function misAJourAutoPriceEtQuantity(id, nouvelleQuantity, items) {
    const misAJourItems = cart.find((items) => items.id === id)
    misAJourItems.quantity = nouvelleQuantity
    items.quantity = misAJourItems.quantity
    afficherTotalQuantity() 
    afficherTotalPrice()
    sauvegarderNouvelleQuantity(items)
}

function sauvegarderNouvelleQuantity(items) {
    const donneesSauvegarder = JSON.stringify(items)
    const key = `${items.id}-${items.colors}`
    localStorage.setItem(key, donneesSauvegarder) 
}

function creerDescription(items) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.innerHTML = items.name

    const p = document.createElement("p")
    p.innerHTML = items.colors

    const p2 = document.createElement("p")
    p2.innerHTML = items.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function afficherArticle(article) {
    document.querySelector("#cart__items").appendChild(article)

}

function creerArticle(items) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    /* rajouter l'element html "data-id" pour recuperer l'id du produit 
    et data-color pour recuperer la couleur du produit depuis le localstorage*/
    article.dataset.id = items.id
    article.dataset.color = items.color
    return article
}
function creerImageDiv(items) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = items.imageUrl
    image.alt = items.altTxt
    div.appendChild(image)
    return div

}