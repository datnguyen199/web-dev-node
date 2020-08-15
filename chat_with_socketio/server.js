var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var dbUrl = 'mongodb+srv://datnguyen199:Khongnhonoi@cluster0.j56un.mongodb.net/simple_chat?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('mongo db connected...')
}).catch(err => console.log(err));

var Message = mongoose.model('Message', { name: String, message: String})

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err, message) => {
    if(err) {
      res.sendStatus(500)
    }
    res.send(message);
  })
})

app.listen(3020, () => {
  console.log('listening on port 3020...')
})
