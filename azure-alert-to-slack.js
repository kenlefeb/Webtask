var request = require('request');

module.exports = function(context, cb) {
  var attachment = {
    fallback: "Microsoft Azure Alert " + context.body.data.status,
    color: context.body.data.status == 'Activated' ? "danger" : "good",
    title: "Microsoft Azure Alert " + context.body.data.status,
    title_link: context.body.data.portalLink,
    fields: [
        {
            title: "Resource",
            value: context.body.data.context.resourceName,
            short: false
        },
        {
            title: "Name",
            value: context.body.data.context.name,
            short: false
        },
        {
            title: "Description",
            value: context.body.data.context.description,
            short: false
        }
    ],
    ts: Math.floor(new Date(context.body.data.context.timestamp).getTime() / 1000)
  };
  
  var url = 'https://hooks.slack.com/services/' + context.secrets.url_suffix;
  var callback = function (error, res, body) {
      cb(error, body);
  }
  
  request({
    method: 'POST',
    url: url,
    json: true,
    body: {
      attachments: [attachment]
    }
  }, callback);
};