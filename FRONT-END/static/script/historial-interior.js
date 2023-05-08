////////////// VARIABLES GLOBALES /////////////////////
var formusuario = document.getElementById('formusuario');
var formparte = document.getElementById('formparte');
var alertaadd = document.getElementById('alertaadd');
var alertaaddparte = document.getElementById('alertaaddparte');
var alerta = document.getElementById('alerta');
var flagusuario = true;
var flagpass = true;
var descarga;
var mv=[];
var mt=[];
var vf=[];
// for vision of pdcr
var array_pdcr_sections =["A1","A2","A3","S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11"];
var array_pdcr_sections_size =[6,6,6,6,6,6,3,6,10,10,3,6,6,3];
var array_pdcr_final=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0]]
var pdcr_vision=[]

// for vision of pdcs
var array_pdcs_sections =["A1"];
var array_pdcs_sections_size =[6];
var array_pdcs_final=[[0,0,0,0,0,0]]
var pdcs_vision=[]

//for vision of tb_lu
var array_bt_lu_sections =["A1"];
var array_bt_lu_sections_size =[9];
var array_bt_lu_final=[[0,0,0,0,0,0,0,0,0]]
var bt_lu_vision=[]

//for vision of pdcd
var array_pdcd_sections =["A1","A2","S1","S2"];
var array_pdcd_sections_size =[9,8,10,6];
var array_pdcd_final=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0]]
var pdcd_vision=[]

//for vision of pdcp
var array_pdcp_sections =["A1","A2","A3","S1","S2","E2"];
var array_pdcp_sections_size =[6,8,10,6,6,2];
var array_pdcp_final=[[0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0]]
var pdcp_vision=[]

//for torque of mfb
var mfb_size=6
var array_mfb_final=[0,0,0,0,0,0]
var mfb_torque=[]
var mfb_master=[0,8,8,8,8,0]
//for torque of mfbp1
var mfbp1_size=11
var array_mfbp1_final=[0,0,0,0,0,0,0,0,0,0,0]
var mfbp1_torque=[]
var mfbp1_master=[8,8,8,8,0,8,8,8,8,0,0]
//for torque of bt
var bt_size=1
var array_bt_final=[0]
var bt_torque=[]
var bt_master=[8]
//

var temp_array=[]

//--------------------------
var pedido_id=0
var historial={}
var index_historial=0

// variables del pedido
var no_ciclo=0
var pedido=""
var resultado=0
var vision={}
var torque={}
var altura={}
var inicio_ciclo=""
var fin_ciclo=""
var usuario=0
var comentario=""
var name_usuario=""

var caja_pdcr=""
// vision
var pdcr_v=[];
var pdcs_v=[];
var tblu_v=[];
var pdcd_v=[];
var pdcp_v=[];

//altura
var pdcr_a=[]
var pdcs_a=[]
var tblu_a=[]
var pdcd_a=[]
var pdcp_a=[]

//torque
var pdcp_t=[]
var pdcd_t=[]
var mfbp1_t=[]
var mfb_t=[]
var mfbp2_t=[]
var pdcr_t=[]
var bt_t=[]

var pdcp_t_val=[]
var pdcd_t_val=[]
var mfbp1_t_val=[]
var mfb_t_val=[]
var mfbp2_t_val=[]
var pdcr_t_val=[]
var bt_t_val=[]

var name_img_general=""
var temporal_text=""

var pdcr_v_db={}
var pdcs_v_db={}
var tblu_v_db={}
var pdcd_v_db={}
var pdcp_v_db={}
var pdcp_t_db={}
var pdcd_t_db={}
var mfbp1_t_db={}
var mfb_t_db={}
var mfbp2_t_db={}
var pdcr_t_db={}
var bt_t_db={}
//---------------------------
// console.log("Array de visión: ",pdcr_v);
// console.log("Array de visión: ",pdcs_v);
// console.log("Array de visión: ",tblu_v);
// console.log("Array de visión: ",pdcd_v);
// console.log("Array de visión: ",pdcp_v);
// console.log("Array de texto de torque: ",pdcp_t);
// console.log("Array de texto de torque: ",pdcd_t);
// console.log("Array de texto de torque: ",mfbp1_t);
// console.log("Array de texto de torque: ",mfb_t);
// console.log("Array de texto de torque: ",mfbp2_t);
// console.log("Array de texto de torque: ",pdcr_t);
// console.log("Array de texto de torque: ",bt_t);
// console.log("Array de valor Torque: ",pdcp_t_val);
// console.log("Array de valor Torque: ",pdcd_t_val);
// console.log("Array de valor Torque: ",mfbp1_t_val);
// console.log("Array de valor Torque: ",mfb_t_val);
// console.log("Array de valor Torque: ",mfbp2_t_val);
// console.log("Array de valor Torque: ",pdcr_t_val);
// console.log("Array de valor Torque: ",bt_t_val);

$('#pedido').on('keypress', function(e) {
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13) { 
		e.preventDefault();
		pedido = document.getElementById("pedido").value;
		// console.log(pedido)	
		if(pedido!=""){
			var split_pedido = pedido.split(" ");
			// console.log("Aqui está el split: ",split_pedido);
			for (var i = 0; i < split_pedido.length; i++) {
				// console.log(split_pedido[i]);
				var HM = split_pedido[i].indexOf("HM")
				// console.log("INDEX OF STRING",HM);

				if (HM == -1) {
					// console.log("no está el HM");
					historial={};
					alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia HM no válida</div>';
					document.getElementById("descarga").innerHTML = "";
					document.getElementById("historial_option_date").style="display: none;";
					document.getElementById("pedido_seleccionado").style.display="none";
					mostrar_text_inicial();
					ocultar_imagenes();
					// console.log(historial)
				} else{
					// console.log("SI ESCRIBIÓ HM");
					endpoint=dominio+'/api/get/historial/HM/=/'+split_pedido[i]+'/RESULTADO/=/BUENO'
					// console.log(endpoint)
					fetch(endpoint,{
						method: 'GET',
						headers:{
							"Content-type": "application/json"
						}
					}).then(res=>res.json())
					.then(function (data){
						// console.log("data: ", data);
						// console.log("data.items: ", data.items);
						historial=data
						if (historial.items == 0) {
							alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido[i]+'" no tiene historial</div>';
							document.getElementById("descarga").innerHTML = "";
							document.getElementById("historial_option_date").style="display: none;";
							document.getElementById("pedido_seleccionado").style.display="none";
							mostrar_text_inicial();
							ocultar_imagenes();
						}else{
							alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido[i]+'" si tiene historial</div>';
							document.getElementById("historial_option_date").style="display: block;";
							load_historial();
							descarga = split_pedido[i];
							descargar();
						}
					})
					.catch(function(err) {
					});	
					document.getElementById("pedido").value = split_pedido[i];
					break;
				}
			}
		}
	}
});

function get_valid_pedido_1(){
	pedido = document.getElementById("pedido").value;
	// console.log(pedido)	
	if(pedido!=""){
		var split_pedido = pedido.split(" ");
		// console.log("Aqui está el split: ",split_pedido);
		for (var i = 0; i < split_pedido.length; i++) {
			// console.log(split_pedido[i]);
			var HM = split_pedido[i].indexOf("HM")
			// console.log("INDEX OF STRING",HM);

			if (HM == -1) {
				// console.log("no está el HM");
				historial={};
				alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia HM no válida</div>';
				document.getElementById("descarga").innerHTML = "";
				document.getElementById("historial_option_date").style="display: none;";
				document.getElementById("pedido_seleccionado").style.display="none";
				mostrar_text_inicial();
				ocultar_imagenes();
				// console.log(historial)
			} else{
				// console.log("SI ESCRIBIÓ HM");
				endpoint=dominio+'/api/get/historial/HM/=/'+split_pedido[i]+'/RESULTADO/=/BUENO'
				// console.log(endpoint)
				fetch(endpoint,{
					method: 'GET',
					headers:{
						"Content-type": "application/json"
					}
				}).then(res=>res.json())
				.then(function (data){
					// console.log("data: ", data);
					// console.log("data.items: ", data.items);
					historial=data
					if (historial.items == 0) {
						alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+split_pedido[i]+'" no tiene historial</div>';
						document.getElementById("descarga").innerHTML = "";
						document.getElementById("historial_option_date").style="display: none;";
						document.getElementById("pedido_seleccionado").style.display="none";
						mostrar_text_inicial();
						ocultar_imagenes();
					}else{
						alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+split_pedido[i]+'" si tiene historial</div>';
						document.getElementById("historial_option_date").style="display: block;";
						load_historial();
						descarga = split_pedido[i];
						descargar();
					}
				})
				.catch(function(err) {
				});	
				break;
			}
		}
	}
}

function descargar(){
	document.getElementById("descarga").innerHTML = "";
	endpoint=dominio+'/api/get/historial/HM/=/'+descarga+'/resultado/=/BUENO';
	// console.log(endpoint)
	fetch(endpoint,{
		method: 'GET',
		headers:{
			"Content-type": "application/json"
		}
	}).then(res=>res.json())
	.then(function (data){
		// console.log(data);
		// console.log("el inicio data: ",data.INICIO);
		if (Array.isArray(data.INICIO) == true) {
			var colnames = Object.keys(data);
			// console.log("Colnames: ",colnames);
			var filas = data[colnames[0]].length;
			// console.log("Resultado: ",filas);
		    //CREACIÓN DE TABLA
		    var myTableDiv = document.getElementById("descarga");
		    var table = document.createElement('TABLE');
		    var tableBody = document.createElement('TBODY');
		    var Encabezados = document.createElement('THEAD');

		    table.id = "myTable";
		    table.style.display="none";
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
		    		dom: 'B',
		    		buttons: [
		    		{
		    			extend: 'excelHtml5',
		    			text: '<i class="fas fa-file-excel"></i>',
		    			titleAttr: 'Exportar a Excel',
		    			className: 'btn btn-success',
		    		}/*,
		    		{
		    			extend: 'pdfHtml5',
		    			text: 'PDF',
		    			titleAttr: 'Exportar a PDF',
		    			className: 'btn btn-danger',
		    		},
		    		{
		    			extend: 'print',
		    			text: 'Imprimir',
		    			titleAttr: 'Imprimir',
		    			className: 'btn btn-info',
		    		}*/
		    		]
		    	});
		    } );
		} else{
			var colnames = Object.keys(data);
			// console.log("Colnames: ",colnames);
			var filas = data[colnames[0]];
			// console.log("Resultado: ",filas);
		    //CREACIÓN DE TABLA
		    var myTableDiv = document.getElementById("descarga");
		    var table = document.createElement('TABLE');
		    var tableBody = document.createElement('TBODY');
		    var Encabezados = document.createElement('THEAD');

		    table.id = "myTable";
		    table.style.display="none";
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
		    //FILAS DE LA TABLA
		    for (i = 0; i < 1; i++) {
		    	var tr = document.createElement('TR');
		    	for (j = 0; j < colnames.length; j++) {
		    		var td = document.createElement('TD')
		    		td.appendChild(document.createTextNode(data[colnames[j]]));
		    		tr.appendChild(td)
		    	}
		    	tableBody.appendChild(tr);
		    }
		    myTableDiv.appendChild(table);
		    $(document).ready(function() {
		    	$('#myTable').DataTable({
		    		dom: 'B',
		    		buttons: [
		    		{
		    			extend: 'excelHtml5',
		    			text: 'Excel',
		    			titleAttr: 'Exportar a Excel',
		    			className: 'btn btn-success',
		    		}/*,
		    		{
		    			extend: 'pdfHtml5',
		    			text: 'PDF',
		    			titleAttr: 'Exportar a PDF',
		    			className: 'btn btn-danger',
		    		},
		    		{
		    			extend: 'print',
		    			text: 'Imprimir',
		    			titleAttr: 'Imprimir',
		    			className: 'btn btn-info',
		    		}*/
		    		]
		    	});
		    });
		}
	})
	.catch(function(err) {
	});
}

function load_historial(){
	document.getElementById("historial_option_date").innerHTML = "";
	// console.log("en load_historial")
	// console.log("historial.items: ",historial.items)
	// console.log(historial)
	// console.log(historial.INICIO);
	console.log("Cantidad de Registros encontrados: ",historial.INICIO.length);
	if (historial.INICIO.length > 1) {
		document.getElementById("historial_option_date").innerHTML += "<option>Seleccione una Fecha</option>";
		for (var i = 0; i < historial.INICIO.length; i++) {
			var aTag = document.createElement('option');
			aTag.text=historial.INICIO[i]
			document.getElementById("historial_option_date").innerHTML += "<option value='"+historial.INICIO[i]+"'>"+historial.INICIO[i]+"</option>";
		}
	} else{
		var aTag = document.createElement('option');
		aTag.text=historial.INICIO
		document.getElementById("historial_option_date").innerHTML += "<option>Se ha encontrado un solo registro</option>"+"<option value='"+historial.INICIO+"'>"+historial.INICIO+"</option>";
		// console.log("Tamaño del select: ", document.getElementById("historial_option_date").length);
	}
}

function pedido_selected(){
	pdcr_v.length=0,pdcs_v.length=0,tblu_v.length=0,pdcd_v.length=0,pdcp_v.length=0;
	pdcp_t.length=0,pdcd_t.length=0,mfbp1_t.length=0,mfb_t.length=0,mfbp2_t.length=0,pdcr_t.length=0,bt_t.length=0;
	pdcp_t_val.length=0,pdcd_t_val.length=0,mfbp1_t_val.length=0,mfb_t_val.length=0,mfbp2_t_val.length=0,pdcr_t_val.length=0,bt_t_val.length=0;
	if(document.getElementById("historial_option_date").selectedIndex>0){
		// console.log(document.getElementById("historial_option_date").selectedIndex)
		console.log(historial.INICIO[document.getElementById("historial_option_date").selectedIndex-1])
		index_historial=document.getElementById("historial_option_date").selectedIndex-1
		document.getElementById("pedido_seleccionado").style.display="block"
		ocultar_text_inicial()
		mostrar_imagenes()
		download_one_element(document.getElementById("historial_option_date").selectedIndex-1)
		get_name_usuario()
	}
	else{
		document.getElementById("pedido_seleccionado").style.display="none";
		ocultar_imagenes();
	}
}

function ocultar_text_inicial(){
	document.getElementById("text_init_vision").style.display="none"
}

function ocultar_imagenes(){
	document.getElementById("vision_result").style.display="none"
}

function mostrar_text_inicial(){
	document.getElementById("text_init_vision").style.display="block"
}

function mostrar_imagenes(){
	// console.log(pdcr_v);
	// console.log(pdcs_v);
	// console.log(tblu_v);
	// console.log(pdcd_v);
	// console.log(pdcp_v);
	document.getElementById("vision_result").style.display="block"
}

function download_one_element(i){
	// console.log("AQUIIII",historial)
	// console.log("AQUIIII",historial.FUSIBLES[i])
	no_ciclo=historial.ID[i]
	pedido=historial.HM[i]
	resultado=historial.RESULTADO[i]
	fusibles=JSON.parse(historial.FUSIBLES[i])
	inicio_ciclo=historial.INICIO[i]
	fin_ciclo=historial.FIN[i]
	usuario=historial.USUARIO[i]
	// console.log("Este es el JSON parse de fusibles",fusibles);
	// console.log("Keys fusibles", Object.keys(fusibles));
}

// function download_one_element_2(){
// 	no_ciclo=historial.ID
// 	pedido=historial.HM
// 	resultado=historial.RESULTADO
// 	fusibles=JSON.parse(historial.FUSIBLES)
// 	inicio_ciclo=historial.INICIO
// 	fin_ciclo=historial.FIN
// 	usuario=historial.USUARIO
// 	// console.log("Este es el JSON parse de fusibles",fusibles);
// 	// console.log("Keys fusibles", Object.keys(fusibles));
// }

function get_name_usuario(){
	// console.log("Usuario String: ",usuario);
	let operador = usuario.split(": ")
	console.log("Nombre del usuario: ",operador[1]);
	name_usuario= operador[1];
	put_text_pedido();
}

function put_text_pedido(){
	document.getElementById("pedido_seleccionado").innerHTML="El pedido inició  " +inicio_ciclo+" y terminó "+fin_ciclo+", el operador fue "+name_usuario;
	// console.log(fusibles)
	get_vectors_from_db()
}

function get_historial_maq_1(){

}

function get_historial_maq_2(){

}

function get_vectors_from_db(){
	var pdcr = Object.keys(fusibles).indexOf("PDC-R");
	var pdcs = Object.keys(fusibles).indexOf("PDC-S");
	var tblu = Object.keys(fusibles).indexOf("TBLU");
	var pdcd = Object.keys(fusibles).indexOf("PDC-D");
	var pdcp = Object.keys(fusibles).indexOf("PDC-P");
	var pdcrmid = Object.keys(fusibles).indexOf("PDC-RMID");
	// console.log("Posición del PDC-R: ", pdcr);
	// console.log("Posición del PDC-S: ", pdcs);
	// console.log("Posición del TBLU: ", tblu);
	// console.log("Posición del PDC-D: ", pdcd);
	// console.log("Posición del PDC-P: ", pdcp);
	// console.log("Posición del PDC-RMID: ", pdcrmid);
	// console.log(fusibles[Object.keys(fusibles)[pdcr]]);
	// console.log(fusibles[Object.keys(fusibles)[pdcs]]);
	// console.log(fusibles[Object.keys(fusibles)[tblu]]);
	// console.log(fusibles[Object.keys(fusibles)[pdcd]]);
	// console.log(fusibles[Object.keys(fusibles)[pdcp]]);
	// console.log(fusibles[Object.keys(fusibles)[pdcrmid]]);
	caja_pdcr="pdcr"
	pdcr_v_db=fusibles[Object.keys(fusibles)[pdcr]];
	pdcs_v_db=fusibles[Object.keys(fusibles)[pdcs]];
	tblu_v_db=fusibles[Object.keys(fusibles)[tblu]];
	pdcd_v_db=fusibles[Object.keys(fusibles)[pdcd]];
	pdcp_v_db=fusibles[Object.keys(fusibles)[pdcp]];
	write_the_arrays()
}

function write_the_arrays(){
	//generar_name_imagenes() //funcion para generar las imagenes desde la API
	generar_imagenes(); //funcion para generar imagenes desde drawing_interior_imgs.js
	// poner_text_t()
}
