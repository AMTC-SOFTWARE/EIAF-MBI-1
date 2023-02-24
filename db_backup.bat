@ECHO off

SETLOCAL ENABLEDELAYEDEXPANSION

REM Script de Windows para hacer una copia de seguridad de todas las bases de datos del Servidor Local MySQL
REM @author: Ing. Miguel Angel Reyna Davila - Senior Software Engineer

REM Informacion de la Base de Datos
SET dbhost="127.0.0.1"
SET dbuser="dedicado"
SET dbpass="4dm1n_001"

REM Paths URLs
SET startdir=%cd%
SET binaries="C:\xampp\mysql\bin"
SET destination="C:\BIN\query"

REM Fechas
SET DAYMONTHYEAR=%DATE:/=-%
SET HOUR=%TIME:~0,2%
IF "%HOUR:~0,1%" == " " SET HOUR=0%HOUR:~1,1%
SET MINUTE=%time:~3,2%
SET SECOND=%time:~6,2%

SET _date="%DAYMONTHYEAR%_%HOUR%-%MINUTE%-%SECOND%"
ECHO "Fecha del respaldo"
ECHO %_date%

REM Final directory
IF NOT EXIST %destination%\%_date% mkdir "%destination%\%_date%"

REM Archivos Binarios de MySQL
cd %binaries%
mysql --host=%dbhost% --user=%dbuser% --password=%dbpass% -s -N -e "SHOW DATABASES" | for /F "usebackq" %%D in (`findstr /V "information_schema performance_schema"`) do (
	:: Dump each database in separate files
	mysqldump --no-data --host=%dbhost% --user=%dbuser% --password=%dbpass% %%D > "%destination%\%_date%\%%D_structure.sql"
	mysqldump --no-create-info --host=%dbhost% --user=%dbuser% --password=%dbpass% %%D > "%destination%\%_date%\%%D_data.sql"
)

ECHO "Se ha completado el respaldo! :O, Que emocions! xD... Lolsito"

cd %startdir%

@pause

REM Archivo por lotes para mysqldump para realizar una copia de seguridad de cada base de datos en un archivo separado
REM http://stackoverflow.com/a/9749003/1006079

:: Comments with REM
:: http://stackoverflow.com/a/12408045/1006079

REM How to automatically backup all MySQL databases zip them and delete backups older than n days on windows with a batch file
REM http://www.redolive.com/utah-web-designers-blog/automated-mysql-backup-for-windows/

:: Create folder with batch but only if it doesn't already exist
:: http://stackoverflow.com/a/4165472/1006079

:: Windows Batch File (.bat) to get current date in MMDDYYYY format:
:: http://stackoverflow.com/a/203116/1006079

REM Windows command-line: create a file with the current date in its name
REM http://superuser.com/a/47889/275986

:: Need leading zero for batch script using %time% variable
:: http://serverfault.com/a/220462/343812