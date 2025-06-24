Function Ajuste
	
'BASADOS EN ATO_30 (VERDE BOWL) y MINI_5 (NARANJA BOWL) 
'como posiciónes iniciales para los ajustes
'--------------------------------------------------------------------------


'AJUSTES FUSIBLES
'	If fusible$ = "ATO_25" Then
'		If (cavity >= 400) And (cavity <= 405) Then
'			ajustU = ajustU - 2.5
'		EndIf
'	
'		If (cavity >= 412 And cavity <= 417) Or (cavity >= 421 And cavity <= 426) Then
'			ajustU = ajustU - 2
'			ajustY = ajustY - 0.6
'			ajustX = ajustX + 0.3
'		EndIf
'		
'		If (cavity >= 450 And cavity <= 455) Then
'			ajustU = ajustU - 1.5
'			ajustY = ajustY - 0.2
'			ajustX = ajustX + 0.6
'		EndIf
'		
'		If (cavity >= 456 And cavity <= 461) Then
'			ajustU = ajustU - 1.5
'			ajustY = ajustY - 0.6
'			ajustX = ajustX + 0.2
'		EndIf
'		
'		If caja$ = "TBLU" Then
'			ajustU = ajustU - 1
'			ajustY = ajustY + 0.3
'			ajustX = ajustX + 0.6
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATOC_5" Then
'		If CA5 = 1 Then ' 1 para lado A, porque al salir de funcion de toma cambia valor
'			If caja$ = "TBLU" Then
'				'ajustU = ajustU
'				ajustY = ajustY + 0.9
'				ajustX = ajustX + 0.8
'			EndIf
'		EndIf
'		
'		If CA5 = 0 Then '0 para lado B, porque a salir de función de toma cambia valor
'			ajustU = ajustU - 2
'			ajustY = ajustY + 0
'			ajustX = ajustX + 0
'			If caja$ = "TBLU" Then
'				ajustU = ajustU - 0.5
'				ajustY = ajustY + 0.8
'				ajustX = ajustX + 0.6
'			EndIf
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATOC_10" Then
'		If CA10 = 1 Then '1 para lado A, porque a salir de función de toma cambia valor
'			ajustU = ajustU - 1
'			ajustY = ajustY + 0
'			ajustX = ajustX - 0.3
'			If caja$ = "TBLU" Then
'				ajustY = ajustY + 0.6
'				ajustU = ajustU - 1
'				ajustX = ajustX + 1
'			EndIf
'		EndIf
'
'		If CA10 = 0 Then '0 para lado B, porque a salir de función de toma cambia valor
'			ajustU = ajustU - 1
'			ajustY = ajustY + 0
'			ajustX = ajustX + 0
'			If (cavity >= 450 And cavity <= 461) Then
'				ajustU = ajustU + 0
'				ajustY = ajustY - 0.1
'				ajustX = ajustX - 0.7
'			EndIf
'			
'			If caja$ = "TBLU" Then
'				ajustU = ajustU - 1.5
'				ajustY = ajustY + 1
'				ajustX = ajustX + 0.8
'			EndIf
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATO_5" Then
'		ajustX = ajustX - 0.2
'		ajustU = ajustU - 0.5
'		If caja$ = "TBLU" Then
'			ajustU = ajustU - 1
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATO_10" Then
'		ajustU = ajustU - 1.5
'		If caja$ = "TBLU" Then
'			ajustU = ajustU - 1
'			ajustY = ajustY + 0.7
'			ajustX = ajustX + 0.2
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATO_7.5" Then
'		If caja$ = "TBLU" Then
'			ajustX = ajustX + 1
'			ajustY = ajustY + 0.3
'			ajustU = ajustU + 0.5
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATOC_15" Then
'		ajustX = ajustX + 0.4
'		ajustY = ajustY + 0.7
'		ajustU = ajustU - 2
'	EndIf
'		
'	If fusible$ = "ATO_20" Then
'		If caja$ = "TBLU" Then
'			ajustX = ajustX + 0.6
'			ajustY = ajustY + 0.4
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATO_15" Then
'		If CA15 = 1 Then
'			If caja$ = "TBLU" Then
'				ajustX = ajustX + 0.2
'			EndIf
'		EndIf
'		
'		If CA15 = 0 Then
'			If caja$ = "TBLU" Then
'				ajustX = ajustX + 0.4
'				ajustY = ajustY + 0.8
'				ajustU = ajustU - 0.6
'			EndIf
'		EndIf
'	EndIf
'	
'	If fusible$ = "ATO_30" Then
'		If (cavity >= 412 And cavity <= 417) Or (cavity >= 421 And cavity <= 426) Then
'			ajustU = ajustU + 0.2
'			ajustX = ajustX + 0.4
'			
'			If (cavity >= 421 And cavity <= 426) Then
'				ajustY = ajustY - 0.4
'			EndIf
'		EndIf
'		
'		
'		If (cavity >= 450 And cavity <= 455) Then
'			ajustU = ajustU + 0
'			ajustX = ajustX + 0.5
'		EndIf
'		
'	EndIf
'	
'	If caja$ = "PDCS" Then
'		If cavity = 111 Then
'			ajustX = ajustX + 0.8
'		EndIf
'	EndIf
''CM40 Indica el lado del feeder del que se tomo el fusible, 1 indica que se tomo de lado A, 0 de lado B 
''NOTA: Estos valores son al contrario que en la funcion de toma (donde 0 indica lado A y 1 lado B) ya que al 
''tomar el fusible y salir de la funcion el valor de CM40 se invierte, por esto el valor en este If esta invertido
		
		
		
	
	If mid = True Then
	    If (cavity >= 412 And cavity <= 417) Then
	        ajustY = ajustY + 0.3
	    EndIf
	    If (cavity >= 456 And cavity <= 461) Then
	        ajustX = ajustX - 0.3
	    EndIf
	    If (cavity >= 421 And cavity <= 426) Then
	        ajustY = ajustY + 0.6
	    EndIf
	    If (cavity >= 421) Then
	        ajustY = ajustY + 0.1
	    EndIf
	    
	EndIf



	If (cavity = 421) Then
		ajustZ = ajustZ + 0.4
	EndIf

	If (cavity = 419) Then
'		ajustY = ajustY - 0.6
		ajustX = ajustX + 0.2
	EndIf


	If caja$ = "TBLU" Then
		ajustY = ajustY + 0.3
	EndIf
	
	
	If fusible$ = "MAXI_40" Then
		ajustY = ajustY - 1
	EndIf
	
	If (cavity = 420) Then
		ajustY = ajustY - 1
	EndIf
	
	If (cavity = 418) Then
		ajustY = ajustY - 0.3
	EndIf
	
	If mid = False Then
	    If (cavity >= 412 And cavity <= 417) Then
	        ajustY = ajustY - 0.3
	     EndIf
	     
	     If (cavity >= 418 And cavity <= 420) Then
	        ajustY = ajustY - 1.2 - 2.412
	        ajustU = ajustU + 3
	        ajustX = ajustX + 2.064
	     EndIf
		
	EndIf
	
	If mid = True Then

	     
	     If (cavity >= 418 And cavity <= 420) Then
	        ajustY = ajustY - 1.2 - 2.412
	        ajustU = ajustU + 3
	        ajustX = ajustX + 2.064
	     EndIf
		
	EndIf
	
	
'	If caja$ = "TBLU" Then
'		Print("TBLU detectadaaaaa")
'		If cavity = 104 Then
'			Print("posicion 104 de TBLU")
'			ajustY = ajustY + 2
'			ajustZ = ajustZ + 0
'		EndIf
'	EndIf
	
	If (cavity >= 447 And cavity <= 449) Then
	        ajustY = ajustY - 2.5
	        ajustX = ajustX - 0.2
	EndIf
	
	If caja$ = "PDCS" Then
		If cavity = 111 Then
			ajustY = ajustY - 1.5
		EndIf
	EndIf
	
	If caja$ = "PDCS" Then
		If (cavity >= 112 And cavity <= 114) Then
			ajustY = ajustY - 1.2
		EndIf
	EndIf
	
	If caja$ = "PDCS" Then
		If (cavity >= 115 And cavity <= 116) Then
			ajustY = ajustY - 2.0
		EndIf
	EndIf
	
	
	If (cavity >= 437 And cavity <= 441) Then
	        ajustY = ajustY + 0.3
	        ajustX = ajustX - 0
	EndIf
	
	
	If (cavity >= 413 And cavity <= 414) Then
	        ajustX = ajustX - 0.8 'debido a que pega con pestaña al bajar
	EndIf
	
	Print("adjustX: " + Str$(ajustX))
	Print("adjustY: " + Str$(ajustY))
	Print("adjustU: " + Str$(ajustU))
	Print("adjustZ: " + Str$(ajustZ))
Fend
