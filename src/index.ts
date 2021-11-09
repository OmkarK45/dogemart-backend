import express from 'express'
import cors from 'cors'
import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

import { prisma } from './config/db'
import { corsOptions } from './config/cors'

const app = express()
const port = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.raw({ type: 'application/vnd.custom-type' }))
app.use(express.text({ type: 'text/html' }))

app.use(
	session({
		name: 'dogemart.cookie.v2',
		secret: process.env.SESSION_SECRET!,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
		resave: false,
		saveUninitialized: false,
	})
)

app.get('/', async (req, res) => {
	res.send('API HEALTHY')
})

app.listen(port, () => {
	console.log(`DogeMart API 📀 listening at http://localhost:${port}`)
})
