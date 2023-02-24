Global Integer RobotHand '1 = Right Hand, 2 = Left Hand
Global Integer cavity
Global String fusible$, cavidad$, caja$, lectura$, lectura_anterior$

Global Integer CM75, CM5							'Estas variables funcionan como contadores
Global Integer vacio, aire, cilindro_a, cilindro_b, fuse_presence, cilindro, vacio_ok, vacio_rl

'#202 TCP/IP
'192.168.15.30
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
	Xqt Monitoreo_Insercion
	
	
	'CONEXION TCP/IP
	OpenNet #202 As Client						'Abrir conexión TCP/IP
	Print "Esperando conexión TCP/IP"
	WaitNet #202								'Esperar que haya conexión
	Print "Conexión TCP/IP correcta"
	Print #202, "SUCCESSFUL CONNECTION TCP/IP"	'Enviar mensaje por TCP/IP
	On 542                                      'C756 en PLC, avisar que programa está corriendo

	'aire = 
	vacio = 521									'variable de la valvula de vacio
	vacio_rl = 520								'switch vacio a cilindro a o cilindro b
	cilindro_a = 523							'variable para activar el cilindro a
	cilindro_b = 524							'variable para activar el cilindro b
	fuse_presence = 522							'variable para comprobar la presencia del fusible
	vacio_ok = 525								'variable para comprobar la toma del fusible con la prueba de vacio
	CM75 = Int(Rnd(1.99))						'contadores para inline dobles
	CM5 = Int(Rnd(1.99))						'Int(Rnd(1.99)) regresa un 1 o 0. NOTA: Int(1.99999) = 1
	lectura$ = "empty"							'limpiar variables de lectura
	fusible$ = "empty"
	cavidad$ = "empty"
	FuseOK = 0
	
	'Cerrar válvulas de Efector final antes de iniciar
	Off vacio; Off vacio_rl; Off cilindro_a; Off cilindro_b
	
	'Función para mover todos los puntos en un rango (Calibrarlos)
	'Puede ser un solo punto poniendo el mismo punto en Desde y Hasta
	'Calibrar_w(Desde, Hasta, X_val, Y_val, Z_val, U_val)
	
	'___________________________________________

	P(326) = PDCP_F326_LOAD
	P(335) = PDCP_F335_LOAD
	Compute_Cavity(326, 335)
	
	P(318) = PDCP_F318_LOAD
	P(325) = PDCP_F325_LOAD
	Compute_Cavity(318, 325)
	
	P(301) = PDCP_F301_LOAD
	P(305) = PDCP_F305_LOAD
	Compute_Cavity(301, 305)
	Calibrar_w(302, 303, -1.5, 4, 0, -3) '!!!!!!!!!!!!!!!!!!!!!!
	
	P(300) = PDCP_F300_LOAD
	
	'Calculo de puntos para la caja PDC-D
	'---------------MINI-----------------------
	P(200) = PDCD_F200_LOAD
	P(208) = PDCD_F208_LOAD
	Compute_Cavity(200, 208)
	
	P(217) = PDCD_F217_LOAD
	P(221) = PDCD_F221_LOAD
	Compute_Cavity(217, 221)
	
	P(222) = PDCD_F222_LOAD
	P(226) = PDCD_F226_LOAD
	Compute_Cavity(222, 226)
	
	P(232) = PDCD_F232_LOAD
	P(227) = PDCD_F227_LOAD
	Compute_Cavity(227, 232)
	
	'-----------------ATO---------------------
	P(209) = PDCD_F209_LOAD
	P(216) = PDCD_F216_LOAD
	Compute_Cavity(209, 216)
	
	'-----------------MULTI---------------------
	P(39) = PDCP_MF1_load
	P(40) = PDCP_MF2_load
	'___________________________________________
	Calibrar_w(210, 210, -0.5, 0.5, 0, 1) '!!!!!!!!!!!!!!!!!!!!!!	
	
	
	
	
	Motor On									'Encender motores del robot
	Tool 0
	FindHome_w
	
	
	Print #202, "READY"
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
			
		revisar_vacio1
		Wait 0.5
		revisar_vacio2
		
		insertarFusible '######################
		
		Print "Fusible insertó en: " + letracavidad$ + cavidad$
		Print #202, "INSERTED"
		
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


