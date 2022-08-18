Global Integer cavity, Insertando, EstatusC_actual
Global String caja$, letracavidad$
Global Double ajustX, ajustY, ajustZ, ajustU

'------------------------------Funcion de insercion de fusibles------------------------------------
Function insertarFusible

	ajustX = 0; ajustY = 0; ajustZ = 0; ajustU = 0

	Work_Speed
	
	letracavidad$ = "F"
	
	If (caja$ = "PDCP") Then
		If cavidad$ = "MF1" Then
			letracavidad$ = ""
			cavity = 39
		ElseIf cavidad$ = "MF2" Then
			letracavidad$ = ""
			cavity = 40
		EndIf
        GoSub insertar
	ElseIf (caja$ = "PDCD") Then
		GoSub insertar
	Else
		Print "Error, caja incorrecta"
		Off vacio
		Go home_R
		letracavidad$ = ""
		cavidad$ = "CAJA INVALIDA"
	EndIf
	
	Exit Function
	
	
	insertar:
	
		Seleccionar_Tool	'Tool: 1 - Cilindro A, 2 - Cilindro B
		Ajustes
		P(cavity) = P(cavity) +X(ajustX) +Y(ajustY) +Z(ajustZ) +U(ajustU)
		Go P(cavity) :Z(-20)
		
		If cavidad$ = "MF1" Or cavidad$ = "MF2" Then
			Move P(cavity) +Z(50)
		Else
			Go P(cavity) +Z(50)
		EndIf
		
		EstatusC_actual = EstatusCilindro
		
		On cilindro
		
		Wait 0.3
		revisar_vacio3
		Print("Despues de revisar vacio3")
		Wait 0.3
		
		Low_Speed
		If cavidad$ = "MF1" Or cavidad$ = "MF2" Then
			Extra_Low_Speed
		EndIf
		
		Do Until EstatusCilindro <> EstatusC_actual 'Asegurar que salga cilindro
		Loop
		Insertando = 1
		
		Move P(cavity)
		Wait 0.2
		
		Insertando = 0
		
		'Retirarse después de insertar
		Off vacio
		Move P(cavity) +Z(50)
		SubirRobot_Z
		Off cilindro
		P(cavity) = P(cavity) -X(ajustX) -Y(ajustY) -Z(ajustZ) -U(ajustU)
		Work_Speed
		Tool 0
		
	Return
	
Fend

Function Seleccionar_Tool
	
	If cilindro = cilindro_a Then	  'Tool 1 para cilindro A
		TLSet 1, XY(66.190, 63.029, 0, 0)
		'Tool 1
		Tool 0
	ElseIf cilindro = cilindro_b Then 'Tool 2 para cilindro B
		TLSet 2, XY(0, 0, 0, 0)
		'Tool 2
		Tool 0
	EndIf
	
Fend

Function Ajustes
	'Usando de base MINI_5
	'Usando de base ATO_25
	'Usando de base MULTI_7.5
	
	If fusible$ = "MINI_10" And cavity > 207 Then
		ajustY = 0.3
		ajustX = 1.5
	ElseIf fusible$ = "MINI_10" And cavity < 207 Then
		ajustY = 0.5
		ajustX = 1.2
	ElseIf fusible$ = "MINI_7.5" Then
		ajustU = -1
		ajustY = 2.5
		ajustX = 1.5
	ElseIf fusible$ = "MINI_15" Then
		ajustU = -4
		ajustY = 6
		ajustX = -1
		If cavity = 204 Then
			ajustY = ajustY - 0.5
		EndIf
	ElseIf fusible$ = "ATO_5" Then
		ajustU = 2.5
		ajustY = -1
		ajustX = -3.5
		If caja$ = "PDCP" Then
		ajustX = ajustX + 5.6
		ajustY = ajustY + 2.7
		ajustU = ajustU - 1
		EndIf
		
	ElseIf fusible$ = "ATO_15" Then
		ajustU = 0
		ajustY = -0.1
		ajustX = -0.5
		If cavity = 300 Then
			ajustU = ajustU + 2.5
			ajustX = ajustX + 5.7
			ajustY = ajustY - 0.6
		EndIf
		If caja$ = "PDCD" Then
			ajustX = ajustX + 1.9
		EndIf
	ElseIf fusible$ = "MINI_7.5" And cavity = 320 Then
		ajustU = 0
		ajustY = 0.7
		ajustX = 0.5
		
	ElseIf fusible$ = "MINI_7.5" And cavity = 318 Then
		ajustX = ajustX - 0.3
		
	ElseIf fusible$ = "ATO_30" And caja$ = "PDCP" Then
		ajustU = -3.6
		ajustY = -1.5
		ajustX = -6.1 '-5.7
		ajustZ = ajustZ + 1
		'If cavity = 326 Then
		'	ajustZ = ajustZ + 1
		'EndIf
		
	ElseIf fusible$ = "ATO_30" And caja$ = "PDCD" Then
		ajustU = -1
		ajustY = 0
		ajustX = 2
	ElseIf fusible$ = "MULTI_5" Then
		ajustU = -1
		ajustY = -0.5 - 0.5
		ajustX = -2.5
	EndIf
	
	If caja$ = "PDCD" Then
		If fusible$ = "ATO_7.5" Then
			ajustX = ajustX + 1.8
			ajustY = ajustY - 0.4
			If (cavity = 212) Or (cavity = 211) Then
				ajustX = ajustX - 1
			ElseIf (cavity = 210) Or (cavity = 209) Then
				ajustX = ajustX - 2
				ajustY = ajustY - 1
			EndIf
		EndIf
	EndIf
	
	If caja$ = "PDCP" Then
		ajustX = ajustX - 1.5
	EndIf
	
	'Ajuste global de MINI_7.5 por acomodo de feeder
	If fusible$ = "MINI_7.5" Then
		ajustX = ajustX - 0.7
		ajustY = ajustY - 1
		Print("Ajuste global MINI_7.5")
	EndIf
Fend

