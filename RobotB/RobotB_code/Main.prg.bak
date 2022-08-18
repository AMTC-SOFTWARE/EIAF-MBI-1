Global Integer RobotHand '1 = Right Hand, 2 = Left Hand
Global Integer cavity
Global String fusible$, cavidad$, caja$, lectura$, lectura_anterior$
Global Boolean shared_zone
Global Integer vacio, aire, cilindro_a, cilindro_b, fuse_presence, cilindro, vacio_ok, vacio_rl, AVAILABLE
Global Integer CM40, CA10, CA5, CA20, CA15, CM15, CA30

Global Double Tiempo_reinicio, Tiempo_reset, Tiempo_total, Tiempo_Envio_Mensaje, Tiempo_Lectura_Mensaje, Tiempo_espera_robotA
Global Double Tiempo_traslado_toma, Tiempo_presencia_gripper, Tiempo_bajada_toma, Tiempo_vacio, Tiempo_subida_toma
Global Double Tiempo_traslado_insercion, Tiempo_subida_insercion
Global Double Tiempo_bajada_insercion_1, Tiempo_cilindro_insercion_1, Tiempo_insercion_insercion_1
Global Double Tiempo_bajada_insercion_2, Tiempo_cilindro_insercion_2, Tiempo_insercion_insercion_2

'#202 TCP/IP
'192.168.15.17
'3000

'IP: 192.168.15.220
'Puerto: 5000

Function main
	
	'Tiempo que se tarda en dar reiniciar al robot
'	Print("//////////////////////////////////////////////////////")
'	Tiempo_reinicio = (Tmr(5))
'	Print #202, "TIEMPO_REINICIO: " + Str$(Tiempo_reinicio) + " s"
'	TmReset 5
	
	Xqt Estatus_Cilindro
	'Xqt Monitoreo_Insercion
	
	'CONEXION TCP/IP
	OpenNet #202 As Client
	Print "Esperando conexión TCP/IP"
	WaitNet #202
	Print "Conexión TCP/IP correcta"
	
	Print #202, "SUCCESSFUL CONNECTION TCP/IP"
	CollisionDetect Off	' Checar descripcion de Error 5057 para mas informacion >:)	
		
	'-----------------------------
	Print("//////////////////////////////////////////////////////")
	Tiempo_reinicio = (Tmr(5))
	
	Print #202, "TIEMPO_REINICIO: " + Str$(Tiempo_reinicio) + " s"
	TmReset 5
	'-----------------------------	
	
	
	Off 544										'Apagar Torreta
	AVAILABLE = 512
	'aire =
	vacio = 521									'variable de la valvula de vacio
	vacio_rl = 520
	cilindro_a = 523							'variable para activar el cilindro a
	cilindro_b = 524							'variable para activar el cilindro a
	fuse_presence = 522							'variable para comprobar la presencia del fusible
	vacio_ok = 525								'variable para comprobar la toma del fusible con la prueba de vacio
	'CM40 = Int(Rnd(1.99))    	'contador maxi 40
	CA10 = Int(Rnd(1.99))   	'contador ATO 10
	CA5 = Int(Rnd(1.99))    	'contador ATO5
	'CA20 = Int(Rnd(1.99))    	'contador ATO20
	CA15 = Int(Rnd(1.99))    	'contador ATO 15A
	CM15 = Int(Rnd(1.99))    	'contador MINI 15A
	CA30 = Int(Rnd(1.99))    	'contador ATO 30A
	
	shared_zone = False
	recursividad_vacio = 0
	Insertando = 0
	Tool 0
	
	'Cerrar válvulas de Efector final antes de iniciar
	Off cilindro_a; Off cilindro_b
	
	FuseOK = 0
	lectura$ = "empty"
	fusible$ = "empty"
	cavidad$ = "empty"
	
	'-----------------------------------computo de cavidades--------------------------------
	P(400) = PDCR_F400
	P(405) = PDCR_F405
	Compute_Cavity(400, 405)

	P(412) = PDCR_F412
	P(417) = PDCR_F417
	Compute_Cavity(412, 417)
	
	P(421) = PDCR_F421
	P(426) = PDCR_F426
	Compute_Cavity(421, 426)
		
	P(450) = PDCR_F450
	P(455) = PDCR_F455
	Compute_Cavity(450, 455)
	
	P(456) = PDCR_F456
	P(461) = PDCR_F461
	Compute_Cavity(456, 461)
	
	'-------------------------MAXI------------------
	P(418) = PDCR_F418
	P(420) = PDCR_F420
	Compute_Cavity(418, 420)
	
	P(447) = PDCR_F447
	P(449) = PDCR_F449
	Compute_Cavity(447, 449)
	
	'-------------------------MINI------------------
	P(437) = PDCR_F437
	P(441) = PDCR_F441
	Compute_Cavity(437, 441)
	
	P(442) = PDCR_F442
	P(446) = PDCR_F446
	Compute_Cavity(442, 446)
	
	P(430) = PDCR_F430
	P(431) = PDCR_F431
	Compute_Cavity(430, 431)
	
	P(432) = PDCR_F432
	P(436) = PDCR_F436
	Compute_Cavity(432, 436)
	
	P(406) = PDCR_F406
	P(411) = PDCR_F411
	Compute_Cavity(406, 411)
	
	'-------------------------TBLU--------------------
	P(101) = TBLU_F101
	P(109) = TBLU_F109
	Compute_Cavity(101, 109)
	
	'-------------------------PDCS--------------------
	P(111) = PDCS_F111
	P(116) = PDCS_F116
	Compute_Cavity(111, 116)
	
	'-------------------------F96BOX------------------
	P(96) = F96_BOX_F96
	
	'-------------------------------------------------
	
	Motor On
	FindHome_w
	
	Print #202, "READY"
	
	Print("//////////////////////////////////////////////////////")
	Tiempo_reset = (Tmr(5))
	
	Print #202, "TIEMPO_RESET: " + Str$((Tmr(5))) + " s"
	TmReset 5
	
	LeerMensaje_w
	
	
		'PROGRAMA PRINCIPAL
		Do While (lectura$ <> "HOME")
			
			Tool 0
			
			Do While (FuseOK = 0)
				RevisarListaFusibles
				If FuseOK = 0 Then
					ActualizarMensaje_w
				EndIf
			Loop
			
			Print("//////////////////////////////////////////////////////")
			Tiempo_Lectura_Mensaje = (Tmr(5))
			
			Print #202, "TIEMPO_MENSAJE: " + Str$((Tmr(5))) + " s"
			TmReset 5
			
			
			Print #202, "LOADING"
			
			tomaFusible
			
			Print "Fusible tomado: " + fusible$
			
			Print #202, "LOADED"
			
			Wait 0.2
			revisar_vacio1
			
			insertarFusible
			
			Print("//////////////////////////////////////////////////////")
			Tiempo_total = 0
			Tiempo_total = Tiempo_Lectura_Mensaje + Tiempo_espera_robotA + Tiempo_traslado_toma + Tiempo_presencia_gripper + Tiempo_bajada_toma + Tiempo_vacio + Tiempo_subida_toma + Tiempo_traslado_insercion + Tiempo_subida_insercion + Tiempo_bajada_insercion_1 + Tiempo_cilindro_insercion_1 + Tiempo_insercion_insercion_1 + Tiempo_bajada_insercion_2 + Tiempo_cilindro_insercion_2 + Tiempo_insercion_insercion_2
			Print("Tiempo Total: " + Str$(Tiempo_total))
			
			Print #202, "TIEMPO_TOTAL: " + Str$(Tiempo_total) + " s"
			
			Print "Se insertó en: F" + cavidad$
			
			Print #202, "INSERTED"
					
			Tool 0
		
			lectura_anterior$ = lectura$
			
			ActualizarMensaje_w
			
			FuseOK = 0
			recursividad_vacio = 0
			
		Loop
		'__________________
	
	
	FuseOK = 0
	lectura$ = "empty"
	fusible$ = "empty"
	cavidad$ = "empty"
	FindHome_w
	
	Print #202, "PROGRAM FINISHED"
	CloseNet #202
	Motor Off
	
	Print "PROGRAMA FINALIZADO"
	
Fend

