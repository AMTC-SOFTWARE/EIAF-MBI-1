Global Integer EstatusCilindro, Check_Vacio


Function Estatus_Cilindro
	
	
	Do While (1)
				
		EstatusCilindro = In(0)
		
		'EstatusCilindro = 0, cilindro a dentro, cilindro b dentro
		'EstatusCilindro = 1, cilindro a dentro, cilindro b fuera
		'EstatusCilindro = 4, cilindro a fuera, cilindro b dentro
		'EstatusCilindro = 5, cilindro a fuera, cilindro b fuera	
		
	Loop
	
	
Fend


Function Estatus_Vacio
	
	Do While (1)
					
		If Check_Vacio = 1 Then
			If Sw(vacio_ok) = 0 Then
			
				'CONEXION TCP/IP
				OpenNet #203 As Client
				WaitNet #203
				Print #203, "ERROR_insertion"
				On 544
				
				Off cilindro

				Print "______________________________________"
				Print "VACIO NO OK Retirar Fusible y reintentar inserción"
				Print "______________________________________"
				
				Pause
				
				
			EndIf
		EndIf
		
	Loop
	
	
Fend
