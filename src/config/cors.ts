import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
	origin: ['http://localhost:3000', 'https://dogemart.vercel.app'],
	optionsSuccessStatus: 200,
	credentials: true,
	exposedHeaders: ['set-cookie'],
}
