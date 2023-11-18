import z from 'zod'

const publicationSchema = z.object({
	text: z.string({
		invalid_type_error: 'Text must be a string',
		required_error: 'Text is required'
	})
})

export function validatePublication(input) {
	return publicationSchema.safeParse(input)
}

export function validatePartialPublication(input) {
	return publicationSchema.partial().safeParse(input)
}
