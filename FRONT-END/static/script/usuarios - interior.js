////////////// VARIABLES GLOBALES /////////////////////
var formusuario = document.getElementById('formusuario');
var form_numeros = document.getElementById('form_numeros');
var alertaadd = document.getElementById('alertaadd');
var alertaaddparte = document.getElementById('alertaaddparte');
var alerta = document.getElementById('alerta');
var flagusuario;
var flagpass;
var activo = 1;
var ref = "";
var historial="";
var files;

function dbbkup(){
	fetch(dominio+"/api/get/bkup")
	.then(res=>res.json())
	.then(function (data){
		console.log(data);
		// console.log("data.dir",data.dir)
		if (data.status == true){
			console.log("Respaldo de DB con éxito")
			document.getElementById('dir').innerHTML = data.dir
			document.getElementById('nombre').innerHTML = data.nombre
			$("#db_bkup_success").fadeTo(10000, 500).slideUp(500, function() {
				$("#db_bkup_success").slideUp(500);
			});
		}else{
			console.log("Error al intentar hacer el respaldo de la DB, inténtelo de nuevo")
			document.getElementById('dir_fail').innerHTML = data.dir
			$("#db_bkup_fail").fadeTo(10000, 500).slideUp(500, function() {
				$("#db_bkup_fail").slideUp(500);
			});
		}
	})
	.catch(function(err) {
		console.log(err);
	});
}

function formusuariomostrar(){
	if (formusuario.style.display === 'block') {
		formusuario.style.display = 'none';
	} else{
		formusuario.style.display = 'block';
		form_numeros.style.display = 'none';
	}
}

function form_numeros_mostrar(){
	if (form_numeros.style.display === 'block') {
		form_numeros.style.display = 'none';
	} else{
		form_numeros.style.display = 'block';
		formusuario.style.display = 'none';
	}
}

function form_manual_mostrar(){
	if (form_manual.style.display === 'block') {
	} else{
		form_manual.style.display = 'block';
		formusuario.style.display = 'none';
	}
}

function form_auto_mostrar(){
	if (form_auto.style.display === 'block') {
	} else{
		form_auto.style.display = 'block';
		formusuario.style.display = 'none';
	}
}

function agregarusuario(){
	// console.log("Este es el valor final del flagusuario", flagusuario);
	// console.log("Este es el valor final del flagpass", flagpass);
	var usuarioadd = document.getElementById('usuario').value;
	var passadd = document.getElementById('gafet').value;
	var tipoadd = document.getElementById('tipo').value;
	var niveladd;
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
			// console.log("Se hizo el POST");
			fetch(dominio+'/api/post/usuarios',{
				method: 'POST',
				body: JSON.stringify(newPost),
				headers:{
					"Content-type": "application/json"
				}
			}).then(res=>res.json())
			.then(function (data){
				console.log(data);
				alertaadd.innerHTML = '<div class="alert alert-success" role="alert">Usuario agregado exitósamente.</div>';
				document.getElementById("usuario").value = ""
				document.getElementById('gafet').value = ""
			})
			.catch(function(err) {
				console.log(err);
			});
		} else {
			// console.log("NO SE HIZO el POST");
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
			// console.log("Este es el valor del flag: ", flagusuario);
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
			// console.log("Este es el valor del flag: ", flagpass);
		})
		.catch(function(err) {
			console.log(err);
		});
		
	}
}

function get_valid_pedido(){
	//console.log("get_pedido")
	historial="";
	ref = "";
	console.log(document.getElementById("numero de orden").value)
	var ILX = document.getElementById("numero de orden").value.indexOf("ILX")
	console.log("INDEX OF STRING",ILX);
	if(document.getElementById("numero de orden").value!=""){
		if (ILX == -1) {
			console.log("no está el ILX");
			historial="si existe";
			ref = "no valido";
			alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">Referencia ILX no válida</div>'
		} else{
			console.log("SI ESCRIBIÓ ILX");

		// get the id
		endpoint=dominio+'/database/pedidos/pedido/=/'+document.getElementById("numero de orden").value+'/_/_/_'
		console.log(endpoint)
		fetch(endpoint,{
			method: 'GET',
			headers:{
				"Content-type": "application/json"
			}
		}).then(res=>res.json())
		.then(function (data){
			console.log(data);
			historial="si existe";
			ref = "";
			alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+document.getElementById("numero de orden").value+'" ya existe</div>'
			console.log(historial)
		})
		.catch(function(err) {

			//console.log(err);
		});
		alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+document.getElementById("numero de orden").value+'" no existe</div>'
		console.log(historial)
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

///////////////////// Modularidades ///////////
let dropArea = document.getElementById('drop-area');
;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
	dropArea.addEventListener(eventName,preventDefaults,false)
})
function preventDefaults(e){
	e.preventDefault()
	e.stopPropagation()
}

;['dragenter','dragover'].forEach(eventName => {
	dropArea.addEventListener(eventName,highlight,false)
})
;['dragleave','drop'].forEach(eventName => {
	dropArea.addEventListener(eventName,unhighlight,false)
})

function highlight(e){
	dropArea.classList.add('highlight')
	dropArea_modulos.classList.add('highlight')
}
function unhighlight(e){
	dropArea.classList.remove('highlight')
	dropArea_modulos.classList.remove('highlight')
}

dropArea.addEventListener('drop',handleDrop,false)

$("#cargar").on("click",function(){
	([...files]).forEach(cargar_archivo)
})

function handleDrop(e){
	let dt = e.dataTransfer
	files = dt.files
	const fileField = document.getElementById('cargar_input');
	fileField.files = files
	console.log(fileField.files)
}

function handleFiles(hola){
	console.log(hola);
	files = hola;
}

function cargar_archivo(file){
	var formData = new FormData();
	console.log("Nombre del Archivo: ",file.name);
	console.log("Archivo: ",file);

	formData.append('name', file.name);
	formData.append('file', file);

	console.log("formData name: ",formData.get('name'));
	console.log("formData file: ",formData.get('file'));
	
	fetch(dominio+'/upload/modularities', {
		method: 'POST',
		body: formData
		})
		.then(response => response.json())
		.then(result => {
		console.log('Resultado:', result);
		if (result.items == 1) {
			$("#carga_exitosa").fadeTo(2000, 500).slideUp(500, function() {
				$("#carga_exitosa").slideUp(500);
			});
		}else{
			$("#carga_fail").fadeTo(2000, 500).slideUp(500, function() {
				$("#carga_fail").slideUp(500);
			});
		}
		clear_archivo();
		formData = '';
		})
		.catch(error => {
		console.error('Error:', error);
		});
	// })	
}
$(function(){
	$("[data-hide]").on("click",function(){
		$(this).closest("." + $(this).attr("data-hide")).hide();
		document.getElementById("ilx_fail_alert").innerHTML = '';
	})
})

function update_modularities(){
	console.log("Click en Finalizar");
	document.getElementById("ilx_fail_alert").innerHTML = '';
	fetch(dominio+'/update/modularities', {
		method: 'POST',
		body: {}
		})
		.then(response => response.json())
		.then(result => {
			console.log('Resultado:', result);
			// console.log("ILX que NO se cargaron",Object.keys(result['ILX']));
			// console.log("Cantidad de ILX",(Object.keys(result['ILX'])).length);
			if ((Object.keys(result['ILX'])).length == 0) {
				console.log("Todos las Modularidades se cargaron con éxito")
			}else{
				(Object.keys(result['ILX'])).forEach(function(valor, indice, array) {
					// console.log("Valor ILX: ",valor);
					// console.log("indice: ",indice);
					// console.log("Módulos faltantes del ILX: ",result['ILX'][valor]);
					document.getElementById("ilx_fail_alert").innerHTML += indice+'.- '+valor+' --> '+result['ILX'][valor]+'<hr>';
				});
				document.getElementById("ilx_fail_alert").innerHTML += '<strong>Lista total de Módulos Faltantes: </strong><br/>'+result['Modulos'];
				
				$("#ilx_fail").fadeTo(50000, 500).slideUp(500, function() {
					$("#ilx_fail").slideUp(500);
				});
				// let ilxString = (Object.keys(result)).toString()
				// alert("Las siguientes modularidades NO se cargaron debido a un error en cuanto a sus módulos: ",ilxString)
			}
			clear_archivo();
			formData = '';
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

function clear_archivo(){
	const fileField = document.getElementById('cargar_input');
	fileField.value="";
	console.log(fileField.files)
}

///////////////////// Modulos ///////////
let dropArea_modulos = document.getElementById('drop-area-modulos');
;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
	dropArea_modulos.addEventListener(eventName,preventDefaults,false)
})
function preventDefaults(e){
	e.preventDefault()
	e.stopPropagation()
}

;['dragenter','dragover'].forEach(eventName => {
	dropArea_modulos.addEventListener(eventName,highlight,false)
})
;['dragleave','drop'].forEach(eventName => {
	dropArea_modulos.addEventListener(eventName,unhighlight,false)
})

dropArea_modulos.addEventListener('drop',handleDrop_modulos,false)
$("#update_modulos").on("click",function(){
	([...files]).forEach(cargar_archivo_modulos)
})
function handleDrop_modulos(e){
	let dt = e.dataTransfer
	files = dt.files
	const fileField = document.getElementById('cargar_input_modulos');
	fileField.files = files
	console.log(fileField.files)
}

function handleFiles_modulos(hola){
	console.log(hola);
	files = hola;
}

function cargar_archivo_modulos(file){
	var formData = new FormData();
	console.log("Nombre del Archivo: ",file.name);
	console.log("Archivo: ",file);

	formData.append('name', file.name);
	formData.append('file', file);

	console.log("formData: ",formData.get('name'));
	console.log("formData: ",formData.get('file'));

	fetch(dominio+'/update/modules', {
		method: 'POST',
		body: formData
		})
		.then(response => response.json())
		.then(result => {
		console.log('Resultado:', result);
		if (result.items == 1) {
			$("#update_exitoso").fadeTo(2000, 500).slideUp(500, function() {
				$("#update_exitoso").slideUp(500);
				$("#cerrar-modulos").click();
			});
		}else{
			$("#update_fail").fadeTo(2000, 500).slideUp(500, function() {
				$("#update_fail").slideUp(500);
			});
		}		
		clear_archivo_modulos();
		formData = '';
		})
		.catch(error => {
		console.error('Error:', error);
		});	
}

function clear_archivo_modulos(){
	const fileField = document.getElementById('cargar_input_modulos');
	fileField.value="";
	console.log(fileField.files)
}