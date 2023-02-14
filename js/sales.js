
const API = 'http://localhost:3000';

var id_sale

//ID ACTUAL
function idActual() {

    const idActual = async () => {
        try {
            const respuesta = await fetch(API + '/id_sales/id');
            const id = await respuesta.json();
            const ids = []

            for (const [key, value] of Object.entries(id[0][0])) {
                ids.push(`${key}`, value);
            }

            id_sale = ids[1]
            cargarProductos(id_sale);
            sumarProductos(id_sale);
            botonesCancelarFinalizar(id_sale)
        } catch (error) {
            console.log(error)
        }
    }
    idActual();
    document.querySelector("#code").select()

}

//CARGA LOS BOTONES DE FINALIZAR Y CANCELAR
function botonesCancelarFinalizar(id_sale) {
    var countProd

    const cantProd = async () => {
        try {

            const respuesta = await fetch(API + '/sales/count/' + id_sale, {
                method: 'POST',
                headers: new Headers({ 'Content-type': 'application/json' }),
                mode: 'cors'
            });
            const counts = await respuesta.json();
            const count = []

            for (const [key, value] of Object.entries(counts[0][0])) {
                count.push(`${key}`, value);
            }

            countProd = count[1]

            if (countProd != 0) {
                const HTMLResponse = document.querySelector("#footer")
                HTMLResponse.insertAdjacentHTML("afterbegin",
                    '<div class="row"><div class="col-md-3 mb-3  input-group"><select name="select" class="form-control" id="dni_customer" placeholder="Cliente" value="" required><option></option></select></div><div class="text-rigth "><button onclick="cancelarVenta()" class="btn-wide btn btn-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i> CANCELAR</button><button onclick="finalizaVenta()" class="btn-wide btn btn-success"><i class="pe-7s-check btn-icon-wrapper"> </i>  FINALIZAR</button></div></div>');
                cargarClientesEnInput()
                //  <div class="row"><div class="col-md-3 mb-3  input-group"><select name="select" class="form-control" id="dni_customer" placeholder="Cliente" value="" required><option></option></select></div><div class="text-rigth "><button onclick="cancelarVenta()" class="btn-wide btn btn-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i> CANCELAR</button><button onclick="finalizaVenta()" class="btn-wide btn btn-success"><i class="pe-7s-check btn-icon-wrapper"> </i>  FINALIZAR</button></div></div>
            }
        } catch (error) {
            console.log(error)
        }
    }
    cantProd();


}

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

//DETECTAR EL PRODUCTO POR EL CODIGO E INGRESARLO EN LOS INPUTS
const code = document.querySelector('#code')
code.addEventListener("change", () => {
    detectarProducto();
})

function detectarProducto() {
    var code = document.getElementById("code").value
    document.getElementById("quantity").value = ""
    document.getElementById("price").value = ""
    document.getElementById("unit").value = ""
    document.getElementById("brand").value = ""
    document.getElementById("description").value = ""

    const cargarUnProductoEnInputs = async () => {
        try {
            const respuesta = await fetch(API + '/products/' + code, {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json' }),
                mode: 'cors'
            });
            const products = await respuesta.json();

            document.getElementById("quantity").value = 1
            document.getElementById("price").value = products[0].price
            document.getElementById("unit").value = products[0].unit
            document.getElementById("brand").value = products[0].brand
            document.getElementById("description").value = products[0].description

        } catch (error) {
            console.log(error)
        }
    }
    cargarUnProductoEnInputs();
}

//MULTIPLICA LA CANTIDAD POR EL PRECIO Y MUESTRA EN INPUT CADA VEZ QUE CAMBIA LA CANTIDAD
const quantity = document.querySelector('#quantity')
quantity.addEventListener("change", () => {
    sumarPrecioEnProducto();
})

function sumarPrecioEnProducto() {
    var price
    var code = document.getElementById("code").value
    const consultarPrecioProducto = async () => {
        try {
            const respuesta = await fetch(API + '/products/' + code, {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json' }),
                mode: 'cors'
            });
            const products = await respuesta.json();

            price = products[0].price
            var quantity = parseInt(document.getElementById("quantity").value, 10);
            var total = price * quantity
            document.getElementById("price").value = total

        } catch (error) {
            console.log(error)
        }
    }
    consultarPrecioProducto();
}

//AGREGAR UN PRODUCTO A LA VENTA
function agregarProductoVenta() {
    var code = document.getElementById("code").value
    var price = document.getElementById("price").value
    var quantity = document.getElementById("quantity").value
    var unit = document.getElementById("unit").value
    var description = document.getElementById("description").value

    if (price == "" && unit == "" && description == "") {

        return window.alert("El producto no existe en la base de datos.")
    }

    const stockDeProducto = async () => {
        try {
            const respuesta = await fetch(API + '/products/' + code, {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json' }),
                mode: 'cors'
            });
            const products = await respuesta.json();
            var quantity_stk = products[0].quantity

            if(quantity_stk < quantity){
                return window.alert("El producto " + code + " no llega a la cantidad de " + quantity + ". Stock: " + quantity_stk)
            }
            if(quantity_stk <= 0){
                return window.alert("El producto no tiene stock. Stock: " + quantity_stk)
            }

            const agregarProductoVenta = async () => {
                try {
                    const respuesta = await fetch(API + '/sales/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
        
                            {
                                "code": code,
                                "price": price,
                                "quantity": quantity
                            }
                        )
                    });
                } catch (error) {
                    console.log(error)
                }
            }
            agregarProductoVenta();
            location.reload();

        } catch (error) {
            console.log(error)
        }
    }
    stockDeProducto();
}


//CARGA LISTADO DE PRODUCTOS DE LA VENTA ACTUAL
function cargarProductos(id_sale) {
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

//BOTON ELIMINAR ITEM EN LISTADO DE PRDUCTOS
function eliminarProducto(code) {
    var id_sale
    const idActual = async () => {
        try {
            const respuesta = await fetch(API + '/id_sales/id');
            const id = await respuesta.json();
            const ids = []

            for (const [key, value] of Object.entries(id[0][0])) {
                ids.push(`${key}`, value);
            }

            id_sale = ids[1]

            var option = confirm("Desea eliminar este producto?");
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
        } catch (error) {
            console.log(error)
        }
    }
    idActual();
}

//BOTON CANCELAR VENTA
function cancelarVenta() {

    var id_sale
    const idActual = async () => {
        try {
            const respuesta = await fetch(API + '/id_sales/id');
            const id = await respuesta.json();
            const ids = []

            for (const [key, value] of Object.entries(id[0][0])) {
                ids.push(`${key}`, value);
            }

            id_sale = ids[1]

            var option = confirm("Desea cancelar esta venta?");
            if (option == true) {
                const eliminarProductosDeVenta = async () => {
                    try {
                        console.log(id_sale)
                        const respuesta = await fetch(API + '/sales/' + id_sale, {
                            method: 'DELETE',
                            headers: { 'Content-type': 'application/json' }
                        })


                    } catch (error) {
                        console.log(error)
                    };
                }
                eliminarProductosDeVenta();
                location.reload();
            }
        } catch (error) {
            console.log(error)
        };

    }
    idActual();

}

//SUMA EL TOTAL DE LOS ITEMS 
function sumarProductos(id_sale) {
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


//CARGA LOS CLIENTE EN INPUT
function cargarClientesEnInput() {

    const cargarClientes = async () => {
        try {
            const respuesta = await fetch(API + '/customers');
            const customers = await respuesta.json();

            const HTMLResponse = document.querySelector("#dni_customer")
            customers[0].map((customer) => HTMLResponse.insertAdjacentHTML("afterbegin", '<option>' + customer.dni + '</option>'));
            // HTMLResponse.insertAdjacentHTML("afterbegin", '<option>' + customer.dni + ' - ' + customer.surname + ' ' + customer.name + '</option>')

        } catch (error) {
            console.log(error)
        }
    }
    cargarClientes()
}

//FINALIZA LA VENTA
function finalizaVenta() {
    var id_sale = 0
    function reload()
    {
        location.reload();
        // console.log(123)
    }

    const idActual = async () => {
        try {
            const respuesta = await fetch(API + '/id_sales/id');
            const id = await respuesta.json();
            const ids = []

            for (const [key, value] of Object.entries(id[0][0])) {
                ids.push(`${key}`, value);
            }
            id_sale = ids[1]
            var option = confirm("Finalizar la compra?");
            if (option == true) {
                const finalizaVenta = async () => {
                    try {
                        restarCantidades(id_sale)
                        function restarCantidades() {
                            const restarCantidades = async () => {
                                try {
                        
                                    const respuesta = await fetch(API + '/sales/' + id_sale);
                                    const products = await respuesta.json();
                            
                                    products.forEach(product => { mapearProductos(product)});
                        
                                    function mapearProductos(product) {
                        
                                        var code = product.code
                                        var quantity = product.quantity
                        
                                        const restarCantidadDeProducto = async () => {
                                            const respuesta2 = await fetch(API + '/products/' + code);
                                            const product = await respuesta2.json();
                        
                                            var quantity1 = product[0].quantity
                        
                                                    const respuesta1 = await fetch(API + '/products/quantity/' + code, {
                                                            method: 'PUT',
                                                            headers: new Headers({ 'Content-type': 'application/json'}),
                                                            mode: 'cors',
                                                            body: JSON.stringify(
                                                            {
                                                                "quantity": quantity1 - quantity
                                                        })
                                                        },
                                                        );

                                        }
                                        restarCantidadDeProducto()
                                    }
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            restarCantidades()
                        }

                        var dni_customer = document.getElementById("dni_customer").value

                        const respuesta = await fetch(API + '/id_sales/' + id_sale, {
                            method: 'PUT',
                            headers: new Headers({ 'Content-type': 'application/json' }),
                            mode: 'cors',
                            body: JSON.stringify(

                                {
                                    "dni_customer": dni_customer
                                })
                        });
                        const crearNuevoId = async () => {
                            try {
                                const respuesta = await fetch(API + '/id_sales/', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(

                                        {
                                            "dni_customer": ""
                                        }
                                    )
                                },
                                setTimeout(reload, 500)
                                );
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        crearNuevoId();
                    } catch (error) {
                        console.log(error)
                    }
                }
                finalizaVenta();
            }
        } catch (error) {
            console.log(error)
        }
    }
    idActual();
}

