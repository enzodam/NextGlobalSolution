'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function Integrantes() {
  const router = useRouter();

  const integrantes = [
    {
      rm: '558295',
      nome: 'Ricardo Rodrigues Cotovasso',
      turma: '1TDSR',
      linkedin: 'https://www.linkedin.com/in/ricardo-rodrigues-40a130137/',
      github: 'https://github.com/R1cle',
      foto: '/assets/ricardo.jpeg',
    },
    {
      rm: '550597',
      nome: 'Bruno Perdigão Buarque Pinho',
      turma: '1TDSA',
      linkedin: 'https://www.linkedin.com/in/b-buarque/',
      github: 'https://github.com/BrunoBuarque',
      foto: '/assets/bruno.jpg',
    },
    {
      rm: '558438',
      nome: 'Enzo Dias Alfaia Mendes',
      turma: '1TDSR',
      linkedin: 'https://www.linkedin.com/in/enzo-dias-159573266/',
      github: 'https://github.com/enzodam',
      foto: '/assets/enzo dias.jpeg',
    },
  ];

  return (
    <div className="font-sans text-white bg-gray-300 min-h-screen">
      <header className="bg-black text-white p-4 text-center">
        <h1 className="text-3xl">Recarga Maps</h1>
        <p className="mt-2">REPOSITÓRIO</p>
        <a
          href="https://github.com/enzodam/NextGlobalSolution/"
          target="_blank"
          className="text-blue-500 underline"
        >
          https://github.com/enzodam/NextGlobalSolution/
        </a>
        <p className="mt-2"> Vídeo: </p>
        <a
          href="https://www.youtube.com/watch?v=Pta7TMe1kJ4"
          target="_blank"
          className="text-blue-500 underline"
        >
          https://www.youtube.com/watch?v=Pta7TMe1kJ4
        </a>
        <p className="mt-2">URL vercel:</p>
        <a
          href="https://next-global-solution-i3sq.vercel.app/"
          target="_blank"
          className="text-blue-500 underline"
        >
          https://next-global-solution-i3sq.vercel.app/
        </a>
      </header>

      <main className="p-8 flex flex-col items-center">
        {integrantes.map((integrante, index) => (
          <section
            key={index}
            className="cartao bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col items-center md:flex-row md:justify-between w-full max-w-2xl"
          >
            <Image
              src={integrante.foto}
              alt={integrante.nome}
              width={100}
              height={100}
              className="foto w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-4"
            />
            <div className="detalhes text-black text-center md:text-left">
              <p className="font-bold">RM: {integrante.rm}</p>
              <p className="font-semibold">Aluno: {integrante.nome}</p>
              <p className="italic">Turma: {integrante.turma}</p>
              <p>
                linkedin:{' '}
                <a
                  href={integrante.linkedin}
                  target="_blank"
                  className="text-blue-900 hover:underline"
                >
                  {integrante.linkedin}
                </a>
              </p>
              <p>
                github:{' '}
                <a
                  href={integrante.github}
                  target="_blank"
                  className="text-blue-900 hover:underline"
                >
                  {integrante.github}
                </a>
              </p>
            </div>
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="logo w-20 h-20 mt-4 md:mt-0"
            />
          </section>
        ))}

        <button
          id="voltarButton"
          onClick={() => router.push('/')}
          className="block bg-black text-white py-2 px-4 rounded mx-auto mt-8 mb-8 hover:bg-gray-950"
        >
          Voltar
        </button>
      </main>

      <Footer />
    </div>
  );
}
