Global Integer recursividad_vacio

Function revisar_vacio3
	
	If Sw(vacio_ok) = 0 Then
		Reset_Grippers_PLC
		If cilindro = cilindro_a Then
			Tool 3
		Else
			Tool 4
		EndIf
		
		Off cilindro
		SubirRobot_Z
		Off vacio
		tomaFusible
		Print "Fusible tomado: " + fusible$
		P(cavity) = P(cavity) -X(ajustX) -Y(ajustY) -Z(ajustZ) -U(ajustU)
		insertarFusible
	EndIf
	
Fend



Function revisar_vacio1
	
	
	If Sw(vacio_ok) = 0 Then
		Reset_Grippers_PLC
		Off cilindro
		SubirRobot_Z
		Off vacio
		tomaFusible
		Print "Fusible tomado: " + fusible$
	EndIf
	
Fend
