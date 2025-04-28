import "dotenv/config"
import express, { Application, Request, Response } from 'express'
import setupUtils from "./Utils/setup.utils"
import appModule from "./app.module"

const app: Application = express()

setupUtils(app)

appModule(app)

app.use('*', async (_req: Request, res: Response) => {
  res.status(404).send('This is not the API route you are looking for')
  return
})

app.listen(process.env.PORT as string, () => {
//   connectToDatabase()
  console.log("Server is running on:", `http://localhost:${process.env.PORT as string || 8000}`)
})
 