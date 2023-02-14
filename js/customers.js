
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



///////////////////////----CLIENTES----///////////////////////

//CARGA LISTADO DE CLIENTES
const cargarClientes = async () => {
    try {
        const respuesta = await fetch(API + '/customers');
        const customers = await respuesta.json();

        const HTMLResponse = document.querySelector("#clientes")
        customers[0].map((customer) => HTMLResponse.insertAdjacentHTML("afterbegin", '<tr><td class="text-center">'+ customer.dni +'</td><td class="text-center">'+ customer.name +'</td><td class="text-center">'+ customer.surname + '</td><td class="text-center"> <button onclick="modificarCliente(' + customer.dni + ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-primary"><i class="pe-7s-settings btn-icon-wrapper"> </i></button> </td><td class="text-center"> <button onclick="eliminarCliente(' + customer.dni + ')" class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> </td></tr>'));

    } catch (error) {
        console.log(error)
    }
}

//AGREGAR UN CLIENTES
function agregarCliente(){
    var dni = document.getElementById("dni").value
    var name = document.getElementById("name").value
    var surname = document.getElementById("surname").value
    const agregarCliente = async () => {
        try {

            const respuesta = await fetch(API + '/customers/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(

                    {
                        "dni": dni,
                        "name": name,
                        "surname": surname
                   }
                  )
                });

        } catch (error) {
            console.log(error)
        }
    }
    agregarCliente();
    location.reload();


}

//BOTON MODIFICAR EN LISTADO DE CLIENTES
function modificarCliente(dni){
    const cargarUnClienteEnInputs = async () => {
        try {
            const respuesta = await fetch(API + '/customers/' + dni, {
                    method: 'GET',
                    headers: new Headers({ 'Content-type': 'application/json'}),
                    mode: 'cors'
                });
            const customers = await respuesta.json();
    
            document.getElementById("dni").value = customers[0].dni
            document.getElementById("name").value = customers[0].name
            document.getElementById("surname").value = customers[0].surname

            document.getElementById("botonModificar").innerHTML = '<button onclick="actualizarCliente('+ dni +')" class="btn btn-primary" style="width: 100%; font-size: 110%;">Modificar</button>';
            
        } catch (error) {
            console.log(error)
        }
    }
    cargarUnClienteEnInputs();
}

//ACTUALIZA DATOS DE CLIENTES
function actualizarCliente(dni){
    var dni = document.getElementById("dni").value
    var name = document.getElementById("name").value
    var surname = document.getElementById("surname").value
    var option = confirm("Desea modificar este cliente?");
    if (option == true) {
    const actualizarCliente = async () => {
        try {
            const respuesta = await fetch(API + '/customers/' + dni, {
                    method: 'PUT',
                    headers: new Headers({ 'Content-type': 'application/json'}),
                    mode: 'cors',
                    body: JSON.stringify(
                    {
                        "dni": dni,
                        "name": name,
                        "surname": surname
                   }
                  )
                });
        } catch (error) {
            console.log(error)
        }
    }
    actualizarCliente();
    location.reload();

}
}
//BOTON ELIMINAR EN LISTADO DE CLIENTES
function eliminarCliente(dni){
    var option = confirm("Desea eliminar este cliente?");
    if (option == true) {
            const eliminarCliente = async () => {
        try {
            const respuesta = await fetch(API + '/customers/' + dni, {
                    method: 'DELETE',
                    headers: {'Content-type': 'application/json'}
                })
        } catch (error) {
            console.log(error)
        }
        ;
}
eliminarCliente();
location.reload();
	} 

}

