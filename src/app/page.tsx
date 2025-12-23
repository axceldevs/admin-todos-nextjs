import { redirect } from 'next/navigation';

const metadata = {
  title: "Home",
  description: "Redirect to dashboard",
};

export default function Home() {
  redirect('/dashboard');
}
