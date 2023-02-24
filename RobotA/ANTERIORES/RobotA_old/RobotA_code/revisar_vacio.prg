Function revisar_vacio3
	
	If Sw(vacio_ok) = 0 Then
		Print "ENTRO A VACIO 3 !!!!!!!!!!!!!!!!"
		Tool 0
		Off cilindro
		SubirRobot_Z
		Off vacio
		tomaFusible
		Print "Fusible tomado: " + fusible$
		insertarFusible
	EndIf
	
Fend


Function revisar_vacio2
	
	
	If Sw(vacio_ok) = 0 Then
		Off cilindro
		SubirRobot_Z
		Off vacio
		tomaFusible
		Print "Fusible tomado: " + fusible$
	EndIf
	
	
Fend

Function revisar_vacio1
	
	
	If Sw(vacio_ok) = 0 Then
		Off cilindro
		SubirRobot_Z
		Off vacio
		tomaFusible
		Print "Fusible tomado: " + fusible$
	EndIf
	
Fend
