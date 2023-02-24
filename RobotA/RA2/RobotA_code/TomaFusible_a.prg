'String fusible$
Global Real Incremento
Global Integer Gripper

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
		
	ElseIf fusible$ = "ATO_30" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 519 							'variable del gripper, diferente para cada feeder
		P910 = ATO30_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO30_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		
	ElseIf fusible$ = "ATO_7.5" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 518 							'variable del gripper, diferente para cada feeder
		P910 = ATO75_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO75_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		
	ElseIf fusible$ = "MINI_7.5" Then			'si el mensaje es para este fusible entonces...
		Print("aquiiiiiiiiiii")
		cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 516 							'variable del gripper, diferente para cada feeder
		P910 = MINI75_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MINI75_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
		
	ElseIf fusible$ = "MINI_10" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 515 							'variable del gripper, diferente para cada feeder
		P910 = MINI10_bw_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MINI10_bw_load					'El punto 211 tomara los valores de los puntos load de los feeders
	Else
		not_found = 2
	EndIf

	If not_found = 1 Then
		shared_zone = True
		Toma2Fusible
		Print "Toma exitosa"
	Else
		Print "Buscando Fusible en lado derecho..."
		shared_zone = False
		tomaFusibleR
	EndIf
Fend


Function tomaFusibleR
	Integer not_found
	not_found = 1
	Print "Loading"
	
	'-------------------------------------------lado izquierdo, acercamiento y en feeders inline
	If fusible$ = "MINI_15" Then			'si el mensaje es para este fusible entonces...
		cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 514 							'variable del gripper, diferente para cada feeder
		P910 = MINI15_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MINI15_load					'El punto 211 tomara los valores de los puntos load de los feeders
			
	ElseIf fusible$ = "MULTI_5" Then		'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a				'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 526 						'variable del gripper, diferente para cada feeder
		P910 = MULTI5_up					'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MULTI5_load				'El punto 211 tomara los valores de los puntos load de los feeders

	ElseIf fusible$ = "MULTI_7.5" Then		'en 1 toma de la cabidad B
		Gripper = 525
		cilindro = cilindro_a 						'variable del gripper, diferente para cada feeder
		P910 = MULTI75_up				'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = MULTI75_load				'El punto 211 tomara los valores de los puntos load de los feeders

	ElseIf fusible$ = "ATO_5" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 530 							'variable del gripper, diferente para cada feeder
		P910 = ATO5_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO5_load					'El punto 211 tomara los valores de los puntos load de los feeders

		
	ElseIf fusible$ = "ATO_15" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 529 							'variable del gripper, diferente para cada feeder
		P910 = ATO15_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO15_load					'El punto 211 tomara los valores de los puntos load de los feeders
		
		
	ElseIf fusible$ = "ATO_10" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_a					'igualamos el valor del cilindro a cilindro correspondiente
		Gripper = 527 							'variable del gripper, diferente para cada feeder
		P910 = ATO10_up						'El punto 210 tomara el valor de los puntos de up de los feeders
		P911 = ATO10_load					'El punto 211 tomara los valores de los puntos load de los feeders
		
	ElseIf fusible$ = "MINI_5" Then				'si el mensaje es para este fusible entonces...
		cilindro = cilindro_b					'igualamos el valor del cilindro a cilindro correspondiente
		CM5 = 0
		
		'CM5 = 0 es el lado de atras, que quedo corto en la mordaza
		
		If CM5 = 0 Then							'aplica para los inlines, si es 0 toma de la cabidad A
			Gripper = 528 						'variable del gripper, diferente para cada feeder
			P910 = MINI5_da_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			P911 = MINI5_da_load				'El punto 211 tomara los valores de los puntos load de los feeders
			CM5 = 1								'variable que controla el lado para tomar el fusible
			
		'Es sustituido por el ATO10
		'Else									'en 1 toma de la cabidad B
			'Gripper = 527  						'variable del gripper, diferente para cada feeder
			'P910 = MINI5_db_up					'El punto 210 tomara el valor de los puntos de up de los feeders
			'P911 = MINI5_db_load				'El punto 211 tomara los valores de los puntos load de los feeders
			'CM5 = 0								'variable que controla el lado para tomar el fusible
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
			
	If cilindro = cilindro_a Then
		Off switch
		Tool 1
	Else
		On switch
		Tool 2
	EndIf
	
	'shared_zone = True 'TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
	
	If shared_zone = True Then
		Print("esperando al otro roboto")
		Do While (Sw(512) = 0)			' Sw(AVAILABLE), Mientras no se activa la presencia del fusible
		Loop
		Off AVAILABLE 'Negado
	EndIf
			
	Print("yaaaaa")
		
	Work_Speed
	Go P910							'muevete al punto de superior para el fusible		
	

	Take_Speed
	On vacio							'Activar el vacio
	On cilindro							'Activar cilindro a
	
	
	Fuse_Presence_Function


	'Move P911 +Z(4)
	'Pause

	Move P911							'tomar fusible
	
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
			Off vacio
			Wait 0.7
			If Incremento < 0.5 Then
				Move P911 +Z(-Incremento)
				Incremento = Incremento + 0.1
			EndIf
			Fuse_Presence_Function
			On cilindro
			On vacio
			Wait 0.7
		EndIf
	Loop								'fin de ciclo
	Print "fusible tomado"
	
	Abrir_Gripper
	
	If fusible$ = "ATO_10" Then
		Wait 1.5
	EndIf
	
	Off cilindro						'cilindro regresando a su posicion retraida
	
	Move P910								'moverse a la posicion superior de ATO bowl
	Work_Speed
	Wait 0.3
	Off Gripper ' CERRAR GRIPPER ' NUEVO

	Check_Vacio = 1
	
Fend
'-------------------------------------------------------------------------------------------


Function Fuse_Presence_Function
	
	Print "ESPERANDO en gripper"
	
	Integer FP
	FP = 0
	
	Do While (Sw(Gripper) = 0)					'Mientras no se detecte presencia del fusible
		FP = 1
	Loop
	
	If FP = 1 Then
		Wait 2
	EndIf
	
	Print "fusible en gripper"
Fend
		
Function Abrir_Gripper
	If Sw(Gripper) Then 'si hay presencia de fusible
		On Gripper
		Wait 0.5		'tiempo para abrir gripper de fusible
	EndIf
Fend



