const container = document.querySelector('.container-products')
const anillosbutton = document.querySelector('.anillos')
const collaresbutton = document.querySelector('.collares') 
const pulserabutton = document.querySelector('.pulseras') 
const iniciobutton = document.querySelector('.inicio')
const cart = document.querySelector('.carrito')
const infoProduct = document.querySelector('.info')
const close = document.querySelector('.close')
const open = document.querySelector('.btt-carrito')
const cartContainer = document.querySelector('.cartList');
const total = document.querySelector('.total')
const cList = document.querySelector('.cList')
const endBuy = document.querySelector ('.finalizaCompra')


let allProducts = []
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



async function fetchProducts() {
  try {
    const resultado = await fetch('./base.json');
    const data = await resultado.json(); 
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

fetchProducts().then(data => {
  allProducts = data.products
  console.log('Datos obtenidos:', data.products);
  showHTML(allProducts);
  console.log('Datos obtenidos:', data.goldPrices);
}).catch(error => {
  console.error('Error al obtener los datos:', error);
});




function mostrarAlerta() {
  Swal.fire({
    title: 'Gracias por Elegirnos',
    text: 'Redireccionando a MercadoPago',
    icon: 'success',
    confirmButtonText: '¡Entendido!'
  }).then((result) => {
    if (result.isConfirmed) {
    
      window.location.href = 'https://www.mercadopago.com.uy/';
    }
  });
}

endBuy.addEventListener('click', () =>{
  
      mostrarAlerta()
})



//defino evento de click en comprar
const sumacarrito = (e, product) =>{
        
      const stock = carrito.find(item => item.title == product.title) 
      console.log(stock)
      console.log(product)
      if(stock) {
            product.quantity++;
            console.log("entre a la suma")
            
       }
       else{
        carrito.push(product)
       }
       saveCart()
       shoppingList()
       
   }


//eliminar items del carrito
const eliminaCarrito = (e, product) =>{
  if(e) {
    carrito = carrito.filter(item => item.title !== product.title)
  }
  saveCart()
 shoppingList()
} 

//muestra los productos
const showHTML = (products) => {
container.innerHTML= ''; // limpiar contenedor



products.forEach(product => {

    

    const containerProduct = document.createElement ('div')

    containerProduct.classList.add ('product')

    containerProduct.innerHTML = 
    `
    
    <div class="group">
      <div class=" h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
        <img src="${product.image}" alt="" class="h-full w-full object-center">
      </div>
      <h3 class=" text-sm text-gray-900">
        <a href="#">
          <span class="font-semibold text-gray-900 nombre">${product.title}</span>
        </a>
      </h3>
      <p class="text-base font-semibold text-gray-900"> U$S ${product.price}</p>
    </div>
    <button class="b-comprar">Comprar</button>

    

    `
    
    
    container.append(containerProduct)
    
    const comprar = containerProduct.querySelector('.b-comprar')
    comprar.addEventListener('click', (e)=>{

        sumacarrito(e,product)
    })
    
  })
    

  

}
showHTML(allProducts)







//filtros

anillosbutton.addEventListener ('click', () => {
  const filterProduct = allProducts.filter(producto => producto.id === "A")
   console.table(filterProduct)

   showHTML(filterProduct)

})

collaresbutton.addEventListener ('click', () => {
    const filterProduct = allProducts.filter(producto => producto.id === "C")
     console.table(filterProduct)

     showHTML(filterProduct)
  
  })

  pulserabutton.addEventListener ('click', () => {
    const filterProduct = allProducts.filter(producto => producto.id === "P")
     console.table(filterProduct)
  
     showHTML(filterProduct)
  
  })

  iniciobutton.addEventListener ('click', () => {
    const filterProduct = allProducts

     showHTML(allProducts)
    console.table(filterProduct)
  })

const closeCart = () => {

  cart.style.display = 'none'
}

const openCart = () => {
  cart.style.display = 'block'
  shoppingList()

}
closeCart()
open.addEventListener('click', openCart)
close.addEventListener('click', closeCart)


const shoppingList = () => {
cartContainer.innerHTML= ''
let totalOfProducts = 0;
let subTotal = 0;


carrito.forEach( product =>{
  const newItem= document.createElement('li')
  newItem.className= 'flex py-6 cList  overflow-y-auto'

 newItem.innerHTML = 
 `
 
 <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
   <img src="${product.image}" alt="" class="h-full w-full object-cover object-center">
 </div>

 <div class="ml-4 flex flex-1 flex-col">
   <div>
     <div class="flex justify-between text-base font-medium text-gray-900">
       <h3>
         <a href="#">${product.title}</a>
       </h3>
       <p class="ml-4">U$S ${product.price}</p>
     </div>
   </div>
   <div class="flex flex-1 items-end justify-between text-sm">
     <p class="text-gray-500">Qty ${product.quantity}</p>

     <div class="flex eliminar">
       <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500 ">Remove</button>
     </div>
   </div>
 </div>


 `
  cartContainer.appendChild(newItem)

  subTotal = subTotal + (product.quantity * product.price)
  totalOfProducts = totalOfProducts + product.quantity;

  const remove = newItem.querySelector('.eliminar')
  remove.addEventListener('click', (e)=>{
    eliminaCarrito(e, product);
  })
  
  saveCart()
})

total.innerText= `$${subTotal}`

}

const saveCart = () =>{
  localStorage.setItem("carrito", JSON.stringify(carrito))
}









