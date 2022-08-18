Function FindCodo_w
	
	Find_Hand 'actualizar RobotHand para saber qué codo está activo
	actual_aux = RobotHand 'guardar el codo activo en la variable actual
	Find_desired_aux 'preguntar cual es el codo deseado
	
	'Mover al codo deseado correspondiente
	If desired_aux = 1 Then 		 	 'Brazo deseado es codo derecho
		If actual_aux = desired_aux Then 'Brazo actual es codo derecho
			SubirRobot_Z
			Work_Speed; Go A1R
		Else							 'Brazo actual es codo izquierdo
			SubirRobot_Z
			Work_Speed;
			If cavidad$ = "MF1" Or cavidad$ = "MF2" Then
				Move A2L
			Else
				Go AUX_LEFT
				Go A2L
			EndIf
			'Move A2L		 			 'DEBE SER MOVE POR GUARDA
			
			Left_to_Right 	 			 'termina en A1R
		EndIf
		
	ElseIf desired_aux = 2 Then			 'Brazo deseado es codo izquierdo
		If actual_aux = desired_aux Then 'Brazo actual es codo izquierdo
			SubirRobot_Z
			
			If cavidad$ = "MF1" Or cavidad$ = "MF2" Then
				Move A2L
			Else
				Go AUX_LEFT
				Go A2L
			EndIf
			'Move A2L 	 				 'DEBE SER MOVE POR GUARDA
			
		Else						 	 'Brazo actual es codo derecho
			SubirRobot_Z
			Work_Speed; Go A1R
			Work_Speed; Right_to_Left 	 'termina en A2L
		EndIf
		
	Else
		Print "Error: Codo deseado no detectado"
		ActualizarMensaje_w
	EndIf
	
	
Fend




