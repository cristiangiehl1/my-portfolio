import { z } from 'zod'

// Definindo o schema para as variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  RESEND_API_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Failed to parse environment variables')
}

export const env = parsedEnv.data
