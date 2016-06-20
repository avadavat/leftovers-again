'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Abstract class for managing connections. All connections are responsible
 * for handling server messages, using listeners to relay messages, and
 * tracking the battles that use their particular connection.
 */
class Connection {
  /**
   * Constructor for a Connection
   */
  constructor() {}

  /**
   * Connect to a thing.
   */
  connect() {
    _log2.default.error('please override me.');
  }

  /**
   * Handle a server message. These have a particular format which I won't get
   * into here; check the official repos for more information. If the message
   * came with a battle ID, make sure that battle has been constructed, and
   * relay the message to that particular battle only.
   *
   * @param  {string} msg The message from the server.
   */
  _handleMessage(msg) {
    // console.log('received: %s', msg);
    const messages = msg.split('\n');
    let bid = null;
    if (messages[0].indexOf('>') === 0) {
      bid = messages[0].split('>')[1];
    }

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].indexOf('|') === 0) {
        const messageParts = messages[i].split('|');
        let passThese = messageParts.slice(2);
        if (bid) {
          if (messageParts[1] === 'request') {
            passThese = [passThese.join('')];
          }
          _listener2.default.relay(messageParts[1], passThese, bid);
        } else {
          _listener2.default.relay(messageParts[1], passThese);
        }
      }
    }
  }

  /**
   * Send the message to the server
   * @param  {string} message The server message.
   */
  send(message) {} // eslint-disable-line

  /**
   * [close description]
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
   */
  close(message) {} // eslint-disable-line

  /**
   * [exit description]
   * @return {[type]} [description]
   */
  exit() {}
}

exports.default = Connection;