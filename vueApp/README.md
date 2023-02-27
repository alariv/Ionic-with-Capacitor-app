# Ionic-with-Capacitor-app

## Getting started

```bash
ionic start Ionic-with-Capacitor-app tabs --type vue --capacitor
```

## Build and run IOS

```bash
# add io path
ionic capacitor add ios

# open project in xCode
ionic capacitor open ios

# build project and copy to ios
ionic capacitor copy ios
ionic capacitor update
# OR
npm run ios
```

## Build and run ANDROID

```bash
# add io path
ionic capacitor add android

# build project and copy to ios
ionic capacitor copy android
ionic capacitor run android
# OR
npm run android
```

## Run application

```bash
npm install -g @ionic/cli@latest
#navigate to project directory
npm i
npm run serve
#application will be served on localhost:8080
```

## Hot reload / Live reload

```bash
#won't work properly with vpn
npm install -g @ionic/cli native-run
ionic cap run android -l --external
ionic cap run ios -l --external
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
