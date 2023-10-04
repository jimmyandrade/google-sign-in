import type { HtmlHTMLAttributes, ReactNode } from "react";

export const metadata = {
  description: "Um teste de login com o Google",
  title: "Entrar com o Google",
};

export interface RootLayoutProps extends HtmlHTMLAttributes<HTMLHtmlElement> {
  readonly children?: ReactNode;
}

export const RootLayout = ({ children, lang = "pt-br" }: RootLayoutProps) => {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
};
