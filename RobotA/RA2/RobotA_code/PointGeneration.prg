Function generar_puntos
	'Calculo de puntos para la caja PDC-P
	
	'-----------------ATO---------------------
		
	P(300) = PDCP_F300
	
	P(326) = PDCP_F326
	P(335) = PDCP_F335
	Compute_Cavity(326, 335)
	
	'-----------------MULTI---------------------
	
	P(39) = PDCP_MF1
	P(40) = PDCP_MF2

	'---------------MINI-----------------------
	
	P(301) = PDCP_F301
	P(305) = PDCP_F305
	Compute_Cavity(301, 305)
	
	P(318) = PDCP_F318
	P(325) = PDCP_F325
	Compute_Cavity(318, 325)
	
	'Calculo de puntos para la caja PDC-D
	
	'---------------MINI-----------------------
	P(200) = PDCD_F200
	P(208) = PDCD_F208
	Compute_Cavity(200, 208)
	
	P(217) = PDCD_F217
	P(221) = PDCD_F221
	Compute_Cavity(217, 221)
	
	P(222) = PDCD_F222
	P(226) = PDCD_F226
	Compute_Cavity(222, 226)
	
	P(227) = PDCD_F227
	P(232) = PDCD_F232
	Compute_Cavity(227, 232)
	
	'-----------------ATO---------------------
	P(209) = PDCD_F209
	P(216) = PDCD_F216
	Compute_Cavity(209, 216)
	'___________________________________________
Fend

