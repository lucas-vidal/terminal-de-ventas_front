
const API = 'http://localhost:3000';


//BORRA EL CONTENIDO DE LOS INPUTS
function limpiarInputs(in1, in2, in3, in4, in5, in6, in7) {
    document.getElementById(in1).value = ""
    document.getElementById(in2).value = ""
    document.getElementById(in3).value = ""
    document.getElementById(in4).value = ""
    document.getElementById(in5).value = ""
    document.getElementById(in6).value = ""
    document.getElementById(in7).value = ""
}


///////////////////////----PRODUCTOS----///////////////////////

//CARGA LISTADO DE PRODUCTOS
const cargarProductos = async () => {
    try {
        const respuesta = await fetch(API + '/products');
        const products = await respuesta.json();

        const HTMLResponse = document.querySelector("#productos")

        products[0].map((product) => HTMLResponse.insertAdjacentHTML(
            "afterbegin",'<tr><td class="text-center">'+ product.code +'</td><td class="text-center">'
            + product.brand +'</td><td class="text-left">'+ product.description + '</td><td class="text-center">$'
            + product.price + '</td><td class="text-center">'+ product.quantity +'</td><td class="text-center">'
            + product.unit +'</td><td class="text-center"> <button onclick="modificarProducto(' + product.code + 
            ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-primary"><i class="pe-7s-settings btn-icon-wrapper"> </i></button> </td><td class="text-center"> <button onclick="eliminarProducto('
             + product.code + ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> </td></tr>'));

    } catch (error) {
        console.log(error)
    }
}

//AGREGAR UN PRODUCTO
function agregarProducto(){
    var code = document.getElementById("code").value
    var brand = document.getElementById("brand").value
    var price = document.getElementById("price").value
    var quantity = document.getElementById("quantity").value
    var unit = document.getElementById("unit").value
    var description = document.getElementById("description").value
    const agregarProducto = async () => {
        try {
            const respuesta = await fetch(API + '/products/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(

                    {
                        "code": code,
                        "brand": brand,
                        "description": description,
                        "price": price,
                        "quantity": quantity,
                        "unit": unit
                        
                   }
                  )
                });

        } catch (error) {
            console.log(error)
        }
    }
    agregarProducto();
    location.reload();
}

//BOTON MODIFICAR EN LISTADO DE PRODUCTOS
function modificarProducto(code){
    const cargarUnProductoEnInputs = async () => {
        try {
            const respuesta = await fetch(API + '/products/' + code, {
                    method: 'GET',
                    headers: new Headers({ 'Content-type': 'application/json'}),
                    mode: 'cors'
                });
            const products = await respuesta.json();
    
            document.getElementById("code").value = products[0].code
            document.getElementById("price").value = products[0].price
            document.getElementById("quantity").value = products[0].quantity
            document.getElementById("unit").value = products[0].unit
            document.getElementById("brand").value = products[0].brand
            document.getElementById("description").value = products[0].description

            document.getElementById("botonModificar").innerHTML = '<button onclick="actualizarProducto('+ code +')" class="btn btn-primary" style="width: 100%; font-size: 110%;">Modificar</button>';
            
        } catch (error) {
            console.log(error)
        }
    }
    cargarUnProductoEnInputs();
}

//ACTUALIZA DATOS DE PRODUCTOS
function actualizarProducto(code){
    var code = document.getElementById("code").value
    var brand = document.getElementById("brand").value
    var price = document.getElementById("price").value
    var quantity = document.getElementById("quantity").value
    var unit = document.getElementById("unit").value
    var description = document.getElementById("description").value
    var option = confirm("Desea modificar este producto?");
    if (option == true) {
    const actualizarProducto = async () => {
        try {
            const respuesta = await fetch(API + '/products/' + code, {
                    method: 'PUT',
                    headers: new Headers({ 'Content-type': 'application/json'}),
                    mode: 'cors',
                    body: JSON.stringify(
                    {
                        "brand": brand,
                        "description": description,
                        "price": price,
                        "quantity": quantity,
                        "unit": unit
                   }
                  )
                });
        } catch (error) {
            console.log(error)
        }
    }
    actualizarProducto();
    location.reload();

}
}
//BOTON ELIMINAR EN LISTADO DE PRDUCTOS
function eliminarProducto(code){
    var option = confirm("Desea eliminar este producto?");
    if (option == true) {
            const eliminarProducto = async () => {
        try {
            const respuesta = await fetch(API + '/products/' + code, {
                    method: 'DELETE',
                    headers: {'Content-type': 'application/json'}
                })
        } catch (error) {
            console.log(error)
        }
        ;
}
eliminarProducto();
location.reload();
	} 

}



