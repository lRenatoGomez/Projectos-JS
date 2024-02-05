const cartInfo = document.querySelector(".cart-product")
const rowProduct = document.querySelector(".row-product")

const productsList = document.querySelector(".container-products")



let allProducts = JSON.parse(localStorage.getItem("carrito")) || [];
const valorTotal = document.querySelector('.total')


productsList.addEventListener ('click', e =>{

    if(e.target.classList.contains('b-comprar')){
        const product = e.target.parentElement
        const infoProduct = {
            quantity: 1,
            Nombre: product.querySelector('.nombre').textContent,
            price: product.querySelector('.precio').textContent,

        };
        const stock = allProducts.some (product => product.Nombre === infoProduct.Nombre)
        if (stock) {
            const products = allProducts.map(product => {
                if (product.Nombre===infoProduct.Nombre){
                    product.quantity++;
                    return product
                }
                else {
                    return product
                }
            })
            allProducts = [...products]

        }

        else {
            allProducts = [...allProducts, infoProduct] 
        }
        
        showHTML ();
        guardaCarrito()
    }
    
});

rowProduct.addEventListener('click', (e) => {
    
    if(e.target.classList.contains('eliminar')){
        const product = e.target.parentElement
        const Nombre = product.querySelector('.nombre').textContent;
        
        allProducts = allProducts.filter( 
            product => product.Nombre !==Nombre
        )
        showHTML()
        guardaCarrito()
    }

})



const showHTML = () => {
    //limpiar carrito
    rowProduct.innerHTML = ``;

   

    let total= 0;
    let totalOfProducts= 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement ('div')
        containerProduct.classList.add ('cart-product')

        containerProduct.innerHTML =  
        `
            <div class="row col-12 info-cart-product ">
            <div class="col-3 cantidad">${product.quantity}</div>
            <div class="col-3 nombre">${product.Nombre}</div>
            <div class="col-3 precio">${product.price}</div>
            <div class="col-1 eliminar"><i class="bi bi-x-circle"></i></div>
            

        </div>
        `
        
        rowProduct.append(containerProduct);

        total = total + parseInt (product.quantity * product.price.slice(1));
        totalOfProducts= totalOfProducts + product.quantity;

    });


    valorTotal.innerText = `$${total}`;
  // cantidadProd.innerText = totalProductos
};

const guardaCarrito = () =>{ localStorage.setItem("carrito", JSON.stringify (allProducts))};

JSON.parse(localStorage.getItem("carrito"));
showHTML ();