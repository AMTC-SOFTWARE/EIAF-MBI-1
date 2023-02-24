Global Integer FuseOK, DerIzq

Function RevisarListaFusibles
	' 1 Para lado derecho y 2 para lado izquierdo
	If fusible$ = "MINI_5" Then
		FuseOK = 1
		DerIzq = 2
	ElseIf fusible$ = "MINI_7.5" Then
		FuseOK = 1
		DerIzq = 2
	ElseIf fusible$ = "MINI_10" Then
		FuseOK = 1
		DerIzq = 2
	ElseIf fusible$ = "ATO_7.5" Then
		FuseOK = 1
		DerIzq = 2
	ElseIf fusible$ = "ATO_25" Then
		FuseOK = 1
		DerIzq = 2
	ElseIf fusible$ = "ATO_30" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "RELAY_132" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "RELAY_112" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "MINI_15" Then
		FuseOK = 1
		DerIzq = 2
	ElseIf fusible$ = "ATO_15" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "MAXI_50" Then
		FuseOK = 1
		DerIzq = 2
	ElseIf fusible$ = "MAXI_40" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "MAXI_30" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "ATOC_10" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "ATOC_5" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "ATO_20" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "ATO_5" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "ATO_10" Then
		FuseOK = 1
		DerIzq = 1
	ElseIf fusible$ = "ATOC_15" Then
		FuseOK = 1
		DerIzq = 2
	Else
		Print "Fusible no declarado"
		FuseOK = 0
	EndIf
	

Fend
	

