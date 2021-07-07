const express = require("express")
const app = express()
const cors = require("cors")
const { parse, format, toDate, parseISO, getUnixTime } = require("date-fns")

app.use(cors({ optionsSuccessStatus: 200 }))

app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" })
})

app.get("/api/:date", (req, res) => {
  // let date = new Date(req.params.date).getTime()
  let date = toDate(+req.params.date)
  // let unix = date.getTime()
  let unix = getUnixTime(date)
  let utc = format(date, "eee, d MMM yyyy hh:mm:ss OOOO")
  console.log({ params: req.params, unix, utc })

  res.json({ unix, utc })
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
