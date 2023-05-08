function cleardiv(){
    document.getElementById("tabla").innerHTML = "";
  }
lista_insercion()
//lista_vision()
  ///////////////////// Cargar Registros de insercions a servidor /////////////////////
  function lista_insercion(){
    cleardiv();
    fetch(dominio+"/api/get/historial/id/>/0/resultado/=/BUENO")
    .then(data=>data.json())
    .then(data=>{
      console.log(data);
      if (data.items == 0) {
        console.log("Sin registro alguno");
        document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
      }else{
        document.getElementById("cargar_todo_vision").style.display = "none";
        document.getElementById("cargar_todo_insercion").style.display = "inline-block";
        var colnames = Object.keys(data);
        colnames.splice(colnames.indexOf("FUSIBLES"),1);
        colnames.splice(colnames.indexOf("FIN"),0,"ID");
        colnames.splice(colnames.indexOf("FIN"),0,"HM");
        colnames.splice(colnames.indexOf("FIN"),0,"INICIO");
        colnames.splice(colnames.lastIndexOf("HM"),9);
        

        // colnames.splice(colnames.indexOf("FIN"),0,"ID");
        // colnames.splice(colnames.indexOf("FIN"),0,"ID");
        console.log("Columnas: ", colnames);
        var filas = data[colnames[1]].length;
        console.log("Num de Registros:",filas);
        console.log(data[colnames[7]]);
  
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
          var th = document.createElement('TH')
          th.width = '100';
          th.appendChild(document.createTextNode(colnames[i]));
          //console.log(th)
          tr.appendChild(th).style.backgroundColor="#0DBED6";
        }
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode('Cargar'));
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
          var cargar_insercion = document.createElement('i');
          cargar_insercion.classList.add("fas");
          cargar_insercion.classList.add("fa-file-upload");
          boton.title = 'Cargar Registro';
          boton.classList.add('btn');
          boton.classList.add('btn-warning');
          boton.classList.add('btn-cargar_insercion');
          boton.appendChild(cargar_insercion);
          td.appendChild(boton);
          tr.appendChild(td)
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function() {
          $('#myTable').DataTable({
            responsive:true
          });
        });
      }
    })
  }
  
  $(document).on('click','.btn-cargar_insercion', function(){
    let idTrazabilidad = $(this).parent().parent().children().first().text();
    let HM = $(this).parent().parent().children().first().next().text();
    let idSeghm;
    let newPost;
    console.log("HM: ", HM);
    console.log("Id de HM: ",idTrazabilidad);
  
    fetch(dominio+"/api/get/historial/ID/=/"+idTrazabilidad+"/_/_/_")
    .then(data=>data.json())
    .then(data=>{
      console.log("Data de Trazabilidad Local: ",data);
      console.log(data.INICIO);
      console.log(data.FIN);
      let entinsercion = new Date(data.INICIO).getUTCFullYear()+"-"+new Date(data.INICIO).getUTCMonth()+"-"+new Date(data.INICIO).getUTCDate()+" "+new Date(data.INICIO).getUTCHours()+":"+new Date(data.INICIO).getUTCMinutes()+":"+new Date(data.INICIO).getUTCSeconds()
      let salinsercion = new Date(data.FIN).getUTCFullYear()+"-"+new Date(data.FIN).getUTCMonth()+"-"+new Date(data.FIN).getUTCDate()+" "+new Date(data.FIN).getUTCHours()+":"+new Date(data.FIN).getUTCMinutes()+":"+new Date(data.FIN).getUTCSeconds()
      newPost = {
        "ENTINSERCION": entinsercion,
          "SALINSERCION": salinsercion,
          "NAMEINSERCION": "EIAF-MBI-1"
      }
      fetch(dominio+"/seghm/get/seghm/HM/=/"+HM+"/_/_/_")
      .then(data=>data.json())
      .then(data=>{
        console.log("Data de SEGHM: ",data);
        if (data.items == 0){
          console.log("No hay nada SEGHM")
        }else{
          console.log("Es un array?:",(data.id.length > 1) )
          // Si existen más de un HM en el servidor:
          if (data.id.length > 1) {
            console.log("HM Redundante en el servidor: ",HM)
          }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
            console.log("REFERENCIAAAAAA: ",data.REFERENCIA)
            if (data.REFERENCIA[0].includes("ILX") || data.REFERENCIA[0].includes("IRX")) {
              console.log("SI ES UN ILX!!!")          
              idSeghm = data.id
              console.log("ID en SEGHM: ",idSeghm[0])
              console.log("NewPost que se envía: ",newPost)
              return fetch(dominio+'/seghm/update/seghm/'+idSeghm,{
                method: 'POST',
                body: JSON.stringify(newPost),
                headers:{
                  "Content-type": "application/json"
                }
              })
              .then(res=>res.json())
              .then(function (data){
                console.log("Data del Update: ",data);
              })
            }
          }
  
        }
        
      })
    })
  
    
  });
  
  /////// Al presionar el Botón de Cargar Todo
  $(document).on('click','#cargar_todo_insercion', function(){
    console.log("Click en cargar todos los registros de insercion!")
  
    fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/BUENO")
    .then(data=>data.json())
    .then(data=>{
      console.log("Data de Historial insercion Local: ",data);
      console.log("Data ID de Historial insercion Local: ",data.ID);
      let totalRegistros = data.ID
      console.log("Cantidad Total de Registros de Historial insercion Local: ",totalRegistros.length);
      for (let i = 0; i < totalRegistros.length; i++) {
        let entinsercion;
        let salinsercion;
        // console.log("ID: ",totalRegistros[i]);
        // console.log("HM: ",data.HM[i]);
        // console.log("INICIO: ",data.INICIO[i]);
        // console.log("FIN: ",data.FIN[i]);
  
        entinsercion = new Date(data.INICIO[i]).getUTCFullYear()+"-"+new Date(data.INICIO[i]).getUTCMonth()+"-"+new Date(data.INICIO[i]).getUTCDate()+" "+new Date(data.INICIO[i]).getUTCHours()+":"+new Date(data.INICIO[i]).getUTCMinutes()+":"+new Date(data.INICIO[i]).getUTCSeconds()
        salinsercion = new Date(data.FIN[i]).getUTCFullYear()+"-"+new Date(data.FIN[i]).getUTCMonth()+"-"+new Date(data.FIN[i]).getUTCDate()+" "+new Date(data.FIN[i]).getUTCHours()+":"+new Date(data.FIN[i]).getUTCMinutes()+":"+new Date(data.FIN[i]).getUTCSeconds()
        newPost = {
          "ENTINSERCION": entinsercion,
          "SALINSERCION": salinsercion,
          "NAMEINSERCION": "EIAF-MBI-1"
        }
        enviarInfo_t(data.HM[i],newPost);     
      }
      
    })
  
    function enviarInfo_t(x,y){
      // console.log("X: ",x)
      // console.log("Y: ",y)
      fetch(dominio+"/seghm/get/seghm/HM/=/"+x+"/_/_/_")
      .then(data=>data.json())
      .then(data=>{
         console.log("Data de SEGHM: ",data);
        if (data.items == 0){
          console.log("No hay nada SEGHM")
        }else{
          // console.log("Es un array?:",Array.isArray(data.id))
          // Si existen más de un HM en el servidor:
          if (data.id.length > 1) {
            console.log("HM Redundante en el servidor: ",x)
          }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
           // console.log(data["REFERENCIA"][0].includes("ILX"))
            if (data.REFERENCIA[0].includes("ILX") | data.REFERENCIA[0].includes("IRX")) {
               console.log("Si pertenece a Interior") 
               idSeghm = data.id
               console.log("ID en SEGHM: ",idSeghm)
               console.log("NewPost que se envía: ",y)
  
              return fetch(dominio+'/seghm/update/seghm/'+idSeghm,{
                method: 'POST',
                body: JSON.stringify(y),
                headers:{
                  "Content-type": "application/json"
                }
              })
              .then(res=>res.json())
              .then(function (data){
                 console.log("Data del Update: ",data);
              })
            }else{
              console.log("El registro no se actualizó por que no es un ILX: ",data.id,x,data.REFERENCIA)
            }
          }
  
        }
        
      })
    }
  
    
    
  });
  
//   ///////////////////// Cargar Registros de Visión a servidor /////////////////////
//   function lista_vision(){
//     cleardiv();
//     fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/2")
//     .then(data=>data.json())
//     .then(data=>{
//       console.log(data);
//       if (data.items == 0) {
//         console.log("Sin registro alguno");
//         document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
//       }else{
//         document.getElementById("cargar_todo_insercion").style.display = "none";
//         document.getElementById("cargar_todo_vision").style.display = "inline-block";
//         var colnames = Object.keys(data);
//         colnames.splice(colnames.indexOf("ALTURA"),4);
//         colnames.splice(colnames.indexOf("INICIO"),0,"HM");
//         colnames.splice(colnames.indexOf("INTENTOS_T"),9,"FIN");
//         console.log("Columnas: ", colnames);
//         var filas = data[colnames[1]].length;
//         // console.log("Num de Registros:",filas);
//         // console.log(data[colnames[7]]);
  
//         //CREACIÓN DE TABLA
//         var myTableDiv = document.getElementById("tabla");
//         var table = document.createElement('TABLE');
//         var tableBody = document.createElement('TBODY');
//         var Encabezados = document.createElement('THEAD');
  
//         table.id = "myTable";
//         table.classList.add('display');
//         table.classList.add('nowrap');
//         table.cellSpacing="0";
//         table.width="100%";
//         table.border = '2';
//         table.appendChild(Encabezados);
//         table.appendChild(tableBody);
//         tableBody.align="center";
//         //FIN DE CREACIÓN DE TABLA
  
//         //ENCABEZADOS DE LA TABLA
//         var tr = document.createElement('TR');
//         Encabezados.appendChild(tr);
//         for (i = 0; i < colnames.length; i++) {
//           var th = document.createElement('TH')
//           th.width = '100';
//           th.appendChild(document.createTextNode(colnames[i]));
//           tr.appendChild(th).style.backgroundColor="#0DBED6";
//         }
//         var th = document.createElement('TH')
//         th.width = '100';
//         th.appendChild(document.createTextNode('Cargar'));
//         tr.appendChild(th).style.backgroundColor="#0DBED6";
//         //FILAS DE LA TABLA
//         for (i = 0; i < filas; i++) {
//           var tr = document.createElement('TR');
//           for (j = 0; j < colnames.length; j++) {
//             var td = document.createElement('TD')
//             td.appendChild(document.createTextNode(data[colnames[j]][i]));
//             tr.appendChild(td)
//           }
//           var td = document.createElement('TD');
//           var boton = document.createElement('button');
//           var cargar_vision = document.createElement('i');
//           cargar_vision.classList.add("fas");
//           cargar_vision.classList.add("fa-file-upload");
//           boton.title = 'Cargar Registro';
//           boton.classList.add('btn');
//           boton.classList.add('btn-warning');
//           boton.classList.add('btn-cargar_vision');
//           boton.appendChild(cargar_vision);
//           td.appendChild(boton);
//           tr.appendChild(td)
//           tableBody.appendChild(tr);
//         }
//         myTableDiv.appendChild(table);
//         $(document).ready(function() {
//           $('#myTable').DataTable({
//             responsive:true
//           });
//         });
//       }
//     })
//   }
  
//   $(document).on('click','.btn-cargar_vision', function(){
//     let idTrazabilidad = $(this).parent().parent().children().first().text();
//     let HM = $(this).parent().parent().children().first().next().text();
//     let idSeghm;
//     let newPost;
//     console.log("HM: ", HM);
//     console.log("Id de HM: ",idTrazabilidad);
  
//     fetch(dominio+"/api/get/historial/ID/=/"+idTrazabilidad+"/_/_/_")
//     .then(data=>data.json())
//     .then(data=>{
//       console.log("Data de Historial Visión Local: ",data);
//       console.log(data.INICIO);
//       console.log(data.FIN);
//       let entvision = new Date(data.INICIO).getUTCFullYear()+"-"+new Date(data.INICIO).getUTCMonth()+"-"+new Date(data.INICIO).getUTCDate()+" "+new Date(data.INICIO).getUTCHours()+":"+new Date(data.INICIO).getUTCMinutes()+":"+new Date(data.INICIO).getUTCSeconds()
//       let salvision = new Date(data.FIN).getUTCFullYear()+"-"+new Date(data.FIN).getUTCMonth()+"-"+new Date(data.FIN).getUTCDate()+" "+new Date(data.FIN).getUTCHours()+":"+new Date(data.FIN).getUTCMinutes()+":"+new Date(data.FIN).getUTCSeconds()
//       newPost = {
//         "ENTVISION": entvision,
//         "SALVISION": salvision,
//         "NAMEVISION": "EIAF-MBI-1"
//       }
  
//       fetch(dominio+"/seghm/get/seghm/HM/=/"+HM+"/_/_/_")
//       .then(data=>data.json())
//       .then(data=>{
//         console.log("Data de SEGHM: ",data);
//         if (data.items == 0){
//           console.log("No hay nada SEGHM")
//         }else{
//           console.log("Es un array?:",Array.isArray(data.id))
//           // Si existen más de un HM en el servidor:
//           if (Array.isArray(data.id) == true) {
//             console.log("HM Redundante en el servidor: ",HM)
//           }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
//             console.log("REFERENCIAAAAAA: ",data.REFERENCIA)
//             if (data.REFERENCIA.includes("ILX") | data.REFERENCIA.includes("IRX")) {
//               console.log("SI ES UN ILX!!!")          
//               idSeghm = data.id
//               console.log("ID en SEGHM: ",idSeghm)
//               console.log("NewPost que se envía: ",newPost)
//               return fetch(dominio+'/seghm/update/seghm/'+idSeghm,{
//                 method: 'POST',
//                 body: JSON.stringify(newPost),
//                 headers:{
//                   "Content-type": "application/json"
//                 }
//               })
//               .then(res=>res.json())
//               .then(function (data){
//                 console.log("Data del Update: ",data);
//               })
//             }
//           }
//         }
//       })
  
  
//     })
  
    
//   });
  
//   /////// Al presionar el Botón de Cargar Todo
//   $(document).on('click','#cargar_todo_vision', function(){
//     console.log("Click en cargar todos los registros de VISIÓN!")
  
//     fetch(dominio+"/api/get/historial/ID/>/0/RESULTADO/=/2")
//     .then(data=>data.json())
//     .then(data=>{
//       console.log("Data de Historial Visión Local: ",data);
//       console.log("Data ID de Historial Visión Local: ",data.ID);
//       let totalRegistros = data.ID
//       console.log("Cantidad Total de Registros de Historial Visión Local: ",totalRegistros.length);
//       for (let i = 0; i < totalRegistros.length; i++) {
//         let entvision;
//         let salvision;
//         // console.log("ID: ",totalRegistros[i]);
//         // console.log("HM: ",data.HM[i]);
//         // console.log("INICIO: ",data.INICIO[i]);
//         // console.log("FIN: ",data.FIN[i]);
  
//         entvision = new Date(data.INICIO[i]).getUTCFullYear()+"-"+new Date(data.INICIO[i]).getUTCMonth()+"-"+new Date(data.INICIO[i]).getUTCDate()+" "+new Date(data.INICIO[i]).getUTCHours()+":"+new Date(data.INICIO[i]).getUTCMinutes()+":"+new Date(data.INICIO[i]).getUTCSeconds()
//         salvision = new Date(data.FIN[i]).getUTCFullYear()+"-"+new Date(data.FIN[i]).getUTCMonth()+"-"+new Date(data.FIN[i]).getUTCDate()+" "+new Date(data.FIN[i]).getUTCHours()+":"+new Date(data.FIN[i]).getUTCMinutes()+":"+new Date(data.FIN[i]).getUTCSeconds()
//         newPost = {
//           "ENTVISION": entvision,
//           "SALVISION": salvision,
//           "NAMEVISION": "EIAF-MBI-1"
//         }
//         enviarInfo_v(data.HM[i],newPost);     
//       }
      
//     })
  
//     function enviarInfo_v(x,y){
//       // console.log("X: ",x)
//       // console.log("Y: ",y)
//       fetch(dominio+"/seghm/get/seghm/HM/=/"+x+"/_/_/_")
//       .then(data=>data.json())
//       .then(data=>{
//         // console.log("Data de SEGHM: ",data);
//         if (data.items == 0){
//           console.log("No hay nada SEGHM")
//         }else{
//           // console.log("Es un array?:",Array.isArray(data.id))
//           // Si existen más de un HM en el servidor:
//           if (Array.isArray(data.id) == true) {
//             console.log("HM Redundante en el servidor: ",x)
//           }else{ // Si solo existe un HM en el servidor puede hacer el envío normalmente:
//             if (data.REFERENCIA.includes("ILX") | data.REFERENCIA.includes("IRX")) {
//               // console.log("Si pertenece a Interior") 
//               idSeghm = data.id
//               // console.log("ID en SEGHM: ",idSeghm)
//               // console.log("NewPost que se envía: ",y)
  
//               return fetch(dominio+'/seghm/update/seghm/'+idSeghm,{
//                 method: 'POST',
//                 body: JSON.stringify(y),
//                 headers:{
//                   "Content-type": "application/json"
//                 }
//               })
//               .then(res=>res.json())
//               .then(function (data){
//                 // console.log("Data del Update: ",data);
//               })
//             }else{
//               console.log("El registro no se actualizó por que no es un ILX: ",data.id,x,data.REFERENCIA)
//             }
//           }
  
//         }
        
//       })
//     }
  
    
    
//   });