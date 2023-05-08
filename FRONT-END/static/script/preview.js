let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
document.getElementById("modulov_titulo").innerHTML = sessionStorage.getItem('modularidad');
let pdf_vision = document.getElementById('pdf_vision');
let modularidad_vision = document.getElementById('modularidad_vision');

let img_pdcr = document.getElementById('pdcr_image_v_canvas');
let img_pdcr_1 = document.getElementById('pdcr_1_image_v_canvas');
let img_pdcr_small = document.getElementById('pdcr_small_image_v_canvas');
let img_f96 = document.getElementById('f96_image_v_canvas');
let img_pdcs = document.getElementById('pdcs_image_v_canvas');
let img_tblu = document.getElementById('tblu_image_v_canvas');
let img_pdcd = document.getElementById('pdcd_image_v_canvas');
let img_pdcp = document.getElementById('pdcp_image_v_canvas');

var imgWidth_pdcr, imgHeight_pdcr, datosPrim_pdcr;
var imgWidth_pdcr_mid, imgHeight_pdcr_mid, datosPrim_pdcr_mid;
var imgWidth_pdcr_small, imgHeight_pdcr_small, datosPrim_pdcr_small;
var imgWidth_f96, imgHeight_f96, datosPrim_f96;
var imgWidth_pdcs, imgHeight_pdcs, datosPrim_pdcs;
var imgWidth_tblu, imgHeight_tblu, datosPrim_tblu;
var imgWidth_pdcd, imgHeight_pdcd, datosPrim_pdcd;
var imgWidth_pdcp, imgHeight_pdcp, datosPrim_pdcp;



var modularity;
var fusible_imagen = new Image();
let orientacion;
let caja_pdcr;

var historial="";
var pdcr_caja="";
var pdcr_caja_to_db="";

var pdcr_array=[]
var pdcr_puntos=[]

var pdcr_1_array=[]
var pdcr_1_puntos=[]

var pdcr_small_array=[]
var pdcr_small_puntos=[]

var f96_array=[]
var f96_puntos=[]

var pdcs_array=[]
var pdcs_puntos=[]

var tblu_array=[]
var tblu_puntos=[]

var pdcd_array=[]
var pdcd_puntos=[]

var pdcp_array=[]
var pdcp_puntos=[]

var conteo_a_ATO =0;
var conteo_a_MINI =0;
var conteo_a_MULTI =0;
var arrayFuses_a = []

var conteo_b_ATO =0;
var conteo_b_MINI =0;
var conteo_b_MAXI =0;
var conteo_b_RELAY =0;
var arrayFuses_b = []
function iniciar_pagina(){
    // console.log(modularity);
    // cargar_imagen_pdcs();
    // cargar_imagen_tblu();
    // cargar_imagen_pdcd();
    // cargar_imagen_pdcp();
    cargar_info();
}
var loading = document.getElementsByClassName("loading");

function getDistance_pdcr(x1, y1, x2, y2){
    xDistance_pdcr = x2 - x1;
    yDistance_pdcr = y2 - y1;
}
function getDistance_pdcr_mid(x1, y1, x2, y2){
    xDistance_pdcr_mid = x2 - x1;
    yDistance_pdcr_mid = y2 - y1;
}
function getDistance_pdcr_small(x1, y1, x2, y2){
    xDistance_pdcr_small = x2 - x1;
    yDistance_pdcr_small = y2 - y1;
}
function getDistance_f96(x1, y1, x2, y2){
    xDistance_f96 = x2 - x1;
    yDistance_f96 = y2 - y1;
}
function getDistance_pdcs(x1, y1, x2, y2){
    xDistance_pdcs = x2 - x1;
    yDistance_pdcs = y2 - y1;
    // console.log("Distancia en X: ",xDistance);
    // console.log("Distancia en Y: ",yDistance);
}
function getDistance_tblu(x1, y1, x2, y2){
    xDistance_tblu = x2 - x1;
    yDistance_tblu = y2 - y1;
}
function getDistance_pdcd(x1, y1, x2, y2){
    xDistance_pdcd = x2 - x1;
    yDistance_pdcd = y2 - y1;
}
function getDistance_pdcp(x1, y1, x2, y2){
    xDistance_pdcp = x2 - x1;
    yDistance_pdcp = y2 - y1;
}

function cargar_info(){
    fetch(dominio+"/api/get/"+DBEVENT+"/preview/modularity/"+sessionStorage.getItem('modularidad'))
    .then(data=>data.json())
    .then(data=>{
        for (let index = 0; index < loading.length; index++) {
            loading[index].style.display = 'none';
        }
        pdf_vision.style.display = 'inline-flex';
        console.log("DATA: ",data)
        modularity = data
        console.log("ESTA ES LA VARIANTE: ",modularity['variante'])
    
	var keys = Object.keys(modularity)
	// console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		// console.log("CAJA: ",keys[i]);
		if (modularity[keys[i]] == '{}') {
		} else{
			var fusibles = Object.keys(modularity[keys[i]]);
			// console.log("ARRAY DE FUSIBLES: ",fusibles);
			// console.log(fusibles);
			for (var j = 0; j < fusibles.length; j++) {
				// console.log("Fusible: ",fusibles[j])
				// console.log("Valor del Fusible: ",modularity[keys[i]][fusibles[j]]);
                if (modularity['variante'] == "PDC-R"){
                    if (keys[i] == "PDC-R" | keys[i] == "PDC-RMID" | keys[i] == "PDC-RS") {
                        if (fusibles[j] != "F96") {
                            pdcr_array.push(fusibles[j]);
                        }else{
                            f96_array.push(fusibles[j]);
                            cargar_imagen_f96();
                        }
                    }
                }
                else if (modularity['variante'] == "PDC-RMID"){
                    if (keys[i] == "PDC-R" | keys[i] == "PDC-RMID" | keys[i] == "PDC-RS") {
                        if (fusibles[j] != "F96") {
                            pdcr_1_array.push(fusibles[j]);
                        }else{
                            f96_array.push(fusibles[j]);
                            cargar_imagen_f96();
                        }
                    }
                }
                else if (modularity['variante'] == "PDC-RS"){
                    if (keys[i] == "PDC-R" | keys[i] == "PDC-RMID" | keys[i] == "PDC-RS") {
                        if (fusibles[j] != "F96") {
                            pdcr_small_array.push(fusibles[j]);
                        }else{
                            f96_array.push(fusibles[j]);
                            cargar_imagen_f96();
                        }
                        console.log("MOSTRANDO PDC-RS (Aún falta esta parte en el código por lo que la visualización en la pag web será incierta)")
                    }
                }
                else if (modularity['variante'] == "N/A"){
                    console.log("Esta Modularidad no cuenta con módulos que determinen alguna variante de la caja PDC-R")
                    document.getElementById('caja_pdcr').innerHTML = 'Esta Modularidad no cuenta con ninguna configuración para la caja PDC-R.'
                }
                if (JSON.stringify(modularity["PDC-R"]) == '{}' && JSON.stringify(modularity["PDC-RMID"]) == '{}'){
                    document.getElementById('caja_pdcr').innerHTML = 'Esta Modularidad no cuenta con ninguna configuración para la caja PDC-R.'
                }
                if (keys[i] == "PDC-S") {
                    pdcs_array.push(fusibles[j]);
                    // cargar_imagen_pdcs();
                }
                if (keys[i] == "TBLU") {
                    tblu_array.push(fusibles[j]);
                    // cargar_imagen_tblu();
                }
                if (keys[i] == "PDC-D") {
                    pdcd_array.push(fusibles[j]);
                    // cargar_imagen_pdcd();
                }
                if (keys[i] == "PDC-P") {
                    pdcp_array.push(fusibles[j]);
                    // cargar_imagen_pdcp();
                }
			}
		}
	}
    // console.log("Tipo de Caja PDC-R: ",caja_pdcr);
    // if (caja_pdcr == "r") {
    //     console.log("Mostrando Caja PDC-R");
    //     document.getElementById('pdcr_title').innerHTML = 'PDC-R';
    //     document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_image_v_canvas" class="img-fluid" style="margin-left: 15%"></canvas>';
    //     img_pdcr = document.getElementById('pdcr_image_v_canvas');
    //     var t1 = new ToolTip_pdcr(img_pdcr, "This is a tool-tip", 150);
    //     cargar_imagen_pdcr();
    // }else{
    //     console.log("Mostrando Caja PDC-RMID");
    //     document.getElementById('pdcr_title').innerHTML = 'PDC-RMID';
    //     document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_1_image_v_canvas" class="img-fluid" style="margin-left: 9%"></canvas>';
    //     img_pdcr_1 = document.getElementById('pdcr_1_image_v_canvas');
    //     var t1 = new ToolTip_pdcr_1(img_pdcr_1, "This is a tool-tip", 150);
    //     cargar_imagen_pdcr_1();
    // }

    if (modularity['variante'] == "PDC-R") { /// Si la caja es PDC-R mostrará dicho canvas tanto para Visión como para Torque
        console.log("Mostrando Caja PDC-R");
        document.getElementById('pdcr_title').innerHTML = 'PDC-R';
        document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_image_v_canvas" class="img-fluid" style="margin-left: 15%"></canvas>';
        img_pdcr = document.getElementById('pdcr_image_v_canvas');
        var t1 = new ToolTip_pdcr(img_pdcr, "This is a tool-tip", 150);
        cargar_imagen_pdcr();
    }
    else if (modularity['variante'] == "PDC-RMID"){
        console.log("Mostrando Caja PDC-RMID"); /// Si la caja es PDC-RMID mostrará dicho canvas tanto para Visión como para Torque
        document.getElementById('pdcr_title').innerHTML = 'PDC-RMID';
        document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_1_image_v_canvas" class="img-fluid" style="margin-left: 9%"></canvas>';
        img_pdcr_1 = document.getElementById('pdcr_1_image_v_canvas');
        var t1 = new ToolTip_pdcr_1(img_pdcr_1, "This is a tool-tip", 150);
        cargar_imagen_pdcr_1();
    }
    else if (modularity['variante'] == "PDC-RS"){
        console.log("Mostrando Caja PDC-RS"); /// Si la caja es PDC-RS mostrará dicho canvas tanto para Visión como para Torque
        document.getElementById('pdcr_title').innerHTML = 'PDC-RS';
        document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_small_image_v_canvas" class="img-fluid" style="margin-left: 9%"></canvas>';
        img_pdcr_small = document.getElementById('pdcr_small_image_v_canvas');
        var t1 = new ToolTip_pdcr_small(img_pdcr_small, "This is a tool-tip", 150);
        cargar_imagen_pdcr_small();
    }


    if (f96_array.length == 0){
        console.log("No lleva F96",f96_array)
        document.getElementById('f96_n/a').innerHTML = 'No Aplica para esta Modularidad';
    }
    cargar_imagen_pdcd();
    cargar_imagen_pdcs();
    cargar_imagen_tblu();
    cargar_imagen_pdcp();
    })
}

function cargar_imagen_pdcr(){
    if (img_pdcr.getContext) {
        var ctx_pdcr = img_pdcr.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr/pdcr.jpg";
        img.onload = function(){
            imgWidth_pdcr = this.width;
            imgHeight_pdcr = this.height;
            img_pdcr.width = imgWidth_pdcr;
            img_pdcr.height = imgHeight_pdcr;
            // console.log("imgWidth_pdcr: ",imgWidth_pdcr);
            // console.log("imgHeight_pdcr: ",imgHeight_pdcr);
            // console.log("img_pdcr.width: ",img_pdcr.width);
            // console.log("img_pdcr.height: ",img_pdcr.height);
            ctx_pdcr.drawImage(this,0,0,imgWidth_pdcr,imgHeight_pdcr);
            var datosimagen = ctx_pdcr.getImageData(0,0,imgWidth_pdcr,imgHeight_pdcr);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr = datosimagen.data;
            ctx_pdcr.fillStyle = "#0F53F1";
            ctx_pdcr.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-R");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-R: ",pdcr_array)
                    for (let i = 0; i < pdcr_array.length; i++) {
                        let fusibleColocado;
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        if (modularity["PDC-R"].hasOwnProperty(pdcr_array[i])){
                            fusibleColocado = modularity["PDC-R"][pdcr_array[i]][0];
                        }
                        else if (modularity["PDC-RMID"].hasOwnProperty(pdcr_array[i])){
                            fusibleColocado = modularity["PDC-RMID"][pdcr_array[i]][0];
                        }
                        else if (modularity["PDC-RS"].hasOwnProperty(pdcr_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_array[i]][0];
                        }  
                         //console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-R"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-R"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-R"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-R"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcr(cavidadx,cavidady,cavidadw,cavidadh);
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                            conteo_b_ATO++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('MINI'):
                            conteo_b_MINI++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('MAXI'):
                            conteo_b_MAXI++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('RELAY'):
                            conteo_b_RELAY++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            default:
                            console.log('Alerta, fusible no contado')
                                break;
                        }
                        // console.log("PDC-R DISTANCE X",xDistance_pdcr)
                        // console.log("PDC-R DISTANCE Y",yDistance_pdcr)
                        if (yDistance_pdcr > xDistance_pdcr){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcr.beginPath();
                                // console.log("PDC-R DISTANCE X dentro del onload",xDistance_pdcr)
                                // console.log("PDC-R DISTANCE Y dentro del onload",yDistance_pdcr)
                                ctx_pdcr.drawImage(this,cavidadx, cavidady,xDistance_pdcr,yDistance_pdcr);
                                ctx_pdcr.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcr_1(){
    if (img_pdcr_1.getContext) {
        var ctx_pdcr_mid = img_pdcr_1.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_1/pdcr_1.jpg";
        img.onload = function(){
            imgWidth_pdcr_mid = this.width;
            imgHeight_pdcr_mid = this.height;
            img_pdcr_1.width = imgWidth_pdcr_mid;
            img_pdcr_1.height = imgHeight_pdcr_mid;
            // console.log("imgWidth_pdcr_mid: ",imgWidth_pdcr_mid);
            // console.log("imgHeight_pdcr_mid: ",imgHeight_pdcr_mid);
            // console.log("img_pdcr_1.width: ",img_pdcr_1.width);
            // console.log("img_pdcr_1.height: ",img_pdcr_1.height);
            ctx_pdcr_mid.drawImage(this,0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            var datosimagen = ctx_pdcr_mid.getImageData(0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_mid = datosimagen.data;
            ctx_pdcr_mid.fillStyle = "#0F53F1";
            ctx_pdcr_mid.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-RMID");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-RMID: ",pdcr_1_array)
                    for (let i = 0; i < pdcr_1_array.length; i++) {
                        let fusibleColocado;
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_1_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        if (modularity["PDC-RMID"].hasOwnProperty(pdcr_1_array[i])){
                            fusibleColocado = modularity["PDC-RMID"][pdcr_1_array[i]][0];
                        }
                        else if (modularity["PDC-RS"].hasOwnProperty(pdcr_1_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_1_array[i]][0];
                        }
                        if (modularity["PDC-R"].hasOwnProperty(pdcr_1_array[i])){
                            fusibleColocado = modularity["PDC-R"][pdcr_1_array[i]][0];
                        }
                        //console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-RMID"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-RMID"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-RMID"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-RMID"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcr_mid(cavidadx,cavidady,cavidadw,cavidadh);
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                            conteo_b_ATO++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('MINI'):
                            conteo_b_MINI++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('MAXI'):
                            conteo_b_MAXI++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('RELAY'):
                            conteo_b_RELAY++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            default:
                            console.log('Alerta, fusible no contado')
                                break;
                        }
                        // console.log("PDC-RMID DISTANCE X",xDistance_pdcr_mid)
                        // console.log("PDC-RMID DISTANCE Y",yDistance_pdcr_mid)
                        if (yDistance_pdcr_mid > xDistance_pdcr_mid){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcr_mid.beginPath();
                                // console.log("PDC-RMID DISTANCE X dentro del onload",xDistance_pdcr_mid)
                                // console.log("PDC-RMID DISTANCE Y dentro del onload",yDistance_pdcr_mid)
                                ctx_pdcr_mid.drawImage(this,cavidadx, cavidady,xDistance_pdcr_mid,yDistance_pdcr_mid);
                                ctx_pdcr_mid.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcr_small(){
    if (img_pdcr_small.getContext) {
        var ctx_pdcr_small = img_pdcr_small.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_small/pdcrs.jpg";
        img.onload = function(){
            imgWidth_pdcr_small = this.width;
            imgHeight_pdcr_small = this.height;
            img_pdcr_small.width = imgWidth_pdcr_small;
            img_pdcr_small.height = imgHeight_pdcr_small;
            // console.log("imgWidth_pdcr_small: ",imgWidth_pdcr_small);
            // console.log("imgHeight_pdcr_small: ",imgHeight_pdcr_small);
            // console.log("img_pdcr_small.width: ",img_pdcr_small.width);
            // console.log("img_pdcr_small.height: ",img_pdcr_small.height);
            ctx_pdcr_small.drawImage(this,0,0,imgWidth_pdcr_small,imgHeight_pdcr_small);
            var datosimagen = ctx_pdcr_small.getImageData(0,0,imgWidth_pdcr_small,imgHeight_pdcr_small);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_small = datosimagen.data;
            ctx_pdcr_small.fillStyle = "#0F53F1";
            ctx_pdcr_small.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-RS");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-RS: ",pdcr_small_array)
                    for (let i = 0; i < pdcr_small_array.length; i++) {
                        let fusibleColocado;
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_small_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        if (modularity["PDC-RS"].hasOwnProperty(pdcr_small_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_small_array[i]][0];
                        }
                        else if (modularity["PDC-RS"].hasOwnProperty(pdcr_small_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_small_array[i]][0];
                        }
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-RS"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-RS"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-RS"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-RS"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcr_small(cavidadx,cavidady,cavidadw,cavidadh);
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                            conteo_b_ATO++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('MINI'):
                            conteo_b_MINI++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('MAXI'):
                            conteo_b_MAXI++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            case fusibleColocado.includes('RELAY'):
                            conteo_b_RELAY++
                            arrayFuses_b.push(`${fusibleColocado}`);
                            break;
                            default:
                            console.log('Alerta, fusible no contado')
                                break;
                        }
                        // console.log("PDC-RS DISTANCE X",xDistance_pdcr_small)
                        // console.log("PDC-RS DISTANCE Y",yDistance_pdcr_small)
                        if (yDistance_pdcr_small > xDistance_pdcr_small){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcr_small.beginPath();
                                // console.log("PDC-RS DISTANCE X dentro del onload",xDistance_pdcr_small)
                                // console.log("PDC-RS DISTANCE Y dentro del onload",yDistance_pdcr_small)
                                ctx_pdcr_small.drawImage(this,cavidadx, cavidady,xDistance_pdcr_small,yDistance_pdcr_small);
                                ctx_pdcr_small.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_f96(){
    if (img_f96.getContext) {
        var ctx_f96 = img_f96.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/f96/f96.jpg";
        img.onload = function(){
            imgWidth_f96 = this.width;
            imgHeight_f96 = this.height;
            img_f96.width = imgWidth_f96;
            img_f96.height = imgHeight_f96;
            // console.log("imgWidth_f96: ",imgWidth_f96);
            // console.log("imgHeight_f96: ",imgHeight_f96);
            // console.log("img_f96.width: ",img_f96.width);
            // console.log("img_f96.height: ",img_f96.height);
            ctx_f96.drawImage(this,0,0,imgWidth_f96,imgHeight_f96);
            var datosimagen = ctx_f96.getImageData(0,0,imgWidth_f96,imgHeight_f96);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_f96 = datosimagen.data;
            ctx_f96.fillStyle = "#0F53F1";
            ctx_f96.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-RMID");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY F96: ",f96_array)
                    for (let i = 0; i < f96_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = f96_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-RMID"][f96_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["F96"][cavidad][0][0];
                        let cavidady = fuses_BB["F96"][cavidad][0][1];
                        let cavidadw = fuses_BB["F96"][cavidad][1][0];
                        let cavidadh = fuses_BB["F96"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_f96(cavidadx,cavidady,cavidadw,cavidadh);
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                                conteo_b_ATO++
                                arrayFuses_b.push(`${fusibleColocado}`);
                                break;
                            default:
                            console.log('Alerta, fusible no contado')
                                break;
                        }
                        // console.log("F96 DISTANCE X",xDistance_f96)
                        // console.log("F96 DISTANCE Y",yDistance_f96)
                        if (yDistance_f96 > xDistance_f96){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_f96.beginPath();
                                // console.log("F96 DISTANCE X dentro del onload",xDistance_f96)
                                // console.log("F96 DISTANCE Y dentro del onload",yDistance_f96)
                                ctx_f96.drawImage(this,cavidadx, cavidady,xDistance_f96,yDistance_f96);
                                ctx_f96.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcs(){
    if (img_pdcs.getContext) {
        var ctx = img_pdcs.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcs/pdcs.jpg";
        img.onload = function(){
            imgWidth_pdcs = this.width;
            imgHeight_pdcs = this.height;
            img_pdcs.width = imgWidth_pdcs;
            img_pdcs.height = imgHeight_pdcs;
            // console.log("imgWidth_pdcs: ",imgWidth_pdcs);
            // console.log("imgHeight_pdcs: ",imgHeight_pdcs);
            // console.log("img_pdcs.width: ",img_pdcs.width);
            // console.log("img_pdcs.height: ",img_pdcs.height);
            ctx.drawImage(this,0,0,imgWidth_pdcs,imgHeight_pdcs);
            var datosimagen = ctx.getImageData(0,0,imgWidth_pdcs,imgHeight_pdcs);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcs = datosimagen.data;
            ctx.fillStyle = "#0F53F1";
            ctx.lineWidth = "4";
            // console.log("La Caja a pintar es la siguiente: PDC-S");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-S: ",pdcs_array)
                    for (let i = 0; i < pdcs_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcs_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-S"][pdcs_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-S"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-S"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-S"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-S"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcs(cavidadx,cavidady,cavidadw,cavidadh);
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                                conteo_b_ATO++
                                arrayFuses_b.push(`${fusibleColocado}`);
                                break;
                            default:
                            console3.log('Alerta, fusible no contado')
                                break;
                        }
                        // console.log("PDC-S DISTANCE X",xDistance_pdcs)
                        // console.log("PDC-S DISTANCE Y",yDistance_pdcs)
                        if (yDistance_pdcs > xDistance_pdcs){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx.beginPath();
                                // console.log("PDC-S DISTANCE X dentro del onload",xDistance_pdcs)
                                // console.log("PDC-S DISTANCE Y dentro del onload",yDistance_pdcs)
                                ctx.drawImage(this,cavidadx, cavidady,xDistance_pdcs,yDistance_pdcs);
                                ctx.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_tblu(){
    if (img_tblu.getContext) {
        var ctx_tblu = img_tblu.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/btlu/btlu.jpg";
        img.onload = function(){
            imgWidth_tblu = this.width;
            imgHeight_tblu = this.height;
            img_tblu.width = imgWidth_tblu;
            img_tblu.height = imgHeight_tblu;
            // console.log("imgWidth_tblu: ",imgWidth_tblu);
            // console.log("imgHeight_tblu: ",imgHeight_tblu);
            // console.log("img_tblu.width: ",img_tblu.width);
            // console.log("img_tblu.height: ",img_tblu.height);
            ctx_tblu.drawImage(this,0,0,imgWidth_tblu,imgHeight_tblu);
            var datosimagen = ctx_tblu.getImageData(0,0,imgWidth_tblu,imgHeight_tblu);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_tblu = datosimagen.data;
            ctx_tblu.fillStyle = "#0F53F1";
            ctx_tblu.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: TBLU");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY TBLU: ",tblu_array)
                    for (let i = 0; i < tblu_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = tblu_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["TBLU"][tblu_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["TBLU"][cavidad][0][0];
                        let cavidady = fuses_BB["TBLU"][cavidad][0][1];
                        let cavidadw = fuses_BB["TBLU"][cavidad][1][0];
                        let cavidadh = fuses_BB["TBLU"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_tblu(cavidadx,cavidady,cavidadw,cavidadh);
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                                conteo_b_ATO++
                                arrayFuses_b.push(`${fusibleColocado}`);
                                break;
                            default:
                            console.log('Alerta, fusible no contado')
                                break;
                        }
                        // console.log("TBLU DISTANCE X",xDistance_tblu)
                        // console.log("TBLU DISTANCE Y",yDistance_tblu)
                        if (yDistance_tblu > xDistance_tblu){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_tblu.beginPath();
                                // console.log("TBLU DISTANCE X dentro del onload",xDistance_tblu)
                                // console.log("TBLU DISTANCE Y dentro del onload",yDistance_tblu)
                                ctx_tblu.drawImage(this,cavidadx, cavidady,xDistance_tblu,yDistance_tblu);
                                ctx_tblu.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcd(){
    if (img_pdcd.getContext) {
        var ctx_pdcd = img_pdcd.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcd/pdcd.jpg";
        img.onload = function(){
            imgWidth_pdcd = this.width;
            imgHeight_pdcd = this.height;
            img_pdcd.width = imgWidth_pdcd;
            img_pdcd.height = imgHeight_pdcd;
            ctx_pdcd.drawImage(this,0,0,imgWidth_pdcd,imgHeight_pdcd);
            var datosimagen = ctx_pdcd.getImageData(0,0,imgWidth_pdcd,imgHeight_pdcd);
            datosPrim_pdcd = datosimagen.data;
            ctx_pdcd.fillStyle = "#0F53F1";
            ctx_pdcd.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-D");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-D: ",pdcd_array)
                    for (let i = 0; i < pdcd_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcd_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-D"][pdcd_array[i]][0];
                         //console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-D"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-D"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-D"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-D"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcd(cavidadx,cavidady,cavidadw,cavidadh);
                        
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                                conteo_a_ATO++
                                arrayFuses_a.push(`${fusibleColocado}`);
                                break;
                                case fusibleColocado.includes('MINI'):
                                conteo_a_MINI++
                                arrayFuses_a.push(`${fusibleColocado}`);
                                break;
                            default:
                            console.log('Alerta, fusible no contado')
                                break;
                        }
                        
                        
                        // console.log("PDC-D DISTANCE X",xDistance_pdcd)
                        // console.log("PDC-D DISTANCE Y",yDistance_pdcd)
                        if (yDistance_pdcd > xDistance_pdcd){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcd.beginPath();
                                // console.log("PDC-D DISTANCE X dentro del onload",xDistance_pdcd)
                                // console.log("PDC-D DISTANCE Y dentro del onload",yDistance_pdcd)
                                ctx_pdcd.drawImage(this,cavidadx, cavidady,xDistance_pdcd,yDistance_pdcd);
                                ctx_pdcd.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcp(){
    if (img_pdcp.getContext) {
        var ctx_pdcp = img_pdcp.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcp/pdcp.jpg";
        img.onload = function(){
            imgWidth_pdcp = this.width;
            imgHeight_pdcp = this.height;
            img_pdcp.width = imgWidth_pdcp;
            img_pdcp.height = imgHeight_pdcp;
            // console.log("imgWidth_pdcp: ",imgWidth_pdcp);
            // console.log("imgHeight_pdcp: ",imgHeight_pdcp);
            // console.log("img_pdcp.width: ",img_pdcp.width);
            // console.log("img_pdcp.height: ",img_pdcp.height);
            ctx_pdcp.drawImage(this,0,0,imgWidth_pdcp,imgHeight_pdcp);
            var datosimagen = ctx_pdcp.getImageData(0,0,imgWidth_pdcp,imgHeight_pdcp);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcp = datosimagen.data;
            ctx_pdcp.fillStyle = "#0F53F1";
            ctx_pdcp.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-P");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-P: ",pdcp_array)
                    for (let i = 0; i < pdcp_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcp_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-P"][pdcp_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-P"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-P"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-P"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-P"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcp(cavidadx,cavidady,cavidadw,cavidadh);
                        switch (true) {
                            case fusibleColocado.includes('ATO'):
                                conteo_a_ATO++
                                arrayFuses_a.push(`${fusibleColocado}`);
                                break;
                                case fusibleColocado.includes('MINI'):
                                conteo_a_MINI++
                                arrayFuses_a.push(`${fusibleColocado}`);
                                break;
                                case fusibleColocado.includes('MULTI'):
                                conteo_a_MULTI++
                                arrayFuses_a.push(`${fusibleColocado}`);
                                break;
                            default:
                            console.log('Alerta, fusible no contado')
                                break;
                        }
                        // console.log("PDC-P DISTANCE X",xDistance_pdcp)
                        // console.log("PDC-P DISTANCE Y",yDistance_pdcp)
                        if (yDistance_pdcp > xDistance_pdcp){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcp.beginPath();
                                // console.log("PDC-P DISTANCE X dentro del onload",xDistance_pdcp)
                                // console.log("PDC-P DISTANCE Y dentro del onload",yDistance_pdcp)
                                ctx_pdcp.drawImage(this,cavidadx, cavidady,xDistance_pdcp,yDistance_pdcp);
                                ctx_pdcp.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

//////////////////////////////////////////// ToolTips para Cavidades ////////////////////////////////////////////
// create a tool-tip instance:
var t1 = new ToolTip_pdcs(img_pdcs, "This is a tool-tip", 150);
// The Tool-Tip instance:
function ToolTip_pdcs(img_pdcs, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcs.parentNode,               // parent node for img_pdcs
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcs
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-S']);
// console.log("KEYS DE PDCS: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=1;i<keys_cavidad.length+1;i++){
        let fusible_tooltip;
        if (!visible && pos.x>=fuses_BB['PDC-S'][i][0][0] && pos.x<=fuses_BB['PDC-S'][i][1][0] && pos.y>=fuses_BB['PDC-S'][i][0][1] && pos.y<=fuses_BB['PDC-S'][i][1][1]) {
            cavidad = keys_cavidad[i-1];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-S'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-S'][cavidad][0];
                module = modularity['PDC-S'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcs
function getPos(e) {
    var r = img_pdcs.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcs.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-R ToolTip
function ToolTip_pdcr(img_pdcr, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcr.parentNode,               // parent node for img_pdcr
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcr
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-R']);
// console.log("KEYS DE PDC-R: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-R'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-R'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-R'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-R'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-R'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-R'][cavidad][0];
                module = modularity['PDC-R'][cavidad][1];
            }
            else if (modularity['PDC-RMID'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RMID'][cavidad][0];
                module = modularity['PDC-RMID'][cavidad][1];
            }
            else if (modularity['PDC-RS'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RS'][cavidad][0];
                module = modularity['PDC-RS'][cavidad][1];
            }else{
                fusible_tooltip = "Vacío";
                module = "N/A";
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcr
function getPos(e) {
    var r = img_pdcr.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcr.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-RMID ToolTip
function ToolTip_pdcr_1(img_pdcr_1, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcr_1.parentNode,               // parent node for img_pdcr_1
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcr_1
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-RMID']);
// console.log("KEYS DE PDC-RMID: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-RMID'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-RMID'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-RMID'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-RMID'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-RMID'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RMID'][cavidad][0];
                module = modularity['PDC-RMID'][cavidad][1];
            }
            else if (modularity['PDC-RS'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RS'][cavidad][0];
                module = modularity['PDC-RS'][cavidad][1];
            }
            else if (modularity['PDC-R'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-R'][cavidad][0];
                module = modularity['PDC-R'][cavidad][1];
            }else{
                fusible_tooltip = "Vacío";
                module = "N/A";
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcr_1
function getPos(e) {
    var r = img_pdcr_1.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcr_1.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-RS ToolTip
function ToolTip_pdcr_small(img_pdcr_small, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_pdcr_small.parentNode,               // parent node for img_pdcr_small
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_pdcr_small
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_cavidad = Object.keys(fuses_BB['PDC-RS']);
    // console.log("KEYS DE PDC-RS: ",keys_cavidad);
    let cavidad;
    let module;
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=0;i<keys_cavidad.length;i++){
            if (!visible && pos.x>=fuses_BB['PDC-RS'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-RS'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-RS'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-RS'][keys_cavidad[i]][1][1]) {
                cavidad = keys_cavidad[i];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                if (modularity['PDC-RS'].hasOwnProperty(cavidad)){
                    fusible_tooltip = modularity['PDC-RS'][cavidad][0];
                    module = modularity['PDC-RS'][cavidad][1];
                }else{
                    fusible_tooltip = "Vacío";
                    module = "N/A";
                }
                div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_pdcr_small
    function getPos(e) {
        var r = img_pdcr_small.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_pdcr_small.addEventListener("mousemove", check);
    $(document).on('wheel', function(){ 
        hide();
    });
    }
//  TBLU ToolTip
var t1 = new ToolTip_tblu(img_tblu, "This is a tool-tip", 150);
function ToolTip_tblu(img_tblu, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_tblu.parentNode,               // parent node for img_tblu
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_tblu
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['TBLU']);
// console.log("KEYS DE PDCS: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=1;i<keys_cavidad.length+1;i++){
        if (!visible && pos.x>=fuses_BB['TBLU'][i][0][0] && pos.x<=fuses_BB['TBLU'][i][1][0] && pos.y>=fuses_BB['TBLU'][i][0][1] && pos.y<=fuses_BB['TBLU'][i][1][1]) {
            cavidad = keys_cavidad[i-1];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['TBLU'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['TBLU'][cavidad][0];
                module = modularity['TBLU'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_tblu
function getPos(e) {
    var r = img_tblu.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_tblu.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-D ToolTip
var t1 = new ToolTip_pdcd(img_pdcd, "This is a tool-tip", 150);
function ToolTip_pdcd(img_pdcd, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcd.parentNode,               // parent node for img_pdcd
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcd
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-D']);
// console.log("KEYS DE PDC-D: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-D'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-D'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-D'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-D'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-D'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-D'][cavidad][0];
                module = modularity['PDC-D'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcd
function getPos(e) {
    var r = img_pdcd.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcd.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-P ToolTip
var t1 = new ToolTip_pdcp(img_pdcp, "This is a tool-tip", 150);
function ToolTip_pdcp(img_pdcp, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcp.parentNode,               // parent node for img_pdcp
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcp
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-P']);
// console.log("KEYS DE PDC-P: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-P'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-P'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-P'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-P'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-P'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-P'][cavidad][0];
                module = modularity['PDC-P'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcp
function getPos(e) {
    var r = img_pdcp.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcp.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  F96 ToolTip
var t1 = new ToolTip_f96(img_f96, "This is a tool-tip", 150);
function ToolTip_f96(img_f96, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_f96.parentNode,               // parent node for img_f96
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_f96
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['F96']);
// console.log("KEYS DE F96: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['F96'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['F96'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['F96'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['F96'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-RMID'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-RMID'][cavidad][0];
                module = modularity['PDC-RMID'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_f96
function getPos(e) {
    var r = img_f96.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_f96.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}

//////////////////////////////////////////// DESCARGA DE VISUALES ////////////////////////////////////////////
//-----------------------------  VISIÓN
$('#pdf_vision').on('click', function(){
    console.log("Click en descargar visuales para visión");
    let $elemento = modularidad_vision;
    html2pdf()
    .set({
        margin:1,
        filename: sessionStorage.getItem('modularidad')+' Vision Visuales',
        html2canvas: {
            scale: 3,
            letterRendering: true,
        },
        jsPDF: {
            unit: "in",
            format: "a3",
            orientation: 'portrait'
        },
        pagebreak: {
            mode: ['avoid-all','css','legacy']
        }
    })
    .from($elemento)
    .save()
    .catch(err => console.log(err));
});
//****************CHECK-TIME*****************//
var activated = 0;
$('#time').on('click', function () {
 if (activated === 0) {
     document.getElementById('timeContainer').classList.add("active-calc")   
     document.getElementById('fusiblesTotales').classList.add("active-calc");    
    activated++;    
} else{
    document.getElementById('timeContainer').classList.remove("active-calc")
    document.getElementById('fusiblesTotales').classList.remove("active-calc");    
    activated = 0;
}
})
var conteoRobotA = 0
var conteoRobotB = 0

var grid_a = document.createElement('div')  
grid_a.classList = 'timeFuseType';
grid_a.id = 'timeFuseType';
grid_a.style.height = 'fit-content';
function dateTime_a (){
    //console.log(arrayFuses_a)
    timeResult_a = document.getElementById("timeResult_a")
    /**ROBOT- A**/
    var minutos_a =0;
    let time_a_ATO = document.getElementById("time_a_ATO").value
    let time_a_MINI = document.getElementById("time_a_MINI").value
    let time_a_MULTI = document.getElementById("time_a_MULTI").value
    grid_a.innerHTML = ''
    grid_a.display = 'content'
    let title = document.createElement('b')
    title.innerHTML = `Robot-A`;
    grid_a.appendChild(title)
    /******************************************************* */
    time_a_ATO *= conteo_a_ATO
    time_a_MINI *= conteo_a_MINI
    time_a_MULTI *= conteo_a_MULTI
    segundos_a = time_a_ATO + time_a_MINI +time_a_MULTI;
    while (segundos_a > 60){
        segundos_a -= 60
        minutos_a++
    } 
    conteoRobotA = conteo_a_ATO + conteo_a_MINI + conteo_a_MULTI;
    //console.log(`${minutos_a} Minutos y ${segundos_a} Segundos en ${conteoRobotA}`);
    //console.log(arrayFuses_a);
    timeResult_a.innerHTML = (`${minutos_a} Minuto(s) y ${segundos_a} Segundos (Sin fallas) <br> <p> En ${conteoRobotA} fusibles </p>`)
    document.getElementById('fusiblesTotales').innerHTML = `${conteoRobotA + conteoRobotB} Fusibles en total`
    
//console.log(arrayFuses_a);
const unicos = [... new Set(arrayFuses_a)];
//console.log(unicos); 

for (let i  = 0; i < unicos.length; i++) {
    var p = document.createElement('p');
    var conteo = 0
    for (let j = 0; j < arrayFuses_a.length; j++) {
        const valor = arrayFuses_a[j];
        if (unicos[i] === valor) {
            conteo++
            //console.log(unicos[i], conteo)
        }
        // else{
        //     console.log(`PAM`)
        // }
    }
    p.innerHTML= `${unicos[i]} : ${conteo}`
    grid_a.appendChild(p)
}

document.getElementById('timeContainer').appendChild(grid_a)
    return false
}

var grid_b = document.createElement('div')
grid_b.classList = 'timeFuseType';
grid_b.id = 'timeFuseType';
grid_b.style.height = 'fit-content';
function dateTime_b(){
timeResult_b = document.getElementById("timeResult_b")
/**ROBOT- B**/
let time_b_ATO = document.getElementById("time_b_ATO").value
let time_b_MINI = document.getElementById("time_b_MINI").value
let time_b_MAXI = document.getElementById("time_b_MAXI").value
let time_b_RELAY = document.getElementById("time_b_RELAY").value
grid_b.innerHTML = ''
grid_b.display = 'content'
let title = document.createElement('b')
title.innerHTML = `Robot-B`;
grid_b.appendChild(title)
/****************************************************** */

var minutos_b =0;
time_b_ATO *= conteo_b_ATO
time_b_MINI *= conteo_b_MINI
time_b_MAXI *= conteo_b_MAXI
time_b_RELAY *= conteo_b_RELAY
segundos_b = time_b_ATO + time_b_MINI +time_b_MAXI + time_b_RELAY;
//console.log(`${time_b_ATO} + ${time_b_MINI} + ${time_b_MAXI} + ${time_b_RELAY}`)
while (segundos_b > 60){
    segundos_b -= 60
    minutos_b++
} 

conteoRobotB = conteo_b_ATO + conteo_b_MINI + conteo_b_MAXI + conteo_b_RELAY;
//console.log(`${minutos_b} Minutos y ${segundos_b} Segundos en ${conteoRobotB}`);
timeResult_b.innerHTML = (`${minutos_b} Minuto(s) y ${segundos_b} Segundos (Sin fallas) <br> <p> En ${conteoRobotB} fusibles </p>`)
document.getElementById('fusiblesTotales').innerHTML = `${conteoRobotA + conteoRobotB} Fusibles en total`


//console.log(arrayFuses_b);
const unicos = [... new Set(arrayFuses_b)];
//console.log(unicos); 

for (let i  = 0; i < unicos.length; i++) {
    var p = document.createElement('p');
    var conteo = 0
    for (let j = 0; j < arrayFuses_b.length; j++) {
        const valor = arrayFuses_b[j];
        if (unicos[i] === valor) {
            conteo++
            //console.log(unicos[i], conteo)
        }
        // else{
        //     console.log(`PAM`)
        // }
    }
    p.innerHTML= `${unicos[i]} : ${conteo}`
    grid_b.appendChild(p)
}

document.getElementById('timeContainer').appendChild(grid_b)
return false
}