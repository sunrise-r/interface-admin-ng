# [InterfaceAdminNg](../README.md) / Development

## Publish library to the local Nexus server

1. To build library open the project root directory and type: 

```
user@desktop:~/interface-admin-ng$ yarn run build:lib
```

2. Follow the output path

```
user@desktop:~/interface-admin-ng$ cd dist/iad-interface-admin
```

3. Log in to the nexus server

```
user@desktop:~/interface-admin-ng/dist/iad-interface-admin$ npm login --registry=http://192.168.1.9:84/repository/npm-group/
```

4. Publish (development version)

```
user@desktop:~/interface-admin-ng/dist/iad-interface-admin$ npm publish --tag devel
```

5. Log out from the nexus server

```
user@desktop:~/interface-admin-ng/dist/iad-interface-admin$ npm logout --registry=http://192.168.1.9:84/repository/npm-group/
```

6. Enjoy!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
