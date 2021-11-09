import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
	const { email, password } = req.body
})

router.post('/signup', async (req, res) => {})

export { router }
