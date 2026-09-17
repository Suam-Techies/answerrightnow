import "./globals.css";
import Chatbot from "./components/Chatbot";

export const metadata = {
  title: "Answer Right Now",
  description: "Live chat access to professionals for practical guidance",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
