import { handleUpload } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const result = await handleUpload({
      body: json,
      request: req,
      onBeforeGenerateToken: async (pathname: string) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB per photo
          tokenPayload: JSON.stringify({ pathname }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload completed:', blob.url)
      },
    })
    return NextResponse.json(result)
  } catch (err) {
    console.error('Blob upload error:', err)
    return NextResponse.json(
      { error: 'Erro no upload da foto' },
      { status: 500 }
    )
  }
}
