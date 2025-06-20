@echo off
REM 2. Backend in neuem Fenster starten

start "" cmd /k "cd Backend && set FLASK_APP=app.py && set FLASK_ENV=development && pip install -r ..\requirements.txt && flask run --port=5000"