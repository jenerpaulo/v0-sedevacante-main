import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cadastro de Missões — Sedevacante',
  description: 'Formulário para cadastro de missões e comunidades católicas tradicionais.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MissionFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
