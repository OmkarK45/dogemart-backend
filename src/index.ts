import express from 'express'
import cors from 'cors'
import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

import { prisma } from './config/db'
import { corsOptions } from './config/cors'
import { User } from '@prisma/client'

import {
	AuthController,
	AdminController,
	ProductController,
	CartController,
	WishlistController,
	ReviewController,
} from './controllers'

const app = express()
const port = process.env.PORT || 5000

declare module 'express-session' {
	interface SessionData {
		user?: Omit<User, 'hashedPassword'>
		cookie: Cookie
	}
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
	session({
		name: 'dogemart.cookie.v2',
		secret: 'MySessionSecret',
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			httpOnly: false,
		},
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
		resave: false,
		saveUninitialized: false,
	})
)
app.use(cors(corsOptions))
app.use('/auth', AuthController)
app.use('/admin/products', AdminController)
app.use('/api/products', ProductController)
app.use('/api/cart', CartController)
app.use('/api/wishlist', WishlistController)
app.use('/api/reviews', ReviewController)

app.get('/', async (req, res) => {
	res.send(`
		<h1>Welcome to Dogemart</h1>
		<p>
		NODE_ENV: ${process.env.NODE_ENV}
		PORT: ${port}
		secure: ${process.env.NODE_ENV === 'production'},
		sameSite: ${process.env.NODE_ENV === 'production' ? 'none' : 'lax'},
		</p>
	`)
})

app.listen(port, () => {
	console.log(`DogeMart API 📀 listening at http://localhost:${port}`)
})
