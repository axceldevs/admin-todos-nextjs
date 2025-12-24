import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const metadata: Metadata = {
  title: "Home",
  description: "Redirect to dashboard",
};

export default function Home() {
  redirect('/dashboard');
}
