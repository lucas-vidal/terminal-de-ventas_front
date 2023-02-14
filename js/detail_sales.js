
const API = 'http://localhost:3000';

function getVarsUrl(){
    var url= location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj={};
    for(var i=0; i<arrUrl.length; i++){
        var x= arrUrl[i].split("=");
        urlObj[x[0]]=x[1]
    }
    return urlObj;
}

function convertirStringDataTime(dataTime){
    let dateString = dataTime
    , reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
    , [, year, month, day, hours, minutes, seconds] = reggie.exec(dateString)
    , dateObject = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    return dateObject
}

function cargarVenta(){
    sumarProductos()
 
    cargarProductos()
       cargarCliente()

}

//CARGA DATOS DE VENTA
function cargarCliente(){
    var id_sale = parseInt(getVarsUrl().id);
    
    const cargarVenta = async () => {
        try {
            const respuesta = await fetch(API + '/id_sales/' + id_sale);
            const sale = await respuesta.json();
            const HTMLResponse = document.querySelector("#fecha_hora")
            HTMLResponse.insertAdjacentHTML("afterbegin", convertirStringDataTime(sale[0].data_time) );

            if(sale[0].dni_customer != 0){

                const respuesta = await fetch(API + '/customers/' + sale[0].dni_customer);
                const customer = await respuesta.json();

                const HTMLResponse1 = document.querySelector("#cliente")
                HTMLResponse1.insertAdjacentHTML("afterbegin", customer[0].surname + ', ' + customer[0].name);

                const HTMLResponse2 = document.querySelector("#dni")
                HTMLResponse2.insertAdjacentHTML("afterbegin", sale[0].dni_customer);
          
            }


        }
        catch (error) {
        console.log(error)
        }
    }
    cargarVenta()
}




//SUMA EL TOTAL DE LOS ITEMS 
function sumarProductos() {
    var id_sale = parseInt(getVarsUrl().id);
    var total = 0
    const cargarProductos = async () => {
        try {

            const respuesta1 = await fetch(API + '/sales/' + id_sale);
            const products = await respuesta1.json();

            const HTMLResponse = document.querySelector("#venta")

            products.map((product) => cargarProductos1(product))

            function cargarProductos1(product) {
                var price = product.price
                total = total + price;
                document.getElementById("total").innerHTML = "$ " + total + ",00";
            }

        } catch (error) {
            console.log(error)
        }
    }
    cargarProductos()

}

//CARGA LISTADO DE PRODUCTOS DE LA VENTA ACTUAL
function cargarProductos() {
    var id_sale = parseInt(getVarsUrl().id);

    const cargarProductos = async () => {
        try {

            const respuesta1 = await fetch(API + '/sales/' + id_sale);
            const products = await respuesta1.json();

            const HTMLResponse = document.querySelector("#venta")

            products.map((product) => cargarProductos1(product))

            function cargarProductos1(product) {

                var code = product.code
                var quantity = product.quantity
                var price = product.price

                const cargarProducto2 = async () => {
                    const respuesta2 = await fetch(API + '/products/' + code);
                    const product = await respuesta2.json();

                    var brand = product[0].brand
                    var description = product[0].description
                    var unit = product[0].unit

                    HTMLResponse.insertAdjacentHTML("afterbegin",
                        '<tr><td class="text-center">'
                        + code + '</td><td class="text-center">'
                        + brand + '</td><td class="text-left">'
                        + description + '</td><td class="text-center">'
                        + quantity + '</td><td class="text-center"> $ '
                        + price + ',0</td><td class="text-center">'
                        + unit + '</td><td class="text-center"> <button onclick="eliminarProducto('
                        + code + ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> </td></tr>');
                }
                cargarProducto2()
            }
        } catch (error) {
            console.log(error)
        }
    }
    cargarProductos()
}

//ELIMINAR PRODUCTO DEL LISTADO
function eliminarProducto(code) {
    var id_sale = parseInt(getVarsUrl().id);

    var option = confirm("Desea eliminar este producto de la venta?");
    if (option == true) {
        const eliminarProducto = async () => {
            try {
                const respuesta = await fetch(API + '/sales/' + id_sale + '/' + code, {
                    method: 'DELETE',
                    headers: { 'Content-type': 'application/json' }
                })
            } catch (error) {
                console.log(error)
            };
        }
        eliminarProducto();
        location.reload();
    }
}










