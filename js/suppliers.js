
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



///////////////////////----PROVEEDORES----///////////////////////

//CARGA LISTADO DE PROVEEDORES
const cargarProveedores = async () => {
    try {
        const respuesta = await fetch(API + '/suppliers');
        const suppliers = await respuesta.json();

        const HTMLResponse = document.querySelector("#proveedores")
        suppliers[0].map((supplier) => HTMLResponse.insertAdjacentHTML("afterbegin", '<tr><td class="text-center">'+ supplier.supplier +'</td><td class="text-center">'+ supplier.address +'</td><td class="text-center">'+ supplier.city +'</td><td class="text-center">'+ supplier.phone + '</td><td class="text-center"> <button onclick="modificarProveedor(' + supplier.id + ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-primary"><i class="pe-7s-settings btn-icon-wrapper"> </i></button> </td><td class="text-center"> <button onclick="eliminarProveedor(' + supplier.id + ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> </td></tr>'));

    } catch (error) {
        console.log(error)
    }
}

//AGREGAR UN PROVEEDOR
function agregarProveedor(){
    var supplier = document.getElementById("supplier").value
    var address = document.getElementById("address").value
    var city = document.getElementById("city").value
    var phone = document.getElementById("phone").value
    const agregarProveedor = async () => {
        try {

            console.log("ante agregar")
            const respuesta = await fetch(API + '/suppliers/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(

                    {
                        "supplier": supplier,
                        "address": address,
                        "city": city,
                        "phone": phone
                   }
                  )
                });
        } catch (error) {
            console.log(error)
        }
    }
    agregarProveedor();
    location.reload();


}

//BOTON MODIFICAR EN LISTADO DE PROVEEDORES
function modificarProveedor(id){
    const cargarUnProveedorEnInputs = async () => {
        try {
            const respuesta = await fetch(API + '/suppliers/' + id, {
                    method: 'GET',
                    headers: new Headers({ 'Content-type': 'application/json'}),
                    mode: 'cors'
                });
            const suppliers = await respuesta.json();
    
             const tpl = suppliers.map((supplier) => supplier.address);

            document.getElementById("supplier").value = suppliers[0].supplier
            document.getElementById("address").value = suppliers[0].address
            document.getElementById("city").value = suppliers[0].city
            document.getElementById("phone").value = suppliers[0].phone

            document.getElementById("botonModificar").innerHTML = '<button onclick="actualizarProveedor('+ id +')" class="btn btn-primary" style="width: 100%; font-size: 110%;">Modificar</button>';
            
        } catch (error) {
            console.log(error)
        }
    }
    cargarUnProveedorEnInputs();
}

//ACTUALIZA DATOS DE PROVEEDOR
function actualizarProveedor(id){
    var supplier = document.getElementById("supplier").value
    var address = document.getElementById("address").value
    var city = document.getElementById("city").value
    var phone = document.getElementById("phone").value
    var option = confirm("Desea modificar este proveedor?");
    if (option == true) {
    const actualizarProveedor = async () => {
        try {
            const respuesta = await fetch(API + '/suppliers/' + id, {
                    method: 'PUT',
                    headers: new Headers({ 'Content-type': 'application/json'}),
                    mode: 'cors',
                    body: JSON.stringify(
                    {
                        "supplier": supplier,
                        "address": address,
                        "city": city,
                        "phone": phone
                   }
                  )
                });
                // document.getElementById("supplier").value = ""
                // document.getElementById("address").value = ""
                // document.getElementById("city").value = ""
                // document.getElementById("phone").value = ""

        } catch (error) {
            console.log(error)
        }
    }
    actualizarProveedor();
    location.reload();

}
}
//BOTON ELIMINAR EN LISTADO DE PROVEEDORES
function eliminarProveedor(id){
    var option = confirm("Desea eliminar este proveedor?");
    if (option == true) {
            const eliminarPorveedor = async () => {
        try {
            const respuesta = await fetch(API + '/suppliers/' + id, {
                    method: 'DELETE',
                    headers: {'Content-type': 'application/json'}
                })
        } catch (error) {
            console.log(error)
        }
        ;
}
eliminarPorveedor();
location.reload();
	} 

}
