import { createReadStream, ReadStream } from 'fs'
import { NextResponse } from 'next/server'
import { join } from 'path'

// O caminho para o arquivo PDF
const filePath = join(
  process.cwd(),
  'src',
  'assets',
  'cristian-giehl-resume.pdf',
)

export async function GET() {
  try {
    const fileStream: ReadStream = createReadStream(filePath)

    // Cria um ReadableStream a partir do ReadStream
    const readableStream = new ReadableStream({
      start(controller) {
        fileStream.on('data', (chunk) => controller.enqueue(chunk))
        fileStream.on('end', () => controller.close())
        fileStream.on('error', (err) => controller.error(err))
      },
    })

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="cristian-giehl-resume.pdf"',
      },
    })
  } catch (error) {
    console.error('Erro ao tentar ler o arquivo:', error)
    return new NextResponse('Failed to download CV', { status: 500 })
  }
}
