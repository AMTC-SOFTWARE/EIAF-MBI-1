let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase()
document.getElementById('tituloEvento').innerText = eventoFinal;
var id;
// console.log("esta es la sessionstorage: ", sessionStorage.getItem('gafet'));

function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}

function cargartabla(){
  cleardiv();
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      // console.log("Columnas: ", colnames);
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
            switch (colnames[j]){
            case "PDC-D":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-pdcd');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-P":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-pdcp');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-R":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-pdcr');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-RMID":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-pdcr-mid');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-RS":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-pdcr-s');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-S":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-pdcs');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "TBLU":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-file-alt");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-tblu');
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
          var td = document.createElement('TD');
          var boton = document.createElement('button');
          var eliminar = document.createElement('i');
          eliminar.classList.add("fas");
          eliminar.classList.add("fa-trash");
          boton.title = "Eliminar";
          boton.classList.add('btn');
          boton.classList.add('btn-danger');
          boton.classList.add('btn-delete-vision');
          var botondos = document.createElement('button');
          var modificar = document.createElement('i');
          modificar.classList.add("fas");
          modificar.classList.add("fa-edit");
          botondos.title = 'Modificar';
          botondos.classList.add('btn');
          botondos.classList.add('btn-primary');
          botondos.classList.add('btn-edit-vision');
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
    }
  })
}

$(document).on('click','.btn-ver-pdcd', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
       console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      //  console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[header_info]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box";
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.classList = "flex-box";
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
         let cavidades = dataParse[caja];
         //console.log("Aquí en object: ",cavidades)
         let grid = document.createElement("div");
         nav.appendChild(grid);         
          grid.innerHTML = `<p>: ${cavidades}</p>`;
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-pdcp', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/historial/id/=/"+id_info_responsive+"/_/=/_")
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
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      //  console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[header_info]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box";
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.classList = "flex-box";
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
         let cavidades = dataParse[caja];
         //console.log("Aquí en object: ",cavidades)
         let grid = document.createElement("div");
         
         nav.appendChild(grid);         
          grid.innerHTML = `<p>: ${cavidades}</p>`;
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-pdcr', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info_responsive+"/_/=/_")
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
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      //  console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[header_info]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box";
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.classList = "flex-box";
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
         let cavidades = dataParse[caja];
         //console.log("Aquí en object: ",cavidades)
         let grid = document.createElement("div");
         
         nav.appendChild(grid);         
          grid.innerHTML = `<p>: ${cavidades}</p>`;
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-pdcr-mid', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info_responsive+"/_/=/_")
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
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      //  console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[header_info]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box";
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.classList = "flex-box";
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
         let cavidades = dataParse[caja];
         //console.log("Aquí en object: ",cavidades)
         let grid = document.createElement("div");
         
         nav.appendChild(grid);         
          grid.innerHTML = `<p>: ${cavidades}</p>`;
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-pdcr-s', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info_responsive+"/_/=/_")
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
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      //  console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[header_info]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box";
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.classList = "flex-box";
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
         let cavidades = dataParse[caja];
         //console.log("Aquí en object: ",cavidades)
         let grid = document.createElement("div");
         
         nav.appendChild(grid);         
          grid.innerHTML = `<p>: ${cavidades}</p>`;
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-pdcs', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info_responsive+"/_/=/_")
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
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      //  console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[header_info]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box";
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.classList = "flex-box";
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
         let cavidades = dataParse[caja];
         //console.log("Aquí en object: ",cavidades)
         let grid = document.createElement("div");
         
         nav.appendChild(grid);         
          grid.innerHTML = `<p>: ${cavidades}</p>`;
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-tblu', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info_responsive+"/_/=/_")
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
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      //  console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[header_info]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box";
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.classList = "flex-box";
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
         let cavidades = dataParse[caja];
         //console.log("Aquí en object: ",cavidades)
         let grid = document.createElement("div");
         
         nav.appendChild(grid);         
          grid.innerHTML = `<p>: ${cavidades}</p>`;
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    })
  }
});

$(document).on('click','.btn-delete-vision', function(){
  var elim = $(this).parent().parent().children().first().text();
  var modulo = $(this).parent().parent().children().first().next().text();
  console.log("ID a eliminar: ",elim);
  console.log("Módulo: ",modulo);
  document.getElementById("modulo").innerHTML = modulo;
  var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
  if (opcion == true) {
    fetch(dominio+'/api/delete/'+DBEVENT+'/modulos_fusibles/'+elim,{
      method: 'POST'
    }).then(res=>res.json())
    .then(function (data){
      console.log(data);
      console.log('Haz eliminado el registro')
      $('#mostrar_eliminar').click();
      cargartabla();
      setTimeout(function(){
        $('#cerrar_eliminar').click();
      },3000);
    })
    .catch(function(err) {
      console.log(err);
    });
  } else {
    console.log('Haz cancelado la acción')
  }
});

$(document).on('click','.btn-edit-vision', function(){
  var edit_id = $(this).parent().parent().children().first().text();
  var edit= $(this).parent().parent().children().next().first().text();
  id = edit_id;
  console.log("Nombre del Módulo: ", edit);
  console.log("Id de Módulo: ",edit_id);
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/ID/=/"+edit_id+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    console.log(data);
    var keys = Object.keys(data)
    console.log(keys);
    sessionStorage.setItem("edit_vision", edit);
    sessionStorage.setItem("edit_vision_id", edit_id);
    location.href = "edit_modulos_vision.html";
  })
});

$('#modal_eliminar').find(".modal-header").css("background", "#0DBED6");