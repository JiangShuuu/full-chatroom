const { addMessage, getAllMessage } = require("../controllers/messagesController")

const router = require("express").Router()

router.get("/getmsg", getAllMessage)
router.post("/addmsg", addMessage)

module.exports = router