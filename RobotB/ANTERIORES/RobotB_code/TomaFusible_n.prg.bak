Global Integer Gripper, Sensor
Global Real Incremento



'------------------------------Funcion de toma de fusibles------------------------------------
Function tomaFusible							'Subrutina de toma de fusible dividida /feeder bowl/in line sencillos/in linedobles
	Tool 0
	Integer not_found
	not_found = 1
	Print("Loading")							'mensaje de toma de fusible
	Print "Buscando Fusible en lado izquierdo..."
'---TOMA DE FUSIBLES DE LADO IZQUIERDO --------------------------------------------
		
		shared_zone = True
		
		If fusible$ = "ATO_25" Then				'si el mensaje es para un este fusible entonces...
			cilindro = cilindro_b				'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			Gripper = 517                       'variable del gripper, diferente para cada feeder
			P210 = ATO25_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = ATO25_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 628

' ##### Se comenta para no tomar fusibles verdes de BOWL	
'		ElseIf fusible$ = "ATO_30" Then				'si el mensaje es para este fusible entonces...
'			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
'			On vacio_rl
'			'Gripper = 518	'VIEJO					'variable del gripper, diferente para cada feeder
'			Gripper = 519							'Nuevo BOWL
'			P210 = ATO30_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
'			P211 = ATO30_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
			
		ElseIf fusible$ = "ATO_7.5" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			'Gripper = 519 	'VIEJO					'variable del gripper, diferente para cada feeder
			Gripper = 518 							'Nuevo BOWL
			P210 = ATO75_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = ATO75_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 629
			
		ElseIf fusible$ = "MINI_5" Then				'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			Gripper = 516 							'variable del gripper, diferente para cada feeder
			P210 = MINI5_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = MINI5_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 627
			
		ElseIf fusible$ = "MINI_7.5" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			Gripper = 515 							'variable del gripper, diferente para cada feeder
			P210 = MINI75_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = MINI75_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 626
			
		ElseIf fusible$ = "MINI_10" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			Gripper = 543 							'variable del gripper, diferente para cada feeder
			P210 = MINI10_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = MINI10_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders			
	    	Sensor = 625
	    
	    ElseIf fusible$ = "MINI_15" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			
			CM15 = 1
			
			If CM15 = 0 Then						'aplica para los inlines, si es 0 toma de la cabidad A
				Gripper = 541 						'variable del gripper, diferente para cada feeder
				P210 = MINI15_da_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = MINI15_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
				CM15 = 1							'variable que controla el lado para tomar el fusible
				Sensor = 623
			Else									'en 1 toma de la cabidad B
				Gripper = 542 						'variable del gripper, diferente para cada feeder
				P210 = MINI15_db_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = MINI15_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
				CM15 = 0							'variable que controla el lado para tomar el fusible
				Sensor = 624
			EndIf
		
		ElseIf fusible$ = "ATOC_15" Then			'si el mensaje es para un este fusible entonces...
			cilindro = cilindro_b				'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
 			Gripper = 539 						'variable del gripper, diferente para cada feeder
			P210 = ATO15_s_up				    'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = ATO15_s_load					'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 621
			
		ElseIf fusible$ = "MAXI_50" Then		'si el mensaje es para este fusible entonces...
			cilindro = cilindro_a				'igualamos el valor del cilindro a cilindro correspondiente
			Off vacio_rl
			Gripper = 540 						'variable del gripper, diferente para cada feeder
			P210 = MAXI50_s_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = MAXI50_s_load				'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 622
		Else
			not_found = 2
		EndIf
		
		
		
		If not_found = 1 Then
			shared_zone = True
			Toma2Fusible
			Print "toma exitosa"
		Else
			Print "Buscando Fusible en lado derecho..."
			shared_zone = False
			tomaFusibleR
		EndIf

Fend

'---TOMA DE FUSIBLES DE LADO DERECHO-----------------------------
Function tomaFusibleR							'Subrutina de toma de fusible dividida /feeder bowl/in line sencillos/in linedobles
	Integer not_found
	not_found = 1
	Print("Loading")							'mensaje de toma de fusible
    'Go AUX_1R
			
		If fusible$ = "ATO_10" Then				'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b				'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			Gripper = 533 						'variable del gripper, diferente para cada feeder
			P210 = ATO10_s_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = ATO10_s_load					'El punto 211 tomara los valores de los puntos load de los feeders	
			Sensor = 615
			
		ElseIf fusible$ = "MAXI_40" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
			Off vacio_rl
			'If CM40 = 0 Then						'aplica para los inlines, si es 0 toma fusible de la cabidad A
			Gripper = 536 						'variable del gripper, diferente para cada feeder
			P210 = MAXI40_da_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = MAXI40_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
			'CM40 = 1							'variable que controla el lado para tomar el fusible
			Sensor = 618
			
		ElseIf fusible$ = "MAXI_30" Then		'en 1 toma de la cabidad B
			cilindro = cilindro_a
			Off vacio_rl
			Gripper = 537 						'variable del gripper, diferente para cada feeder
			P210 = MAXI40_db_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = MAXI40_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
			'CM40 = 0							'variable que controla el lado para tomar el fusible
			Sensor = 619
			
		' ######### antes ATOC_10	
		ElseIf fusible$ = "ATO_30" Then				'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			'CA30 = 1
			If CA30 = 0 Then						'aplica para los inlines, si es 0 toma de la cabidad A
				Gripper = 526 						'variable del gripper, diferente para cada feeder
				P210 = ATO30_da_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = ATO30_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
				CA30 = 1							'variable que controla el lado para tomar el fusible
				Sensor = 608
			
			Else									'en 1 toma de la cabidad B
				Gripper = 527 						'variable del gripper, diferente para cada feeder
				P210 = ATO30_db_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = ATO30_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
				CA30 = 0							'variable que controla el lado para tomar el fusible
				Sensor = 609
			
			EndIf
			
		ElseIf fusible$ = "ATOC_10" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			Gripper = 529 						'variable del gripper, diferente para cada feeder
			P210 = ATO5_da_up				'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = ATO5_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 611
			
		ElseIf fusible$ = "ATOC_5" Then
			cilindro = cilindro_b
			On vacio_rl
			Gripper = 530 						'variable del gripper, diferente para cada feeder
			P210 = ATO5_db_up				'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = ATO5_db_load				'El punto 211 tomara los valores de los puntos load de los feeders					
			Sensor = 612
			
		ElseIf fusible$ = "ATO_20" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			'If CA20 = 0 Then						'aplica para los inlines, si es 0 toma de la cabidad A
				Gripper = 531 						'variable del gripper, diferente para cada feeder
				P210 = ATO20_da_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = ATO20_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
				'CA20 = 1							'variable que controla el lado para tomar el fusible
				Sensor = 613
								
		ElseIf fusible$ = "ATO_5" Then			'si el mensaje es para este fusible entonces...
       	    cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
				Gripper = 532 						'variable del gripper, diferente para cada feeder
				P210 = ATO20_db_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = ATO20_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
				'CA20 = 0							'variable que controla el lado para tomar el fusible
				Sensor = 614
							 
       	ElseIf fusible$ = "ATO_15" Then			'si el mensaje es para este fusible entonces...
			cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
			On vacio_rl
			CA15 = 0
			If CA15 = 0 Then						'aplica para los inlines, si es 0 toma de la cabidad A
				Gripper = 534 						'variable del gripper, diferente para cada feeder
				P210 = ATO15_da_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = ATO15_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
				CA15 = 1							'variable que controla el lado para tomar el fusible
				Sensor = 616
			
			Else									'en 1 toma de la cabidad B
				Gripper = 535 						'variable del gripper, diferente para cada feeder
				P210 = ATO15_db_up				'El punto 210 tomara el valor de los puntos de up de los feeders
				P211 = ATO15_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
				CA15 = 0							'variable que controla el lado para tomar el fusible
				Sensor = 617
			
			EndIf
			
		ElseIf fusible$ = "RELAY_112" Then		'si el mensaje es para este fusible entonces...
			cilindro = cilindro_a				'igualamos el valor del cilindro a cilindro correspondiente
			Off vacio_rl
			'Gripper = 539 						'variable del gripper, diferente para cada feeder
			Gripper = 538 '''''''
			P210 = R112_s_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = R112_s_load					'El punto 211 tomara los valores de los puntos load de los feeders
			Sensor = 620
						
		ElseIf fusible$ = "RELAY_132" Then		'si el mensaje es para este fusible entonces...
			cilindro = cilindro_a				'igualamos el valor del cilindro a cilindro correspondiente
			Off vacio_rl
			'Gripper = 540                       'variable del gripper, diferente para cada feeder
			Gripper = 528 '''''''
			P210 = R132_s_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P211 = R132_s_load					'El punto 211 tomara los valores de los puntos load de los feeders	
			Sensor = 610
			
			'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			'Print #202, "ERROR_insertion"
			'On 544
			'Off cilindro
			
			'Print "______________________________________"
			'Print "Retirar Fusible y reintentar inserción"
			'Print "______________________________________"
			'Pause
			'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		Else
			not_found = 2
		EndIf
		
		
		If not_found = 1 Then
			Toma2Fusible
			Print "toma exitosa"
		Else
			Print "Fusible no existe"
		EndIf

Fend


Function Toma2Fusible
			
			If shared_zone = True Then
				Do While (Sw(512) = 0)			' Sw(AVAILABLE), Mientras no se activa la presencia del fusible
				Loop
				Off AVAILABLE 'Negado
			EndIf
			
			'Print("//////////////////////////////////////////////////////")
			'Tiempo_espera_robotA = (Tmr(5))
			
			'Print #202, "TIEMPO_ESPERA_ROBOTA: " + Str$((Tmr(5))) + " s"
			'TmReset 5
			
			Work_Speed;
			Go P210
			
			'Print("//////////////////////////////////////////////////////")
			'Tiempo_traslado_toma = (Tmr(5))
			
			'Print #202, "TIEMPO_TRASLADO_TOMA: " + Str$((Tmr(5))) + " s"
			'TmReset 5
	
			Take_Speed
			On vacio						'Activar el vacio
			On cilindro						'Activar cilindro a
			
			Fuse_Presence_Function
					
			'Print("//////////////////////////////////////////////////////")
			'Tiempo_presencia_gripper = (Tmr(5))
			
			'Print #202, "TIEMPO_PRESENCIA_TOMA: " + Str$((Tmr(5))) + " s"
			'TmReset 5
	
			Move P211							'tomar fusible
						
			'Print("//////////////////////////////////////////////////////")
			'Tiempo_bajada_toma = (Tmr(5))
			
			'Print #202, "TIEMPO_BAJADA_TOMA: " + Str$((Tmr(5))) + " s"
			'TmReset 5
	
			TmReset 0						 	'Timer para vacio
			TmReset 1							'Timer para imprimir mensaje
			Incremento = 0
			Do While (Sw(vacio_ok) = 0)			'Esperar mientras se detecta que se tomo el fusible
				If Tmr(1) > 0.8 Then
					Print "Esperando Toma de Fusible"
					TmReset 1
				EndIf
				If Tmr(0) > 2.000 Then
					TmReset 0
					Off cilindro
					
					If Incremento < 0.5 Then
						Move P211 +Z(-Incremento)
						Incremento = Incremento + 0.1
					EndIf
					Fuse_Presence_Function
					On cilindro
				EndIf
			Loop
			Print "fusible tomado"
				
			Abrir_Gripper

			If fusible$ = "RELAY_132" Or fusible$ = "RELAY_112" Or fusible$ = "MAXI_50" Or fusible$ = "MAXI_40" Or fusible$ = "MAXI_30" Or fusible$ = "ATO_20" Then
				Wait 0.7
			EndIf
			
			'Print("//////////////////////////////////////////////////////")
			'Tiempo_vacio = (Tmr(5))
			
			'Print #202, "TIEMPO_VACIO_TOMA: " + Str$((Tmr(5))) + " s"
			'TmReset 5
	
			Wait 0.3
			Off cilindro						'cilindro regresando a su posicion retraida	
			Move P210 							'muevete al punto de superior
			
			Work_Speed
			
			Off Gripper							'Cerrar Gripper
			
			'Print("//////////////////////////////////////////////////////")
			'Tiempo_subida_toma = (Tmr(5))
			
			'Print #202, "TIEMPO_SUBIDA_TOMA: " + Str$((Tmr(5))) + " s"
			'TmReset 5
						
Fend


Function Fuse_Presence_Function
	
	Integer FP
	FP = 0
		
	Do While (Sw(Sensor) = 0)			' mientras no se activa la presencia del fusible
		FP = 1
	Loop
	
	If FP = 1 Then
		Wait 2
	EndIf
										' fin del ciclo Do While
	Print "fusible en gripper"
Fend

		
Function Abrir_Gripper
	On Gripper
	Wait 0.3
Fend

