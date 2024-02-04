import cors from "cors";
const whitelist: string[] = [
  'esarnb.com', 
  'http://esarnb.com', 
  'https://esarnb.com', 
  'www.esarnb.com', 
  'http://www.esarnb.com', 
  'https://www.esarnb.com', 
  "api.esarnb.com",
  "http://api.esarnb.com",
  "https://api.esarnb.com",
  "https://api.esarnb.com/",
]
const corsOptions: cors.CorsOptions | cors.CorsOptionsDelegate<cors.CorsRequest> = {
  origin: function (origin: any, callback: Function) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback("Get out of my swamp!", null)
    }
  }
}
export const corsMiddle = cors(corsOptions)