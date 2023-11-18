import z from 'zod'

const userSchema = z.object({
	name: z.string({
		invalid_type_error: 'Name must be a string',
		required_error: 'Name is required'
	}),
	surname: z.string({
		invalid_type_error: 'Surname must be a string',
		required_error: 'Surname is required'
	}),
	nick: z.string({
		invalid_type_error: 'Nick must be a string',
		required_error: 'Nick is required'
	}),
	email: z.string({
		invalid_type_error: 'Email must be a string',
		required_error: 'Email is required'
	}),
	password: z.string({
		invalid_type_error: 'Password must be a string',
		required_error: 'Password is required'
	})
})

export function validateUser(input) {
	return userSchema.safeParse(input)
}

export function validatePartialUser(input) {
	return userSchema.partial().safeParse(input)
}
