	'CX( point ) 
	'CY( point ) 
	'CZ( point ) 
	'CU( point ) 
	'Hand ( point )
	
	'P0 = RealPos
	'Print P0
	
	'REGRESA EL VALOR DE UN JOINT DE UN PUNTO
	'Real joint1
	''joint1 = PAgl(P0, 1)
	'joint1 = PAgl(RealPos, 1)
	'Print "joint1: "
	'Print joint1
	
	'P999 = XY(100, 100, 100, 100) /L ' Limite de Puntos que se pueden crear o modificar
	'P999 = RealPos ' Igualar punto a la posición actual del robot
	'PList Desplegar todos los puntos creados y modificados

Function Compute_Cavity(Desde As Integer, Hasta As Integer)
	
	Print "Generando Cavidad: ", Desde, " - ", Hasta

	Double X_i, Y_i, Z_i, U_i 'Elementos de punto inicial
	Double X_f, Y_f, Z_f, U_f 'Elementos de punto final
	Integer i, cantidad_de_puntos
	Double aumento_x, aumento_y, aumento_z, aumento_u
	
	X_i = CX(P(Desde))
	X_f = CX(P(Hasta))
	
	Y_i = CY(P(Desde))
	Y_f = CY(P(Hasta))
	
	Z_i = CZ(P(Desde))
	Z_f = CZ(P(Hasta))
	
	U_i = CU(P(Desde))
	U_f = CU(P(Hasta))
			
	cantidad_de_puntos = Hasta - Desde
	aumento_x = (X_f - X_i) / cantidad_de_puntos
	aumento_y = (Y_f - Y_i) / cantidad_de_puntos
	aumento_z = (Z_f - Z_i) / cantidad_de_puntos
	aumento_u = (U_f - U_i) / cantidad_de_puntos
		
		
	For i = Desde To (Hasta - 1)
	  	If PDef(P(i)) Then
                P(i + 1) = P(i) +X(aumento_x) +Y(aumento_y) +Z(aumento_z) +U(aumento_u)
                Print "P(", i, " )", (P(i))
      	Else
                 	Print "Error, PUNTOS NO DEFINIDOS"
                 	lectura$ = "HOME"
	 	EndIf
	Next
	
			
Fend

Function Calibrar_w(Desde As Integer, Hasta As Integer, X_cal As Double, Y_cal As Double, Z_cal As Double, U_cal As Double)
	Integer i
		
	For i = Desde To Hasta
	  	If PDef(P(i)) Then
                P(i) = P(i) +X(X_cal) +Y(Y_cal) +Z(Z_cal) +U(U_cal)
        Else
               	Print "Error, PUNTOS NO DEFINIDOS"
               	lectura$ = "HOME"
	 	EndIf
	Next

			
Fend

