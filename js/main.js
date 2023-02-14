

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


























// var descripcion;

// var precio;

// function agregarItem(codigo, cantidad)
// {
// codigo = parseInt((document.getElementById('codigo')).value, 10);
// cantidad = parseInt((document.getElementById('cantidad')).value, 10);

// if (document.getElementById('codigo').value != "" && document.getElementById('cantidad') != "" ) {
//     const app = document.querySelector("#registro");
//     total = total + precio;
//     item = item + 1;

//     var deshacer = '<button onclick="eliminarItem(\'#registro' + item + '\')" class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button>';
 
//     app.insertAdjacentHTML("afterbegin", '<tr id="registro' + item + '"><td class="text-center">'+ item +'</td><td class="text-center">'+ codigo +'</td><td class="text-left">'+ descripcion +'</td><td class="text-center">'+ cantidad +'</td><td class="text-center">'+ precio +'</td><td class="text-center">' + deshacer + '</td></tr>');

//     limpiarInput('codigo');
//     limpiarInput('cantidad')

//     document.getElementById("total").innerHTML = "$ " + total ;

// } else {
    
//     window.alert("Complete los campos.");
// }

// };




// document.getElementById('codigo').addEventListener("change","three")


// if (codigo2 =! document.getElementById('codigo').value) {
//     buscarProducto();
    
// };





// function buscarProducto(){
//     window.alert("Se ejecuto ok.");
//     codigo2 = document.getElementById('codigo').value;
// };


// function limpiarInput(id){
//     document.getElementById(id).value = "";

// };

// function eliminarItem(id){
    
//     var app = document.querySelector(id);

//     app.isConnected;
//     app.remove();
//     app.isConnected;

//     total = total - precio;

//     document.getElementById("total").innerHTML = "$ " + total 
// }