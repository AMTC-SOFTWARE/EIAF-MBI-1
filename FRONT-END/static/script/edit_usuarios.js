console.log(dominio);
var id;
var flagusuario = true;
var flagpass = true;
var alertaadd = document.getElementById('alertaadd');
var activo;
// console.log("esta es la sessionstorage: ", sessionStorage.getItem('gafet'));

function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}

function cargartabla(){
  switch(sessionStorage.getItem('tipo')){
    case "CALIDAD":
    cargarcalidad();    
    break;
    case "MANTENIMIENTO":
    cargarmtto();
    break;
    case "OPERADOR":
    break;
    case "PRODUCCION":
    cargarproduccion();
    break;
    case "INGENIERIA":
    cargaringenieria();
    break;
    case "AMTC":
    cargarsuperusuario();
    break;
    default:
    console.log(sessionStorage.getItem('tipo'));
  }
}

function cargarcalidad(){
  cleardiv();
  fetch(dominio+"/api/get/usuarios/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    var colnames = Object.keys(data);
    // console.log("Columnas: ", colnames);
    colnames.splice(colnames.indexOf("GAFET"),1);
    // console.log("Colnames Final: ",colnames);
    var filas = data[colnames[1]].length;
    console.log("Num de Registros:",filas);
    // console.log(data.TIPO)

    //CREACIÓN DE TABLA
    var myTableDiv = document.getElementById("tabla");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    var Encabezados = document.createElement('THEAD');

    table.id = "myTable";
    table.classList.add('display');
    table.border = '2';
    table.appendChild(Encabezados);
    table.appendChild(tableBody);
    tableBody.align="center";
    //FIN DE CREACIÓN DE TABLA

    //ENCABEZADOS DE LA TABLA
    var tr = document.createElement('TR');
    Encabezados.appendChild(tr);
    for (i = 0; i < colnames.length; i++) {
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode(colnames[i]));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
    }
    var th = document.createElement('TH')
    th.width = '100';
    th.appendChild(document.createTextNode('Operación'));
    tr.appendChild(th).style.backgroundColor="#0DBED6";
    //FILAS DE LA TABLA
    for (i = 0; i < filas; i++) {
      // console.log(data.TIPO[i])
      if (data.TIPO[i] == "CALIDAD") {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        var td = document.createElement('TD');
        var boton = document.createElement('button');
        var eliminar = document.createElement('i');
        eliminar.classList.add("fas");
        eliminar.classList.add("fa-trash");
        boton.title = "Eliminar";
        boton.classList.add('btn');
        boton.classList.add('btn-danger');
        boton.classList.add('btn-delete');
        var botondos = document.createElement('button');
        var modificar = document.createElement('i');
        modificar.classList.add("fas");
        modificar.classList.add("fa-user-edit");
        botondos.title = 'Modificar';
        botondos.classList.add('btn');
        botondos.classList.add('btn-primary');
        botondos.classList.add('btn-edit');
        boton.appendChild(eliminar);
        botondos.appendChild(modificar);
        td.appendChild(boton);
        td.append(" ");
        td.appendChild(botondos);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
    }

    myTableDiv.appendChild(table);
    $(document).ready(function() {
      $('#myTable').DataTable();
    } );
   //  $("#myTable tr").click(function(){
   //   var value=$(this).find('td:first').next().next().html();
   //   alert(value);    
   // }); 
 })
}

function cargarmtto(){
  cleardiv();
  fetch(dominio+"/api/get/usuarios/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    var colnames = Object.keys(data);
    // console.log("Columnas: ", colnames);
    colnames.splice(colnames.indexOf("GAFET"),1);
    // console.log("Colnames Final: ",colnames);
    var filas = data[colnames[1]].length;
    console.log("Num de Registros:",filas);
    // console.log(data.TIPO)

    //CREACIÓN DE TABLA
    var myTableDiv = document.getElementById("tabla");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    var Encabezados = document.createElement('THEAD');

    table.id = "myTable";
    table.classList.add('display');
    table.border = '2';
    table.appendChild(Encabezados);
    table.appendChild(tableBody);
    tableBody.align="center";
    //FIN DE CREACIÓN DE TABLA

    //ENCABEZADOS DE LA TABLA
    var tr = document.createElement('TR');
    Encabezados.appendChild(tr);
    for (i = 0; i < colnames.length; i++) {
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode(colnames[i]));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
    }
    var th = document.createElement('TH')
    th.width = '100';
    th.appendChild(document.createTextNode('Operación'));
    tr.appendChild(th).style.backgroundColor="#0DBED6";
    //FILAS DE LA TABLA
    for (i = 0; i < filas; i++) {
      // console.log(data.TIPO[i])
      if (data.TIPO[i] == "MANTENIMIENTO") {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        var td = document.createElement('TD');
        var boton = document.createElement('button');
        var eliminar = document.createElement('i');
        eliminar.classList.add("fas");
        eliminar.classList.add("fa-trash");
        boton.title = "Eliminar";
        boton.classList.add('btn');
        boton.classList.add('btn-danger');
        boton.classList.add('btn-delete');
        var botondos = document.createElement('button');
        var modificar = document.createElement('i');
        modificar.classList.add("fas");
        modificar.classList.add("fa-user-edit");
        botondos.title = 'Modificar';
        botondos.classList.add('btn');
        botondos.classList.add('btn-primary');
        botondos.classList.add('btn-edit');
        boton.appendChild(eliminar);
        botondos.appendChild(modificar);
        td.appendChild(boton);
        td.append(" ");
        td.appendChild(botondos);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
    }

    myTableDiv.appendChild(table);
    $(document).ready(function() {
      $('#myTable').DataTable();
    } );
   //  $("#myTable tr").click(function(){
   //   var value=$(this).find('td:first').next().next().html();
   //   alert(value);    
   // }); 
 })
}

function cargarproduccion(){
  cleardiv();
  fetch(dominio+"/api/get/usuarios/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    var colnames = Object.keys(data);
    // console.log("Columnas: ", colnames);
    colnames.splice(colnames.indexOf("GAFET"),1);
    // console.log("Colnames Final: ",colnames);
    var filas = data[colnames[1]].length;
    console.log("Num de Registros:",filas);
    // console.log(data.TIPO)

    //CREACIÓN DE TABLA
    var myTableDiv = document.getElementById("tabla");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    var Encabezados = document.createElement('THEAD');

    table.id = "myTable";
    table.classList.add('display');
    table.border = '2';
    table.appendChild(Encabezados);
    table.appendChild(tableBody);
    tableBody.align="center";
    //FIN DE CREACIÓN DE TABLA

    //ENCABEZADOS DE LA TABLA
    var tr = document.createElement('TR');
    Encabezados.appendChild(tr);
    for (i = 0; i < colnames.length; i++) {
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode(colnames[i]));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
    }
    var th = document.createElement('TH')
    th.width = '100';
    th.appendChild(document.createTextNode('Operación'));
    tr.appendChild(th).style.backgroundColor="#0DBED6";
    //FILAS DE LA TABLA
    for (i = 0; i < filas; i++) {
      // console.log(data.TIPO[i])
      if (data.TIPO[i] == "PRODUCCION" || data.TIPO[i] == "OPERADOR") {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        var td = document.createElement('TD');
        var boton = document.createElement('button');
        var eliminar = document.createElement('i');
        eliminar.classList.add("fas");
        eliminar.classList.add("fa-trash");
        boton.title = "Eliminar";
        boton.classList.add('btn');
        boton.classList.add('btn-danger');
        boton.classList.add('btn-delete');
        var botondos = document.createElement('button');
        var modificar = document.createElement('i');
        modificar.classList.add("fas");
        modificar.classList.add("fa-user-edit");
        botondos.title = 'Modificar';
        botondos.classList.add('btn');
        botondos.classList.add('btn-primary');
        botondos.classList.add('btn-edit');
        boton.appendChild(eliminar);
        botondos.appendChild(modificar);
        td.appendChild(boton);
        td.append(" ");
        td.appendChild(botondos);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
    }

    myTableDiv.appendChild(table);
    $(document).ready(function() {
      $('#myTable').DataTable();
    } );
   //  $("#myTable tr").click(function(){
   //   var value=$(this).find('td:first').next().next().html();
   //   alert(value);    
   // }); 
 })
}

function cargaringenieria(){
  cleardiv();
  fetch(dominio+"/api/get/usuarios/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    var colnames = Object.keys(data);
    // console.log("Columnas: ", colnames);
    colnames.splice(colnames.indexOf("GAFET"),1);
    // console.log("Colnames Final: ",colnames);
    var filas = data[colnames[1]].length;
    console.log("Num de Registros:",filas);
    // console.log(data.TIPO)

    //CREACIÓN DE TABLA
    var myTableDiv = document.getElementById("tabla");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    var Encabezados = document.createElement('THEAD');

    table.id = "myTable";
    table.classList.add('display');
    table.border = '2';
    table.appendChild(Encabezados);
    table.appendChild(tableBody);
    tableBody.align="center";
    //FIN DE CREACIÓN DE TABLA

    //ENCABEZADOS DE LA TABLA
    var tr = document.createElement('TR');
    Encabezados.appendChild(tr);
    for (i = 0; i < colnames.length; i++) {
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode(colnames[i]));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
    }
    var th = document.createElement('TH')
    th.width = '100';
    th.appendChild(document.createTextNode('Operación'));
    tr.appendChild(th).style.backgroundColor="#0DBED6";
    //FILAS DE LA TABLA
    for (i = 0; i < filas; i++) {
      // console.log(data.TIPO[i])
      if (data.TIPO[i] == "INGENIERIA") {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        var td = document.createElement('TD');
        var boton = document.createElement('button');
        var eliminar = document.createElement('i');
        eliminar.classList.add("fas");
        eliminar.classList.add("fa-trash");
        boton.title = "Eliminar";
        boton.classList.add('btn');
        boton.classList.add('btn-danger');
        boton.classList.add('btn-delete');
        var botondos = document.createElement('button');
        var modificar = document.createElement('i');
        modificar.classList.add("fas");
        modificar.classList.add("fa-user-edit");
        botondos.title = 'Modificar';
        botondos.classList.add('btn');
        botondos.classList.add('btn-primary');
        botondos.classList.add('btn-edit');
        boton.appendChild(eliminar);
        botondos.appendChild(modificar);
        td.appendChild(boton);
        td.append(" ");
        td.appendChild(botondos);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
    }

    myTableDiv.appendChild(table);
    $(document).ready(function() {
      $('#myTable').DataTable();
    } );
   //  $("#myTable tr").click(function(){
   //   var value=$(this).find('td:first').next().next().html();
   //   alert(value);    
   // }); 
 })
}

function cargarsuperusuario(){
  cleardiv();
  fetch(dominio+"/api/get/usuarios/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    var colnames = Object.keys(data);
    // console.log("Columnas: ", colnames);
    colnames.splice(colnames.indexOf("GAFET"),1);
    var filas = data[colnames[1]].length;
    console.log("Num de Registros:",filas);

    //CREACIÓN DE TABLA
    var myTableDiv = document.getElementById("tabla");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    var Encabezados = document.createElement('THEAD');

    table.id = "myTable";
    table.classList.add('display');
    table.border = '2';
    table.appendChild(Encabezados);
    table.appendChild(tableBody);
    tableBody.align="center";
    //FIN DE CREACIÓN DE TABLA

    //ENCABEZADOS DE LA TABLA
    var tr = document.createElement('TR');
    Encabezados.appendChild(tr);
    for (i = 0; i < colnames.length; i++) {
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode(colnames[i]));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
    }
    var th = document.createElement('TH')
    th.width = '100';
    th.appendChild(document.createTextNode('Operación'));
    tr.appendChild(th).style.backgroundColor="#0DBED6";
    //FILAS DE LA TABLA
    for (i = 0; i < filas; i++) {
      var tr = document.createElement('TR');
      for (j = 0; j < colnames.length; j++) {
        var td = document.createElement('TD')
        td.appendChild(document.createTextNode(data[colnames[j]][i]));
        tr.appendChild(td)
      }
      var td = document.createElement('TD');
      var boton = document.createElement('button');
      var eliminar = document.createElement('i');
      eliminar.classList.add("fas");
      eliminar.classList.add("fa-trash");
      boton.title = "Eliminar";
      boton.classList.add('btn');
      boton.classList.add('btn-danger');
      boton.classList.add('btn-delete');
      var botondos = document.createElement('button');
      var modificar = document.createElement('i');
      modificar.classList.add("fas");
      modificar.classList.add("fa-user-edit");
      botondos.title = 'Modificar';
      botondos.classList.add('btn');
      botondos.classList.add('btn-primary');
      botondos.classList.add('btn-edit');
      boton.appendChild(eliminar);
      botondos.appendChild(modificar);
      td.appendChild(boton);
      td.append(" ");
      td.appendChild(botondos);
      tr.appendChild(td)
      tableBody.appendChild(tr);
    }

    myTableDiv.appendChild(table);
    $(document).ready(function() {
      $('#myTable').DataTable();
    } );
   //  $("#myTable tr").click(function(){
   //   var value=$(this).find('td:first').next().next().html();
   //   alert(value);    
   // }); 
 })
}

$(document).on('click','.btn-delete', function(){
  var elim = $(this).parent().parent().children().next().next().first().text();
  var gafetelim;
  console.log("ID: ",elim);
  fetch(dominio+"/api/get/usuarios/ID/=/"+elim+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    gafetelim = data.GAFET;
    // console.log("GAFET",data.GAFET);
    if (sessionStorage.getItem('gafet') == gafetelim) {
      alert("No puede eliminar su propio usuario");
    }
    else{
      var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
      if (opcion == true) {
        fetch(dominio+'/api/delete/usuarios/'+elim,{
          method: 'POST'
        }).then(res=>res.json())
        .then(function (data){
          console.log(data);
          console.log('Haz eliminado el registro')
          cargartabla();
        })
        .catch(function(err) {
          console.log(err);
        });
      } else {
        console.log('Haz cancelado la acción')
      }
    }
  })
});

$(document).on('click','.btn-edit', function(){
  alertaadd.innerHTML = "";
  console.log("Tipo de Usuario Logueado: ",sessionStorage.getItem('tipo'));
  var edit_id = $(this).parent().parent().children().next().next().first().text();
  var edit= $(this).parent().parent().children().next().next().next().first().text();
  id = edit_id;
  console.log("Nombre de Usuario: ", edit);
  console.log("Id: ",edit_id);
  document.getElementById('usuarioedit').innerHTML = edit;
  fetch(dominio+"/api/get/usuarios/ID/=/"+edit_id+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    // console.log(data.ACTIVO);
    $('#mostrar').click();
    activo = data.ACTIVO;
    if (data.ACTIVO == 1) {
      document.getElementById("activo").checked=true;
    }else{
      document.getElementById("activo").checked=false;
    }
    document.getElementById("usuario").value = data.NOMBRE;
    document.getElementById("gafet").value = data.GAFET;
    document.getElementById("tipo").value = data.TIPO;
    switch(sessionStorage.getItem('tipo')){
      case "CALIDAD":
      document.getElementById('tipo').disabled = true;
      document.getElementById('tipo').value = "CALIDAD";
      break;
      case "MANTENIMIENTO":
      document.getElementById('tipo').disabled = true;
      document.getElementById('tipo').value = "MANTENIMIENTO";
      break;
      case "PRODUCCION":
      document.getElementById('tipo').value = "PRODUCCION";
      document.getElementById('CALIDAD').disabled = true;
      document.getElementById('MANTENIMIENTO').disabled = true;
      document.getElementById('INGENIERIA').disabled = true;
      document.getElementById('AMTC').disabled = true;
      break;
      case "INGENIERIA":
      document.getElementById('tipo').value = "INGENIERIA";
      document.getElementById('CALIDAD').disabled = true;
      document.getElementById('MANTENIMIENTO').disabled = true;
      document.getElementById('PRODUCCION').disabled = true;
      document.getElementById('OPERADOR').disabled = true;
      document.getElementById('AMTC').disabled = true;
      break;
      default:
      console.log("Ningún usuario logueado");
    }
  })
});

function guardar_edit(){
  // console.log("Este es el valor final del flagusuario", flagusuario);
  // console.log("Este es el valor final del flagpass", flagpass);
  var usuarioadd = document.getElementById('usuario').value;
  var passadd = document.getElementById('gafet').value;
  var tipoadd = document.getElementById('tipo').value;
  if (usuarioadd.length===0 || passadd.length===0) {
    alert("Necesita llenar todos los campos correspondientes.");
  }
  else{
    if (flagusuario == true & flagpass == true) {
      const newPost = {
        "NOMBRE": usuarioadd,
        "GAFET": passadd,
        "TIPO": tipoadd,
        "FECHA": "AUTO",
        "ACTIVO": activo
      }
      // console.log("Este es el newpost: ", newPost);
      // console.log("Id enviado al Post: ", id);
      fetch(dominio+'/api/update/usuarios/'+id,{
        method: 'POST',
        body: JSON.stringify(newPost),
        headers:{
          "Content-type": "application/json"
        }
      }).then(res=>res.json())
      .then(function (data){
        console.log(data);
        location.href = "edit_usuarios.html";
      })
      .catch(function(err) {
        console.log(err);
      });
    } else {
      console.log("NO SE HIZO EL UPDATE");
      alertaadd.innerHTML = '<div class="alert alert-warning" role="alert">El usuario o contraseña ya existe, por favor pruebe con otro.</div>';
    }
  }
}

function get_valid_usuario(){
  // console.log(document.getElementById("usuario").value)
  if(document.getElementById("usuario").value!=""){
    endpoint=dominio+'/api/get/usuarios/nombre/=/'+document.getElementById("usuario").value+'/_/=/_'
    // console.log(endpoint)
    fetch(endpoint)
    .then(res=>res.json())
    .then(function (data){
      // console.log(data);
      // console.log(data.items);
      if (data.items === 0) {
        // console.log("No existe en la base de datos");
        flagusuario = true;
      } else{
        // console.log("El valor ya está en la base de datos");
        flagusuario = false;
      }
      // console.log("Este es el valor del flagusuario: ", flagusuario);
    })
    .catch(function(err) {
      console.log(err);
    });
    
  }
}

function get_valid_gafet(){
  // console.log(document.getElementById("gafet").value)
  if(document.getElementById("gafet").value!=""){
    endpoint=dominio+'/api/get/usuarios/gafet/=/'+document.getElementById("gafet").value+'/_/=/_'
    // console.log(endpoint)
    fetch(endpoint)
    .then(res=>res.json())
    .then(function (data){
      // console.log(data);
      // console.log(data.items);
      if (data.items === 0) {
        // console.log("El GAFET No existe en la base de datos");
        flagpass = true;
      } else{
        // console.log("El GAFET ya está en la base de datos");
        flagpass = false;
      }
      // console.log("Este es el valor del flagpass: ", flagpass);
    })
    .catch(function(err) {
      console.log(err);
    });
    
  }
}

function comprobaractivo(obj){   
  if (obj.checked){
    activo = 1;
  } else{
    activo = 0;
  }
  // console.log("Valor de activo: ",activo);
}