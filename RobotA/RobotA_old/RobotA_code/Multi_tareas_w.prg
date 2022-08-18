Global Integer EstatusCilindro


Function Estatus_Cilindro
	
	
	Do While (1)
				
		EstatusCilindro = In(0)
		
		'EstatusCilindro = 0, cilindro a dentro, cilindro b dentro
		'EstatusCilindro = 4, cilindro a dentro, cilindro b fuera
		'EstatusCilindro = 1, cilindro a fuera, cilindro b dentro
		'EstatusCilindro = 5, cilindro a fuera, cilindro b fuera	
		
	Loop
	
	
Fend

Function Monitoreo_Insercion
	
	Do While (1)
		
	
	If Insertando = 1 Then
			
			If cilindro = 523 Then 'cilindro_a = 523
			
				If EstatusCilindro = 0 Or EstatusCilindro = 4 Then

						OpenNet #203 As Client						'Abrir conexión TCP/IP
						WaitNet #203								'Esperar que haya conexión
						Print #203, "ERROR_insertion"
						On 544
						
						Print "______________________________________"
						Print "Retirar Fusible y reintentar inserción"
						Print "______________________________________"
						Pause
				
				EndIf
			
			
			ElseIf cilindro = 524 Then 'cilindro_b = 524
		
				If EstatusCilindro = 0 Or EstatusCilindro = 1 Then

						OpenNet #203 As Client						'Abrir conexión TCP/IP
						WaitNet #203								'Esperar que haya conexión
						Print #203, "ERROR_insertion"
						On 544
						
						Print "______________________________________"
						Print "Retirar Fusible y reintentar inserción"
						Print "______________________________________"
						Pause

				EndIf
		
			EndIf
			
		EndIf
		
	Loop
	
Fend

