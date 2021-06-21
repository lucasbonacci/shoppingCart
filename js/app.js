const cart = document.querySelector("#cart")
const listGames = document.querySelector("#list-games")
const conteinerCart = document.querySelector("#list-cart tbody")
const emptyCartBtn = document.querySelector("#empty-cart")
let articlesCart = []

registerEventListeners()
function registerEventListeners(){
    listGames.addEventListener('click', addGame)
    cart.addEventListener('click', deleteGame)
    emptyCartBtn.addEventListener('click', emptyCart)

    document.addEventListener('DOMContentLoaded', () => {
        articlesCart = JSON.parse(localStorage.getItem('carrito')) || []

        cartHtml()
    })
}



function addGame(e){
    e.preventDefault()
    if(e.target.classList.contains("add-cart")){
        const gameSelected = e.target.parentElement.parentElement
        readGamesData(gameSelected)
    }
    
}

function deleteGame(e){
    if (e.target.classList.contains('delete-game')){
        const gameId = e.target.getAttribute('data-id')

        // delete articles for the array
        articlesCart = articlesCart.filter( (gameSelected) => gameSelected.id !== gameId)

        cartHtml()
    }
}

function emptyCart(){
    articlesCart = []
    cartHtml()
}



// read html content

function readGamesData(gameSelected){

    const gameInfo = {
        image: gameSelected.querySelector('img').src,
        titulo: gameSelected.querySelector('h4').textContent,
        price: gameSelected.querySelector('.price span').textContent,
        id: gameSelected.querySelector('a').getAttribute('data-id'),
        quantity: 1
    }
    // check if the game exists in the cart
    const exists = articlesCart.some( gameSelected => gameSelected.id === gameInfo.id )
        if(exists){
            const gameSelecteds = articlesCart.map((gameSelected) =>{
                if (gameSelected.id === gameInfo.id) {
                    gameSelected.quantity++
                    return gameSelected
                } else {
                    return gameSelected
                }
            })
            articlesCart= [...gameSelecteds]
        } else{
            articlesCart= [...articlesCart, gameInfo]
        }
    cartHtml()

}


// show cart in the html.

function cartHtml(){
    // clean html
    cleanHtml()
    // loop through the array
    articlesCart.forEach(gameInfo =>{ 
        const row = document.createElement('tr')
        row.innerHTML = `
            <th>  <img src = "${gameInfo.image}" width="100" <th>
            <th> ${gameInfo.titulo}
            <th> ${gameInfo.price} 
            <th> ${gameInfo.quantity}
            <th> <a href="#" class="delete-game" data-id="${gameInfo.id}"> X </a> <th>
    `;

    conteinerCart.appendChild(row)
    })
    // add cart localstorage
    syncupStorage()
}


function syncupStorage(){
    localStorage.setItem('carrito', JSON.stringify(articlesCart)) 
}



// removes the games of tbody
function cleanHtml(){
    conteinerCart.innerHTML = ""
}

