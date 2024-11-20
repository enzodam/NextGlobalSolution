'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, target: string) => {
    event.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // Fecha o menu em dispositivos móveis após o clique
  };

  return (
    <header className="flex items-center p-2 relative z-10 gap-8">
      <Image src="/assets/logo.png" alt="Logo EcoPlastic" width={100} height={50} />
      <h1 className="text-3xl">Recarga Maps</h1>
      <button
        className="menu text-2xl text-black bg-none border-none cursor-pointer md:hidden"
        aria-label="Abrir Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
      <nav
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row gap-4 absolute md:static top-full left-0 right-0 bg-white p-4 md:p-0`}
      >
        <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-blue-700">
          HOME
        </a>
        <a href="#quem" onClick={(e) => handleScroll(e, '#quem')} className="hover:text-blue-700">
          Quem somos?
        </a>
        <a
          href="#recursos"
          onClick={(e) => handleScroll(e, '#recursos')}
          className="hover:text-blue-700"
        >
          Recursos Principais
        </a>
        <a
          href="#estações"
          onClick={(e) => handleScroll(e, '#estações')}
          className="hover:text-blue-700"
        >
          Estações de Recarga
        </a>
        <a
          href="#beneficios"
          onClick={(e) => handleScroll(e, '#beneficios')}
          className="hover:text-blue-700"
        >
          Benefícios
        </a>
        <a href="#app" onClick={(e) => handleScroll(e, '#app')} className="hover:text-blue-700">
          Baixe Nosso App
        </a>
        <Link href="/integrantes" className="hover:text-blue-700">
          Integrantes
        </Link>
      </nav>
    </header>
  );
}
