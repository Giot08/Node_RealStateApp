import express from "express";

const router = express.Router()

// routing
router.get('/', (req, res) => {
    res.json({msg: "hola", txt:"Lorem ipsun"});
});
router.get('/about', (req, res) => {
    res.send('about route!');
});

export default router