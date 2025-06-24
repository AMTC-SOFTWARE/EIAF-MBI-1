Global Integer RobotHand '1 = Right Hand, 2 = Left Hand
Global Integer cavity
Global String fusible$, cavidad$, caja$, lectura$, lectura_anterior$, prueba$
Global Boolean shared_zone
Global Integer vacio, aire, cilindro_a, cilindro_b, fuse_presence, cilindro, vacio_ok, switch_presion, AVAILABLE, switch
Global Integer CM40, CA10, CA5, CA20, CA15, CM15, CA30

'#202 TCP/IP
'192.168.15.17
'3000

'IP: 192.168.15.220
'Puerto: 5000

Function main
	
	Xqt Estatus_Cilindro
	Xqt Estatus_Vacio
	
	'CONEXION TCP/IP
	OpenNet #202 As Client
	Print "Esperando conexión TCP/IP"
	WaitNet #202
	Print "Conexión TCP/IP correcta"
	Print #202, "SUCCESSFUL CONNECTION TCP/IP"
	
	
	'TLSet 1, XY(-81.748, -47.950, 0, 0)17-FEBRER0-2023 
	'TLSet 2, XY(-79.069, 45.672, 0, 0) 
	
	Off 544
	AVAILABLE = 512
	
	vacio = 521									'variable para activar aire (variable de escritura para activar/desactivar electroválvula)
	switch_presion = 520						'variable para cambiar regulador para MAXI/RELAY cilindro b
	switch = 522 								'variable para activar válvula de switch para hacer vacío por uno u otro cilindro	
	cilindro_a = 523							'variable para activar piston del cilindro a
	cilindro_b = 524							'variable para activar piston del cilindro a
	vacio_ok = 522 								'variable para comprobar la toma del fusible con la prueba de vacio
    CM40 = Int(Rnd(1.99)) 						'contador maxi 40
	CA10 = Int(Rnd(1.99)) 						'contador ATO 10
	CA5 = Int(Rnd(1.99))  						'contador ATO5
	CA30 = Int(Rnd(1.99))						'contador ATO30
	CA15 = Int(Rnd(1.99))						'contador ATO 15A
	CM15 = Int(Rnd(1.99))					 	'contador MINI 15A
	
	Off switch_presion
	Check_Vacio = 0
	shared_zone = False
	Insertando = 0
	Tool 5
	
	'Cerrar válvulas de Efector final antes de iniciar
	Off vacio; Off cilindro_a; Off cilindro_b
	
	FuseOK = 0
	lectura$ = "empty"
	fusible$ = "empty"
	cavidad$ = "empty"
	
	prueba$ = prueba$ + " agregadoooo \n ||||||||||||||||||||||0\n"
	'___________________________________________
	'


Print (prueba$)


	Integer Desde, Hasta
	Double X_val, Y_val, Z_val, U_val
	Desde = 0; Hasta = 99;
	X_val = 0; Y_val = 0; Z_val = 0; U_val = 0;
	'Función para mover todos los puntos en un rango (Calibrarlos)
	'Calibrar_w(Desde, Hasta, X_val, Y_val, Z_val, U_val)
	
	generar_puntos
	
	Motor On
	FindHome_w
	
	Print #202, "READY"

	
	LeerMensaje_w
	
	
	'PROGRAMA PRINCIPAL
	Do While (lectura$ <> "HOME")
		
		Tool 5
		
		Do While (FuseOK = 0)
			RevisarListaFusibles
			If FuseOK = 0 Then
				ActualizarMensaje_w
			EndIf
		Loop
			
		Print #202, "LOADING"
		
		tomaFusible
		
		Print "Fusible tomado: " + fusible$
		Print #202, "LOADED"
		
		insertarFusible
	
		Print "Se insertó en: F" + cavidad$

		lectura_anterior$ = lectura$
		
		ActualizarMensaje_w
		
		FuseOK = 0
		
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

