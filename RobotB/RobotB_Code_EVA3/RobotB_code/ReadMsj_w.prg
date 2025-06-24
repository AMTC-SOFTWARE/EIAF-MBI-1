Global Boolean mid 'para saber si es una caja mid

Function LeerMensaje_w
	TmReset 1
	Do While (lectura$ = "empty" Or lectura$ = "test")
			Do While (ChkNet(202) <= 0)
				If Tmr(1) > 0.8 Then
					Print "Esperando Instrucción"
					TmReset 1
				EndIf
			Loop

			Read #202, lectura$, ChkNet(202)
			Print "Mensaje: " + lectura$
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
			
			If cavity > 999 Then
				Print "cavidad no válida"
				ActualizarMensaje_w
			Else
				If (caja$ = "PDCR" Or caja$ = "PDCS" Or caja$ = "TBLU" Or caja$ = "F96_box") Then
					If PDef(P(cavity)) Then
					Else
						Print "cavidad no válida"
						ActualizarMensaje_w
					EndIf
				Else
					Print "caja no válida"
					ActualizarMensaje_w
				EndIf
					
					
					
				If caja$ = "PDCR" Then
					If cavidad$ = "RELU" Or cavidad$ = "RELX" Or cavidad$ = "RELT" Then
					Else
						If cavity > 399 And cavity < 500 Then
						Else
							Print "cavidad no válida para esta caja"
							ActualizarMensaje_w
						EndIf
					EndIf
				EndIf
				If caja$ = "TBLU" Then
					If cavity > 100 And cavity < 110 Then
					Else
						Print "cavidad no válida para esta caja"
						ActualizarMensaje_w
					EndIf
				EndIf
				If caja$ = "PDCS" Then
					If cavity > 110 And cavity < 117 Then
					Else
						Print "cavidad no válida para esta caja"
						ActualizarMensaje_w
					EndIf
				EndIf
			
			EndIf 'If cavity > 999 Then
			
		EndIf 'If CheckMsj$ = "ERROR" Then
	EndIf 'If lectura$ <> "HOME" Then
	
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
	
	mid = False
	If caja$ = "PDCRMID" Then
		mid = True
		caja$ = "PDCR"
	EndIf
	
	If caja$ = "PDCS" Then
		Print("PDC-S DETECTADA")
		P(111) = PDCS_F111
		P(116) = PDCS_F116
		Compute_Cavity(111, 116)
	ElseIf caja$ = "PDCS21" Then
		Print("PDC-S21 DETECTADA")
		P(111) = PDCS_F111
		P(116) = PDCS_F116
		Compute_Cavity(111, 116)
	ElseIf caja$ = "PDCS19" Then
		Print("PDC-S19 DETECTADA")
		P(111) = PDCS19_F111
		P(116) = PDCS19_F116
		Compute_Cavity(111, 116)
	ElseIf caja$ = "PDCS20" Then
		Print("PDC-S20 DETECTADA")
		P(111) = PDCS20_F111
		P(116) = PDCS20_F116
		Compute_Cavity(111, 116)
	ElseIf caja$ = "PDCS9" Then
		Print("PDC-S9 DETECTADA")
		P(111) = PDCS9_F111
		P(116) = PDCS9_F116
		Compute_Cavity(111, 116)
	EndIf
	If caja$ = "F961" Then
		Print("F961 DETECTADA")
		P(96) = F961_F96
	ElseIf caja$ = "F96" Then
		Print("F96 DETECTADA")
		P(96) = F96_BOX_F96
	EndIf
	
Fend

