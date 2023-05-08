let img_pdcr = document.getElementById('pdcr_image_v_canvas');
let img_pdcr_mid = document.getElementById('pdcr_1_image_v_canvas');
let img_pdcs = document.getElementById('pdcs_image_v_canvas');
let img_tblu = document.getElementById('tblu_image_v_canvas');
let img_pdcd = document.getElementById('pdcd_image_v_canvas');
let img_pdcp = document.getElementById('pdcp_image_v_canvas');

var vision;

var pdcr_array=[];
var pdcr_1_array=[];
var pdcs_array=[];
var tblu_array=[];
var pdcd_array=[];
var pdcp_array=[];

var pdcr_puntos=[]
var pdcs_puntos=[]
var tblu_puntos=[]
var pdcd_puntos=[]
var pdcp_puntos=[]

function generar_imagenes(){
	// console.log("FUSIBLES: ",fusibles)
	vision = fusibles
	// console.log("FUSIBLES FINAL: ",vision)
	// cargar_imagen_pdcr();
    // cargar_imagen_pdcr_1();
	cargar_imagen_pdcs();
	cargar_imagen_tblu();
	cargar_imagen_pdcd();
	cargar_imagen_pdcp();
	cargar_info();
}

function cargar_info(){
	// console.log("VISION EN DRAWING.js: ",vision)
	var keys = Object.keys(vision)
	// console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		// console.log("CAJA: ",keys[i]);
		if (keys[i] == 'ID' || keys[i] == 'MODULO') {
		} else{
			if (vision[keys[i]] == '{}') {
			} else{
				// console.log("holaaaa",vision[keys[i]])
				var fusibles = Object.keys(vision[keys[i]]);
				// console.log("ARRAY DE FUSIBLES: ",fusibles);
				// console.log(fusibles);
				for (var j = 0; j < fusibles.length; j++) {
					// console.log("Fusible: ",fusibles[j])
					// console.log("Valor del Fusible: ",vision[keys[i]][fusibles[j]]);
					cargar_recuadros();
				}
			}
		}
	}
	function cargar_recuadros(){
		// console.log("VISION EN DRAWING.js: ",vision)
		// console.log("pintando");
        // console.log("DATA",vision);
        // console.log("DATA",vision["PDC-RMID"]);
        if (JSON.stringify(vision["PDC-RMID"]) == '{}') {
            document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_image_v_canvas" class="img-fluid" style="margin-left: 15%"></canvas>';
            document.getElementById('pdcr_caption').innerHTML = 'PDC-R';
            img_pdcr = document.getElementById('pdcr_image_v_canvas');
            cargar_imagen_pdcr();
        }else{
            document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_1_image_v_canvas" class="img-fluid" style="margin-left: 9%"></canvas>';
            document.getElementById('pdcr_caption').innerHTML = 'PDC-RMID';
            img_pdcr_mid = document.getElementById('pdcr_1_image_v_canvas');
            cargar_imagen_pdcr_1();
        }
		if (keys[i] == "PDC-R" && vision[keys[i]][fusibles[j]] != "empty") {
			pdcr_array.push(fusibles[j]);
			// cargar_imagen_pdcr();
		}
		if (keys[i] == "PDC-RMID" && vision[keys[i]][fusibles[j]] != "empty") {
			pdcr_1_array.push(fusibles[j]);
			// cargar_imagen_pdcr_1();
		}
		if (keys[i] == "PDC-S" && vision[keys[i]][fusibles[j]] != "empty") {
			pdcs_array.push(fusibles[j]);
			cargar_imagen_pdcs();
		}
		if (keys[i] == "TBLU" && vision[keys[i]][fusibles[j]] != "empty") {
			tblu_array.push(fusibles[j]);
			cargar_imagen_tblu();
		}
		if (keys[i] == "PDC-D" && vision[keys[i]][fusibles[j]] != "empty") {
			pdcd_array.push(fusibles[j]);
			cargar_imagen_pdcd();
		}
		if (keys[i] == "PDC-P" && vision[keys[i]][fusibles[j]] != "empty") {
			pdcp_array.push(fusibles[j]);
			cargar_imagen_pdcp();
		}
	}
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
            ctx_pdcr.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcr_array.length; i++) {
                    pdcr_array[i]
                    // console.log("pdcr_array[i]",pdcr_array[i]);
                    // console.log("pdcr_array[i] COLOR: ",vision["PDC-R"][pdcr_array[i]])                 
                    switch (pdcr_array[i]){
                        case "F400":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(235, 95,10,35);
                            break;
                        } 
                        break;
                        case "F401":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(245, 95,10,35);
                            break;
                        }
                        break;
                        case "F402":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(256, 95,10,35);
                            break;
                        }
                        break;
                        case "F403":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(266, 95,10,35);
                            break;
                        }
                        break;
                        case "F404":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(277, 95,10,35);
                            break;
                        }
                        break;
                        case "F405":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(285, 95,10,35);
                            break;
                        }
                        break;
                        case "F406":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(309, 103,10,20);
                            break;
                        }
                        break;
                        case "F407":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(321, 103,10,20);
                            break;
                        }
                        break;
                        case "F408":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(330, 103,10,20);
                            break;
                        }
                        break;
                        case "F409":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(343, 103,10,20);
                            break;
                        }
                        break;
                        case "F410":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(353, 103,10,20);
                            break;
                        }
                        break;
                        case "F411":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(363, 103,10,20);
                            break;
                        }
                        break;
                        case "F412":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 110,30,10);
                            break;
                        }
                        break;
                        case "F413":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 121,30,10);
                            break;
                        }
                        break;
                        case "F414":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 132,30,10);
                            break;
                        }
                        break;
                        case "F415":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 142,30,10);
                            break;
                        }
                        break;
                        case "F416":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 151,30,10);
                            break;
                        }
                        break;
                        case "F417":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 161,30,10);
                            break;
                        }
                        break;
                        case "F418":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 106,50,20);
                            break;
                        }
                        break;
                        case "F419":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 131,50,20);
                            break;
                        }
                        break;
                        case "F420":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 152,50,20);
                            break;
                        }
                        break;
                        case "F421":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 187,30,10);
                            break;
                        }
                        break;
                        case "F422":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 197,30,10);
                            break;
                        }
                        break;
                        case "F423":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 207,30,10);
                            break;
                        }
                        break;
                        case "F424":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 218,30,10);
                            break;
                        }
                        break;
                        case "F425":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 230,30,10);
                            break;
                        }
                        break;
                        case "F426":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(196, 237,30,10);
                            break;
                        }
                        break;
                        case "F427":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(246, 190,10,16);
                            break;
                        }
                        break;
                        case "F428":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(258, 190,10,16);
                            break;
                        }
                        break;
                        case "F429":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(267, 190,10,16);
                            break;
                        }
                        break;
                        case "F430":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(279, 190,10,16);
                            break;
                        }
                        break;
                        case "F431":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(289, 190,10,16);
                            break;
                        }
                        break;
                        case "F432":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(315, 190,10,16);
                            break;
                        }
                        break;
                        case "F433":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(323, 190,10,16);
                            break;
                        }
                        break;
                        case "F434":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(334, 190,10,16);
                            break;
                        }
                        break;
                        case "F435":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(343, 190,10,16);
                            break;
                        }
                        break;
                        case "F436":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(353, 190,10,16);
                            break;
                        }
                        break;
                        case "F437":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(248, 212,10,16);
                            break;
                        }
                        break;
                        case "F438":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(259, 212,10,16);
                            break;
                        }
                        break;
                        case "F439":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(272, 212,10,16);
                            break;
                        }
                        break;
                        case "F440":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(279, 212,10,16);
                            break;
                        }
                        break;
                        case "F441":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(290, 212,10,16);
                            break;
                        }
                        break;
                        case "F442":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(315, 212,10,16);
                            break;
                        }
                        break;
                        case "F443":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(326, 212,10,16);
                            break;
                        }
                        break;
                        case "F444":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(338, 212,10,16);
                            break;
                        }
                        break;
                        case "F445":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(348, 212,10,16);
                            break;
                        }
                        break;
                        case "F446":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(355, 212,10,16);
                            break;
                        }
                        break;
                        case "F447":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 188,50,20);
                            break;
                        }
                        break;
                        case "F448":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 211,50,20);
                            break;
                        }
                        break;
                        case "F449":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(380, 236,50,20);
                            break;
                        }
                        break;
                        case "F450":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(233, 238,10,34);
                            break;
                        }
                        break;
                        case "F451":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(244, 238,10,34);
                            break;
                        }
                        break;
                        case "F452":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(256, 238,10,34);
                            break;
                        }
                        break;
                        case "F453":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(266, 238,10,34);
                            break;
                        }
                        break;
                        case "F454":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(276, 238,10,34);
                            break;
                        }
                        break;
                        case "F455":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(287, 238,10,34);
                            break;
                        }
                        break;
                        case "F456":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(310, 238,10,34);
                            break;
                        }
                        break;
                        case "F457":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(321, 238,10,34);
                            break;
                        }
                        break;
                        case "F458":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(333, 238,10,34);
                            break;
                        }
                        break;
                        case "F459":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(344, 238,10,34);
                            break;
                        }
                        break;
                        case "F460":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(353, 238,10,34);
                            break;
                        }
                        break;
                        case "F461":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(363, 238,10,34);
                            break;
                        }
                        break;
                        case "F462":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(496, 123,18,45);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(496, 124,18,45);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(496, 124,18,45);
                            break;
                        }
                        break;
                        case "F463":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(520, 123,18,45);
                            break;
                        }
                        break;
                        case "F464":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(545, 123,18,45);
                            break;
                        }
                        break;
                        case "F465":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 223,20,7);
                            break;
                        }
                        break;
                        case "F466":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 234,20,7);
                            break;
                        }
                        break;
                        case "F467":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 244,20,7);
                            break;
                        }
                        break;
                        case "F468":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 257,20,7);
                            break;
                        }
                        break;
                        case "F469":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 267,20,7);
                            break;
                        }
                        break;
                        case "F470":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(456, 278,20,7);
                            break;
                        }
                        break;
                        case "F471":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 223,30,7);
                            break;
                        }
                        break;
                        case "F472":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 235,30,7);
                            break;
                        }
                        break;
                        case "F473":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 245,30,7);
                            break;
                        }
                        break;
                        case "F474":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 255,30,7);
                            break;
                        }
                        break;
                        case "F475":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 265,30,7);
                            break;
                        }
                        break;
                        case "F476":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(491, 276,30,7);
                            break;
                        }
                        break;
                        case "F477":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 223,30,7);
                            break;
                        }
                        break;
                        case "F478":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 233,30,7);
                            break;
                        }
                        break;
                        case "F479":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 245,30,7);
                            break;
                        }
                        break;
                        case "F480":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 256,30,7);
                            break;
                        }
                        break;
                        case "F481":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 267,30,7);
                            break;
                        }
                        break;
                        case "F482":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(536, 276,30,7);
                            break;
                        }
                        break;
                        case "RELX":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "RELE,100-8965,pink":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF00FF";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                            case "RELE,101-0733,gray":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#A9A9A9";
                            ctx_pdcr.strokeRect(234, 133,40,45);
                            break;
                        }
                        break;
                        case "RELU":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "RELE,100-8965,pink":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF00FF";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                            case "RELE,101-0733,gray":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#A9A9A9";
                            ctx_pdcr.strokeRect(285, 134,40,45);
                            break;
                        }
                        break;
                        case "RELT":
                        switch (vision["PDC-R"][pdcr_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFD700";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#8B4513";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#008000";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFFFF";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFFF00";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FFA500";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#0000FF";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "RELE,100-8965,pink":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF00FF";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                            case "RELE,101-0733,gray":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#A9A9A9";
                            ctx_pdcr.strokeRect(335, 135,40,45);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}

function cargar_imagen_pdcr_1(){
    if (img_pdcr_mid.getContext) {
        var ctx_pdcr_mid = img_pdcr_mid.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_1/pdcr_1.jpg";
        img.onload = function(){
            imgWidth_pdcr_mid = this.width;
            imgHeight_pdcr_mid = this.height;
            img_pdcr_mid.width = imgWidth_pdcr_mid;
            img_pdcr_mid.height = imgHeight_pdcr_mid;
            // console.log("imgWidth_pdcr_mid: ",imgWidth_pdcr_mid);
            // console.log("imgHeight_pdcr_mid: ",imgHeight_pdcr_mid);
            // console.log("img_pdcr_mid.width: ",img_pdcr_mid.width);
            // console.log("img_pdcr_mid.height: ",img_pdcr_mid.height);
            ctx_pdcr_mid.drawImage(this,0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            var datosimagen = ctx_pdcr_mid.getImageData(0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_mid = datosimagen.data;
            ctx_pdcr_mid.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcr_1_array.length; i++) {
                    pdcr_1_array[i]
                    // console.log("pdcr_1_array[i]",pdcr_1_array[i]);
                    // console.log("pdcr_1_array[i] COLOR: ",vision["PDC-RMID"][pdcr_1_array[i]])                 
                    switch (pdcr_1_array[i]){
                        case "F400":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            ctx_pdcr.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(299, 167,10,35);
                            break;
                        } 
                        break;
                        case "F401":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(311, 167,10,35);
                            break;
                        } 
                        break;
                        case "F402":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(325, 167,10,35);
                            break;
                        } 
                        break;
                        case "F403":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(337, 167,10,35);
                            break;
                        } 
                        break;
                        case "F404":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(350, 167,10,35);
                            break;
                        } 
                        break;
                        case "F405":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(363, 167,10,35);
                            break;
                        } 
                        break;
                        case "F406":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(391, 174,10,20);
                            break;
                        } 
                        break;
                        case "F407":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(403, 174,10,20);
                            break;
                        } 
                        break;
                        case "F408":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(414, 174,10,20);
                            break;
                        } 
                        break;
                        case "F409":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(427, 174,10,20);
                            break;
                        } 
                        break;
                        case "F410":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(440, 174,10,20);
                            break;
                        } 
                        break;
                        case "F411":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(451, 174,10,20);
                            break;
                        } 
                        break;
                        case "F412":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 181,40,10);
                            break;
                        } 
                        break;
                        case "F413":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 196,40,10);
                            break;
                        } 
                        break;
                        case "F414":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 209,40,10);
                            break;
                        } 
                        break;
                        case "F415":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 220,40,10);
                            break;
                        } 
                        break;
                        case "F416":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 234,40,10);
                            break;
                        } 
                        break;
                        case "F417":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 246,40,10);
                            break;
                        } 
                        break;
                        case "F418":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 180,60,20);
                            break;
                        } 
                        break;
                        case "F419":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 207,60,20);
                            break;
                        } 
                        break;
                        case "F420":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 235,60,20);
                            break;
                        } 
                        break;
                        case "F421":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 273,40,10);
                            break;
                        } 
                        break;
                        case "F422":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 285,40,10);
                            break;
                        } 
                        break;
                        case "F423":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 298,40,10);
                            break;
                        } 
                        break;
                        case "F424":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 310,40,10);
                            break;
                        } 
                        break;
                        case "F425":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 323,40,10);
                            break;
                        } 
                        break;
                        case "F426":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(251, 335,40,10);
                            break;
                        } 
                        break;
                        case "F427":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(314, 277,10,20);
                            break;
                        } 
                        break;
                        case "F428":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(328, 277,10,20);
                            break;
                        } 
                        break;
                        case "F429":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(339, 277,10,20);
                            break;
                        } 
                        break;
                        case "F430":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(352, 277,10,20);
                            break;
                        } 
                        break;
                        case "F431":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(367, 277,10,20);
                            break;
                        } 
                        break;
                        case "F432":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(392, 277,10,20);
                            break;
                        } 
                        break;
                        case "F433":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(407, 277,10,20);
                            break;
                        } 
                        break;
                        case "F434":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(420, 277,10,20);
                            break;
                        } 
                        break;
                        case "F435":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(431, 277,10,20);
                            break;
                        } 
                        break;
                        case "F436":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(443, 277,10,20);
                            break;
                        } 
                        break;
                        case "F437":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(315, 303,10,20);
                            break;
                        } 
                        break;
                        case "F438":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(329, 303,10,20);
                            break;
                        } 
                        break;
                        case "F439":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(339, 303,10,20);
                            break;
                        } 
                        break;
                        case "F440":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(351, 303,10,20);
                            break;
                        } 
                        break;
                        case "F441":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(365, 303,10,20);
                            break;
                        } 
                        break;
                        case "F442":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(394, 303,10,20);
                            break;
                        } 
                        break;
                        case "F443":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(407, 303,10,20);
                            break;
                        } 
                        break;
                        case "F444":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(419, 303,10,20);
                            break;
                        } 
                        break;
                        case "F445":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(432, 303,10,20);
                            break;
                        } 
                        break;
                        case "F446":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(445, 303,10,20);
                            break;
                        } 
                        break;
                        case "F447":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 275,60,20);
                            break;
                        } 
                        break;
                        case "F448":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 302,60,20);
                            break;
                        } 
                        break;
                        case "F449":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(469, 332,60,20);
                            break;
                        } 
                        break;
                        case "F450":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(298, 335,10,34);
                            break;
                        } 
                        break;
                        case "F451":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(311, 335,10,34);
                            break;
                        } 
                        break;
                        case "F452":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(324, 335,10,34);
                            break;
                        } 
                        break;
                        case "F453":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(338, 335,10,34);
                            break;
                        } 
                        break;
                        case "F454":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(349, 335,10,34);
                            break;
                        } 
                        break;
                        case "F455":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(361, 335,10,34);
                            break;
                        } 
                        break;
                        case "F456":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(389, 335,10,34);
                            break;
                        } 
                        break;
                        case "F457":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(402, 335,10,34);
                            break;
                        } 
                        break;
                        case "F458":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(414, 335,10,34);
                            break;
                        } 
                        break;
                        case "F459":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(427, 335,10,34);
                            break;
                        } 
                        break;
                        case "F460":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(438, 335,10,34);
                            break;
                        } 
                        break;
                        case "F461":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(451, 335,10,34);
                            break;
                        } 
                        break;
                        case "RELX":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "RELE,100-8965,pink":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF00FF";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                            case "RELE,101-0733,gray":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#A9A9A9";
                            ctx_pdcr_mid.strokeRect(292, 208,55,60);
                            break;
                        } 
                        break;
                        case "RELU":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "RELE,100-8965,pink":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF00FF";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                            case "RELE,101-0733,gray":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#A9A9A9";
                            ctx_pdcr_mid.strokeRect(355, 209,55,60);
                            break;
                        } 
                        break;
                        case "RELT":
                        switch (vision["PDC-RMID"][pdcr_1_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFD700";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#8B4513";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#008000";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFFFF";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFFF00";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "MAXI,40,orange":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FFA500";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF0000";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#0000FF";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "RELE,100-8965,pink":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#FF00FF";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                            case "RELE,101-0733,gray":
                            ctx_pdcr_mid.beginPath();
                            ctx_pdcr_mid.strokeStyle = "#A9A9A9";
                            ctx_pdcr_mid.strokeRect(414, 209,55,60);
                            break;
                        } 
                        break;
                        default:
                    }
                }
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
            ctx.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcs_array.length; i++) {
                    pdcs_array[i]
                    // console.log("pdcs_array[i]",pdcs_array[i]);
                    // console.log("pdcs_array[i] COLOR: ",vision["PDC-S"][pdcs_array[i]])                 
                    switch (pdcs_array[i]){
                        case "1":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "ATO,10,red":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                            case "ATO,7.5,brown":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(439, 218,48,175);
                            break;
                        }                        
                        break;
                        case "2":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "ATO,10,red":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                            case "ATO,7.5,brown":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(494, 218,48,175);
                            break;
                        }
                        break;
                        case "3":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "ATO,10,red":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                            case "ATO,7.5,brown":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(550, 218,48,175);
                            break;
                        }
                        break;
                        case "4":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "ATO,10,red":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                            case "ATO,7.5,brown":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(607, 219,48,175);
                            break;
                        }
                        break;
                        case "5":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "ATO,10,red":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                            case "ATO,7.5,brown":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(661, 218,48,175);
                            break;
                        }
                        break;
                        case "6":
                        switch (vision["PDC-S"][pdcs_array[i]]){
                            case "ATO,10,red":
                            ctx.beginPath();
                            ctx.strokeStyle = "#FF0000";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                            case "ATO,7.5,brown":
                            ctx.beginPath();
                            ctx.strokeStyle = "#8B4513";
                            ctx.strokeRect(719, 218,48,175);
                            break;
                        }
                        break;
                        default:
                    }
                }
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
            ctx_tblu.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < tblu_array.length; i++) {
                    tblu_array[i]
                    // console.log("tblu_array[i]",tblu_array[i]);
                    // console.log("tblu_array[i] COLOR: ",vision["TBLU"][tblu_array[i]])                 
                    switch (tblu_array[i]){
                        case "9":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(79, 531,40,68);
                            break;
                        }                        
                        break;
                        case "8":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(125, 532,40,68);
                            break;
                        }
                        break;
                        case "7":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(167, 532,40,68);
                            break;
                        }
                        break;
                        case "6":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(212, 532,40,68);
                            break;
                        }
                        break;
                        case "5":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(257, 531,40,68);
                            break;
                        }
                        break;
                        case "4":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(300, 530,40,68);
                            break;
                        }
                        break;
                        case "3":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(347, 533,40,68);
                            break;
                        }
                        break;
                        case "2":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(388, 531,40,68);
                            break;
                        }
                        break;
                        case "1":
                        switch (vision["TBLU"][tblu_array[i]]){
                            case "ATO,10,red_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FF0000";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "ATO,5,beige_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#FFD700";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                            case "ATO,15,blue_clear":
                            ctx_tblu.beginPath();
                            ctx_tblu.strokeStyle = "#0000FF";
                            ctx_tblu.strokeRect(435, 531,40,68);
                            break;
                        }
                        break;
                        default:
                    }
                }
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
            // console.log("imgWidth_pdcd: ",imgWidth_pdcd);
            // console.log("imgHeight_pdcd: ",imgHeight_pdcd);
            // console.log("img_pdcd.width: ",img_pdcd.width);
            // console.log("img_pdcd.height: ",img_pdcd.height);
            ctx_pdcd.drawImage(this,0,0,imgWidth_pdcd,imgHeight_pdcd);
            var datosimagen = ctx_pdcd.getImageData(0,0,imgWidth_pdcd,imgHeight_pdcd);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcd = datosimagen.data;
            ctx_pdcd.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcd_array.length; i++) {
                    pdcd_array[i]
                    // console.log("pdcd_array[i]",pdcd_array[i]);
                    // console.log("pdcd_array[i] COLOR: ",vision["PDC-D"][pdcd_array[i]])                 
                    switch (pdcd_array[i]){
                        case "F200":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 572,28,12);
                            break;
                        }                        
                        break;
                        case "F201":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 555,28,12);
                            break;
                        }                        
                        break;
                        case "F202":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 540,28,12);
                            break;
                        }
                        break;
                        case "F203":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 523,28,12);
                            break;
                        }
                        break;
                        case "F204":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 504,28,12);
                            break;
                        }
                        break;
                        case "F205":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 490,28,12);
                            break;
                        }
                        break;
                        case "F206":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 471,28,12);
                            break;
                        }
                        break;
                        case "F207":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 455,28,12);
                            break;
                        }
                        break;
                        case "F208":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(271, 438,28,12);
                            break;
                        }
                        break;
                        case "F209":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 573,52,12);
                            break;
                        }
                        break;
                        case "F210":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 553,52,12);
                            break;
                        }
                        break;
                        case "F211":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 536,52,12);
                            break;
                        }
                        break;
                        case "F212":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 520,52,12);
                            break;
                        }
                        break;
                        case "F213":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 504,52,12);
                            break;
                        }
                        break;
                        case "F214":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 486,52,12);
                            break;
                        }
                        break;
                        case "F215":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 470,52,12);
                            break;
                        }
                        break;
                        case "F216":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(366, 451,52,12);
                            break;
                        }
                        break;
                        case "F217":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(291, 401,18,12);
                            break;
                        }
                        break;
                        case "F218":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(291, 385,18,12);
                            break;
                        }
                        break;
                        case "F219":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(291, 368,18,12);
                            break;
                        }
                        break;
                        case "F220":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(291, 351,18,12);
                            break;
                        }
                        break;
                        case "F221":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(291, 334,18,12);
                            break;
                        }
                        break;
                        case "F222":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 402,18,12);
                            break;
                        }
                        break;
                        case "F223":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 383,18,12);
                            break;
                        }
                        break;
                        case "F224":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 366,18,12);
                            break;
                        }
                        break;
                        case "F225":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 349,18,12);
                            break;
                        }
                        break;
                        case "F226":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(342, 332,18,12);
                            break;
                        }
                        break;
                        case "F227":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(377, 417,18,12);
                            break;
                        }
                        break;
                        case "F228":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(374, 401,18,12);
                            break;
                        }
                        break;
                        case "F229":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(374, 386,18,12);
                            break;
                        }
                        break;
                        case "F230":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(374, 367,18,12);
                            break;
                        }
                        break;
                        case "F231":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(374, 350,18,12);
                            break;
                        }
                        break;
                        case "F232":
                        switch (vision["PDC-D"][pdcd_array[i]]){
                            case "ATO,5,beige_clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                            case "MINI,5,beige":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFD700";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                            case "ATO,7.5,brown":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#8B4513";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FF0000";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#008000";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#0000FF";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcd.beginPath();
                            ctx_pdcd.strokeStyle = "#FFFFFF";
                            ctx_pdcd.strokeRect(374, 333,18,12);
                            break;
                        }
                        break;
                        default:
                    }
                }
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
            ctx_pdcp.lineWidth = "4";
            pintar_2();

            function pintar_2(){
                for (var i = 0; i < pdcp_array.length; i++) {
                    pdcp_array[i]
                    // console.log("pdcp_array[i]",pdcp_array[i]);
                    // console.log("pdcp_array[i] COLOR: ",vision["PDC-P"][pdcp_array[i]])                 
                    switch (pdcp_array[i]){
                        case "MF1":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 276,90,12);
                            break;
                        }                        
                        break;
                        case "MF2":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(279, 295,90,12);
                            break;
                        }
                        break;
                        case "F300":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(282, 395,45,12);
                            break;
                        }
                        break;
                        case "F301":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 380,28,10);
                            break;
                        }
                        break;
                        case "F302":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 365,28,10);
                            break;
                        }
                        break;
                        case "F303":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 350,28,10);
                            break;
                        }
                        break;
                        case "F304":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 335,28,10);
                            break;
                        }
                        break;
                        case "F305":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(289, 322,28,10);
                            break;
                        }
                        break;
                        case "F318":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 428,28,10);
                            break;
                        }
                        break;
                        case "F319":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 415,28,10);
                            break;
                        }
                        break;
                        case "F320":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 400,28,10);
                            break;
                        }
                        break;
                        case "F321":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 384,28,10);
                            break;
                        }
                        break;
                        case "F322":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 368,28,10);
                            break;
                        }
                        break;
                        case "F323":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 354,28,10);
                            break;
                        }
                        break;
                        case "F324":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 340,28,10);
                            break;
                        }
                        break;
                        case "F325":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(341, 326,28,10);
                            break;
                        }
                        break;
                        case "F326":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 427,45,10);
                            break;
                        }
                        break;
                        case "F327":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 413,45,10);
                            break;
                        }
                        break;
                        case "F328":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 398,45,10);
                            break;
                        }
                        break;
                        case "F329":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 384,45,10);
                            break;
                        }
                        break;
                        case "F330":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 369,45,10);
                            break;
                        }
                        break;
                        case "F331":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 354,45,10);
                            break;
                        }
                        break;
                        case "F332":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 339,45,10);
                            break;
                        }
                        break;
                        case "F333":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 324,45,10);
                            break;
                        }
                        break;
                        case "F334":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 309,45,10);
                            break;
                        }
                        break;
                        case "F335":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(378, 294,45,10);
                            break;
                        }
                        break;
                        case "E21":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(287, 423,10,15);
                            break;
                        }
                        break;
                        case "E22":
                        switch (vision["PDC-P"][pdcp_array[i]]){
                            case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFD700";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FF0000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#008000";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "ATO,25,clear":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFFFF";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#0000FF";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "MULTI,5,yellow":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#FFFF00";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                            case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            ctx_pdcp.strokeStyle = "#8B4513";
                            ctx_pdcp.strokeRect(292, 442,10,20);
                            break;
                        }
                        break;
                        default:
                    }
                }
            }
        }
    }
}