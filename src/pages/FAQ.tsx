import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cómo se usarán mis comentarios?',
      answer: 'Todos los comentarios ciudadanos serán revisados por el equipo técnico del MINFIN - Ministerio de Finanzas Públicas y los especialistas de cada área. Los aportes más relevantes y técnicamente viables serán incorporados en las versiones finales de las propuestas antes de su presentación formal.'
    },
    {
      question: '¿Qué es una ley de ciberseguridad?',
      answer: 'Una ley de ciberseguridad establece el marco normativo para proteger la infraestructura digital del país, definir responsabilidades en materia de seguridad informática, y crear mecanismos de respuesta ante amenazas cibernéticas. En Guatemala, esta ley busca fortalecer nuestras capacidades nacionales para enfrentar los desafíos de la era digital.'
    },
    {
      question: '¿Quién puede participar en este proceso?',
      answer: 'Cualquier ciudadano guatemalteco mayor de edad puede participar en este proceso de consulta. También invitamos a organizaciones civiles, empresas, académicos y expertos en las materias tratadas a contribuir con sus conocimientos y experiencia.'
    },
    {
      question: '¿Mis datos personales estarán protegidos?',
      answer: 'Sí, todos los datos personales que proporciones serán tratados conforme a las mejores prácticas de protección de datos. Solo tu nombre (si decides proporcionarlo) aparecerá junto a tus comentarios públicos. Tu información de contacto, si la proporcionas, será utilizada únicamente para enviarte actualizaciones sobre el proceso.'
    },
    {
      question: '¿Cuándo termina el período de comentarios?',
      answer: 'El período de comentarios ciudadanos estará abierto hasta el 30 de septiembre de 2024. Te recomendamos participar cuanto antes para asegurar que tu voz sea escuchada en este importante proceso legislativo.'
    },
    {
      question: '¿Puedo modificar o eliminar mis comentarios?',
      answer: 'Una vez publicado, no es posible modificar o eliminar comentarios para mantener la transparencia del proceso. Sin embargo, puedes agregar comentarios adicionales para aclarar o ampliar tus observaciones anteriores.'
    },
    {
      question: '¿Qué pasa si no tengo conocimientos técnicos?',
      answer: 'No necesitas ser un experto para participar. Hemos preparado material educativo y explicaciones en lenguaje sencillo para cada iniciativa. Tu perspectiva como ciudadano es valiosa, ya que estas leyes te afectarán directamente.'
    },
    {
      question: '¿Cómo sabré si mi comentario fue considerado?',
      answer: 'Al final del proceso, el MINFIN publicará un informe de sistematización que mostrará cómo los comentarios ciudadanos influyeron en las versiones finales de las propuestas. También enviaremos resúmenes por correo electrónico a quienes se hayan registrado.'
    },
    {
      question: '¿Puedo comentar en nombre de una organización?',
      answer: 'Sí, puedes identificarte como representante de una organización al hacer tu comentario. Esto nos ayuda a entender mejor el contexto y alcance de las observaciones presentadas.'
    },
    {
      question: '¿Hay límite de comentarios por persona?',
      answer: 'No hay límite en la cantidad de comentarios que puedes hacer. Te animamos a revisar cuidadosamente cada artículo y proporcionar observaciones constructivas y específicas.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Encuentra respuestas a las dudas más comunes sobre el proceso de participación ciudadana
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿No encontraste tu respuesta?
        </h2>
        <p className="text-gray-700 mb-6">
          Estamos aquí para ayudarte. Contáctanos directamente si tienes alguna pregunta específica.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:participacion@congreso.gob.gt"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enviar consulta por email
          </a>
          <a
            href="tel:+50224220000"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Llamar al +502 2422-0000
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;