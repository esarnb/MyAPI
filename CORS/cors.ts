import cors from "cors";
const whitelist: string[] = ['http://localhost', 'https://esarnb.com', "https://api.esarnb.com"]
const corsOptions: cors.CorsOptions | cors.CorsOptionsDelegate<cors.CorsRequest> = {
  origin: function (origin: any, callback: Function) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
export const corsMiddle = cors(corsOptions)