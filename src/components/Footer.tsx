import React from 'react';
import { Mail, Phone, ExternalLink, Facebook, Twitter, Youtube } from 'lucide-react';
import Redes1 from '../assets/footer/REDES-01.png';
import Redes2 from '../assets/footer/REDES-02.png';
import Redes3 from '../assets/footer/REDES-03.png';
import Redes4 from '../assets/footer/REDES-04.png';
import Linea from '../assets/footer/LINEA.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Logo */}
            <div>
              <img src="https://www.minfin.gob.gt/images/img_portal/MINFIN-2024-2028_AZUL_01.png" alt="MINFIN Logo" className="h-16 w-auto"/>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-white" />
                  <span className="text-sm">participacion@minfin.gob.gt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-white" />
                  <span className="text-sm">+502 2248-0000</span>
                </div>
              </div>
            </div>

            {/* Enlaces Útiles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Útiles</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-white hover:text-white transition-colors flex items-center space-x-1">
                    <span>Portal del Congreso</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white hover:text-white transition-colors flex items-center space-x-1">
                    <span>Transparencia</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white hover:text-white transition-colors">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            {/* Redes Sociales */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/Redciudadanagt" target='_blank' className="text-white hover:text-blue-400 transition-colors">
                  <img src={Redes1} className="h-10 w-10" />
                </a>
                <a href="https://twitter.com/redxguate" target='_blank' className="text-white hover:text-blue-400 transition-colors">
                  <img src={Redes2} className="h-10 w-10" />
                </a>
                <a href="https://www.instagram.com/redxguate/" target='_blank' className="text-white hover:text-red-400 transition-colors">
                  <img src={Redes3} className="h-10 w-10" />
                </a>
                <a href="https://www.youtube.com/channel/UCQwc62j7beStZYFzwPxBEQg" target='_blank' className="text-white hover:text-red-400 transition-colors">
                  <img src={Redes4} className="h-10 w-10" />
                </a>
              </div>
            </div>
          </div>

            <div className="w-full my-8">
            <img src={Linea} alt="Separador" className="h-5 w-full" />
            </div>

          <div className="mt-4 pt-4 text-center">
            <p className="text-sm text-white">
              2025 MINFIN - Ministerio de Finanzas Públicas de Guatemala.
            </p>
            <p className="text-xs text-white mt-2">
              Foro de Participación Ciudadana - MINFIN
            </p>
          </div>
        </div>
      </footer>
      <div>
        <div className="bg-white text-center py-2">
          <p className="text-lg my-6">
            Asociación Civil Red Ciudadana 2025
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;