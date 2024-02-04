import { Router } from "express";
import dotenv from "dotenv";
import { corsMiddle } from "../CORS/cors";

dotenv.config();
const router = Router();

router.get("/", corsMiddle, async(req, res) => {
    let response = await fetch("http://127.0.0.1:8000/");
    let result = await response.text();
    console.log(result);
    res.send(result)
});

router.get("/servers", corsMiddle, async (req, res) => {
    try {
        let server1 = await generateServerDetails(1);
        let server2 = await generateServerDetails(2); 
        res.send([ server1, server2 ]);
    } catch (err) {
        res.send({"error": "Could not contact gaming server"})
    }
});

/*
    CORS SECURITY ENABLED
*/

router.post("", corsMiddle, (req, res) => {
    res.send("Post /Main success")
});

router.put("", corsMiddle, (req, res) => {
    res.send("Put /Main success")
});

router.delete("", corsMiddle, (req, res) => {
    res.send("Delete /Main success")
});

async function generateServerDetails(id: number) {
    let resJSON = await fetch("http://127.0.0.1:8000/serverPlayers" + id)
    let response = await resJSON.json();
    let info = response.data;
    const status = info.status;
    const onlinePlayerCount = +info.onlinePlayers;
    const players = info.players.map(x => { return { "id": x.id, "name": x.name } })
    const res1 = { status, players, onlinePlayerCount };

    resJSON = await fetch("http://127.0.0.1:8000/serverDetails" + id)
    response = await resJSON.json()
    info = response.data.Server;
    const res2 = {
        "memory": info.memory,
        "start_memory": info.start_memory,
        "port": info.port,
        "ip": info.ip,
        "world": info.world,
        "jarfile": info.jarfile,
        "suspended": info.suspended,
        "name": info.name,
        "id": info.id,
        "dir": info.dir
    }

    resJSON = await fetch("http://127.0.0.1:8000/serverInfo" + id)
    response = await resJSON.json();
    info = response.data;
    let res3 = {
        "cpu": info.cpu,
        "memory": info.memory
    }
    return { current: res1, info: res2, usage: res3  };
}

export default router;
