const express = require("express");
const axios = require("axios");
require("dotenv").config();
const Client = require("../models/client");
const { getClientsArr, checkValidity } = require("../helpers/helpers");
const router = express.Router();

router.get("/clients", async (req, res) => {
  try {
    const clientsFromDb = await Client.find();
    let clients;

    if (clientsFromDb.length === 0) {
      // in case we still dont have the clients from the db. We have to first get the clients from the api
      const clientsAsText = (await axios.get("https://pastebin.com/raw/GkYMtrnJ")).data;
      clients = getClientsArr(clientsAsText);

      clients.forEach((client) => {
        const clientToSave = new Client(client);
        clientToSave.save();
      });
    } else {
      clients = clientsFromDb;
    }

    res.send(clients);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/clients/ip/:ip", async (req, res) => {
  let coords = [];

  try {
    const ipDetails = (await axios.get(`http://ip-api.com/json/${req.params.ip}`)).data;
    coords.push(ipDetails.lon);
    coords.push(ipDetails.lat);
    res.send(coords);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/clients/new", async (req, res) => {
  try {
    if (!checkValidity(req.body.name, req.body.id, req.body.ip, req.body.phone)) {
      throw new Error("Invalid input");
    }

    const client = new Client(req.body);
    await client.save();
    const clients = await Client.find();
    res.send(clients);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/clients/edit/:id", async (req, res) => {
  try {
    if (!checkValidity(req.body.name, req.body.id, req.body.ip, req.body.phone)) {
      throw new Error("Invalid input");
    }

    await Client.findByIdAndUpdate(req.params.id, req.body);
    const clients = await Client.find();
    res.send(clients);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/clients/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    const clients = await Client.find();
    res.send(clients);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
