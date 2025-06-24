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
		Go HOME_R
		letracavidad$ = ""
		cavidad$ = "CAJA INVALIDA"
		
	EndIf
	
	
	Exit Function
	
	
	insertar:
		Seleccionar_Tool	'Tool: 1 - Cilindro A, 2 - Cilindro B
		Ajustes
		P(cavity) = P(cavity) +X(ajustX) +Y(ajustY) +Z(ajustZ) +U(ajustU)
		Go P(cavity) :Z(CZ(P910))

		Print #202, "TAKE_AVAILABLE"
		On AVAILABLE 'Negado
		revisar = 0
		Insercion_PistonExtendido
		
		
		Print #202, "INSERTED"
		
		If cavidad$ = "MF1" Or cavidad$ = "MF2" Then
			Wait 1.5
		EndIf
		
		
		Off vacio
		Off cilindro
		'Retirarse después de insertar
		SubirRobot_Z
		
		Off AVAILABLE 'Negado
		Wait 0.3
		On AVAILABLE 'Negado
		
		
		P(cavity) = P(cavity) -X(ajustX) -Y(ajustY) -Z(ajustZ) -U(ajustU)
		
		If cilindro = cilindro_a Then
			Tool 1
		Else
			Tool 2
		EndIf

	Return
	
Fend

Function Seleccionar_Tool
	
	If cilindro = cilindro_a Then	  'Tool 1 para cilindro A
		
		Tool 1
	ElseIf cilindro = cilindro_b Then 'Tool 2 para cilindro B
		
		Tool 2
	EndIf
	
Fend




Function Monitoreo_Insercion
			
	If cilindro = 523 Then 'cilindro_a = 523
	
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
	
	
	ElseIf cilindro = 524 Then 'cilindro_b = 524
	
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
	
	EndIf
	
Fend

Function Insercion_PistonExtendido
		
	EstatusC_actual = EstatusCilindro
	On cilindro

	Low_Speed
	Do Until EstatusCilindro <> EstatusC_actual 'Asegurar que salga cilindro
    Loop

	Check_Vacio = 0

'	Move P(cavity) +Z(40)
'	Pause

	If cavidad$ = "MF2" Then
		Move aux_mf2 +Z(30)
		Move aux_mf2
		Move aux_mf2_2
		Move aux_mf2_3
	EndIf


	Move P(cavity)
	Monitoreo_Insercion

	
Fend

