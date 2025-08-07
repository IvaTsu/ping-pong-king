import cors from 'cors'
import express from 'express'

const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
