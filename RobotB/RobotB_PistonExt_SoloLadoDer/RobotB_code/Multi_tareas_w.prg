Global Integer EstatusCilindro, Revisando_vacio

Function Estatus_Cilindro
	
	Do While (1)
				
		EstatusCilindro = In(0)
		
		'EstatusCilindro = 0, cilindro a dentro, cilindro b dentro
		'EstatusCilindro = 4, cilindro a dentro, cilindro b fuera
		'EstatusCilindro = 1, cilindro a fuera, cilindro b dentro
		'EstatusCilindro = 5, cilindro a fuera, cilindro b fuera	
		
	Loop
	
	
Fend


Function Revisar_vacio
	Do While (1)
		If Revisando_vacio = 1 Then
		
			If Sw(vacio_ok) = 0 Then

				OpenNet #203 As Client						'Abrir conexión TCP/IP
				Print "Esperando conexión TCP/IP"
				WaitNet #203								'Esperar que haya conexión
				Print "Conexión TCP/IP correcta"
				
				Print #203, "ERROR_insertion"
				On 544
				Off cilindro
				
				Print #203, "ERROR_DE_VACIO"
				
				Print "______________________________________"
				Print "Retirar Fusible y reintentar inserción"
				Print "______________________________________"
							
				Pause
				
			EndIf
			
		EndIf
	Loop
	
Fend
