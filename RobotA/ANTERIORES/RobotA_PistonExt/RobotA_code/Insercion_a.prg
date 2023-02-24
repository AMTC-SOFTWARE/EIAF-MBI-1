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
			cavity = 48
		ElseIf cavidad$ = "MF2" Then
			letracavidad$ = ""
			cavity = 49
		EndIf
        GoSub insertar
	ElseIf (caja$ = "PDCD") Then
		GoSub insertar
	Else
		Print "Error, caja incorrecta"
		Off vacio
		Off cilindro
		Go home_R
		letracavidad$ = ""
		cavidad$ = "CAJA INVALIDA"
	EndIf
	
	Exit Function
	
	
	insertar:
	
		Seleccionar_Tool	'Tool: 1 - Cilindro A, 2 - Cilindro B
		Ajustes
		P(cavity) = P(cavity) +X(ajustX) +Y(ajustY) +Z(ajustZ) +U(ajustU)
		Go P(cavity) :Z(CZ(P910))
		
		Print("//////////////////////////////////////////////////////")
		Tiempo_traslado_insercion = (Tmr(5))
		
		Print #202, "TIEMPO_TRASLADO_INSERCION: " + Str$((Tmr(5))) + " s"
		TmReset 5

		'revisar_vacio3
		Revisando_vacio = 1

		If recursividad_vacio <> 1 Then
			
			Print #202, "TAKE_AVAILABLE"
			On AVAILABLE 'Negado
			
			Insercion_PistonExtendido
			
			Off vacio
			'Off cilindro
			'Retirarse después de insertar
			SubirRobot_Z
			P(cavity) = P(cavity) -X(ajustX) -Y(ajustY) -Z(ajustZ) -U(ajustU)
			
			If cilindro = cilindro_a Then
				Tool 3
			Else
				Tool 4
			EndIf
			
			recursividad_vacio = 1
			
			Print("//////////////////////////////////////////////////////")
			Tiempo_subida_insercion = (Tmr(5))
			
			Print #202, "TIEMPO_SUBIDA_INSERCION: " + Str$((Tmr(5))) + " s"
			TmReset 5
			
		EndIf
		
	Return
	
Fend

Function Seleccionar_Tool
	
	If cilindro = cilindro_a Then	  'Tool 1 para cilindro A
		TLSet 1, XY(66.190, 63.029, 0, 0)
		'Tool 1
		Tool 3
	ElseIf cilindro = cilindro_b Then 'Tool 2 para cilindro B
		TLSet 2, XY(0, 0, 0, 0)
		'Tool 2
		Tool 4
	EndIf
	
Fend

Function Ajustes
	'Usando de base MINI_5
	'Usando de base ATO_25
	'Usando de base MULTI 7.5 (para MF1)
	'Usando de base MULTI 7.5 (para MF2)	
	'Ya se consideran Tools en insercion para mejor ajuste
	'Para PDCP F300 se considera como base ATO_15 ya que es el que siempre lleva

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
'-----------------------------------------------------------------------
'AJUSTE PARA PDCD F207 STRESS TEST
		If cavity >= 217 And cavity <= 221 Then
			ajustX = ajustX + 0.5	'Ajuste para STRESS TEST 12 de DIC
		EndIf
'-----------------------------------------------------------------------		
	ElseIf fusible$ = "ATO_5" Then
		If caja$ = "PDCD" Then
			ajustU = 2.5
			ajustY = -1
			ajustX = -3
			'AJUSTES EXTRA PARA VENTOSA NUEVA
			ajustU = ajustU + 14.102
			ajustY = ajustY - 161.25 + 0.5
			ajustX = ajustX - 26
			ajustZ = ajustZ - 5.5
			If (cavity >= 209 And cavity <= 211) Then
				ajustY = ajustY - 0.5
			EndIf
		EndIf
		If caja$ = "PDCP" Then
			ajustX = ajustX + 4.9
			ajustU = ajustU + 2
		EndIf
	
	ElseIf fusible$ = "MINI_7.5" And cavity = 320 Then
		ajustU = 0
		ajustY = 0.7
		ajustX = 0.5
		
	ElseIf fusible$ = "MINI_7.5" And cavity = 318 Then
		ajustX = ajustX - 0.3
		
	ElseIf fusible$ = "ATO_7.5" And caja$ = "PDCP" Then
		ajustU = -3.6
		ajustY = -1.8
		ajustX = -5
		ajustZ = ajustZ + 1
		'If cavity = 326 Then
		'	ajustZ = ajustZ + 1
		'EndIf
		
	ElseIf fusible$ = "ATO_7.5" And caja$ = "PDCD" Then
		ajustU = -1
		ajustY = 0
		ajustX = 2
'	ElseIf fusible$ = "MULTI_5" Then
'		ajustU = -1
'		ajustY = -1.3
'		ajustX = -2.5
	EndIf
	
	If caja$ = "PDCD" Then 'Inicio If caja PDCD -----------------------------------------------------------------
' SE COMENTAN AJUSTES DE PISTON A (ATO30_BW_OLD)
'		If fusible$ = "ATO_30" Then
'			ajustX = ajustX + 1.8
'			ajustY = ajustY - 0.4
'			If (cavity = 212) Or (cavity = 211) Then
'				ajustX = ajustX - 1
'				ajustY = ajustY + 0.2
'			ElseIf (cavity = 210) Or (cavity = 209) Then
'				ajustX = ajustX - 2
'				ajustY = ajustY - 0.5
'			ElseIf (cavity >= 213 And cavity <= 216) Then
'				ajustX = ajustX - 5.9 + 4
'				ajustY = ajustY - 1.3 + 1
'				ajustU = ajustU + 1
'			EndIf
'		EndIf


'#######################################################################'
'#######################################################################'
' AJUSTES PARA ATO 30 BOWL CON NUEVA VENTOSA (LAMANITA) Y PISTON B PARA CAJA PDCD
		If fusible$ = "ATO_30" Then
			ajustX = ajustX - 30.414
			ajustY = ajustY - 162.385
			ajustU = ajustU + 17.087
			ajustZ = ajustZ - 6
			If cavity >= 213 And cavity <= 216 Then
				ajustX = ajustX + 0.5
				ajustY = ajustY + 0.15
				If cavity >= 215 And cavity <= 216 Then
					ajustY = ajustY + 0.15
				EndIf
			EndIf
		EndIf
		
		If fusible$ = "ATO_15" Then
			ajustX = ajustX - 29.52
			ajustY = ajustY - 162.2
			ajustU = ajustU + 20.392 - 3.5
			ajustZ = ajustZ - 6
		EndIf
'#######################################################################'
'#######################################################################'

		
	EndIf 'End If de caja PDCD ----------------------------------------------------------------------------------
	
	'Ajuste global de MINI_7.5 por acomodo de feeder
	If fusible$ = "MINI_7.5" Then
		ajustX = ajustX - 0.7
		ajustY = ajustY - 1
		Print("Ajuste global MINI_7.5")
	EndIf
	
	If fusible$ = "ATO_25" Then
		If caja$ = "PDCD" Then
			If (cavity >= 209 And cavity <= 216) Then
				ajustY = ajustY - 163.74
				ajustX = ajustX - 26.6
				ajustU = ajustU + 18.90
				ajustZ = ajustZ - 5.2
			EndIf
		EndIf
	EndIf
	
	If caja$ = "PDCP" Then
		ajustX = ajustX - 1.5
		If (cavity >= 318 And cavity <= 325) Then
		' Ajuste para MINI_5 BOWL
'			If fusible$ = "MINI_5" Then
'				ajustX = ajustX + 1.5
'			EndIf
			If fusible$ = "MINI_7.5" Then
				ajustX = ajustX + 1
				ajustY = ajustY + 1
			EndIf
			If fusible$ = "MINI_10" Then
				ajustX = ajustX - 0.2
				ajustY = ajustY + 0.6
			EndIf
			If fusible$ = "MINI_15" Then
				ajustX = ajustX + 2.5
				ajustY = ajustY + 0.5
			EndIf
		EndIf
		
		If (cavity >= 326 And cavity <= 335) Then
			If fusible$ = "ATO_15" Then
				ajustX = ajustX - 70.073
				ajustY = ajustY + 16.2
				ajustU = ajustU - 164.579
				ajustZ = ajustZ - 5.7
			EndIf
			If fusible$ = "ATO_25" Then
				ajustX = ajustX + 1.2 - 65.80
				ajustY = ajustY - 1 + 14.158
				ajustU = ajustU - 160.35
				ajustZ = ajustZ - 5.5
			EndIf
			
'##########################################################################################################			
			If fusible$ = "ATO_30" Then ' AJUSTES ATO_30 PISTON B (LAMANITA) ------------------------------
				ajustX = ajustX - 74.376
				ajustY = ajustY + 17.766
				ajustU = ajustU - 166.102
				ajustZ = ajustZ - 6
				If cavity >= 331 And cavity <= 334 Then
					ajustX = ajustX + 1
					ajustY = ajustY + 0.2
				EndIf
				If cavity = 335 Then
					ajustX = ajustX + 0.5
					ajustY = ajustY + 0.2
				EndIf
			EndIf 'Fin de ajustes ATO_30 PISTON B (LAMANITA) ----------------------------------------------
'##########################################################################################################			

		EndIf
		If fusible$ = "MINI_5" Then
			ajustX = ajustX + 4.562
			ajustY = ajustY - 15.363
			ajustU = ajustU + 8.886
			If caja$ = "PDCD" Then
				If cavity >= 200 And cavity <= 204 Then
					ajustX = ajustX + 4.475
					ajustY = ajustY - 12.236
					ajustU = ajustU + 6.072
				ElseIf cavity >= 205 And cavity <= 208 Then
					ajustX = ajustX + 4.707
					ajustY = ajustY - 12.836
					ajustU = ajustU + 5.996
				EndIf
		EndIf
		If caja$ = "PDCP" Then
			ajustX = ajustX - 1.221
			ajustY = ajustY + 9.702
			ajustU = ajustU - 5.748
			If cavity >= 301 And cavity <= 305 Then
				ajustX = ajustX + 0.4
				ajustY = ajustY - 9.248
				ajustU = ajustU + 6.902
			EndIf
		EndIf
	EndIf

	If cavity = 300 Then
        If fusible$ = "ATO_15" Then
        	ajustX = ajustX + 3
        	ajustY = ajustY - 1
        	ajustU = ajustU + 0.5
        EndIf
	EndIf
	EndIf
	
	
	
	If caja$ = "PDCP" Then
		If (cavity <> 300) Then
			If fusible$ = "ATO_15" Then
				ajustU = ajustU + 1
				ajustY = ajustY - 0.4
			EndIf
		EndIf
	EndIf
	
	'AJUSTE ATO_15 F300 PDCP CON NUEVA VENTOSA !!!!!!!!!!!!!!
	If cavity = 300 And fusible$ = "ATO_15" Then
		' Se sobreescriben los ajustes para no tomar en cuenta ajustes anteriores
		' El ajuste real de ATO_15 F300 comienza a partir de aqui...
		ajustX = -71.599
		ajustY = 15.769
		ajustU = -163.828
		ajustZ = ajustZ - 7.3
		
		ajustX = ajustX - 1
		ajustY = ajustY + 1
		ajustU = ajustU - 1.5
	EndIf
	
	' AJUSTES NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOS
	If caja$ = "PDCP" Then
		If cavity >= 301 And cavity <= 305 Then
			If fusible$ = "MINI_15" Then
				ajustX = ajustX + 2
				ajustY = ajustY - 3.5
				ajustU = ajustU + 2
			EndIf
			If fusible$ = "MINI_5" Then
				ajustX = ajustX + 0.5
			EndIf
		EndIf
	EndIf
	ajustZ = ajustZ + 1
	Print("adjustX: " + Str$(ajustX))
	Print("adjustY: " + Str$(ajustY))
	Print("adjustZ: " + Str$(ajustZ))
	Print("adjustU: " + Str$(ajustU))
	
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
	'On cilindro
	
'	If shared_zone = True Then
'		Move P(cavity) +Z(50)
'	EndIf
	'Extra_Low_Speed
	Low_Speed
	Print("//////////////////////////////////////////////////////")
	Tiempo_bajada_insercion_2 = (Tmr(5))
	
	Print #202, "TIEMPO_BAJADA_INSERCION: " + Str$((Tmr(5))) + " s"
	TmReset 5
	
	''Do Until EstatusCilindro <> EstatusC_actual 'Asegurar que salga cilindro
    ''Loop
	
	Print("//////////////////////////////////////////////////////")
	Tiempo_cilindro_insercion_2 = (Tmr(5))
	
	Print #202, "TIEMPO_CILINDRO_INSERCION: " + Str$((Tmr(5))) + " s"
	TmReset 5
	
	Move P(cavity)
	Revisando_vacio = 0
	Monitoreo_Insercion
	Print("//////////////////////////////////////////////////////")
	Tiempo_insercion_insercion_2 = (Tmr(5))
	
	Print #202, "TIEMPO_INSERCION_INSERCION: " + Str$((Tmr(5))) + " s"
	TmReset 5
	
	Tiempo_bajada_insercion_1 = 0
	Tiempo_insercion_insercion_1 = 0
	
Fend

