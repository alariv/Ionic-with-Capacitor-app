# Ionic-with-Capacitor-app

Grupi liikmed:
- Kati Põdra
- Kristo Põlluvee
- Ervin Puust
- Kevin Iin (git history-s kevinerikiin, flowtheci, f0ltex)
- Alari Verev

Figma avavaate prototüüp: https://www.figma.com/file/p8VKTR8oSo5a3Neeyx25SR/Untitled?type=design&node-id=0%3A1&t=3tnLwN25KGXU2ASv-1

## Getting started

```bash
ionic start Ionic-with-Capacitor-app tabs --capacitor
```

## Run application

```bash
npm install -g @ionic/cli@latest

# in project directory
npm i
npm run start
# application will be served on localhost:8080
```

## Build and run IOS

```bash
# add io path
ionic capacitor add ios

# open project in xCode
ionic capacitor open ios

# build project and copy to ios and android
npm run cpupdate

# run ios
npm run ios
```

## Build and run ANDROID

```bash
# add io path
ionic capacitor add android

# build project and copy to ios and android
npm run cpupdate

# run android
npm run android
```

## Hot reload / Live reload

```bash
# won't work properly with vpn
npm install -g @ionic/cli native-run
ionic cap run android -l --external
ionic cap run ios -l --external
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
