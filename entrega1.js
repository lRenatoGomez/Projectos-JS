function saludo () {
    let nombreCliente = prompt ('Joyería REGO : cual es su nombre?' );
     alert(` bienvenido/a ${nombreCliente} ` )
 }
 
 
 const joyas = [`anillos`, `caravanas`, `cadenas`, `dijes`]
 
 function mostrarJoyas() {
    alert(`Mira en la consola nuestro listado de productos`);
    for (let i = 0; i < joyas.length; i++) { 
        console.log(`item ${i}`, joyas[i])
    }
}

function precios () {
    let joyas = prompt (`En que joya estas interesado/a? anillos-caravanas-cadenas-dijes`)

     if (joyas == "anillos") {alert ("los precios van desde los 100usd hasta 500usd")}
      
     else if (joyas == "caravanas") {alert ("los precios van desde 20usd hasta 200usd")}
  
      else if (joyas == "cadenas") {alert ("los precios van desde 50usd hasta 1000usd")}
  
      else if (joyas == "dijes") {alert ("los precios van desde 35usd hasta 700usd")}
  
      else {alert ("En este momento no contamos con ese producto")}
  
  }

  function asesoramiento () {

    let presupuesto = prompt ("¿Cual es tu presupuesto?")
    let dinero = parseFloat (presupuesto)
    

    if ( 40 <dinero && dinero <= 100 ) {alert ("Con este presupuesto te recomendamos nuestros productos de acero quirurgico")}
    else if (100< dinero && dinero <=180) {alert ("Con este presupuesto te recomendamos nuestros productos de plata")}
    else if ( 180 < dinero) {alert ("Con este presupuesto te recomendamos nuestros productos de Oro")}
    else if (dinero <=40) {alert ("Lo sentimos, tenemos nada para ofrecerte con este presupuesto")}
}

saludo()
menu ()

function menu () {
    let entrada 

    while (entrada != "ESC") {
       entrada = prompt (`Estas en el menu, a donde quieres ir? joyas-precios-asesoramiento`)
        switch (entrada) {
            case `joyas`: mostrarJoyas ();
            break;

            case `precios`: precios();
            break;

            case `asesoramiento`: asesoramiento();
            break;


        }

    }
}