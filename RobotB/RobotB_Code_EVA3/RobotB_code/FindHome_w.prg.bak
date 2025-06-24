Global Double Ymax1, Ymax2
Global Double Ymin1, Ymin2

Global Double Xmax1, Xmax2
Global Double Xmin1, Xmin2
Global Double Umin2, Umax2, currentU
Global Integer Zona1, Zona2
Global Integer digital_outputs


Function FindHome_w
	Tool 5
	Home_Speed
	crear_zona
	actualizar_zona
		
	
	
	Print("Salu2 desde el wall-E")
	Print (Zona1)
		
	'zona = 1 significa dentro de la zona
	'zona = 0 significa fuera de la zona
	
	If Zona1 = 1 Then
		Print("dentro de Zona1")
		
		Move Here :Z(-91)
		Move Here :X(371)
		Move Here :Y(110)
		
	EndIf
	
	If Zona2 = 1 Then
		Print("dentro de Zona2")
		currentU = CU(RealPos)
		If currentU < Umax2 And currentU > Umin2 Then
			Print("dentro de zona U")
		EndIf
		
		Wait 3
		
		Move Here :Z(-84)
		Move Here :X(-506)
		Move Here :Y(-1)
		Move Here :U(114) ROT
	Else
		Print("fuera de Zona2")
		Wait 3
	EndIf
	SubirRobot_Z
	Find_Hand
	Go home_l
	Off vacio
	Print #202, "HOME"
	
	For digital_outputs = 514 To 544
		Off digital_outputs
	Next digital_outputs


	Off AVAILABLE 'Negado
	Wait 0.3
	On AVAILABLE 'Negado
	
	
Fend

Function FindHome_after_error
	Tool 5

	SubirRobot_Z 'En SubirRobot_Z hay un Work_Speed
	Home_Speed

	Go home_l
	Off vacio
	
Fend

Function crear_zona
	
	'Zona cerca de los nidos
	Ymax1 = -286;
	Ymin1 = -485;
	
	Ymax2 = -84;
	Ymin2 = -205;
	
	Xmax1 = 379;
	Xmin1 = 183;
	
	Xmax2 = -471;
	Xmin2 = -545;
	
	Umax2 = 76;
	Umin2 = 2;
	'Solo puedes crear 15 objetos de este tipo
	'BoxClr 1 'borrar zona
	Box 1, Xmin1, Xmax1, Ymin1, Ymax1, 0, 0
	Box 2, Xmin2, Xmax2, Ymin2, Ymax2, 0, 0
	
	
Fend
Function actualizar_zona
	
	Zona1 = GetRobotInsideBox(1)
	Zona2 = GetRobotInsideBox(2)
	
Fend
Function SubirRobot_Z
	P700 = RealPos
	P700 = P700 :Z(-30) 'Reemplazar coordenada Z por -20
	Go P700
	PDel 700
Fend
Function Find_Hand
	RobotHand = Hand(RealPos)
	'If RobotHand = 1 Then
	'	Print "Codo actual: Derecho"
	'Else
	'	Print "Codo actual: Izquierdo"
	'EndIf
Fend



