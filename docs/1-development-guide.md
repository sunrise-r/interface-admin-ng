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
    user@desktop:~/interface-admin-ng/dist/iad-interface-admin$ npm login --registry=http://37.1.83.184:84/repository/npm-sunrise/
    ```

4. Publish (development version)
    
    ```
    user@desktop:~/interface-admin-ng/dist/iad-interface-admin$ npm publish --tag devel
    ```

5. Log out from the nexus server

    ```
    user@desktop:~/interface-admin-ng/dist/iad-interface-admin$ npm logout --registry=http://37.1.83.184:84/repository/npm-sunrise/
    ```

6. Enjoy!

## Configuring your project for using library from Nexus server

1. Login to the nexus server using login and password of user that can download packages. This will create ~/.npmrc file with _authToken

    ```
    user@desktop:~/your-project$ npm login --registry=http://37.1.83.184:84/repository/npm-group/
    ```
2. Open ~/.npmrc file for edit and copy _authToken=SOME_AUTH_TOKEN

3. Create .npmrc file in your project root

4. Paste _authToken and registry path as follows:

    ```
       registry=http://37.1.83.184:84/repository/npm-group/
       _authToken=SOME_AUTH_TOKEN
       always-auth=true
    ```
5. If you are using yarn create .yarnrc file in your project root with following content

    ```
    registry "http://37.1.83.184:84/repository/npm-group/"
    
    ```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

To build interface-admin-ng library run `yarn build:lib`

To build demo application run `yarn run build:demo`

## Code Quality checking

To check project for errors run `yarn lint`

## Running unit tests

Run `yarn test:lib` to execute the lib unit tests via [Karma](https://karma-runner.github.io).

Run `yarn test:demo` to execute the demo project unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
