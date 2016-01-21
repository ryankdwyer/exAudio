#!/bin/bash
echo "Packaging your exAudio for mac machines."
electron-packager . exAudio --platform=darwin --arch=x64 --version=0.36.4 --icon=./assets/img/logo.icns --overwrite=true