import cors from "cors";
const whitelist: string[] = ['https://esarnb.com', "https://api.esarnb.com"]
const corsOptions: cors.CorsOptions | cors.CorsOptionsDelegate<cors.CorsRequest> = {
  origin: function (origin: any, callback: Function) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback("Get out of my swamp!", null)
    }
  }
}
export const corsMiddle = cors(corsOptions)