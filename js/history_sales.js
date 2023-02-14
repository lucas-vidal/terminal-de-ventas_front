
const API = 'http://localhost:3000';

function convertirStringDataTime(dataTime){
    let dateString = dataTime
    , reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
    , [, year, month, day, hours, minutes, seconds] = reggie.exec(dateString)
    , dateObject = day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
    return dateObject
}


//CARGA LISTADO DE PRODUCTOS EN LA VENTA
function cargarVentas(){
    const cargarVentas = async () => {
        try {
            const respuesta = await fetch(API + '/id_sales');
            const sales = await respuesta.json();
    
            const HTMLResponse = document.querySelector("#historial_venta")

            sales[0].map((sale) =>  { mapearVentas(sale) });
            
            function mapearVentas(sale) {
                var name = ""
                var surname = ""
                var total = 0
                var items = 0
                var price
                if(sale.data_time != null){
                    const consultaCliente = async () => {
                        if(sale.dni_customer != 0){
                            const respuesta = await fetch(API + '/customers/' + sale.dni_customer);
                            const customer = await respuesta.json();
                            name = customer[0].name
                            surname = customer[0].surname
                        }

                        const respuesta = await fetch(API + '/sales/count/' + sale.id_sale, {
                            method: 'POST',
                            headers: new Headers({ 'Content-type': 'application/json' }),
                            mode: 'cors'
                        });
                        const counts = await respuesta.json();
                        const count = []
                        for (const [key, value] of Object.entries(counts[0][0])) {
                            count.push(`${key}`, value);
                            }
                        items = count[1]

                        const respuesta1 = await fetch(API + '/sales/' + sale.id_sale);
                        const products = await respuesta1.json();
                        
                        products.map((product) => mapearProductos(product))
                            
                        function mapearProductos(product) {
                            var price = product.price
                            total = total + price;
                        }
                            
                        HTMLResponse.insertAdjacentHTML(
                            "afterbegin",'<tr><td class="text-center">'
                            + sale.id_sale +'</td><td class="text-center">'
                            + convertirStringDataTime(sale.data_time) + '</td><td class="text-center">'
                            + name + ' ' + surname + '</td><td class="text-center">'
                            + items + '</td><td class="text-center"> $ '
                            + total +'</td><td class="text-center"> <a href="detalle_venta.html?id=' 
                            + sale.id_sale + '" class="mr-2 btn-icon btn-icon-only btn btn-primary">Ver más</a></td><td class="text-center"> <button onclick="elimianarVenta('
                            + sale.id_sale + ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button></td></tr>');
                    }
                    consultaCliente()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    cargarVentas()
}


//ELIMINAR VENTA Y SUS PRODUCTOS
function elimianarVenta(id_sale){

    var id_sale
    var option = confirm("Desea eliminar esta venta?");
    if (option == true) {
        const eliminarProductosDeVenta = async () => {
        try {
            const respuesta = await fetch(API + '/sales/' + id_sale, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'}
                })
                const eliminarVenta = async () => {
                    try {
                        const respuesta = await fetch(API + '/id_sales/' + id_sale, {
                            method: 'DELETE',
                            headers: {'Content-type': 'application/json'}
                            })
                            } catch (error) {
                                console.log(error)
                                };
                            }
                        eliminarVenta();
                    location.reload();
            } catch (error) {
            console.log(error)
            };
        }
        eliminarProductosDeVenta();
    }
}
