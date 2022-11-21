import app from "./app.js";

const PORT = process.env.PORT || 8081

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`)
})
