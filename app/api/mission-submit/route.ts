import { NextRequest, NextResponse } from 'next/server'

const NOCODB_TOKEN = process.env.NOCODB_TOKEN || ''
const NOCODB_URL = process.env.NOCODB_URL || 'https://app.nocodb.com'
const NOCODB_TABLE = process.env.NOCODB_TABLE || 'm13x2wdrf4x1lv0'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // Extract text fields
    const nome = formData.get('nome')?.toString() || ''
    const descricao = formData.get('descricao')?.toString() || ''
    const rito = formData.get('rito')?.toString() || ''
    const status = formData.get('status')?.toString() || ''
    const jurisdicao = formData.get('jurisdicao')?.toString() || ''
    const padre_responsavel = formData.get('padre_responsavel')?.toString() || ''
    const logradouro = formData.get('logradouro')?.toString() || ''
    const cidade = formData.get('cidade')?.toString() || ''
    const estado = formData.get('estado')?.toString() || ''
    const cep = formData.get('cep')?.toString() || ''
    const coordenadas = formData.get('coordenadas')?.toString() || ''
    const dias_missas = formData.get('dias_missas')?.toString() || ''
    const dias_confissao = formData.get('dias_confissao')?.toString() || ''
    const capacidade = formData.get('capacidade')?.toString() || ''
    const telefone = formData.get('telefone')?.toString() || ''
    const whatsapp = formData.get('whatsapp')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const telegram = formData.get('telegram')?.toString() || ''
    const site_redes = formData.get('site_redes')?.toString() || ''
    const observacoes = formData.get('observacoes')?.toString() || ''

    // Validate required
    if (!nome || !descricao) {
      return NextResponse.json(
        { error: 'Nome e descrição são obrigatórios' },
        { status: 400 }
      )
    }

    // Process photos — convert to base64
    const photos: string[] = []
    const photoFiles = formData.getAll('photos')
    for (const file of photoFiles) {
      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')
        const mimeType = file.type || 'image/jpeg'
        photos.push(`data:${mimeType};base64,${base64}`)
      }
    }

    // Build NocoDB payload
    const payload: Record<string, unknown> = {
      nome,
      descricao,
      rito: rito || null,
      status: status || null,
      jurisdicao: jurisdicao || null,
      padre_responsavel: padre_responsavel || null,
      logradouro: logradouro || null,
      cidade: cidade || null,
      estado: estado || null,
      cep: cep || null,
      coordenadas: coordenadas || null,
      dias_missas: dias_missas || null,
      dias_confissao: dias_confissao || null,
      capacidade: capacidade ? parseInt(capacidade, 10) : null,
      telefone: telefone || null,
      whatsapp: whatsapp || null,
      email: email || null,
      telegram: telegram || null,
      site_redes: site_redes || null,
      observacoes: observacoes || null,
      fotos_urls: photos.length > 0 ? JSON.stringify(photos) : null,
      data_envio: new Date().toISOString(),
    }

    // Save to NocoDB
    const nocodbRes = await fetch(
      `${NOCODB_URL}/api/v2/tables/${NOCODB_TABLE}/records`,
      {
        method: 'POST',
        headers: {
          'xc-token': NOCODB_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!nocodbRes.ok) {
      const errText = await nocodbRes.text()
      console.error('NocoDB error:', errText)
      return NextResponse.json(
        { error: 'Erro ao salvar os dados' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Missão cadastrada com sucesso!',
      photos_count: photos.length,
    })
  } catch (err) {
    console.error('Mission submit error:', err)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
