Global Double Ymax1, Ymin1
Global Double Xmax1, Xmin1
Global Double Xmax2, Xmin2
Global Integer Zona1, Zona2
Global Integer digital_outputs
	
Function FindHome_w

	
	Home_Speed
	crear_zona
	SubirRobot_Z
	actualizar_zona
	Find_Hand
	Go HOME_R
	Off vacio
	Print #202, "HOME"
	
	For digital_outputs = 514 To 544
		Off digital_outputs
		Wait 0.1
	Next digital_outputs
	
	Off AVAILABLE 'Negado
	Wait 0.3
	On AVAILABLE 'Negado
Fend

Function FindHome_after_error
	Tool 4
	SubirRobot_Z 'En SubirRobot_Z hay un Work_Speed
	Home_Speed
	Go HOME_R
	Off vacio
Fend

Function crear_zona
	
	'Zona cerca de los nidos
	Ymax1 = 490;
	Ymin1 = 180;
	Xmax1 = 420;
	Xmin1 = -460;
	
	Xmax2 = -380
	Xmin2 = -700
	'Solo puedes crear 15 objetos de este tipo
	'BoxClr 1 'borrar zona
	Box 1, Xmin1, Xmax1, Ymin1, Ymax1, 0, 0
	Box 2, Xmin2, Xmax2, 0, 0, 0, 0
	
	
Fend

Function actualizar_zona
	
	Zona1 = GetRobotInsideBox(1)
	Zona2 = GetRobotInsideBox(2)
	'If Zona1 = 1 Then
	'	Print "Zona actual: Delantera"
	'Else
	'	Print "Zona actual: Feeders"
	'EndIf
	
Fend

Function SubirRobot_Z
	P700 = RealPos
	P700 = P700 :Z(-29.393) 'Reemplazar coordenada Z por -15
	Work_Speed
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


