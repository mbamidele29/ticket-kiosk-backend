const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports.transporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENTID,
      process.env.OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject();
        }
        resolve(token);
      });
    });
  
    const transport = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_ADDRESS,
        accessToken,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      },
      tls: {rejectUnauthorized: false},
        debug:true
    });
  
    return transport;
  };