import React, { useState } from 'react';
import { CheckCircle, Clock, Calendar, Users, FileText, Presentation } from 'lucide-react';

interface TimelinePhase {
  id: number;
  title: string;
  period: string;
  description: string;
  details: string[];
  status: 'completed' | 'current' | 'upcoming';
  icon: React.ComponentType<any>;
  color: string;
}

const InteractiveTimeline = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(2);

  const phases: TimelinePhase[] = [
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
      color: 'blue'
    },
    {
      id: 2,
      title: 'Fase de Propuestas y Participación',
      period: 'Enero - marzo 2025',
      description: 'Participación ciudadana y comentarios sobre los artículos',
      details: [
        'Apertura de plataforma de participación',
        'Comentarios ciudadanos artículo por artículo',
        'Webinars educativos sobre cada ley',
        'Mesas de trabajo con sectores específicos'
      ],
      status: 'current',
      icon: Users,
      color: 'blue'
    },
    {
      id: 3,
      title: 'Fase de Revisión y Sistematización',
      period: 'Octubre 2025',
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
      period: 'Noviembre 2025',
      description: 'Presentación formal al pleno del Congreso',
      details: [
        'Presentación de versiones finales',
        'Debate en comisiones especializadas',
        'Primera lectura en el pleno',
        'Proceso legislativo formal'
      ],
      status: 'upcoming',
      icon: Presentation,
      color: 'blue'
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-800',
          border: 'border-blue-500',
          icon: 'text-blue-800',
          dot: 'bg-blue-500'
        };
      case 'current':
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-800',
          border: 'border-blue-500',
          icon: 'text-blue-800',
          dot: 'bg-blue-500'
        };
      default:
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-800',
          border: 'border-blue-500',
          icon: 'text-blue-800',
          dot: 'bg-blue-500'
        };
    }
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-orange-500 to-gray-300 transform md:-translate-x-px"></div>
      
      <div className="space-y-12">
        {phases.map((phase, index) => {
          const styles = getStatusStyles(phase.status);
          const IconComponent = phase.icon;
          const isSelected = selectedPhase === phase.id;
          
          return (
            <div key={phase.id} className="relative flex items-center">
              {/* Timeline Dot */}
              <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform md:-translate-x-1/2 ${styles.dot} border-4 border-white shadow-lg z-10`}>
                {phase.status === 'completed' && (
                  <CheckCircle className="absolute inset-0 w-4 h-4 text-white" />
                )}
              </div>
              
              {/* Content Card */}
              <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-12' : 'md:ml-1/2 md:pl-12'} w-full md:w-auto`}>
                <div 
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? `${styles.border} shadow-lg transform scale-105` 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
                >
                  <div className="flex items-center mb-4">
                    <div className={`${styles.bg} p-3 rounded-lg mr-4`}>
                      <IconComponent className={`h-6 w-6 ${styles.icon}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-1 bg-blue-500 text-blue-800`}>
                        {phase.period}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{phase.description}</p>
                  
                  {/* Expandable Details */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    isSelected ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Actividades principales:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-sm text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Click Indicator */}
                  <div className="text-center mt-4">
                    <span className="text-xs text-gray-500">
                      {isSelected ? 'Click para contraer' : 'Click para expandir'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveTimeline;