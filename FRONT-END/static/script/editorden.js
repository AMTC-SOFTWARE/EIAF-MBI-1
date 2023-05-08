let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase()
document.getElementById('tituloEvento').innerText = eventoFinal;
var mv=[];
var mt=[];
var pedido;
var id;
var pedidoeditar;
var pedido_editar_final;
var historial="";
var ref="";
var activo;
function cerrar(){
  sessionStorage.removeItem('gafet');
  sessionStorage.removeItem('tipo');
  location.href = "index.html";
}

function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}

function cargartabla(){
  cleardiv();
  fetch(dominio+"/api/get/"+DBEVENT+"/modularidades/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("ACTIVO"),1,"ID","ACTIVO");
      // console.log("Columnas: ", colnames);
      var filas = data[colnames[1]].length;
      // console.log("Num de Registros:",filas);

      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("tabla");
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
        var titulo = colnames[i].replace("_"," ")
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(titulo));
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
        modificar.classList.add("fa-edit");
        botondos.title = 'Modificar';
        botondos.classList.add('btn');
        botondos.classList.add('btn-primary');
        botondos.classList.add('btn-edit');
        var botontres = document.createElement('button');
        var ver = document.createElement('i');
        ver.classList.add("fas");
        ver.classList.add("fa-eye");
        botontres.title = 'Ver Modularidad';
        botontres.classList.add('btn');
        botontres.classList.add('btn-warning');
        botontres.classList.add('btn-ver');
        boton.appendChild(eliminar);
        botondos.appendChild(modificar);
        botontres.appendChild(ver);
        td.appendChild(boton);
        td.append(" ");
        td.appendChild(botondos);
        td.append(" ");
        td.appendChild(botontres);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable();
      });
    }
  })
}

$(document).on('click','.btn-ver-modulos', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  let headerString = header_info.replace(/ /g,"_");
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modularidades/ID/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar_modulos').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modularidades/ID/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
       console.log(data[headerString][0]);
      let re = /0/g;
      dataParse = data[headerString][0].split(',');
      console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      div.classList = "grid-box-1fr";
      for (let i = 0; i < dataParse.length; i++) {
         let nav = document.createElement("nav");
         const number = i+1
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+number+"</b>: " +dataParse[caja];
         div.appendChild(nav);

        // console.log("Aqui esta la CAJA:",caja);
         //let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
        
         //let get_cavidad = Object.getOwnPropertyNames(cavidades);
         
         //let grid = document.createElement("div");
         
         //nav.appendChild(grid);
          //span.innerHTML = `<p>${valores} </p>`;
          //grid.appendChild(span);
         //}
      }
     
      document.getElementById("informacion").appendChild(div)
      $('#mostrar_modulos').click();
    })
  }
});

$(document).on('click','.btn-delete', function(){
  var elim = $(this).parent().parent().children().first().text();
  console.log("ID a eliminar",elim);
  var opcion = confirm("¿Está seguro de que desea eliminar este registro?");
  if (opcion == true) {
    fetch(dominio+'/api/delete/'+DBEVENT+'/modularidades/'+elim,{
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
});

$(document).on('click','.btn-edit', function(){
  mv=[];
  alert_get_historial.innerHTML ="";
  var edit = $(this).parent().parent().children().next().next().next().first().text();
  var edit_id = $(this).parent().parent().children().first().text();
  console.log("Nombre de la Modularidad: ", edit);
  document.getElementById('pedidoedit').innerHTML = edit;
  document.getElementById("pedidoeditar").value = edit;
  pedido = edit;
  console.log("ID: ",edit_id);
  id = edit_id;
  fetch(dominio+"/api/get/"+DBEVENT+"/modularidades/ID/=/"+edit_id+"/_/=/_")
  .then(res=>res.json())
  .then(function (data){
    // console.log(data);
    // console.log(data.ACTIVO);
    $('#mostrar').click();
    activo = data.ACTIVO;
    if (data.ACTIVO == 1) {
      document.getElementById("activo").checked = true;
    }else{
      document.getElementById("activo").checked = false;
    }
    ///////////// MÓDULOS DE VISIÓN ////////////////
    // console.log("LOS MODULOS DE VISIÓN: ",data.MODULOS_FUSIBLES);
    var datavision = data.MODULOS_FUSIBLES;
    // console.log(datavision);
    var keysvision = Object.keys(datavision);
    // console.log(keysvision);
    for (var i = 0; i < keysvision.length; i++) {
      keysvision[i]
      // console.log("Esto es lo que pasa en el for de datavision", keysvision[i]);
      // console.log(datavision[keysvision[i]]);
      // console.log(datavision[keysvision[i]].split(","));
      var array_modulos = datavision[keysvision[i]].split(",");
      // console.log(array_modulos)
      for (var i = 0; i < array_modulos.length; i++) {
        mv.push(array_modulos[i])
      }
      // console.log("Este es el valor del array de mv",mv)
      document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
    }
  })
  .catch(function(err) {
    console.log(err);
  });

  mostrar_modulos_vision();
});

$(document).on('click','.btn-ver', function(){
  var edit_id = $(this).parent().parent().children().first().text();
  var edit= $(this).parent().parent().children().next().next().next().first().text();
  id = edit_id;
  console.log("Nombre del Módulo: ", edit);
  console.log("Id de Módulo: ",edit_id);
  sessionStorage.setItem("modularidad", edit);
  location.href = "preview.html";
});

///////////// Función que se ejecuta al oprimir "Guardar" en la ventana de edición ///////////////////////
function guardar_edit(){
  var mod_fusibles = mv;
  var mod_f=mod_fusibles.toString();
  // console.log(mod_f);

  const newPost = {
    "DBEVENT": DBEVENT,
    "MODULARIDAD": pedido_editar_final,
    "MODULOS_FUSIBLES": mod_f,
    "ACTIVO":activo,
    "FECHA": "AUTO"
  }
  // console.log(newPost);
  if (mod_fusibles.length===0) {
    alert("Necesita llenar todos los campos correspondientes.");
  } else{
    if (ref =="no valido") {
      alert('Para insertar un número de pedido correctamente asegúrese de agregar la referencia "ILX", "IRX" o "Z" al inicio.');
    }else{
      if (historial=="") {
        fetch(dominio+'/api/update/modularidades/'+id,{
          method: 'POST',
          body: JSON.stringify(newPost),
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          console.log(data);
          location.href = "edit.html";
        })
      } else{
        alert("El número de parte ya existe");
      }
    }
  }
}

function mostrar_modulos_vision(){
  document.getElementById("modulos_vision").innerHTML = "<option value='"+"'>Seleccione un modulo de vision..."+"</option>";
  //modulos de vision
  var miSelectT = document.getElementById("modulos_vision")[0];
  fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data.MODULO);
    var array = data.MODULO
    for (var i = 0; i < array.length; i++) {
      var aTag = document.createElement('option');
      aTag.text=array[i]
      document.getElementById("modulos_vision").innerHTML += "<option value='"+array[i]+"'>"+array[i]+"</option>";
    }
  })
  //modulos de vision
}

function agregarmodulov(){
  if (document.getElementById("modulos_vision").value==="Seleccione un modulo de vision..."){
    console.log("Seleccione un modulo")
  }
  else{
    var i = mv.indexOf( document.getElementById("modulos_vision").value );
    if (i === -1){
      // console.log(document.getElementById("modulos_vision").value)
      mv.push(document.getElementById("modulos_vision").value)
      // console.log(mv)
      document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
    }
  }
}
function quitarmodulov(){
  var i = mv.indexOf( document.getElementById("modulos_vision").value );
  if (i !== -1){
    mv.splice( i, 1 );
  }
  // console.log(mv)
  document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
}

function clearmodulov(){
  mv = [];
  // console.log(mv)
  document.getElementById('arreglomv').innerHTML= "Módulos de visión agregados:   "+mv ;
}

function get_valid_pedido(e){
	e = e || window.event;
	if (e.keyCode == 13)
	{
    historial="";
    ref = "";
    pedidoeditar = document.getElementById("pedidoeditar").value;
    // console.log(pedidoeditar);
    if(pedidoeditar!=""){
      var split_pedido_editar = pedidoeditar.split(" ");
      // console.log("Aqui está el split: ",split_pedido_editar);
      for (var i = 0; i < split_pedido_editar.length; i++) {
        // console.log(split_pedido_editar[i]);
        var ILX = split_pedido_editar[i].indexOf("ILX")
        var IRX = split_pedido_editar[i].indexOf("IRX")
        var Z = split_pedido_editar[i].indexOf("Z")
        // console.log("INDEX OF STRING",ILX);

        if (ILX == -1) {
          document.getElementById("pedidoeditar").value = ""
          // console.log("no está el ILX");
          historial="";
          ref = "no valido";
          alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
          // console.log(historial)
        } else{
          // console.log("SI ESCRIBIÓ ILX");
          pedido_editar_final = split_pedido_editar[i];
          endpoint=dominio+'/api/get/'+DBEVENT+'/modularidades/modularidad/=/'+split_pedido_editar[i]+'/_/_/_'
          // console.log(endpoint)
          fetch(endpoint,{
            method: 'GET',
            headers:{
              "Content-type": "application/json"
            }
          }).then(res=>res.json())
          .then(function (data){
            // console.log(data);
            // console.log("ITEMS: ",data.items);
            if (data.items != 0){
              if (document.getElementById("pedidoedit").textContent == data.MODULARIDAD[0]) {
                // console.log("COINCIDENCIAAAAAAAA")
                historial="";
                ref = "";
                alert_get_historial.innerHTML = "";
              }else{
                historial="si existe";
                ref = "";
                alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido_editar[i]+'" ya existe</div>'
                // console.log(historial)
              }
            }else{
              // console.log("NO EXISTE EL REGISTRO")
              historial="";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
              // console.log(historial)
            }
          })
          .catch(function(err) {
          });
          ref = "";
          alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El número de parte "'+split_pedido_editar[i]+'" no existe</div>'
          document.getElementById("pedidoeditar").value = split_pedido_editar[i]
          break;
        }
        // PARA IRX
        if (IRX == -1) {
          document.getElementById("pedidoeditar").value = ""
          // console.log("no está el IRX");
          historial="";
          ref = "no valido";
          alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
          // console.log(historial)
        } else{
          // console.log("SI ESCRIBIÓ IRX");
          pedido_editar_final = split_pedido_editar[i];
          endpoint=dominio+'/api/get/'+DBEVENT+'/modularidades/modularidad/=/'+split_pedido_editar[i]+'/_/_/_'
          // console.log(endpoint)
          fetch(endpoint,{
            method: 'GET',
            headers:{
              "Content-type": "application/json"
            }
          }).then(res=>res.json())
          .then(function (data){
            // console.log(data);
            // console.log("ITEMS: ",data.items);
            if (data.items != 0){
              if (document.getElementById("pedidoedit").textContent == data.MODULARIDAD[0]) {
                // console.log("COINCIDENCIAAAAAAAA")
                historial="";
                ref = "";
                alert_get_historial.innerHTML = "";
              }else{
                historial="si existe";
                ref = "";
                alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido_editar[i]+'" ya existe</div>'
                // console.log(historial)
              }
            }else{
              // console.log("NO EXISTE EL REGISTRO")
              historial="";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
              // console.log(historial)
            }
          })
          .catch(function(err) {
          });
          ref = "";
          alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El número de parte "'+split_pedido_editar[i]+'" no existe</div>'
          document.getElementById("pedidoeditar").value = split_pedido_editar[i]
          break;
        }
        // PARA Z
        if (Z == -1) {
          document.getElementById("pedidoeditar").value = ""
          // console.log("no está el Z");
          historial="";
          ref = "no valido";
          alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX" o "Z" no válida</div>'
          // console.log(historial)
        } else{
          // console.log("SI ESCRIBIÓ Z");
          pedido_editar_final = split_pedido_editar[i];
          endpoint=dominio+'/api/get/'+DBEVENT+'/modularidades/modularidad/=/'+split_pedido_editar[i]+'/_/_/_'
          // console.log(endpoint)
          fetch(endpoint,{
            method: 'GET',
            headers:{
              "Content-type": "application/json"
            }
          }).then(res=>res.json())
          .then(function (data){
            // console.log(data);
            // console.log("ITEMS: ",data.items);
            if (data.items != 0){
              if (document.getElementById("pedidoedit").textContent == data.MODULARIDAD[0]) {
                // console.log("COINCIDENCIAAAAAAAA")
                historial="";
                ref = "";
                alert_get_historial.innerHTML = "";
              }else{
                historial="si existe";
                ref = "";
                alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido_editar[i]+'" ya existe</div>'
                // console.log(historial)
              }
            }else{
              // console.log("NO EXISTE EL REGISTRO")
              historial="";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
              // console.log(historial)
            }
          })
          .catch(function(err) {
          });
          ref = "";
          alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El número de parte "'+split_pedido_editar[i]+'" no existe</div>'
          document.getElementById("pedidoeditar").value = split_pedido_editar[i]
          break;
        }
      }
    }
  }
}

function get_valid_pedido_1(){
  //console.log("get_pedido")
  historial="";
  ref = "";
  pedidoeditar = document.getElementById("pedidoeditar").value;
  // console.log(pedidoeditar) 
  if(pedidoeditar!=""){
    var split_pedido_editar = pedidoeditar.split(" ");
    // console.log("Aqui está el split: ",split_pedido_editar);
    for (var i = 0; i < split_pedido_editar.length; i++) {
      // console.log(split_pedido_editar[i]);
      var ILX = split_pedido_editar[i].indexOf("ILX")
      var IRX = split_pedido_editar[i].indexOf("IRX")
      var Z = split_pedido_editar[i].indexOf("Z")
      // console.log("INDEX OF STRING",ILX);

      if (ILX == -1) {
        // console.log("no está el ILX");
        historial="";
        ref = "no valido";
        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia ILX no válida</div>'
        // console.log(historial)
      } else{
        // console.log("SI ESCRIBIÓ ILX");
        pedido_editar_final = split_pedido_editar[i];
        endpoint=dominio+'/api/get/'+DBEVENT+'/modularidades/modularidad/=/'+split_pedido_editar[i]+'/_/_/_'
        // console.log(endpoint)
        fetch(endpoint,{
          method: 'GET',
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          // console.log(data);
          // console.log("ITEMS: ",data.items);
          if (data.items != 0){
            if (document.getElementById("pedidoedit").textContent == data.MODULARIDAD[0]) {
              // console.log("COINCIDENCIAAAAAAAA")
              historial="";
              ref = "";
              alert_get_historial.innerHTML = "";
            }else{
              historial="si existe";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido_editar[i]+'" ya existe</div>'
              // console.log(historial)
            }
          }else{
            // console.log("NO EXISTE EL REGISTRO")
            historial="";
            ref = "";
            alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
            // console.log(historial)
          }
        })
        .catch(function(err) {
          console.log(err)
        });
        ref = "";
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
        break;
      }
      // PARA IRX
      if (IRX == -1) {
        // console.log("no está el IRX");
        historial="";
        ref = "no valido";
        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX o "Z" no válida</div>'
        // console.log(historial)
      } else{
        // console.log("SI ESCRIBIÓ IRX");
        pedido_editar_final = split_pedido_editar[i];
        endpoint=dominio+'/api/get/'+DBEVENT+'/modularidades/modularidad/=/'+split_pedido_editar[i]+'/_/_/_'
        // console.log(endpoint)
        fetch(endpoint,{
          method: 'GET',
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          // console.log(data);
          // console.log("ITEMS: ",data.items);
          if (data.items != 0){
            if (document.getElementById("pedidoedit").textContent == data.MODULARIDAD[0]) {
              // console.log("COINCIDENCIAAAAAAAA")
              historial="";
              ref = "";
              alert_get_historial.innerHTML = "";
            }else{
              historial="si existe";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido_editar[i]+'" ya existe</div>'
              // console.log(historial)
            }
          }else{
            // console.log("NO EXISTE EL REGISTRO")
            historial="";
            ref = "";
            alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
            // console.log(historial)
          }
        })
        .catch(function(err) {
          console.log(err)
        });
        ref = "";
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
        break;
      }
      // PARA Z
      if (Z == -1) {
        // console.log("no está el Z");
        historial="";
        ref = "no valido";
        alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia "ILX", "IRX o "Z" no válida</div>'
        // console.log(historial)
      } else{
        // console.log("SI ESCRIBIÓ Z");
        pedido_editar_final = split_pedido_editar[i];
        endpoint=dominio+'/api/get/'+DBEVENT+'/modularidades/modularidad/=/'+split_pedido_editar[i]+'/_/_/_'
        // console.log(endpoint)
        fetch(endpoint,{
          method: 'GET',
          headers:{
            "Content-type": "application/json"
          }
        }).then(res=>res.json())
        .then(function (data){
          // console.log(data);
          // console.log("ITEMS: ",data.items);
          if (data.items != 0){
            if (document.getElementById("pedidoedit").textContent == data.MODULARIDAD[0]) {
              // console.log("COINCIDENCIAAAAAAAA")
              historial="";
              ref = "";
              alert_get_historial.innerHTML = "";
            }else{
              historial="si existe";
              ref = "";
              alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido_editar[i]+'" ya existe</div>'
              // console.log(historial)
            }
          }else{
            // console.log("NO EXISTE EL REGISTRO")
            historial="";
            ref = "";
            alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
            // console.log(historial)
          }
        })
        .catch(function(err) {
          console.log(err)
        });
        ref = "";
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido_editar[i]+'" no existe</div>'
        break;
      }
    }
  }
}

function mayuscula(elemento){
  let texto = elemento.value;
  elemento.value = texto.toUpperCase();
}

function comprobaractivo(obj){
  if (obj.checked){
    activo = 1;
  } else{
    activo = 0;
  }
  // console.log("Valor de activo: ",activo);
}