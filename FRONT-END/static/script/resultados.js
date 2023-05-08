////////////// VARIABLES GLOBALES /////////////////////
var alertawarning = document.getElementById('alertawarning');

var fecha=document.getElementById("fecha");
var id=document.getElementById("id");
var modulo=document.getElementById("modulo");
var modularidad=document.getElementById("modularidad");
var HM=document.getElementById("HM");
var tipobusqueda=document.getElementById("tipobusqueda");
var tipobusqueda2=document.getElementById("tipobusqueda2");
var tipobusqueda3=document.getElementById("tipobusqueda3");
var nombre=document.getElementById("nombre");
var gafete=document.getElementById("gafete");

let chartColumns = new Array(); ///Columnas para el Histrograma 

function fechaActual(){
  var fechaFinal = moment.utc().add(1,'days').format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy mas 1 dia
  var fechaInicial = moment.utc().add(-1,'month').format('YYYY-MM-DD'); //Insertar una fecha del dia de hoy menos 1 mes
  document.getElementById('fechaf').value = fechaFinal;
  document.getElementById('fechai').value = fechaInicial;
}

var options = {
  Historial : ["Fecha Inicial","HM"],
  Log : ["Fecha","ID","HM"],
  manager : ["Fecha","Nombre","Gafet"],
  modularidades : ["Fecha","Modularidad"],
  Modulos_Fusibles : ["ID","Modulo"],
  Usuarios : ["Fecha","Nombre","Gafet"],
  web : ["Fecha","Nombre","Gafet"]
}

$(function(){
var fillSecondary = function(){
  var selected = $('#selector').val();
  // if ($('#selector').val() == "manager") {
  //   $('#tipo_busqueda').empty();
  //   $('#tipo_busqueda').css("display","none");
  //   $('#label_busqueda').css("display","none");
  //   fecha.style.display = 'inline-block';
  //   HM.style.display = 'none';
  //   nombre.style.display = 'none';
  //   gafete.style.display = 'none';
  //   id.style.display = 'none';
  //   modulo.style.display = 'none';
  //   modularidad.style.display = 'none';
  // }else{
    $('#tipo_busqueda').css("display","inline-block");
    $('#label_busqueda').css("display","inline-block");
    $('#tipo_busqueda').empty();
    options[selected].forEach(function(element,index){
      $('#tipo_busqueda').append('<option value="'+element+'">'+element+'</option>');
    });
  // }
  switch ($('#tipo_busqueda').val()) {
    case "Fecha":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "Fecha Inicial":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "ID":
      // console.log("Búsqueda por id")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'inline-block';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    default:
    break;
  }
}
var cambio = function(){
  switch ($('#tipo_busqueda').val()) {
    case "Fecha":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "Fecha Inicial":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "HM":
      // console.log("Búsqueda por HM")
      fecha.style.display = 'none';
      HM.style.display = 'inline-block';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
      document.getElementById("hminput").focus();
    break;
    case "Nombre":
      // console.log("Búsqueda por Nombre")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'inline-block';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
      document.getElementById("nombreinput").focus();
    break;
    case "Gafet":
      // console.log("Búsqueda por Gafet")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'inline-block';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
      document.getElementById("gafeteinput").focus();
    break;
    case "ID":
      // console.log("Búsqueda por id")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'inline-block';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "Modulo":
      // console.log("Búsqueda por modulo")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'inline-block';
      modularidad.style.display = 'none';
      document.getElementById("moduloinput").focus();
    break;
    case "Modularidad":
      // console.log("Búsqueda por Modularidad")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'inline-block';
      document.getElementById("modularidad_input").focus();
    break;  
    default:
    break;
  }
}
$('#selector').change(fillSecondary);
fillSecondary();
$('#tipo_busqueda').change(cambio);
cambio();
});

function cleardiv(){
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("descarga").innerHTML = "";
}
// Función que se ejecuta al oprimir el botón "Obtener Resultados"
function capturar(){
  if (sessionStorage.getItem('tipo') == null) {
    alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">Necesita inicar sesión para visualizar esta información.</div>'
  } else {
    var tabla=document.getElementById("selector").value;
    // console.log(tabla);
    switch (tabla){
      case "Historial":
      cleardiv();
      cargarportipo_log();
      console.log("Obtener Resultados de Historial");
      break;
      case "Log":
      cleardiv();
      cargarportipo_log();
      console.log("Obtener Resultados de Log");
      break;
      case "Modulos_Fusibles":
      cleardiv();
      cargarmodulo();
      console.log("Obtener Resultados de Modulos_Fusibles");
      break;
      case "modularidades":
      cleardiv();
      cargarpedido();
      console.log("Obtener Resultados de Modularidades");
      break;
      case "Usuarios":
      cleardiv();
      cargarportipo_usuarios();
      console.log("Obtener Resultados de Usuarios");
      break;
      case "web":
      cleardiv();
      cargarportipo();
      console.log("Obtener Resultados de Web");
      break;
      case "manager":
      cleardiv();
      cargarportipo_usuarios();
      console.log("Obtener Resultados de Manager");
      break;
      default:
      console.log("No pasa nada");
    }
  }
}


//////////////// AL SELECCIONAR TABLAS QUE NECESITEN REALIZAR CONSULTAS EN BASE A "Datetime" SE EJECUTARÁ ESTA FUNCIÓN //////////////////////////////////
function cargardatetime(){
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/fecha/>/"+document.getElementById('fechai').value+"/fecha/</"+document.getElementById('fechaf').value)
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("ACTIVO"),1,"ID","ACTIVO");
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          switch (colnames[j]){
            case "MODULOS_FUSIBLES":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-modulos');
            boton.style.width="60px"
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            default:
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
          }
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

$(document).on('click','.btn-ver-estado', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/pedidos/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/log/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});

function cargarfecha(){
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/fecha/>/"+document.getElementById('fechai').value+"/fecha/</"+document.getElementById('fechaf').value)
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log(colnames);
      // console.log("Elemento eliminado",colnames.splice(colnames.indexOf("GAFET"),1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}
//////////////// AL SELECCIONAR TABLAS QUE NECESITEN REALIZAR CONSULTAS EN BASE AL "ID" SE EJECUTARÁ ESTA FUNCIÓN ////////////////////////
function cargarmodulo(){
  switch ($('#tipo_busqueda').val()){
    case "Modulo":  
    var moduloinput = document.getElementById("moduloinput").value;
    // console.log(moduloinput);
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/modulo/=/"+moduloinput+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      }else{
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        // console.log("Colnames: ",colnames);
        var filas = data[colnames[0]];
        // console.log("Resultado: ",filas);
        //CREACIÓN DE TABLA
        var myTableDiv = document.getElementById("resultado");
        var table = document.createElement('TABLE');
        var tableBody = document.createElement('TBODY');
        var Encabezados = document.createElement('THEAD');

        table.id = "myTable";
        table.classList.add('display');
        table.classList.add('nowrap');
        table.cellSpacing="0";
        table.width="100%";
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
        //FILAS DE LA TABLA
        for (i = 0; i < 1; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            switch (colnames[j]){
            case "PDC-R":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja1_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-RMID":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja2_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-S":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja3_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "TBLU":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja4_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-D":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja5_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-P":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja6_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            default:
            td.appendChild(document.createTextNode(data[colnames[j]]));
            break;
          }
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function() {
          $('#myTable').DataTable({
            responsive:true
          });
        } );
      }
    })
    break;
    case "ID":
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/>/"+document.getElementById('idi').value+"/id/</"+document.getElementById('idf').value)
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      }else{
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        var filas = data[colnames[0]].length;
        //CREACIÓN DE TABLA
        var myTableDiv = document.getElementById("resultado");
        var table = document.createElement('TABLE');
        var tableBody = document.createElement('TBODY');
        var Encabezados = document.createElement('THEAD');

        table.id = "myTable";
        table.classList.add('display');
        table.classList.add('nowrap');
        table.cellSpacing="0";
        table.width="100%";
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
        //FILAS DE LA TABLA
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            switch (colnames[j]){
              case "PDC-R":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja1');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-RMID":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja2');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-S":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja3');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "TBLU":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja4');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-D":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja5');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-P":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja6');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              default:
              td.appendChild(document.createTextNode(data[colnames[j]][i]));
              break;
            }
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function() {
          $('#myTable').DataTable({
            responsive:true
          });
        } );
      }
    })

  }
}

$(document).on('click','.btn-ver-caja1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja2', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja3', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja4', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja5', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja6', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});

$(document).on('click','.btn-ver-caja1_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja2_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja3_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja4_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja5_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja6_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
function cargarnombre(){
  var nombreinput = document.getElementById("nombreinput").value;
  // console.log(nombreinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/nombre/=/"+nombreinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(1,1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargargafete(){
  var gafeteinput = document.getElementById("gafeteinput").value;
  // console.log(gafeteinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/gafet/=/"+gafeteinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(1,1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargarnombre_usuarios(){
  var nombreinput = document.getElementById("nombreinput").value;
  // console.log(nombreinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/nombre/=/"+nombreinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';    
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(2,1));
      // console.log("el nuevo array: ", colnames);
      
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      //FILAS DE LA TABLA
      if (document.getElementById('selector').value == "manager") {
        console.log("Es manager");
        var filas = data[colnames[0]].length;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }else{
        var filas = 1;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }
      // console.log("Resultado: ",filas);
      
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargargafete_usuarios(){
  var gafeteinput = document.getElementById("gafeteinput").value;
  // console.log(gafeteinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/gafet/=/"+gafeteinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(2,1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]];
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
      //FILAS DE LA TABLA
      if (document.getElementById('selector').value == "manager") {
        console.log("Es manager");
        var filas = data[colnames[0]].length;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }else{
        var filas = 1;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }
      // console.log("Resultado: ",filas);
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargarpedido(){
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    cargardatetime();
    break;
    case "Modularidad":
    var modularidad_input = document.getElementById("modularidad_input").value;
    // console.log(modularidad_input);
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/modularidad/=/"+modularidad_input+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      }else{
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        colnames.splice(colnames.indexOf("ID"),1);
        colnames.splice(colnames.indexOf("ACTIVO"),1,"ID","ACTIVO");
        // console.log("Colnames: ",colnames);
        var filas = data[colnames[0]];
        // console.log("Resultado: ",filas);
          //CREACIÓN DE TABLA
          var myTableDiv = document.getElementById("resultado");
          var table = document.createElement('TABLE');
          var tableBody = document.createElement('TBODY');
          var Encabezados = document.createElement('THEAD');

          table.id = "myTable";
          table.classList.add('display');
          table.classList.add('nowrap');
          table.cellSpacing="0";
          table.width="100%";
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
            //FILAS DE LA TABLA
            for (i = 0; i < 1; i++) {
              var tr = document.createElement('TR');
              for (j = 0; j < colnames.length; j++) {
                var td = document.createElement('TD')
                switch (colnames[j]){
                  case "MODULOS_FUSIBLES":
                  var boton = document.createElement('button');
                  var icono = document.createElement('i');
                  icono.classList.add("fas");
                  icono.classList.add("fa-archive");
                  boton.title = "Ver Información";
                  boton.classList.add('btn');
                  boton.classList.add('btn-info');
                  boton.classList.add('btn-ver-modulos');
                  boton.style.width="60px"
                  boton.appendChild(icono);
                  td.appendChild(boton);
                  break;
                  default:
                  td.appendChild(document.createTextNode(data[colnames[j]][i]));
                }
                tr.appendChild(td)
              }
              tableBody.appendChild(tr);
            }
            myTableDiv.appendChild(table);
            $(document).ready(function() {
              $('#myTable').DataTable({
                responsive:true
              });
            } );
          }
        })
    break;
  }
}

$(document).on('click','.btn-ver-modulos', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/modularidades/ID/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/modularidades/ID/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});

function cargarportipo(){
  // console.log("Este es el tipo que seleccionó: ",document.getElementById("tipo").value);
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    // console.log("mostrando resultados por fecha");
    cargarfecha();
    break;
    case "Nombre":
    // console.log("mostrando resultados por nombre");
    cargarnombre();
    break;
    case "Gafet":
    // console.log("mostrando resultados por nombre");
    cargargafete();
    break;
  }
}

function cargarportipo_usuarios(){
  // console.log("Este es el tipo que seleccionó: ",document.getElementById("tipo").value);
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    // console.log("mostrando resultados porfecha");
    cargarfecha();
    break;
    case "Nombre":
    // console.log("mostrando resultados por nombre");
    cargarnombre_usuarios();
    break;
    case "Gafet":
    // console.log("mostrando resultados por nombre");
    cargargafete_usuarios();
    break;
  }
}

//////////////// AL SELECCIONAR LA TABLA "Historial" SE EJECUTARÁ ESTA FUNCIÓN PARA REALIZAR LA CONSULTA DE LOS DATOS A LA TABLA CORRESPONDIENTE ///////////////////////
function cargarportipo_log(){
  logArray = []
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    console.log("mostrando resultados por FECHA");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/fecha/>/"+document.getElementById('fechai').value+"/fecha/</"+document.getElementById('fechaf').value;
    break;
    case "Fecha Inicial":
    console.log("mostrando resultados por FECHA");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/inicio/>/"+document.getElementById('fechai').value+"/inicio/</"+document.getElementById('fechaf').value;
    break;
    case "ID":
    console.log("mostrando resultados por ID");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/id/>/"+document.getElementById('idi').value+"/id/</"+document.getElementById('idf').value;
    break;
    case "HM":
    console.log("mostrando resultados por HM");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/hm/=/"+document.getElementById('hminput').value+"/_/=/_";
    break;
  }
  fetch(url)
  .then(data=>data.json())
  .then(data=>{
    chartColumns = new Array(); ///Columnas para el Histrograma 
    graficar ()
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      // console.log(colnames);
      if (document.getElementById('selector').value == "Historial") {
        colnames.push("INTERVALO")
        colnames.splice(colnames.indexOf("INTERVALO",1))
        colnames.splice(colnames.indexOf("ID"),1);
        colnames.splice(colnames.indexOf("RESULTADO"),1);
        colnames.splice(colnames.indexOf("INICIO"),1);
        colnames.splice(colnames.indexOf("FIN"),1,"ID","INICIO","FIN","RESULTADO");
        colnames.splice(colnames.indexOf("RESULTADO"),0 ,"INTERVALO")
        colnames.splice(colnames.indexOf("HM"),1)
        colnames.splice(colnames.indexOf("INICIO"),0 ,"HM")
        colnames.push("COMENTARIO");
      }
      //console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
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
        if (colnames[i] !== "COMENTARIO") {
          th.appendChild(document.createTextNode(colnames[i]));
        }
        tr.appendChild(th).style.backgroundColor="#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          switch (colnames[j]){
            case "HM":
              var selector  = document.createElement('input');
              const hm = data[colnames[j]][i];
              const pedidoId = data['ID'][i]; 
              selector.setAttribute('type', 'checkbox');
              selector.id = 'pedido'  
              selector.style.marginLeft = '0.5rem'
              selector.setAttribute('onclick', 'pedidoValue(this)')       
              selector.value = `{"HM":"${hm}","ID":"${pedidoId}"}`;
              td.appendChild(document.createTextNode(hm));
              td.appendChild(selector);
              break;
            case "FUSIBLES":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-fusibles');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "REINTENTOS":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-reintentos');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "INTERVALO":
              fecha_fin_hora = moment.utc(data["FIN"][i]).hours() 
            fecha_fin_min = moment.utc(data["FIN"][i]).minutes()
            fecha_fin_seg = moment.utc(data["FIN"][i]).seconds()
            
            fecha_inicio_hora =  moment.utc(data["INICIO"][i]).hours()
            fecha_inicio_min =  moment.utc(data["INICIO"][i]).minutes()
            fecha_inicio_seg =  moment.utc(data["INICIO"][i]).seconds()
           // console.log(fecha_fin_hora - fecha_inicio_hora, data["ID"][i]);

            // if (transcurridoMinutos < 0) {
            //   transcurridoHoras--;
            //   transcurridoMinutos = 60 + transcurridoMinutos;
            // }
            transcurridoMinutos = fecha_fin_min - fecha_inicio_min;
            //console.log(transcurridoMinutos)
            transcurridoHoras = fecha_fin_hora - fecha_inicio_hora;
            //console.log(transcurridoHoras)
            transcurridoSegundos = fecha_fin_seg - fecha_inicio_seg;
            //console.log(transcurridoSegundos)
            
            if (transcurridoMinutos < 0) {
              transcurridoHoras--;
              transcurridoMinutos = 60 + transcurridoMinutos;
            }
            if (transcurridoSegundos < 0) {
              transcurridoMinutos--;
              transcurridoSegundos = 60 + transcurridoSegundos;
            }
            
            horas = transcurridoHoras.toString();
            minutos = transcurridoMinutos.toString();
            segundos = transcurridoSegundos.toString();
            
            
            //console.log(horas+":"+minutos+" "+segundos);
            let diferencia = horas <= 0? `${minutos} Minutos, y ${segundos} Segundos`:`${horas} Hora(s), ${minutos} Minutos, y ${segundos} Segundos` ;
            td.appendChild(document.createTextNode(diferencia));
              break
            case"COMENTARIO":
            var boton_crear = document.createElement('button');
            boton_crear.title = "Insertar Comentario";
            boton_crear.classList.add('btn');
            boton_crear.classList.add('btn-info');
            boton_crear.classList.add('btn-insertar-comentario');
            boton_crear.value = data['ID'][i]
            boton_crear.innerHTML = 'Insertar Comentario';
            boton_ver = document.createElement('button');
            boton_ver.title = "Ver Comentarios"
            boton_ver.classList.add('btn')
            boton_ver.classList.add('btn-info')
            boton_ver.classList.add('btn-ver-comentario');
            boton_ver.value = data['HM'][i]
            boton_ver.innerHTML = 'Ver Comentario';
            // boton_crear.style.width = "60px";
            td.appendChild(boton_ver);
            td.appendChild(boton_crear);
            break          
            default:
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            break;
          }
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function () {
        // Setup - add a text input to each footer cell
        $('#myTable thead tr')
            
            .addClass('filters')
            .appendTo('#myTable thead');
     
        var table = $('#myTable').DataTable({
            orderCellsBottom: true,
            responsive: true,
            initComplete: function () {
                var api = this.api();
                // For each column
                api
                    .columns(5)
                    .eq(0)
                    .each(function (colIdx) {
                        // Set the header cell to contain the input element
                       // console.log(colIdx)
                        var cell = $('.filters th').eq(
                            $(api.column(colIdx).header()).index()
                        );
                        
                        var title = $(cell).text();
                        //console.log(cell)
  
                        $(cell).html(`
                        <select id="selector" name="select">
                        <option value="">Resultado</option>
                        <option value="Bueno">Bueno</option>
                        <option value="Malo">Malo</option>
                        </select>`);
     
                        // On every keypress in this input
                        $(
                            'select',
                            $('.filters th').eq($(api.column(colIdx).header()).index())
                        )
                            .off('keyup change')
                            .on('keyup change', function (e) {
                                e.stopPropagation();
                                // Get the search value
                                $(this).attr('value', $(this).val());
                                var regexr = '({search})'; //$(this).parents('th').find('select').val();
     
                                var cursorPosition = this.selectionStart;
                                // Search the column for that value
                                api
                                    .column(colIdx)
                                    .search(
                                        this.value != ''
                                            ? regexr.replace('{search}', '(((' + this.value + ')))')
                                            : '',
                                        this.value != '',
                                        this.value == ''
                                    )
                                    .draw();
     
                                $(this)
                                    .focus()[0]
                                    //.setSelectionRange(cursorPosition, cursorPosition);
                            });
                    });
            },
        });
    });

      ///////// DESCARGA /////////
      //CREACIÓN DE TABLA PARA DESCARGAR
      var myTableDiv_descarga = document.getElementById("resultado");
      var table_descarga = document.createElement('TABLE');
      var tableBody_descarga = document.createElement('TBODY');
      var Encabezados_descarga = document.createElement('THEAD');
      let dateStamp

      table_descarga.id = "myTable_descarga";
      table_descarga.classList.add('display');
      table_descarga.classList.add('nowrap');
      table_descarga.style.display = 'none';
      table_descarga.cellSpacing="0";
      table_descarga.width="100%";
      table_descarga.border = '2';
      table_descarga.appendChild(Encabezados_descarga);
      table_descarga.appendChild(tableBody_descarga);
      tableBody_descarga.align="center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados_descarga.appendChild(tr);
      colnames.splice(colnames.indexOf("FUSIBLES"),3);
      colnames.splice(colnames.indexOf("FIN"), 0, ("HORA_INICIAL"));
      colnames.splice(colnames.indexOf("INTERVALO"), 0, ("HORA_FINAL"));
      colnames.splice(colnames.indexOf("INICIO"),0,"QR_FET");
      colnames.splice(colnames.indexOf("REINTENTOS"),1);
      colnames.splice(colnames.indexOf("COMENTARIO"),1)
      console.log("DESCARGA Colnames:",colnames)
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor="#0DBED6";
      }
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          let referencia;
          var td = document.createElement('TD')
          switch (colnames[j]){
            case "QR_FET":
            // console.log("Seriales: ",data[colnames[j]][i]);
            let splitData = (data[colnames[j]][i]).split(' ');
            // console.log(splitData);
            for (let k = 0; k < splitData.length; k++) {
              if (splitData[k].includes('ILX') | splitData[k].includes('IRX')){
                referencia = splitData[k];
              }              
            }
            // let referencia = JSON.parse(data[colnames[j]][i]);
            // console.log("referencia+-+-+- ",referencia)
            // console.log(referencia['REF'])
            td.appendChild(document.createTextNode(referencia));
            break;
            case "FUSIBLES":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-fusibles');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "REINTENTOS":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-reintentos');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "FIN":
            dateStamp = moment.utc((data[colnames[j]][i])).format("MM/DD/YYYY");
            td.appendChild(document.createTextNode(dateStamp));
            break;
            case "HORA_FINAL":
            dateStamp_inicio = moment.utc((data["FIN"][i])).format("HH:mm:ss")
            td.appendChild(document.createTextNode(dateStamp_inicio));
            break;
            case "HORA_INICIAL":
            dateStamp_inicio = moment.utc((data["INICIO"][i])).format("HH:mm:ss")
            td.appendChild(document.createTextNode(dateStamp_inicio));
            break;
            case "INICIO":
            dateStamp_inicio = moment.utc((data[colnames[j]][i])).format("MM/DD/YYYY");
            td.appendChild(document.createTextNode(dateStamp_inicio));
            break;
            case "INTERVALO":
              const dateEnd = moment.utc(new Date(data["FIN"][i]), "HH:mm:ss");
              const dateStart = moment.utc(new Date(data["INICIO"][i]), "HH:mm:ss");
  
              var hourEnd = Number(dateEnd.format('HH')) == 0 && dateStart.format('HH') === 1?  Number(dateEnd.format('HH')): 24;
              var hourStart = Number(dateStart.format('HH')) == 0 && dateEnd.format('HH') === 1?  Number(dateStart.format('HH')): 24;
              var dateDiference;
  
             // console.log(hourStart);
              //console.log(hourEnd);
  
              if (hourEnd >= hourStart) {
                dateDiference = dateEnd.diff(dateStart);
              } else {
                dateDiference = dateStart.diff(dateEnd);
              }
              //console.log(dateDiference);
  
              let duracion = moment.utc(dateDiference).format("HH:mm:ss")
              //console.log(duracion);
            td.appendChild(document.createTextNode(`${duracion}`));
            break;
              default:
              td.appendChild(document.createTextNode(data[colnames[j]][i]));
            break;
          }
          tr.appendChild(td)
        }
        tableBody_descarga.appendChild(tr);
      }
      myTableDiv_descarga.appendChild(table_descarga);
      $(document).ready(function() {
        $('#myTable_descarga').DataTable({
          dom: 'B',
          buttons: [
          {
            extend: 'excelHtml5',
            text: 'Exportar a Excel <i class="fas fa-file-excel"></i>',
            titleAttr: 'Exportar a Excel',
            className: 'btn btn-success',
            title: "Fujikura Automotive México Piedras Negras",
            messageTop: "Información recopilada por la Estación de Inserción de Fusibles",
            excelStyles:[{
              template: "cyan_medium",
            }
          ]
          }
          ]
        });
      } );


    }
  })
}

$(document).on('click','.btn-ver-fusibles', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  var id_info_responsive = header.parent().prev().find("td:first").text();
  let case_fetch = isNaN(id_info)==true? id_info_responsive:id_info;
  let case_JSON_PARSE = isNaN(id_info)==true?  id_info:header_info;
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    //console.log("Header Responsive: ",id_info);
    //console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
  }
   else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
  }
    fetch(dominio+"/api/get/historial/id/=/"+case_fetch+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[case_JSON_PARSE]);

      if (data[id_info] == "" || data[id_info] == "{}") {
        var b = document.createElement('b');
        b.innerHTML="SIN DATOS";
        document.getElementById("informacion").appendChild(b);
      }else{
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      

      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let anulados = 0;
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         let cavidades = dataParse[caja];
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         let grid = document.createElement("div");
         grid.classList = "grid-box";
         for (let j = 0; j < get_cavidad.length; j++) {
          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = cavidades[obj_cavidad];
          //console.log("Aqui en string: ",valores)
          //let boxValue = valores.replace(re, 'N/A');
          if (valores !== "empty") {
            span.innerHTML = `<p>${obj_cavidad}: ${valores}</p>`;
            grid.appendChild(span);
          }else{
            anulados++;
          }
         }
        if (get_cavidad.length !== anulados) {
          nav.id = "titulo-caja"
          nav.innerHTML = "<b>"+caja+"</b>";
          div.appendChild(nav);
          nav.appendChild(grid);  
        }  
        
      }
      document.getElementById("informacion").appendChild(div) 
    }

      $('#mostrar').click();
    }) 
});
$(document).on('click','.btn-ver-reintentos', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  var id_info_responsive = header.parent().prev().find("td:first").text();
  let case_fetch = isNaN(id_info)==true? id_info_responsive:id_info;
  let case_JSON_PARSE = isNaN(id_info)==true?  id_info:header_info;
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    //console.log("Header Responsive: ",id_info);
    //console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
  }
   else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
  }
    fetch(dominio+"/api/get/historial/id/=/"+case_fetch+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[case_JSON_PARSE]);
      if (data[id_info] == "" || data[id_info] == "{}") {
        var b = document.createElement('b');
        b.innerHTML="SIN DATOS";
        document.getElementById("informacion").appendChild(b);
      }else{
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
        // console.log("Aqui esta la CAJA:",caja);
         let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         let grid = document.createElement("div");
         grid.classList = "grid-box";
         nav.appendChild(grid);
         for (let j = 0; j < get_cavidad.length; j++) {
          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          //let boxValue = valores.replace(re, 'N/A');
          span.innerHTML = `<p>${obj_cavidad}: ${valores}</p>`;
          grid.appendChild(span);
         }
      }
      document.getElementById("informacion").appendChild(div) 
    }
      $('#mostrar').click();
    }) 
});

//////////////// Jquerys que evitan que un campo de texto actúe como "Submit" al momento de dar "Enter" ///////////////////////

$('#modulo').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#modularidad').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#nombre').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#gafete').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#HM').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});



/**Grafico**/
let activo = 0; 
$(document).on('click', '.pestana', function () {
  const ctx = document.getElementById('myChart');
  activo++
  if (activo === 2) {
  activo = 0
  document.getElementById('grafico').style.width = '0px'
  document.getElementById('grafico').style.height = '0px'

  ctx.style.height = '0px'
  ctx.style.width = '0px'
}else{
  document.getElementById('grafico').style.width = '650px'
  document.getElementById('grafico').style.height = '400px'
 
  ctx.style.height = '400px'
  ctx.style.width = '650px'
}
})


logArray = []
function pedidoValue(hm){  
  var reintento = 0;
  const pedidoChart = hm.value
  var Jvalue = JSON.parse(pedidoChart)

  if(hm.checked == true){    
    logArray.push(Jvalue['ID'])
    //console.log(logArray);
  }
  if (hm.checked === false) {
    logArray.splice(logArray.indexOf(Jvalue['ID']),1)
  }
  chartColumns = []

  if (logArray.length === 0 ) {
    graficar()
  }

  logArray.forEach(id => { 
    fetch(dominio + "/api/get/historial/id/=/" + id + "/_/=/_")
    .then(data => data.json())
    .then(data => {
      //console.log(data)
      jParse = JSON.parse(data['REINTENTOS'])
        dataKeys = Object.keys(jParse)
        //console.log(jParse)
        for (let i = 0; i < dataKeys.length; i++) {
          const valueKey = jParse[dataKeys[i]];
          const caja = dataKeys[i]
          var bar;
          //console.log(caja); // Nombre-Caja
          boxKeys = Object.keys(valueKey)
          //console.log(boxKeys)
          
          for (let w = 0; w < boxKeys.length; w++) {
            const cavidad = boxKeys[w];
             //console.log(cavidad); //Nombre-cavidad
             reintento = valueKey[cavidad] //Valor Cavidad
            //console.log(reintento);

            const findIt = chartColumns.findIndex(object => { //El FindIndex busca el numero de posicion del object HM guardado en la variable ColGraph
              return object.label === `${cavidad}-${caja}`;
            })
            //console.log(findIt);
            if (findIt >= 0) {
              chartColumns[findIt].y += reintento
            }else{
              bar = {'label':`${cavidad}-${caja}`, 'y':reintento};
              chartColumns.push(bar);
            }
            

            }
          }
         //console.log(reintento)
         //console.log(chartColumns);
         graficar();
       })
     }
    )};

  

    

function graficar () {

 //console.log(chartColumns.length)
 for (let index = 0; index < chartColumns.length; index++) {
  chartColumns[index]['x'] = index;
 }

  var chart = new CanvasJS.Chart("myChart", {
    theme: "light1", // "light2", "dark1", "dark2"
    animationEnabled: true, // change to true		
    title:{
      text: "Reintentos de inserción por pedido"
    },
    width: 650,
    height: 400,
    data: [
    {
      // Change type to "bar", "area", "spline", "pie",etc.
      type: "column",
      dataPoints: chartColumns
    }
    ]
  });
  chart.render();
  
}
