Function LeerMensaje_w
	TmReset 1
	Do While (lectura$ = "empty" Or lectura$ = "test")
			Do While (ChkNet(202) <= 0)
				If Tmr(1) > 0.8 Then
					Print "Esperando Instrucción"
					TmReset 1
				EndIf
			Loop
			
			Print("//////////////////////////////////////////////////////")
			Tiempo_Envio_Mensaje = (Tmr(5))
			
			Print #202, "TIEMPO_ENVIO_MENSAJE: " + Str$((Tmr(5))) + " s"
			TmReset 5
			
			Read #202, lectura$, ChkNet(202)
			Print "Msensaje: " + lectura$
	Loop
	
	'"ATO_15,PDCR,F400,ERROR"
	RevisarMensaje_w
	
	If lectura$ <> "HOME" Then
		
			dividir_lectura
				
			Print "Fusible: " + fusible$
			Print "Caja: " + caja$
			Print "Cavidad: " + cavidad$
			
	EndIf
	
	
Fend

Function ActualizarMensaje_w
	TmReset 1
	Do While (ChkNet(202) <= 0)
				If Tmr(1) > 0.8 Then
					Print "Esperando Instrucción Nueva"
					TmReset 1
				EndIf
	Loop
	
	Print("//////////////////////////////////////////////////////")
	Tiempo_Envio_Mensaje = (Tmr(5))
	
	Print #202, "TIEMPO_ENVIO_MENSAJE: " + Str$((Tmr(5))) + " s"
	TmReset 5
	
	Read #202, lectura$, ChkNet(202)
	Print "Mensaje anterior: " + lectura_anterior$
	Print "Nuevo mensaje: " + lectura$
			
	RevisarMensaje_w
		
	If lectura$ <> "HOME" Then
	
		dividir_lectura
			
		Print "Fusible: " + fusible$
		Print "Caja: " + caja$
		Print "Cavidad: " + cavidad$
		
	EndIf
		
					
Fend

Function RevisarMensaje_w
	
	String CheckMsj$
	Integer coma
	CheckMsj$ = lectura$
	CheckMsj$ = CheckMsj$ + ",ERROR"
	coma = InStr(CheckMsj$, ",")
	CheckMsj$ = Right$(CheckMsj$, Len(CheckMsj$) - coma)
	
	If lectura$ <> "HOME" Then
	
		If CheckMsj$ = "ERROR" Then
				Print "Instrucción no válida"
				ActualizarMensaje_w
		Else
			dividir_lectura
			
			
			
			
			
			If (caja$ = "PDCD" Or caja$ = "PDCP") Then
				If PDef(P(cavity)) Then
				Else
					Print "cavidad no válida"
					ActualizarMensaje_w
				EndIf
			Else
				Print "caja no válida"
				ActualizarMensaje_w
			EndIf
			
			
			
			If caja$ = "PDCD" Then
				If cavity > 299 Then
					Print "cavidad no válida para esta caja"
					ActualizarMensaje_w
				EndIf
			EndIf
			
			
			
			If caja$ = "PDCP" Then
                If (cavidad$ = "MF1" Or cavidad$ = "MF2") Then
                Else
					If cavity < 299 Then
						Print "cavidad no válida para esta caja"
						ActualizarMensaje_w
					EndIf
				EndIf
			EndIf
			
			
			
		EndIf
	EndIf
	
Fend


Function dividir_lectura
	
	String remanente$
	Integer pos
			
	pos = InStr(lectura$, ",")
	fusible$ = Left$(lectura$, pos - 1)
		
	remanente$ = Right$(lectura$, Len(lectura$) - pos)
	pos = InStr(remanente$, ",")
	caja$ = Left$(remanente$, pos - 1)
				
	cavidad$ = Right$(remanente$, Len(remanente$) - pos - 1)
	cavity = Val(cavidad$)
			
	If cavity = 0 Then 'si cavity = 0 entonces es un string
		cavidad$ = Right$(remanente$, Len(remanente$) - pos)
	EndIf
Fend

