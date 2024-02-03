import { Router } from "express";
import dotenv from "dotenv";
import { corsMiddle } from "../CORS/cors";

dotenv.config();
const router = Router();

router.get("", (req, res) => {
    res.send("Get /Main success")
});

router.get("/servers", async (req, res) => {
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

    let resJSON = await fetch("localhost:8000/serverPlayers" + id)
    let response = await resJSON.json();
    let info = response.data;
    const status = info.status;
    const onlinePlayerCount = +info.onlinePlayers;
    const players = info.players.map(x => { return { "id": x.id, "name": x.name } })
    const res1 = { status, players, onlinePlayerCount };

    resJSON = await fetch("localhost:8000/serverDetails" + id)
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
    return { ...res1, ...res2 };
}

export default router;
