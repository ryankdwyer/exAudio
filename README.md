# exAudio

A cross platform audio player built in Electron. exAudio is capable of storing and playing a library of various audio files in an array of codecs. I have a large collection of lossless audio files, mostly in FLAC. I was unsatisfied with the current audio player options available, so I built my own. 

I am currently working on implementing a recommendation engine that will suggest new music based on your listening habits. This will leverage the echoNest API, the same information used in Spotify's recommendation engine. 

##Supported Codecs:
1. flac
2. alac
3. aac 
4. mp3
5. mp4
6. more are coming!

##Technologies/Libraries used:
1. Electron
2. AngularJS
3. aurorajs
4. flac.js
5. mp3.js
6. aac.js
7. alac.js
8. lokijs

##To Get Started:
1. ```git clone``` this repository to your local machine
2. ```npm install``` in the repository's directory
3. ```npm start``` will launch the development version of the application

##To package the application for Mac OSX
1. Open your terminal and navigate to the root of the exAudio project
2. Run the following command from your terminal: ```sh package-app-mac.sh```
3. The packaged app should appear in a directory called ```exAudio-darwin-x64``` in the root of your project
