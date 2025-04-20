import "./globals.css";

export const metadata = {
  title: "KeroKero - Software Factory",
  description: "Software Factory from Chile to the world 🇨🇱",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
       
          {children}
      </body>
    </html>
  );
}
