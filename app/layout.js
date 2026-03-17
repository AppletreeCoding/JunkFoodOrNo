import './globals.css';

export const metadata = {
  title: 'Junk or No',
  description: 'Find out if a food item is junk food or not.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900">{children}</body>
    </html>
  );
}
