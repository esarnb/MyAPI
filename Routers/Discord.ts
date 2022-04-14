import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = Router();
const { webID, webSecret } = process.env;

router.get("/test", (req, res) => {
  res.send("Hi");
})

// router.get("/ac", (req, res) => {
//   if (req.query.code) {
//     let accessCode = `Access code: ${req.query.code}`;
//     console.log(accessCode);
//     return res.send(accessCode);
//   }
//   else res.status(401).send("Unauthorized");
// })

router.get("/", async (req, res) => {
  const { code } = req.query;
  let oauthData;
	if (code) {
		try {
      let url = 'https://discord.com/api/oauth2/token';
      let params: any = {
        client_id: webID,
        client_secret: webSecret,
        code, // access token code from discord
        grant_type: 'authorization_code',
        redirect_uri: `https://api.esarnb.com/discord`,
        scope: 'identify',
      }

      let config = {
        headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
      }

      let data = new URLSearchParams(params);
			const oauthResult = await axios.post(url, data, config)
			oauthData = await oauthResult.data;
			console.log(oauthData);
      /*
        {
          "access_token": "an access token",
          "token_type": "Bearer",
          "expires_in": 604800,
          "refresh_token": "a refresh token",
          "scope": "identify"
        }
      */

      

		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

  try {
    // TODO: Enable Sessions and associate oauthData.accessToken to user's session. 
    if (oauthData) {
      const userResult = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      let userData = await userResult.data
      console.log(userData);
      res.json(userData);
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
