
import "./globals.css";


export const metadata = {
  title: "Quant",
  description: "Generated by create next app",
};

import Providers from "./providers";
import LayoutComponent from "./LayoutComponent";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  >
        <Providers>
          <LayoutComponent>{children}</LayoutComponent>
        </Providers>
      </body>
    </html>
  );
}
