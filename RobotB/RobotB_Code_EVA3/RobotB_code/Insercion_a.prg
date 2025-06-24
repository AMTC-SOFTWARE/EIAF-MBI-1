Global Integer cavity, Insertando, EstatusC_actual
Global String caja$
Global Double ajustX, ajustY, ajustZ, ajustU

'------------------------------Funcion de insercion de fusibles------------------------------------
Function insertarFusible
	
	ajustX = 0; ajustY = 0; ajustZ = 0; ajustU = 0
	 
	Work_Speed
		
	If (caja$ = "PDCR") Then
		'-----------------------BASE PARA HACER LOS RELAY----------------------
		If cavidad$ = "RELU" Then
			cavity = 68 'Tienen que tener un número asignado para Move P(cavity) +Z(50)
		ElseIf cavidad$ = "RELX" Then
			cavity = 69
		ElseIf cavidad$ = "RELT" Then
			cavity = 70
		EndIf
		'-----------------------INSERCION---------------------
		GoSub insertar
		'-----------------------------------------------------------'
		
		
	ElseIf caja$ = "TBLU" Then
		'-----------------------INSERCION---------------------
		GoSub insertar
		'-----------------------------------------------------------'
		
	ElseIf caja$ = "PDCS" Then
		'-----------------------INSERCION---------------------
		GoSub insertar
		'-----------------------------------------------------------'
		
	ElseIf caja$ = "F96_box" Then
		'-----------------------INSERCION---------------------
		GoSub insertar
		'-----------------------------------------------------------'
		
	Else
		Print "Error, caja incorrecta"
		Off vacio
		Go home_l
		cavidad$ = "CAJA INVALIDA"
		
	EndIf
	
	Exit Function
	
	
	insertar:
		'Seleccionar_Tool	'Tool: 1 - Cilindro A, 2 - Cilindro B
		
		Ajuste 				'Ajustar fusibles
		P(cavity) = P(cavity) +X(ajustX) +Y(ajustY) +Z(ajustZ) +U(ajustU)
		
		
		Print("Antes de Movimiento Intermedio insercion")
		If fusible$ = "ATOC_15" Or fusible$ = "MINI_15" Or fusible$ = "ATO_7.5" Then
			Print(" ATOC15 Y MINI15INTERMEDIO")
			Go INTERMEDIO2
		EndIf
		If fusible$ = "MAXI_50" Then
			Move maxi50_2
		EndIf
		
		
		If cavidad$ = "RELU" Then
			P(cavity) = RELU1
		EndIf
			
			
		If cavidad$ = "RELX" Or cavidad$ = "RELU" Then
			If mid = True Then
				If cavidad$ = "RELX" Then
					Print("RELX MID aquí")
					P(cavity) = RELX1MID
				EndIf
			EndIf
			Go P(cavity) :Z(-31)
		Else
			Go P(cavity) :Z(CZ(P210)) ' ir a punto de insercion con la Z que tomaste el fusible
		EndIf
			
'       Pause
				
		Print #202, "TAKE_AVAILABLE"
		On AVAILABLE 'Negado
		
		Print (Tool)
		If fusible$ = "RELAY_132" Then

			EstatusC_actual = EstatusCilindro
			Extra_Low_Speed


			On cilindro
			Do Until EstatusCilindro <> EstatusC_actual 'Asegurar que salga cilindro
			Loop

'			If mid = True Then
'				P(cavity) = RELX1MID
'			EndIf
			
			If mid = True Then
			    Print("RELX1MID MIDTRUE")
				P(cavity) = RELX1MID
				RELX2 = RELX2TOOL7MID
				RELX3 = RELX3TOOL7MID
				Print (P(cavity))
			Else
				P(cavity) = PDCR_RELX
				RELX2 = RELX2TOOL7
				RELX3 = RELX3TOOL7
			
			EndIf
			
			
			If cavidad$ = "RELU" Then
			    Print("RELU")
				P(cavity) = RELU1
				RELX2 = RELU2
				RELX3 = RELU3
				Print (P(cavity))
			EndIf
			Print (Tool)


			Move P(cavity)
			RELX_Speed
			check_vacio_relay
			Monitoreo_Insercion
			'If cavidad$ = "RELX" Then
			'	Tool 7
			'EndIf
			Tool 5
'			Move RELX2TOOL7 ROT
			check_vacio_relay
'			Pause
			Extra_Low_Speed
			Monitoreo_Insercion
			Check_Vacio = 0
			check_vacio_relay
			Move RELX3
			Print (Tool)
			Monitoreo_Insercion
			Off vacio
			Tool 5

		Else
			Insercion_PistonExtendido
		EndIf
		
		Print #202, "INSERTED"
		
		If fusible$ = "RELAY_132" Then
			Wait 1.5
		EndIf
		
		'Monitoreo_Insercion
		Off vacio
		Off cilindro
		Off switch_presion
		If fusible$ = "RELAY_112" Then
			Wait 0.8
			Move REL112PISTONDENTRO
			Wait 0.4
		EndIf
		
		
		'Retirarse después de insertar
		SubirRobot_Z
		
		Off AVAILABLE 'Negado
		Wait 0.3
		On AVAILABLE 'Negado	
		
		P(cavity) = P(cavity) -X(ajustX) -Y(ajustY) -Z(ajustZ) -U(ajustU)
		Tool 5

		
	Return
	
Fend

Function check_vacio_relay
	
	If error_vacioo = 1 Then
'		Check_Vacio = 0
		error_vacioo = 0
		Tool 5
		'zona = 1 significa dentro de la zona
		'zona = 0 significa fuera de la zona
		Box 3, -150, -50, 170, 470, 0, 0
		Zona3 = GetRobotInsideBox(3)
		If Zona3 = 1 Then
			Print("zona3")
			SubirRobot_Z 'En SubirRobot_Z hay un Work_Speed
			Home_Speed
			Go home_l
			Off vacio
		EndIf
		Pause
	EndIf
	
Fend

Function Seleccionar_Tool
	
	If cilindro = cilindro_a Then	  'Tool 1 para cilindro A
		TLSet 1, XY(75.854, 57.550, 0, 0)
		Tool 1
	ElseIf cilindro = cilindro_b Then 'Tool 2 para cilindro B
		TLSet 2, XY(-79.069, 45.672, 0, 0)
		Tool 2
	EndIf
	
Fend


Function Insercion_PistonExtendido
	
	EstatusC_actual = EstatusCilindro
	
	'	Pause
	On cilindro
	If fusible$ = "RELAY_112" Then
		Extra_Low_Speed
	ElseIf fusible$ = "MAXI_30" Or fusible$ = "MAXI_40" Or fusible$ = "MAXI_50" Then
		Low_Speed
	Else
		FastInsertion_Speed '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
	EndIf

	Do Until EstatusCilindro <> EstatusC_actual 'Asegurar que salga cilindro
		
    Loop
	

	Check_Vacio = 0
	
'	Move P(cavity) +Z(20)
'	Pause
	
	Move P(cavity)
	'	Pause
	
	If (cavity = 413 Or cavity = 436 Or cavity = 422) Then 'DARLES TIEMPO PORQUE LUEGO DETECTA MALA INSERCION AUNQUE SE HALLA PUESTO BIEN
		Wait 0.5
	EndIf
	
	Monitoreo_Insercion
	

				
Fend


Function Monitoreo_Insercion
			
	If cilindro = 523 Then 'cilindro_a = 523
	
		If EstatusCilindro = 0 Or EstatusCilindro = 1 Then
				Print("EstatusCilindro de error: "); Print (EstatusCilindro)

				Print #202, "ERROR_insertion"
				On 544
				
				Off cilindro
				FindHome_after_error

				Print "______________________________________"
				Print "Retirar Fusible y reintentar inserción"
				Print "______________________________________"
				
				Pause
		
		EndIf
	
	
	ElseIf cilindro = 524 Then 'cilindro_b = 524
	
		If EstatusCilindro = 0 Or EstatusCilindro = 4 Then
				Print("EstatusCilindro de error: "); Print (EstatusCilindro)

				Print #202, "ERROR_insertion"
				On 544
				
				Off cilindro
				FindHome_after_error

				Print "______________________________________"
				Print "Retirar Fusible y reintentar inserción"
				Print "______________________________________"

				Pause
	
		EndIf
	
	EndIf
	
Fend

