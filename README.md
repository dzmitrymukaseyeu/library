# EBook Library

The EBook Library project makes it possible for users to search info about books such as genre, description, date of publishing etc. This app allows you to save books in favorites (for all users) and modify or delete them (for admin only).

This project is based on the [MEAN stack](<https://en.wikipedia.org/wiki/MEAN_(software_bundle)>).
Additional tools and libraries I used:

- [Angular Material](https://material.angular.io): material Design components for Angular
- [JSON Web Token](https://jwt.io): user authentication
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js): password encryption
- [Mongoose](https://mongoosejs.com): MongoDB object modeling tool

To start project run the following commands:\
`node server.js`\
`ng serve --open`\
then navigate to http://localhost:4200

Test credentials:

1.  (user) email: mit@ya.ru, password: 12345
2.  (admin) email: admin@gmail.com, password: admin

Part of the front-end components is covered with tests. Run `npm run test` for checking.

In progress:

1. Migration node.js to typescript;
2. Adding joy validation to the back-end side.
3. Adding refresh token.

Known Issues:

1. Problem with cascade updating array of favorite books in the users schema after deleting a book.
