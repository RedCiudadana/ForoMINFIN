import React, { useState } from 'react';
import { Send, User, Mail, Loader2 } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (data: {
    author_name: string;
    author_email?: string;
    content: string;
    is_expert?: boolean;
    tags?: string[];
    sector: string;
  }) => Promise<void>;
  isGeneral?: boolean;
  loading?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit,
  isGeneral = false,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: '',
    tags: '',
    is_expert: false,
    sector: '',
    sector_other: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim() || !formData.author_name.trim()) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await onSubmit({
        author_name: formData.author_name,
        author_email: formData.author_email || undefined,
        content: formData.content,
        is_expert: formData.is_expert,
        tags: tags.length > 0 ? tags : undefined,
        sector: formData.sector === 'otros' ? (formData.sector_other || 'Otros') : formData.sector
      });

      // Reset form but keep email for convenience
      setFormData(prev => ({
        author_name: '',
        author_email: prev.author_email,
        content: '',
        tags: '',
        is_expert: false,
        sector: '',
        sector_other: ''
      }));
      setShowAdvanced(false);
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.content.trim() && 
                     formData.author_name.trim() && 
                     (formData.sector.trim() && (formData.sector !== 'otros' || formData.sector_other.trim())) && 
                     formData.content.length >= 10 && 
                     !isSubmitting && 
                     !loading;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 rounded-full p-2 mr-3">
          <Send className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {isGeneral ? 'Comentario General' : 'Comentar Artículo'}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
              <User className="h-4 w-4 inline mr-1" />
              Nombre completo *
            </label>
            <input
              type="text"
              id="author_name"
              value={formData.author_name}
              onChange={(e) => handleInputChange('author_name', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu nombre completo"
              required
              disabled={isSubmitting || loading}
            />
          </div>

          <div>
            <label htmlFor="author_email" className="block text-sm font-medium text-gray-700 mb-1">
              <Mail className="h-4 w-4 inline mr-1" />
              Correo electrónico (opcional)
            </label>
            <input
              type="email"
              id="author_email"
              value={formData.author_email}
              onChange={(e) => handleInputChange('author_email', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="tu@email.com"
              disabled={isSubmitting || loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Para recibir actualizaciones sobre tu comentario
            </p>
          </div>
        </div>

        {/* Comment Content */}
        {/* Sector Selection */}
        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
            Sector *
          </label>
          <select
            id="sector"
            value={formData.sector}
            onChange={(e) => handleInputChange('sector', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isSubmitting || loading}
          >
            <option value="">Selecciona tu sector</option>
            <option value="sector-privado">Sector Privado</option>
            <option value="sector-publico">Sector Público</option>
            <option value="sociedad-civil">Sociedad Civil</option>
            <option value="organismos-internacionales">Organismos Internacionales</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        {formData.sector === 'otros' && (
          <div>
            <label htmlFor="sector_other" className="block text-sm font-medium text-gray-700 mb-1">
              Especifica *
            </label>
            <input
              type="text"
              id="sector_other"
              value={formData.sector_other}
              onChange={(e) => handleInputChange('sector_other', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Especifica tu sector"
              required
              disabled={isSubmitting || loading}
            />
          </div>
        )}

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Tu comentario *
          </label>
          <textarea
            id="content"
            rows={5}
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={
              isGeneral
                ? 'Comparte tu opinión general sobre esta iniciativa de ley...'
                : 'Comparte tu opinión sobre este artículo específico...'
            }
            required
            disabled={isSubmitting || loading}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">
              Mínimo 10 caracteres. Sé constructivo y específico.
            </p>
            <span className={`text-xs ${
              formData.content.length < 10 ? 'text-red-500' : 'text-green-600'
            }`}>
              {formData.content.length} caracteres
            </span>
          </div>
        </div>

        {/* Advanced Options */}
        {/* <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-white font-medium"
            disabled={isSubmitting || loading}
          >
            {showAdvanced ? 'Ocultar opciones avanzadas' : 'Mostrar opciones avanzadas'}
          </button>
        </div> */}

        {/* {showAdvanced && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            Tags
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                <Tag className="h-4 w-4 inline mr-1" />
                Etiquetas (opcional)
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="definiciones, sectores-prioritarios, implementacion"
                disabled={isSubmitting || loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Separa las etiquetas con comas. Ayudan a categorizar tu comentario.
              </p>
            </div>

            Expert Checkbox
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_expert"
                checked={formData.is_expert}
                onChange={(e) => handleInputChange('is_expert', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isSubmitting || loading}
              />
              <label htmlFor="is_expert" className="ml-2 text-sm text-gray-700">
                Soy experto en esta materia (académico, profesional del sector, etc.)
              </label>
            </div>
          </div>
        )} */}



        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-xs text-gray-500">
            <p>Tu comentario será público y contribuirá al análisis legislativo.</p>
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar Comentario
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;