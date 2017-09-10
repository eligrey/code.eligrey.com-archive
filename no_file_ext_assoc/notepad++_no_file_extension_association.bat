@echo off
set _appName=Notepad++
set _appLoc=%_appName%

title %_appName% For No File Extension Association

echo Type r to remove any no file extension associations.
@echo.
choice /c ynr /n /m "Open files with no file extensions using %_appName% (Y/N/R)?"

if %errorlevel%==1 goto set_no_extension_assoc
if %errorlevel%==2 exit
if %errorlevel%==3 goto reset_no_extension_assoc


:set_no_extension_assoc
ftype no_file_extension="%_appLoc%" "%%1"
assoc .=no_file_extension
cls
echo Files without file extensions are now opened by %_appName%
goto end

:reset_no_extension_assoc
ftype no_file_extension=
assoc .=
cls
echo Files without file extensions will now not be opened by anything.
goto end

:end
pause
exit