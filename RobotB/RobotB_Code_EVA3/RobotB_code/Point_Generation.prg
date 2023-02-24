Function generar_puntos
	'-----------------------------------computo de cavidades--------------------------------
	
	'-------------------------PDCR--------------------
	P(400) = PDCR_F400
	P(405) = PDCR_F405
	Compute_Cavity(400, 405)

	P(412) = PDCR_F412
	P(417) = PDCR_F417
	Compute_Cavity(412, 417)
	
	P(421) = PDCR_F421
	P(426) = PDCR_F426
	Compute_Cavity(421, 426)
		
	P(450) = PDCR_F450
	P(455) = PDCR_F455
	Compute_Cavity(450, 455)
	
	P(456) = PDCR_F456
	P(461) = PDCR_F461
	Compute_Cavity(456, 461)
	
	'-------------------------MAXI------------------
	P(418) = PDCR_F418
	P(420) = PDCR_F420
	Compute_Cavity(418, 420)
	
	P(447) = PDCR_F447
	P(449) = PDCR_F449
	Compute_Cavity(447, 449)
	
	P(462) = PDCR_F462
	P(464) = PDCR_F464
	Compute_Cavity(462, 464)
	
	P(471) = PDCR_F471
	P(476) = PDCR_F476
	Compute_Cavity(471, 476)
	
	P(477) = PDCR_F477
	P(482) = PDCR_F482
	Compute_Cavity(477, 482)
	
	'-------------------------MINI------------------
	P(437) = PDCR_F437
	P(441) = PDCR_F441
	Compute_Cavity(437, 441)
	
	P(442) = PDCR_F442
	P(446) = PDCR_F446
	Compute_Cavity(442, 446)
	
	P(430) = PDCR_F430
	P(431) = PDCR_F431
	Compute_Cavity(430, 431)
	
	P(432) = PDCR_F432
	P(436) = PDCR_F436
	Compute_Cavity(432, 436)
	
	P(406) = PDCR_F406
	P(411) = PDCR_F411
	Compute_Cavity(406, 411)
	
	P(465) = PDCR_F465
	P(470) = PDCR_F470
	Compute_Cavity(465, 470)
	
	'-------------------------REL------------------
	P(68) = PDCR_RELU
	'P(69) = PDCR_RELX_off '''''''
	P(69) = PDCR_RELX
	P(70) = PDCR_RELT
	
	'-------------------------TBLU------------------
	P(101) = TBLU_F101
	P(109) = TBLU_F109
	Compute_Cavity(101, 109)
	
	'-------------------------PDCS------------------
	P(111) = PDCS_F111
	P(116) = PDCS_F116
	Compute_Cavity(111, 116)
	'-----------------------F96_BOX-----------------
	P(96) = F96_BOX_F96
	
	'-----------------------------------------------
Fend

