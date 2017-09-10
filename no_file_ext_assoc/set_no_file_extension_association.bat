@echo off
title Manage No File Extension Association

echo Type RESET to remove any no file extension associations.
@echo.
set /P _no_extension_handler=Enter full path of executeable for no file extension association: 

if /i "%_no_extension_handler%"=="reset" goto reset_no_extension_assoc
if not "%_no_extension_handler%"=="" goto set_no_extension_assoc

exit

:set_no_extension_assoc
set /P _params=(Optional) Enter any parameters for the executeable: 
set _opened_by=%_no_extension_handler%
if not "%_params%"=="" set _params= %_params%
if not "%_params%"=="" set _opened_by= %_opened_by% with the parameters %_params%
ftype no_file_extension="%_no_extension_handler%"%_params% "%%1"
assoc .=no_file_extension
cls
echo Files without file extensions are now opened by %_opened_by%
goto end

:reset_no_extension_assoc
ftype no_file_extension=
assoc .=
cls
echo Files without file extensions will not be opened by anything.
goto end

:end
pause
exit