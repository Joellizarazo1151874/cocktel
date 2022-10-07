// console.log('hello');
const defaultBox = document.getElementById('default-box');
const infoBox = document.getElementById('infoBox')
const car = document.getElementById('carrito')
const search = document.getElementById('searchField')
let cant = 0;
const contentBox = document.getElementById('contentBox')

function conAlcohol(){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.drinks))

    const showData = (dataBase) => {
        // console.log(data);
        let count = 0
        for (const data of dataBase) {
            // console.log(data); 
            const div = document.createElement('div');
            div.classList.add('col-lg-3');
            div.classList.add('col-md-4');
            div.classList.add('col-12');
            if(count < 18){
                count = count + 1;
                div.innerHTML = `
                <div class="card-shadow card bg-dark border-0 text-white mt-4">
                    <img src="${data.strDrinkThumb}" class="card-img img-fluid" alt="...">
                    <div class="card-img-overlay pt-5 text-center info">
                        <h5 style="color:white" class="card-title">${data.strDrink}</h5>
                        <a class="text-warning" style="cursor:pointer;" id="" value="aumento" onclick="carrito(this)" onclick="agregarDetalles(${data.idDrink})"><i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>
            `
            defaultBox.appendChild(div)
            }
        }
    }
}



function sinAlcohol(){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.drinks))

    const showData = (dataBase) => {
        // console.log(data);
        let count = 0
        for (const data of dataBase) {
            // console.log(data); 
            const div = document.createElement('div');
            div.classList.add('col-lg-3');
            div.classList.add('col-md-4');
            div.classList.add('col-12');
            if(count < 18){
                count = count + 1;
                div.innerHTML = `
                <div class="card-shadow card bg-dark border-0 text-white mt-4">
                    <img src="${data.strDrinkThumb}" class="card-img img-fluid" alt="...">
                    <div class="card-img-overlay pt-5 text-center info">
                        <h4 class="card-title">${data.strDrink}</h4>
                        <a class="text-warning" style="cursor:pointer;" id="" value="aumento" onclick="carrito(this)" onclick="agregarDetalles(${data.idDrink})"><i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>
            `
            defaultBox.appendChild(div)
            }
        }
    }
}
function carrito(){
cant++;
    document.getElementById("aumen").textContent = cant;
}

function agregarDetalles(producto){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${producto}`)
    .then(res => res.json())
    .then(data => cargarDetalles(data.drinks[0]))    
}


function cargarDetalles (producto){
    const coctel = {
        nombre : producto.strDrink,
        src : producto.strDrinkThumb,
        categoria : producto.strCategory,
        tipo : producto.strAlcoholic,
        ingrediente : [producto.strIngredient1,producto.strIngredient2,producto.strIngredient3,producto.strIngredient4,producto.strIngredient5],
        instruccion : producto.strInstructions
    }

    localStorage.setItem(idDrink, JSON.stringify(coctel));
}

function remove(){
    contentBox.classList.add('d-none')
}


function seeSearch(){
    defaultBox.innerHTML = ''
    const searchTag = search.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTag}`)
    .then(res=> res.json())
    .then(data => showData(data.drinks))
    search.value = ''
}