'use client';

import Image from 'next/image';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setAccordionOpen(accordionOpen === id ? null : id);
  };

  return (
    <div className="font-sans text-black">
      <Header />

      <main className="p-8">
        {/* Seção Home */}
        <section
          id="home"
          className="relative bg-cover bg-center text-center py-32 px-4 md:px-16"
          style={{
            backgroundImage: "url('/assets/poluentes.jpg')",
          }}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-lg sm:text-2xl md:text-4xl font-semibold text-white">
              "Em comparação ao motor a combustão, o de propulsão elétrica reduz em, aproximadamente, 30% a geração de CO₂"
            </h1>
          </div>
        </section>

        {/* Seção Quem Somos */}
        <section id="quem" className="py-8 px-4 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Quem somos?
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <p className="flex-1 text-justify">
              O Recarga Maps é uma equipe comprometida em promover a sustentabilidade e
              facilitar a vida dos motoristas de veículos elétricos. Nosso aplicativo
              nasceu para conectar pessoas às melhores soluções de abastecimento de
              energia, contribuindo para um futuro mais limpo e sustentável. Priorizamos
              parcerias com lojas de abastecimento de energia para oferecer um serviço
              acessível, eficiente e alinhado com os princípios de responsabilidade
              ambiental.
            </p>
            <Image
              src="/assets/energia_sustentavel.webp"
              alt="energia sustentável"
              width={400}
              height={300}
              className="w-full md:w-1/2 h-auto"
            />
          </div>
        </section>

        {/* Seção Recursos Principais */}
        <section id="recursos" className="py-8 px-4 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Recursos Principais
          </h2>
          <div className="accordion">
            {[
              {
                id: 'mapa',
                title: 'Mapa Interativo',
                content: (
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1">
                      <p className="text-base md:text-lg">
                        Localize estações de carregamento próximas com informações detalhadas sobre tipos de carregadores, preços e horários de funcionamento.
                      </p>
                    </div>
                    <div className="flex-1">
                      <Image
                        src="/assets/celular.png"
                        alt="Mapa interativo no celular"
                        width={130}
                        height={100}
                        className="w-full md:w-auto md:h-auto mx-auto"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: 'filtros',
                title: 'Filtros Personalizados',
                content: 'Pesquise estações por custo, distância ou tipo de carregador.',
              },
              {
                id: 'fidelidade',
                title: 'Programa de Fidelidade',
                content: 'Junte pontos e aproveite descontos e benefícios exclusivos.',
              },
              {
                id: 'avaliacoes',
                title: 'Avaliações e Sugestões',
                content: 'Avalie as estações de carregamento e contribua com sugestões para a comunidade.',
              },
            ].map((item) => (
              <div key={item.id}>
                <button
                  className={`accordion-button p-4 text-left w-full ${
                    accordionOpen === item.id ? 'bg-gray-400' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleAccordion(item.id)}
                >
                  {item.title}
                </button>
                {accordionOpen === item.id && (
                  <div className="accordion-content p-4 bg-gray-400 text-black">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Estações */}
        <div className="p-8 text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-4">
            Bem-vindo ao Sistema de Gerenciamento de Estações
          </h1>
          <p className="text-base md:text-lg mb-4">
            Utilize o sistema para gerenciar as estações de recarga de veículos elétricos.
          </p>
          <Link
            href="/api"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
          >
            Gerenciamento de Estações
          </Link>
        </div>

        {/* Seção Benefícios */}
        <section id="beneficios" className="py-8 px-4 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Benefícios</h2>
          <ul className="list-disc pl-6 space-y-4 text-base md:text-lg">
            <li>Praticidade e Confiabilidade: Encontre e abasteça seu veículo elétrico com rapidez e segurança.</li>
            <li>Economia e Recompensas: Aproveite promoções exclusivas e benefícios de parceiros.</li>
            <li>Sustentabilidade: Apoie o uso de energia renovável e reduza sua pegada de carbono.</li>
            <li>Comunidade de Motoristas: Conecte-se com outros usuários de veículos elétricos e compartilhe experiências.</li>
          </ul>
        </section>

        {/* Seção Baixe Nosso App */}
        <section id="app" className="py-8 px-4 md:px-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Baixe Nosso App</h2>
          <div className="flex justify-center gap-6">
            <Image
              src="/assets/logo google.jpg"
              alt="Google Play"
              width={110}
              height={50}
              className="w-auto h-auto"
            />
            <Image
              src="/assets/logo apple.jpg"
              alt="App Store"
              width={110}
              height={50}
              className="w-auto h-auto"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
