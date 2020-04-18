let events = require('events');
let util = require('util');

function Pulser() {
  events.EventEmitter.call(this);
}
util.inherits(Pulser, events.EventEmitter);

Pulser.prototype.start = function() {
  setInterval(() => {
    util.log('>>>>>>pulse');
    this.emit('pulse');
    util.log('<<<<<<pulse');
  }, 1000);
};

let pulser = new Pulser();

pulser.on('pulse', () => {
  util.log('pulse received');
});

pulser.start();
