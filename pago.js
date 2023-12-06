var carrito = Array();
var productos = [

    //LISTA DE LOS VIDEOS Y LISTA DE LAS CACIONES DE DATOS O LA DAYOOS DE
    {
        id: 1,
        nombre: "Pan",
        precio: 20,
        imagen: "https://i.pinimg.com/originals/35/43/4f/35434f60719bbc8fdae1b9173620307e.jpg"
    },
    {
        id: 2,
        nombre: "Ramen",
        precio: 40,
        imagen: "https://i.pinimg.com/originals/3f/85/0a/3f850ae6b84d1e4a6dfe8cdd800f96c7.jpg"
    },
    {
        id: 3,
        nombre: "Helado",
        precio: 14,
        imagen: "https://i.pinimg.com/originals/59/e6/f0/59e6f054f8d08536b87d694af409ae29.jpg"
    },
    {
        id: 4,
        nombre: "Onigiri",
        precio: 20,
        imagen: "https://i.pinimg.com/originals/e7/57/4e/e7574e779fcaa2154d3c29d369655f79.jpg"
    },
    {
        id: 5,
        nombre: "Dumplings",
        precio: 20,
        imagen: "https://i.pinimg.com/originals/8a/c0/f3/8ac0f37141c7e6d87c8154dd93c2564f.jpg"
    }
];


var lista= document.querySelector("#productos");
productos.forEach((producto,index)=>{
    var prod=document.createElement('div');
    prod.innerHTML=`
    <div class="card m-3" style="width: 18rem;">
         <div class="row">
             <div class="col-md-4">
                 <img src="${producto.imagen}" class="card-img-top" alt="...">
             </div>
             <div class="col-md-8">
             <div class="card-body">
                 <h5 class="card-title">${producto.nombre}</h5>
                 <p class="card-text">Precio: $ ${producto.precio}</p>
                 <button id="prod_${producto.id}" data-id="${producto.id}" class="btn btn-primary">Agregar</a>
             </div>
         </div>
     </div>
 </div>
  `;
  lista.appendChild(prod);
});

//agregar eventos
productos.forEach((elemento)=>{
    document.querySelector("#prod_"+elemento.id)
    .addEventListener('click',(nodo)=>{
        var id=elemento.id;
        console.log(id);
        carrito.push(id);
        mostrarCarro();
    });
});

function mostrarCarro(){
    var carro=document.querySelector("#carrito");
    carro.innerHTML="";
    carrito.forEach(p=>{
        var producto=document.createElement('div');
        productos.forEach(prod=>{
            if(prod.id==p){
                console.log(prod);
                producto.innerHTML=`
                <li class="list-group-item text-end">
                <p>${prod.nombre} $ ${prod.precio}
                      <a class=btn btn-danger" data-id=${prod.id} id="elim_${prod.id}">x</a>
                 </p>
             </li>
             `;
             carro.appendChild(producto);
            }
        });
    });
    botonBorrrar();
    sumarVenta();
}

function botonBorrrar(){
    carrito.forEach(id=>{
        document.querySelector("#elim_"+id)
        .addEventListener('click',()=>{
            var i=Number(document.querySelector("#elim_"+id)
            .getAttribute('data-id'));
            var aux=[];
            carrito.forEach(id=>{
                if(id!==i){
                    aux.push(id);
                }
            });
            carrito=aux;
            mostrarCarro();
        });
    });
}

function sumarVenta(){
    var suma=0;
    carrito.forEach(id=>{
        productos.forEach(prod=>{
         if(prod.id==id)
             suma+=prod.precio;
         });
    });
    console.log(suma);
    var total=document.querySelector("#total");
    total.innerText=`$${suma}`;
}

document.querySelector("#pagar").addEventListener('click',()=>{
    if(window.PaymentRequest){
        console.log('si funciona');

         const metodoPago=[
             {
                 supportedMethods:['https://google.com/pay'],
                 data:{
                     "apiVersion": 2,
                     "apiVersionMinor": 0,
                     "merchantInfo": {
                     "merchantName": "Example Merchant"
     },
                     "offerInfo": {
                     "offers": [
         {
                     "redemptionCode": "exampleCode",
                     "description": "example description of offer"
         }
    ]
  },
                     "allowedPaymentMethods": [
    {
                     "type": "CARD",
                     "parameters": {
                     "allowedAuthMethods": ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                     "allowedCardNetworks": ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
         },
                     "tokenizationSpecification": {
                     "type": "PAYMENT_GATEWAY",
                     "parameters": {
                     "gateway": "example",
                     "gatewayMerchantId": "exampleGatewayMerchantId"
             }
          }
     }
  ]/*,
  "transactionInfo": {
    "totalPriceStatus": "FINAL",
    "totalPrice": "12.34",
    "currencyCode": "USD"
  }*/
                }
             }
        ];
        var suma=0;
        carrito.forEach(id=>{
            productos.forEach(prod=>{
                if(prod.id==id)
                suma+=prod.precio;
            });
        });

        const detallePago={
            total:{
                label:'Total',
                amount:{
                    currency:'MXN',
                    value:suma
                }
            }
        };

        const peticionPago=new PaymentRequest(metodoPago,detallePago);
        peticionPago.show()
        .then(pago=>{
            console.log(pago);
        })
        .catch(error=>console.error(error));
    }else{
        console.log('Api no soportada');
    }
});