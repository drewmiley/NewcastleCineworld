# pRactice

Ractive dummy project setup with bootstrap, babel, and webpack.

## Running the app

The app uses webpack-dev-server to aid development. Technologies used include babel, immutable for data storage, and mocha and chai for unit testing.

To start the development server with hot reloading enabled, simply run

```
npm start
```

## Folder structure

    +-- app.html
    +-- app.js
    +-- components
    |	+-- NameInput.js
    |	+-- views
    |	|	+-- name-input.html

## Deploying the app

To deploy the app to gh-pages, there are a couple of steps to follow.

1. Run `webpack` command. This will create a `bundle.js` and `bundle.js.map` file in the dist folder.
2. Delete everything except dist folder.
3. Empty contents of dist folder to root directory.
4. Commit and push to gh-pages.

