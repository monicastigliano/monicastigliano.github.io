/* ----------------------------------------------------------- */
/*                    VARIABLES GLOBALES                       */
/* ----------------------------------------------------------- */
let listaProductos = [
    {nombre: 'Carne', cantidad: 2, precio: 12.34},
    {nombre: 'Pan', cantidad: 3, precio: 34.56},
    {nombre: 'Fideos', cantidad: 4, precio: 56.78},
    {nombre: 'Leche', cantidad: 5, precio: 78.90}
]

let crearLista = true
let ul

/* ----------------------------------------------------------- */
/*                    FUNCIONES GLOBALES                       */
/* ----------------------------------------------------------- */
function borrarProducto(index){
    console.log('borrar Producto', index)
    listaProductos.splice(index, 1)
    renderLista()

}
function cambiarCantidad(index, el){
    //const cantidad = Number(el.value)
    const cantidad = parseInt(el.value)
    console.log('Cambiar Cantidad', index, cantidad)
    listaProductos[index].cantidad = cantidad
}

function cambiarPrecio(index, el){
    const precio = parseFloat(el.value)
    console.log('Cambiar Precio', index, precio)
    listaProductos[index].precio = precio
}


function configurarListener(){
    /* Ingreso del producto nuevo */
    document.getElementById('btn-entrada-producto').addEventListener('click', ()=>{
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value
        //console.log(producto)

        if(producto){
            listaProductos.push({nombre: producto, cantidad: 1, precio: 0})
            renderLista()
            input.value = null
        }
    })
    /* borrado total de productos */
    document.getElementById('btn-borrar-productos').addEventListener('click', ()=>{
        console.log('btn-borrar-productos')

        if (confirm('¿Desea borrar todos los productos?')){
            listaProductos = []
            renderLista()
        }
        

    })
}

function renderLista(){

    if(crearLista){
        //Product List
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100')
    }
    
    ul.innerHTML = ''

    listaProductos.forEach((productos, index) =>{
        //console.log(productos)
        ul.innerHTML += `
        <!-- Product -->
        <li class="mdl-list__item">
        <!-- icono -->
        <span class="mdl-list__item-primary-content w-10">
            <i class="material-icons mdl-list__item-icon">shopping_cart</i>
        </span>

        <!-- nombre del producto -->
        <span class="mdl-list__item-primary-content w-30">
            ${productos.nombre}
        </span>

        <!-- cantidad -->
        <span class="mdl-list__item-primary-content w-20">
            <!-- Textfield with Floating Label -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input onchange="cambiarCantidad(${index}, this)" value="${productos.cantidad}" class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                <label class="mdl-textfield__label" for="sample-cantidad-${index}">Cantidad</label>
            </div>
        </span>

        <!-- precio -->
        <span class="mdl-list__item-primary-content w-20 ml-item">
            <!-- Textfield with Floating Label -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input onchange="cambiarPrecio(${index}, this)" value="${productos.precio}" class="mdl-textfield__input" type="text" id="sample-precio-${index}">
                <label class="mdl-textfield__label" for="sample-precio-${index}">Precio</label>
            </div>
        </span>

        <!-- acción (borrar al producto) -->
        <span class="mdl-list__item-primary-content w-20 ml-item">
            <!-- Colored FAB button with ripple -->
            <button onclick="borrarProducto(${index})"
                class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">remove_shopping_cart</i>
            </button>
        </span>
    </li>

`
    })
    
    if(crearLista){
        document.getElementById('lista').appendChild(ul)
    }  else{
        componentHandler.upgradeElements(ul)
    }  

    
    crearLista = false
}

function registrarServiceWorker(){
    if('serviceWorker' in navigator){
        //estó se debe ejecutar cuando todo el documento web este cargado
        this.navigator.serviceWorker.register('./sw.js')
        .then(reg =>{
            console.log('El serviceWorker se registro correctamente ', reg)
        })
        .catch(err =>{
            console.log('Error al registrar el serviceWorker ', err)

        })
    } else{
        console.error('ServiceWorker no esta disponible en Navigator')
    }
}

function start(){
    console.warn('Super Lista')

    registrarServiceWorker()
    renderLista()
    configurarListener()
}



/* ----------------------------------------------------------- */
/*                          EJECUCIÓN                          */
/* ----------------------------------------------------------- */
//start()
window.onload = start