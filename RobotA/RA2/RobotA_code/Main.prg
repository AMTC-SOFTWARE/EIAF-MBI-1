Global Integer RobotHand '1 = Right Hand, 2 = Left Hand
Global Integer cavity
Global String fusible$, cavidad$, caja$, lectura$, lectura_anterior$
Global Boolean shared_zone
Global Integer CM75, CM5							'Estas variables funcionan como contadores
Global Integer vacio, aire, cilindro_a, cilindro_b, fuse_presence, cilindro, vacio_ok, AVAILABLE, switch, revisar


'#202 TCP/IP
'192.168.15.100
'2000

'IP: 192.168.15.230
'Puerto: 5000

'Presión: 92 PSI

'Válvula de vacío:
'SoG
'HYS: 0.10
'Response time: 2.5ms
'P_1: -10.40


Function main
	
	Xqt Estatus_Cilindro
	Xqt Estatus_Vacio
	
	
	'CONEXION TCP/IP
	OpenNet #202 As Client						'Abrir conexión TCP/IP
	Print "Esperando conexión TCP/IP"
	WaitNet #202								'Esperar que haya conexión
	Print "Conexión TCP/IP correcta"
	Print #202, "SUCCESSFUL CONNECTION TCP/IP"	'Enviar mensaje por TCP/IP
	
	CollisionDetect Off	' Checar descripcion de Error 5057 para mas informacion >:)


	Off 544										'Apagar torreta
	AVAILABLE = 512
    vacio = 521									'variable de la valvula de vacio
    switch = 522 								'variable para activar válvula de switch para hacer vacío por uno u otro cilindro
	cilindro_a = 523							'variable para activar el cilindro a
	cilindro_b = 524							'variable para activar el cilindro b
	fuse_presence = 522							'variable para comprobar la presencia del fusible
	vacio_ok = 521								'variable para comprobar la toma del fusible con la prueba de vacio
	CM75 = Int(Rnd(1.99))						'contadores para inline dobles
	CM5 = Int(Rnd(1.99))						'Int(Rnd(1.99)) regresa un 1 o 0. NOTA: Int(1.99999) = 1
	lectura$ = "empty"							'limpiar variables de lectura
	fusible$ = "empty"
	cavidad$ = "empty"
	FuseOK = 0									'variable para revisar en lista de fusibles declarados	
	Check_Vacio = 0
	
	'Cerrar válvulas de Efector final antes de iniciar
	Off cilindro_a; Off cilindro_b; Off vacio
	
	'Función para mover todos los puntos en un rango (Calibrarlos)
	'Puede ser un solo punto poniendo el mismo punto en Desde y Hasta
	'Calibrar_w(Desde, Hasta, X_val, Y_val, Z_val, U_val)
	'Generación de puntos de inserción
	generar_puntos
	
	TLSet 1, XY(-87.7, -42.7, 0.2, 0) 'PARA ATO
	TLSet 2, XY(85.1, -52.048, 0, 0) 'PARA MINI
	TLSet 4, XY(0, 0, 0, 0) 'PARA HOME
	
	Motor On
	Tool 4									'Encender motores del robot
	FindHome_w
	
	Print #202, "READY"
	On 542                                      'C756 en PLC, avisar que programa está corriendo (andon verde)
	
	LeerMensaje_w
		
	Do While (lectura$ <> "HOME")
		
		Do While (FuseOK = 0)
			RevisarListaFusibles
			If FuseOK = 0 Then
				ActualizarMensaje_w
			EndIf
		Loop
		
	
		Print #202, "LOADING"
		
		tomaFusible '######################
		
		Print "Fusible tomado: " + fusible$
		Print #202, "LOADED"
			
		Wait 0.2
		
		
		insertarFusible '######################
		

		lectura_anterior$ = lectura$
		
		ActualizarMensaje_w
		
		FuseOK = 0
		
		
	Loop
	'___________________________________________
	
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

Function mantenimiento_z
	Motor On
	Power High
	Speed 80
	Accel 80, 80
	
	Do
		Go P900
		Go P901
	Loop
Fend

