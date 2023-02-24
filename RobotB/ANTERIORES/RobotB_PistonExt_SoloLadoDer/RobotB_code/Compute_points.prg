'------------------------------Funcion para calcular los puntos de las cajas--------------------
Function compute_Cavity_Points(pinicial As Integer, pfinal As Integer, separacion As Double, eje As Integer)
	
	Print "Generando Cavidad: ", pinicial, " - ", pfinal
	
	Integer i
	Real paso, multiplicador, j
	
	'-----------------calculo de puntos--------------------
	paso = 1										'paso para el ciclo for
	multiplicador = 0								'multiplicador de incremento
	
	For i = pinicial To pfinal Step paso
		j = separacion * multiplicador
		If eje = 1 Then
			P(i) = Pvar +X(j)
		Else
			P(i) = Pvar -Y(j)
		EndIf
		Print (P(i))
		multiplicador = multiplicador + 1
	Next
Fend
'--------------------------------------------------------------------------------------------------


