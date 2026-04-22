import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>
      <Header />
      <main>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple home page component.</p>
      </main>
      <Footer />
    </>
  );
}
