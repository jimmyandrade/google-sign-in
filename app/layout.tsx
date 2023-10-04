import type { HtmlHTMLAttributes, ReactNode } from "react";

export const metadata = {
  title: 'Entrar com o Google',
  description: 'Um teste de login com o Google',
}

export interface RootLayoutProps extends HtmlHTMLAttributes<HTMLHtmlElement> {
  children: ReactNode
}

export default function RootLayout({
  children,
  lang = "pt-br"
}: RootLayoutProps) {

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
