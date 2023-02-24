Global Integer Gripper
Global Real Incremento
'------------------------------Funcion de toma de fusibles------------------------------------
Function tomaFusible							'Subrutina de toma de fusible
			
	Integer not_found
	not_found = 1
	Print("Loading")							'mensaje de toma de fusible
	'-------------------------------------------lado derecho, acercamiento y en feeders bowls
	If fusible$ = "ATO_25" Then				'si el mensaje es para un este fusible entonces...
		cilindro = cilindro_a				'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 517 							'variable del gripper, diferente para cada feeder
		P910 = ATO25_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO25_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
		
	ElseIf fusible$ = "ATO_30" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 518 							'variable del gripper, diferente para cada feeder
		P910 = ATO30_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO30_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
		
	ElseIf fusible$ = "ATO_7.5" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 519 							'variable del gripper, diferente para cada feeder
		P910 = ATO75_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO75_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
		
	ElseIf fusible$ = "MINI_5" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 516 							'variable del gripper, diferente para cada feeder
		P910 = MINI5_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MINI5_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
		
	ElseIf fusible$ = "MINI_7.5" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 515 							'variable del gripper, diferente para cada feeder
		P910 = MINI75_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MINI75_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
		
	ElseIf fusible$ = "MINI_10" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 543 							'variable del gripper, diferente para cada feeder
		P910 = MINI10_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MINI10_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
	'-------------------------------------------lado izquierdo, acercamiento y en feeders inline
	ElseIf fusible$ = "MINI_15" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 531 							'variable del gripper, diferente para cada feeder
		P910 = MINI15_s_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MINI15_s_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
		
	ElseIf fusible$ = "MULTI_7.5" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		If CM75 = 0 Then						'aplica para los inlines, si es 0 toma fusible de la cabidad A
			Gripper = 527 						'variable del gripper, diferente para cada feeder
			P910 = MULTI75_da_up				'El punto 210 tomara el valor de los puntos de up de los feeders
			P911 = MULTI75_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
			CM75 = 1							'variable que controla el lado para tomar el fusible
			Off vacio_rl
		Else									'en 1 toma de la cabidad B
			Gripper = 528 						'variable del gripper, diferente para cada feeder
			P910 = MULTI75_db_up				'El punto 210 tomara el valor de los puntos de up de los feeders
			P911 = MULTI75_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
			CM75 = 0							'variable que controla el lado para tomar el fusible
			Off vacio_rl
		EndIf
		
	ElseIf fusible$ = "ATO_15" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 529 						'variable del gripper, diferente para cada feeder
		P910 = ATO15_da_up					'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO15_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl

		
	ElseIf fusible$ = "ATO_5" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 530 							'variable del gripper, diferente para cada feeder
		P910 = ATO15_db_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO15_db_load					'El punto 211 tomara los valores de los puntos load de los feeders
		Off vacio_rl
		
	ElseIf fusible$ = "MULTI_5" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		If CM5 = 0 Then							'aplica para los inlines, si es 0 toma de la cabidad A
			Gripper = 526 						'variable del gripper, diferente para cada feeder
			P910 = MULTI5_da_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P911 = MULTI5_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
			CM5 = 1								'variable que controla el lado para tomar el fusible
			Off vacio_rl
		Else									'en 1 toma de la cabidad B
			Gripper = 532 						'variable del gripper, diferente para cada feeder
			P910 = MULTI5_db_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P911 = MULTI5_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
			CM5 = 0								'variable que controla el lado para tomar el fusible
			Off vacio_rl
		EndIf
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

	Work_Speed
	On 514 	'Reset CNT en FEEDERS 'NUEVO
	Wait 0.2 'NUEVO
	Off 514	'Reset CNT en FEEDERS 'NUEVO
	
	Go P910
	
	Low_Speed
	On vacio							'Activar el vacio
	On cilindro							'Activar cilindro a
	
	'Off Gripper 'NUEVO
	
	On Gripper 'NUEVO
	Fuse_Presence_Function
	Off Gripper 'NUEVO
	
	'Off Gripper							'activar gripper para tomar fusible
	
	Move P911							'tomar fusible
	TmReset 0						 	'Timer para vacio
	TmReset 1							'Timer para imprimir mensaje
	Incremento = 0
	Do While (Sw(vacio_ok) = 0)			'Esperar mientras se detecta que se tomo el fusible
		If Tmr(1) > 0.8 Then
			Print "Esperando Toma de Fusible"
			TmReset 1
		EndIf
		If Tmr(0) > 7.000 Then
			TmReset 0
			Off cilindro
			If Incremento < 0.5 Then
				Move P911 +Z(-Incremento)
				Incremento = Incremento + 0.1
			EndIf
			Fuse_Presence_Function
			On cilindro
		EndIf
	Loop								'fin de ciclo
	Print "fusible tomado"
	
	Off Gripper ' NUEVO
	Wait 0.2 ' NUEVO
	On Gripper ' NUEVO 'Al haber hecho dos veces off on off on se abre gripper
	Wait 0.5 ' NUEVO
	
	'Wait 0.5
	'On Gripper							'abrir gripper de fusible	
	'Wait 0.5
	
	Off cilindro						'cilindro regresando a su posicion retraida
	
	Move P910							'moverse a la posicion superior de ATO bowl
	'Off Gripper							'cerrar gripper
	
	Off Gripper ' REINICIAR CONTADOR, CERRAR GRIPPER ' NUEVO

Fend
'-------------------------------------------------------------------------------------------
Function Fuse_Presence_Function
	Do While (Sw(Fuse_Presence) = 0)			' mientras no se activa la presencia del fusible
		Print "esperando presencia de fusible"
		Wait 1
	Loop										' fin del ciclo Do While
	Print "fusible en gripper"
Fend

