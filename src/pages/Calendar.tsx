import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, FileText, Presentation } from 'lucide-react';

const Calendar = () => {
  const phases = [
    {
      id: 1,
      title: 'Fase de Diagnóstico',
      period: 'Julio 2024',
      description: 'Análisis de necesidades y consulta inicial con expertos',
      details: [
        'Revisión de marco normativo internacional',
        'Consulta con expertos técnicos',
        'Análisis de brechas legislativas',
        'Identificación de actores clave'
      ],
      status: 'completed',
      icon: FileText,
      color: 'green'
    },
    {
      id: 2,
      title: 'Fase de Propuestas y Participación',
      period: 'Agosto - Septiembre 2024',
      description: 'Participación ciudadana y comentarios sobre los artículos',
      details: [
        'Apertura de plataforma de participación',
        'Comentarios ciudadanos artículo por artículo',
        'Webinars educativos sobre cada ley',
        'Mesas de trabajo con sectores específicos'
      ],
      status: 'current',
      icon: Users,
      color: 'orange'
    },
    {
      id: 3,
      title: 'Fase de Revisión y Sistematización',
      period: 'Octubre 2024',
      description: 'Análisis de comentarios e incorporación de observaciones',
      details: [
        'Sistematización de comentarios ciudadanos',
        'Revisión técnica-jurídica',
        'Incorporación de observaciones viables',
        'Validación con expertos'
      ],
      status: 'upcoming',
      icon: Clock,
      color: 'blue'
    },
    {
      id: 4,
      title: 'Fase de Presentación',
      period: 'Noviembre 2024',
      description: 'Presentación formal al pleno del Congreso',
      details: [
        'Presentación de versiones finales',
        'Debate en comisiones especializadas',
        'Primera lectura en el pleno',
        'Proceso legislativo formal'
      ],
      status: 'upcoming',
      icon: Presentation,
      color: 'purple'
    }
  ];

  const events = [
    {
      date: '15 Agosto 2024',
      title: 'Webinar: Introducción a la Ciberseguridad',
      time: '19:00 - 20:30',
      type: 'virtual',
      description: 'Sesión educativa sobre conceptos básicos de ciberseguridad'
    },
    {
      date: '22 Agosto 2024',
      title: 'Mesa de Trabajo: Protección de Datos',
      time: '14:00 - 16:00',
      type: 'presencial',
      description: 'Discusión específica con expertos en privacidad'
    },
    {
      date: '29 Agosto 2024',
      title: 'Foro Abierto: Infraestructuras Críticas',
      time: '18:00 - 19:30',
      type: 'híbrido',
      description: 'Diálogo abierto sobre la protección de infraestructuras'
    },
    {
      date: '5 Septiembre 2024',
      title: 'Sesión de Consulta Empresarial',
      time: '10:00 - 12:00',
      type: 'presencial',
      description: 'Consulta específica con el sector empresarial'
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-600'
        };
      case 'current':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-200',
          icon: 'text-orange-600'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200',
          icon: 'text-gray-400'
        };
    }
  };

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case 'virtual':
        return 'bg-blue-100 text-white';
      case 'presencial':
        return 'bg-green-100 text-green-800';
      case 'híbrido':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Calendario del Proceso Participativo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Conoce las fases del proceso legislativo y los eventos donde puedes participar
        </p>
      </div>

      {/* Phases Timeline */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Fases del Proceso</h2>
        
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-px"></div>
          
          <div className="space-y-12">
            {phases.map((phase, index) => {
              const styles = getStatusStyles(phase.status);
              const IconComponent = phase.icon;
              
              return (
                <div key={phase.id} className="relative flex items-center">
                  <div className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full transform md:-translate-x-1/2 ${styles.bg} ${styles.border} border-2 flex items-center justify-center`}>
                    <IconComponent className={`h-4 w-4 ${styles.icon}`} />
                  </div>
                  
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-12' : 'md:ml-1/2 md:pl-12'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                        <span className={`ml-3 px-3 py-1 text-sm font-medium rounded-full ${styles.bg} ${styles.text}`}>
                          {phase.period}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{phase.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900">Actividades principales:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {phase.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      {/* <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Próximos Eventos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-600">{event.date}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeStyles(event.type)}`}>
                  {event.type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-3">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.time}</span>
              </div>
              
              <p className="text-gray-700 text-sm">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ¿Quieres recibir recordatorios?
          </h3>
          <p className="text-gray-700 mb-4">
            Regístrate para recibir notificaciones sobre eventos y fechas importantes
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Suscribirse a actualizaciones
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Calendar;