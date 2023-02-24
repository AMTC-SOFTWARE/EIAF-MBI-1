
'Power High 'High,Low
	'Speed 30 'punto a punto (porcentaje)
	'SpeedS 500 'Z (milimetros por segundo)
	'SpeedR 90 'U (grados por segundo)
	'Accel 5, 5 'punto a punto (porcentaje)
	'AccelS 600, 600 'Z (milimetros por s cuadrado)
	'AccelR 90, 90 'U (grados por s cuadrado)
	
Function Home_Speed
	Power High;
	Speed 70;				Accel 50, 50;
	SpeedS 1000;			AccelS 5000, 5000;
	SpeedR 100;				AccelR 100, 100;
	'Extra_Low_Speed
Fend

Function Work_Speed
	'Power High; Speed 55; SpeedS 500; SpeedR 100; Accel 20, 40; AccelS 600, 600; AccelR 90, 90;
	Power High;
	Speed 100;				Accel 70, 70;
	SpeedS 2000;			AccelS 10000, 10000;
	SpeedR 150;				AccelR 150, 150;
	If fusible$ = "RELAY_132" Or fusible$ = "RELAY_112" Or fusible$ = "MAXI_50" Or fusible$ = "MAXI_40" Then
		Speed 70;				Accel 70, 70;
		SpeedR 30;				AccelR 30, 30;
	EndIf
	'Home_Speed '#### Quitar esta línea cuando el programa quede terminado !!! ####
	'Extra_Low_Speed
Fend

Function Low_Speed
	'Power High; Speed 10; SpeedS 100; SpeedR 40; Accel 10, 40; AccelS 300, 300; AccelR 40, 40;
	Power High;
	Speed 35;				Accel 35, 35;
	SpeedS 400;				AccelS 400, 400;
	SpeedR 50;				AccelR 70, 70;
	
	If fusible$ = "RELAY_132" Or fusible$ = "RELAY_112" Then
		Power High;
		Speed 30;			Accel 40, 40;
		SpeedS 300;			AccelS 300, 300;
		SpeedR 15;			AccelR 15, 15;
	ElseIf fusible$ = "MAXI_50" Or fusible$ = "MAXI_40" Or fusible$ = "MAXI_30" Then
		Power High;
		Speed 30;			Accel 40, 40;
		SpeedS 320;			AccelS 320, 320;
		SpeedR 40;			AccelR 40, 40;
	EndIf
	'Extra_Low_Speed
Fend

Function Extra_Low_Speed
	Power High;
	Speed 20;			Accel 20, 20;
	SpeedS 150;			AccelS 150, 150;
	SpeedR 10;			AccelR 10, 10;
Fend

Function RELX_Speed
	Power High;
	Speed 1;			Accel 1, 1;
	SpeedS 1;			AccelS 1, 1;
	SpeedR 20;			AccelR 20, 20;
Fend


Function Take_Speed
	Power High;
	SpeedS 1800;				AccelS 10000, 10000;
	
	If fusible$ = "RELAY_132" Or fusible$ = "RELAY_112" Then
		SpeedS 300;			AccelS 300, 300;
	ElseIf fusible$ = "MAXI_50" Or fusible$ = "MAXI_40" Then
		SpeedS 320;			AccelS 320, 320;
	EndIf
	
	'Extra_Low_Speed
Fend

Function FastInsertion_Speed
	Power High
	SpeedS 1200;	AccelS 6000, 6000
	
	'Extra_Low_Speed
Fend

