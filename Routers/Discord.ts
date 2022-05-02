import { Router } from "express";
import { corsMiddle } from "../CORS/cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = Router();
const { webID, webSecret } = process.env;

router.get("/", corsMiddle, async (req, res) => {
  let oauthData;

  const { code } = req.query;
	if (code) {
    console.log("CODED", code);
    
		try {
      /**
       * Setup Discord Oauth2 Params
       */
      let url = 'https://discord.com/api/oauth2/token';
      let params: any = {
        client_id: webID,
        client_secret: webSecret,
        code, // access token code from discord
        grant_type: 'authorization_code',
        redirect_uri: `https://esarnb.com/discord`,
        scope: 'identify',
      }

      let config = {
        headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
      }

      /**
       * Get Access Token Object from Discord Oauth2
       */
      let data = new URLSearchParams(params);
			const oauthResult = await axios.post(url, data, config)
			oauthData = await oauthResult.data;
			console.log(oauthData);
      
      /**
       * Get User Data Object from Discord Users Endpoint
       */
        if (oauthData) {
          const userResult = await axios.get('https://discord.com/api/users/@me', {
            headers: {
              authorization: `${oauthData.token_type} ${oauthData.access_token}`,
            },
          });
          let userData = await userResult.data
          console.log(userData);
          
          const { id, username, avatar, banner, locale } = userData;
          res.json( { id, username, avatar, banner, locale } ); // return user data to original requester
        }
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}
});
export default router;

/* Response for oauthurlEndpoint
            
  {
    "access_token": "an access token",
    "token_type": "Bearer",
    "expires_in": 604800,
    "refresh_token": "a refresh token",
    "scope": "identify"
  }

*/

/* Response from discord.com/api/users/@me
  
  {
    id: string,
    username: string,
    avatar: string,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner: string,
    banner_color: string,
    accent_color: number,
    locale: string,
    mfa_enabled: boolean,
    premium_type: number
  }

  I want
  {
    id: null,
    username: null,
    avatar: null,
    banner: null,
    locale: null,
  }

*/