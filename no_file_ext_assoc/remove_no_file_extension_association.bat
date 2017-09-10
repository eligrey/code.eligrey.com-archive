@echo off
title Remove No File Extension Association

choice /c ynr /n /m "Remove any no file extension associations (Y/N)?"

if %errorlevel%==1 goto yes_remove_assoc
if %errorlevel%==2 exit

:yes_remove_assoc
ftype no_file_extension=
assoc .=
cls
echo Files without file extensions will not be opened by anything by default.
pause
exit