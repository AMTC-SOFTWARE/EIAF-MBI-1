Global Integer FuseOK


Function RevisarListaFusibles
	
	If fusible$ = "MINI_5" Then
		FuseOK = 1
	ElseIf fusible$ = "MINI_7.5" Then
		FuseOK = 1
	ElseIf fusible$ = "MINI_10" Then
		FuseOK = 1
	ElseIf fusible$ = "ATO_7.5" Then
		FuseOK = 1
	ElseIf fusible$ = "ATO_25" Then
		FuseOK = 1
	ElseIf fusible$ = "ATO_30" Then
		FuseOK = 1
	ElseIf fusible$ = "RELAY_132" Then
		FuseOK = 1
	ElseIf fusible$ = "RELAY_112" Then
		FuseOK = 1
	ElseIf fusible$ = "MINI_15" Then
		FuseOK = 1
	ElseIf fusible$ = "ATO_15" Then
		FuseOK = 1
	ElseIf fusible$ = "MAXI_50" Then
		FuseOK = 1
	ElseIf fusible$ = "MAXI_40" Then
		FuseOK = 1
	ElseIf fusible$ = "MAXI_30" Then
		FuseOK = 1
	ElseIf fusible$ = "ATOC_10" Then
		FuseOK = 1
	ElseIf fusible$ = "ATOC_5" Then
		FuseOK = 1
	ElseIf fusible$ = "ATO_20" Then
		FuseOK = 1
	ElseIf fusible$ = "ATO_5" Then
		FuseOK = 1
	ElseIf fusible$ = "ATO_10" Then
		FuseOK = 1
	ElseIf fusible$ = "ATOC_15" Then
		FuseOK = 1
	Else
		Print "Fusible no declarado"
		FuseOK = 0
	EndIf
	

Fend
	

