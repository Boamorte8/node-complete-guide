const fs = require('fs');
const users = require('./users');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(message);
      // fs.writeFileSync('message.txt', message);
      fs.writeFile('message.txt', message, (err) => {
        console.error(err);
      });
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

const requestsHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  const listUsers = users.users.map(user => '<li>' + user + '</li>').join('');

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<body>');
    res.write('<head><title>Enter User</title></head>');
    res.write('<body>');
    res.write('<h1>Hi! Welcome to Assignment</h1>');
    res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<body>');
    res.write('<head><title>List Users</title></head>');
    res.write('<body>');
    res.write('<h1>Users</h1>');
    res.write('<ul>');
    res.write(listUsers);
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const newUser = parsedBody.split('=')[1];
      console.log(newUser);
      fs.writeFile('new_users.txt', newUser, (err) => {
        console.error(err);
      });
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
}

// module.exports = requestHandler;
// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.handlerTwo = requestsHandler;
exports.initText = 'Server started!';