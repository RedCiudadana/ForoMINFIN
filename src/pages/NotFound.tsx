import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, FileQuestion, Compass } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const NotFound = () => {
  const suggestions = [
    {
      title: 'Iniciativas de Ley',
      description: 'Explora las propuestas legislativas abiertas a consulta',
      link: '/',
      icon: FileQuestion,
      color: 'blue'
    },
    {
      title: 'Calendario',
      description: 'Conoce las fechas importantes del proceso',
      link: '/calendario',
      icon: Compass,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-white',
          icon: 'text-blue-600',
          hover: 'hover:bg-blue-50'
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: 'text-green-600',
          hover: 'hover:bg-green-50'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          icon: 'text-purple-600',
          hover: 'hover:bg-purple-50'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: 'text-gray-600',
          hover: 'hover:bg-gray-50'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <AnimatedSection>
          <div className="relative mb-8">
            <div className="text-8xl sm:text-9xl font-bold text-blue-100 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-6 shadow-lg border border-blue-200">
                <FileQuestion className="h-16 w-16 text-blue-600" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Main Content */}
        <AnimatedSection delay={200}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Página no encontrada
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Te ayudamos a encontrar lo que necesitas.
          </p>
        </AnimatedSection>

        {/* Quick Actions */}
        <AnimatedSection delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Home className="h-5 w-5 mr-2" />
              Ir al Inicio
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver Atrás
            </button>
          </div>
        </AnimatedSection>

        {/* Suggestions */}
        <AnimatedSection delay={600}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ¿Qué te gustaría hacer?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                const colors = getColorClasses(suggestion.color);
                
                return (
                  <AnimatedSection key={index} delay={700 + index * 100}>
                    <Link
                      to={suggestion.link}
                      className={`block p-6 bg-white rounded-xl border border-gray-200 shadow-sm ${colors.hover} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                    >
                      <div className={`${colors.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {suggestion.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {suggestion.description}
                      </p>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Help Section */}
        <AnimatedSection delay={1000}>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-gray-600 mb-6">
              Si estás buscando algo específico o tienes problemas para navegar, 
              nuestro equipo está aquí para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:participacion@congreso.gob.gt"
                className="inline-flex items-center px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Contactar Soporte
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Footer Note */}
        <AnimatedSection delay={1200}>
          <div className="mt-8 text-sm text-gray-500">
            <p>
              Si crees que esto es un error, por favor{' '}
              <a 
                href="mailto:participacion@congreso.gob.gt" 
                className="text-blue-600 hover:text-white underline"
              >
                repórtalo aquí
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default NotFound;