const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Route for the login page
app.get('/login', (req, res) => {
  res.send(`<form action="/login" method="POST" 
      onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
      <input id="username" type="text" name="username" placeholder="Enter your username" required>
      <br/><button type="submit">Login</button>
    </form>`);
});

// Handle the login form submission
app.post('/login', (req, res) => {
    res.redirect('/')
});

// Route for the homepage
app.get('/', (req, res) => {
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            data = "No chat exists";
        } else {
            res.send(`${data}<form action="/" method="POST"
                    onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
                    <input id="message" type="text" name="message" placeholder="Enter your message" required>
                    <input id="username" type="hidden" name="username">
                    <br/><button type="submit">Send</button>
                    </form>`);
        }
    });
});

// Handle the message form submission
app.post('/', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;
    const chatEntry = `${username} : ${message}`;
    console.log(chatEntry);

  // Append the message with the username to the file
  fs.appendFile('message.txt', chatEntry + '\n', 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

// Start the server
app.listen(3000);