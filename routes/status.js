const express = require('express');
const request = require('request');

const router = express.Router();

const accessTokenHelper = require('../lib/token/access-token');

const sendkFMessage = (userId, kfMessage, res) => {
   accessTokenHelper.getAccessToken(token => {
      if (token) {
        request.post(`https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${token}`, {
          json: {
            touser: userId,
            msgtype: 'text',
            text:
            {
                "content": kfMessage
            }
          }
        }, (error, response, body) => {
          const result = {
            userId,
            error,
            body
          };

          if (error) {
            res.send({
              ...result,
              message: 'Failed to push message'
            });
          }
          else {
            res.send({
              ...result,
              message: 'Message pushed successfully'
            });
          }

          res.end();
        });

      }
    });
};


router.post('/status', function (req, res, next) {
  const openId = req.body.OpenId;
  const Id = req.body.ID;
  const status = req.body.status;
 
  console.log(req.body);

  sendkFMessage(openId, `Sales Order ${Id} status is ${status}` ,res);
}); 

module.exports = router;
