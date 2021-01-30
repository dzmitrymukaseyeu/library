# EBook Library

The EBook Library project makes it possible for users to search info about books such as genre, description, date of publishing etc. This app allows you to save books in favorites (for all users) and modify or delete (for admin only).

This project is base on the [MEAN stack](<https://en.wikipedia.org/wiki/MEAN_(software_bundle)>).
Tools and libraries I used:

- [Angular Material](https://material.angular.io): material Design components for Angular
- [JSON Web Token](https://jwt.io): user authentication
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js): password encryption
- [Mongoose](https://mongoosejs.com): MongoDB object modeling tool

To start project run following commands:
`node server.js`
`ng serve --open`
then navigate to http://localhost:4200/

Part of the front-end components is covered with tests:
`npm run tests`

In progress:

1. Migration node.js to typescript;
2. Adding joy validation on the back-end side.
