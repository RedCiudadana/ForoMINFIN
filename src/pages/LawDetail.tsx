import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, MessageSquare, Filter, Eye, EyeOff, ChevronDown, ChevronRight, BookOpen, Users, Shield, Gavel, Award, Lightbulb, FileText, Clock } from 'lucide-react';
import { getLawById } from '../data/laws';
import { useComments } from '../hooks/useComments';
import CommentSection from '../components/CommentSection';
import CommentForm from '../components/CommentForm';
import CommentStats from '../components/CommentStats';
import ReactMarkdown from 'react-markdown';

const LawDetail = () => {
  const { lawId } = useParams<{ lawId: string }>();
  const law = lawId ? getLawById(lawId) : null;
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'articles' | 'general'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  // Hooks for different comment sections
  const { addComment: addGeneralComment, loading: generalLoading } = useComments(lawId!, undefined, true);
  const { addComment: addArticleComment, loading: articleLoading } = useComments(lawId!, selectedArticle || undefined);

  if (!law) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ley no encontrada</h1>
            <p className="text-gray-600 mb-6">La iniciativa de ley que buscas no está disponible.</p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCommentSubmitted = () => {
    setShowCommentForm(false);
    setSelectedArticle(null);
  };

  const handleGeneralCommentSubmit = async (data: any) => {
    await addGeneralComment(data);
    handleCommentSubmitted();
  };

  const handleArticleCommentSubmit = async (data: any) => {
    await addArticleComment(data);
    handleCommentSubmitted();
  };

  // Group articles by chapter with enhanced metadata
  const getChapters = () => {
    if (!law) return [];
    
    const chapters = [
      {
        id: 'cap-1',
        title: 'Transparencia y Acceso a la Información',
        subtitle: 'Portal único y datos abiertos',
        description: 'Establece un sistema electrónico unificado y mecanismos de transparencia ciudadana',
        articles: law.articles.slice(0, 3),
        icon: Eye,
        color: 'blue',
        gradient: 'from-blue-500 to-blue-600'
      },
      {
        id: 'cap-2',
        title: 'Modernización de Procesos',
        subtitle: 'Digitalización y eficiencia',
        description: 'Implementa herramientas digitales para agilizar las contrataciones públicas',
        articles: law.articles.slice(3, 6),
        icon: Lightbulb,
        color: 'emerald',
        gradient: 'from-emerald-500 to-emerald-600'
      },
      {
        id: 'cap-3',
        title: 'Fortalecimiento de la Competencia',
        subtitle: 'Participación e inclusión',
        description: 'Garantiza la participación de MIPYMES y fortalece la competencia justa',
        articles: law.articles.slice(6, 9),
        icon: Users,
        color: 'purple',
        gradient: 'from-purple-500 to-purple-600'
      },
      {
        id: 'cap-4',
        title: 'Profesionalización y Control',
        subtitle: 'Capacitación y supervisión',
        description: 'Establece requisitos de formación y mecanismos de control preventivo',
        articles: law.articles.slice(9, 12),
        icon: Award,
        color: 'orange',
        gradient: 'from-orange-500 to-orange-600'
      },
      {
        id: 'cap-5',
        title: 'Sanciones y Responsabilidad',
        subtitle: 'Control y penalizaciones',
        description: 'Define un régimen robusto de sanciones y responsabilidades',
        articles: law.articles.slice(12, 15),
        icon: Gavel,
        color: 'red',
        gradient: 'from-red-500 to-red-600'
      },
      {
        id: 'cap-6',
        title: 'Innovación y Buenas Prácticas',
        subtitle: 'Sostenibilidad y mejora continua',
        description: 'Promueve la innovación y criterios de sostenibilidad en las compras',
        articles: law.articles.slice(15, 18),
        icon: Shield,
        color: 'teal',
        gradient: 'from-teal-500 to-teal-600'
      }
    ];
    
    return chapters;
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const selectChapter = (chapterId: string) => {
    setSelectedChapter(selectedChapter === chapterId ? null : chapterId);
    setSelectedArticle(null);
    setShowCommentForm(false);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-900',
        accent: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        ring: 'ring-blue-500',
        gradient: 'from-blue-500 to-blue-600'
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-900',
        accent: 'text-emerald-600',
        button: 'bg-emerald-600 hover:bg-emerald-700',
        ring: 'ring-emerald-500',
        gradient: 'from-emerald-500 to-emerald-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-900',
        accent: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        ring: 'ring-purple-500',
        gradient: 'from-purple-500 to-purple-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-900',
        accent: 'text-orange-600',
        button: 'bg-orange-600 hover:bg-orange-700',
        ring: 'ring-orange-500',
        gradient: 'from-orange-500 to-orange-600'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-900',
        accent: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700',
        ring: 'ring-red-500',
        gradient: 'from-red-500 to-red-600'
      },
      teal: {
        bg: 'bg-teal-50',
        border: 'border-teal-200',
        text: 'text-teal-900',
        accent: 'text-teal-600',
        button: 'bg-teal-600 hover:bg-teal-700',
        ring: 'ring-teal-500',
        gradient: 'from-teal-500 to-teal-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-all duration-200 group"
          >
            <div className="bg-blue-100 rounded-full p-2 mr-3 group-hover:bg-blue-200 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="font-medium">Volver al inicio</span>
          </Link>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Iniciativa de Ley</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{law.title}</h1>
                  <p className="text-xl text-blue-100 leading-relaxed max-w-4xl">{law.fullDescription}</p>
                </div>
                <div className="hidden lg:block ml-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">18</div>
                        <div className="text-sm text-blue-200">Artículos</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">6</div>
                        <div className="text-sm text-blue-200">Capítulos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-white">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href={law.pdfUrl}
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Descargar PDF completo
                </a>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Proceso abierto hasta septiembre 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <CommentStats lawId={lawId!} />
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => {
                    setActiveTab('articles');
                    setSelectedChapter(null);
                    setSelectedArticle(null);
                    setShowCommentForm(false);
                  }}
                  className={`py-4 px-2 border-b-3 font-semibold text-sm transition-all duration-200 ${
                    activeTab === 'articles'
                      ? 'border-blue-500 text-blue-600 bg-blue-50 rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Artículos por Capítulos ({law.articles.length})</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('general');
                    setSelectedChapter(null);
                    setSelectedArticle(null);
                    setShowCommentForm(false);
                  }}
                  className={`py-4 px-2 border-b-3 font-semibold text-sm transition-all duration-200 ${
                    activeTab === 'general'
                      ? 'border-blue-500 text-blue-600 bg-blue-50 rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comentarios Generales</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'articles' ? (
              <div className="space-y-8">
                {/* Enhanced Chapter Navigation */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Navegación por Capítulos Temáticos
                    </h2>
                    <p className="text-gray-600">
                      Explora los 6 capítulos que estructuran la reforma integral
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getChapters().map((chapter) => {
                      const IconComponent = chapter.icon;
                      const colors = getColorClasses(chapter.color);
                      const isSelected = selectedChapter === chapter.id;
                      
                      return (
                        <button
                          key={chapter.id}
                          onClick={() => selectChapter(chapter.id)}
                          className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                            isSelected
                              ? `${colors.border} ${colors.bg} shadow-lg ring-2 ${colors.ring} ring-opacity-50`
                              : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 shadow-md'
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${chapter.gradient} shadow-lg`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-bold text-lg mb-2 ${isSelected ? colors.text : 'text-gray-900'}`}>
                                {chapter.title}
                              </h3>
                              <p className={`text-sm mb-3 ${isSelected ? colors.accent : 'text-gray-600'}`}>
                                {chapter.subtitle}
                              </p>
                              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                {chapter.description}
                              </p>
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                isSelected ? `${colors.bg} ${colors.text}` : 'bg-gray-100 text-gray-600'
                              }`}>
                                {chapter.articles.length} artículos
                              </div>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="absolute -top-2 -right-2">
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${chapter.gradient} flex items-center justify-center shadow-lg`}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Enhanced Comment Form Toggle */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                      showCommentForm 
                        ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                    }`}
                  >
                    {showCommentForm ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
                    {showCommentForm ? 'Ocultar formulario' : 'Comentar ley completa'}
                  </button>
                </div>

                {/* Enhanced Comment Form */}
                {showCommentForm && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Comentario General sobre la Reforma</h3>
                      <p className="text-gray-600 mt-1">Comparte tu opinión sobre la iniciativa completa</p>
                    </div>
                    <div className="p-6">
                      <CommentForm
                        onSubmit={handleGeneralCommentSubmit}
                        isGeneral={true}
                        loading={generalLoading}
                      />
                    </div>
                  </div>
                )}

                {/* Enhanced Articles Display */}
                <div className="space-y-8">
                  {selectedChapter ? (
                    // Show selected chapter
                    getChapters()
                      .filter(chapter => chapter.id === selectedChapter)
                      .map((chapter) => {
                        const colors = getColorClasses(chapter.color);
                        const IconComponent = chapter.icon;
                        
                        return (
                          <div key={chapter.id} className="space-y-6">
                            <div className={`${colors.bg} rounded-2xl p-8 border-2 ${colors.border} shadow-lg`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`p-4 rounded-xl bg-gradient-to-br ${chapter.gradient} shadow-lg`}>
                                    <IconComponent className="h-8 w-8 text-white" />
                                  </div>
                                  <div>
                                    <h2 className={`text-2xl font-bold ${colors.text} mb-2`}>
                                      Capítulo {chapter.id.split('-')[1].toUpperCase()}: {chapter.title}
                                    </h2>
                                    <p className={`${colors.accent} font-medium`}>{chapter.subtitle}</p>
                                    <p className="text-gray-600 mt-2">{chapter.description}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setSelectedChapter(null)}
                                  className={`${colors.button} text-white px-4 py-2 rounded-lg font-medium transition-colors`}
                                >
                                  Ver todos los capítulos
                                </button>
                              </div>
                            </div>
                            
                            {chapter.articles.map((article) => {
                              const isSelected = selectedArticle === article.id;
                              
                              return (
                                <div
                                  key={article.id}
                                  className={`bg-white rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                                    isSelected ? `${colors.border} ring-2 ${colors.ring} ring-opacity-50` : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                      <div className="flex-1">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${colors.bg} ${colors.text}`}>
                                          {article.number}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                          {article.title}
                                        </h3>
                                      </div>
                                    </div>
                                    
                                    <div className="prose prose-gray max-w-none mb-6">
                                      <ReactMarkdown className="text-gray-700 leading-relaxed">
                                        {article.content}
                                      </ReactMarkdown>
                                    </div>
                                    
                                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                                      <button
                                        onClick={() => setSelectedArticle(isSelected ? null : article.id)}
                                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                          isSelected 
                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                            : `${colors.button} text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5`
                                        }`}
                                      >
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        {isSelected ? 'Cerrar comentarios' : 'Ver comentarios'}
                                      </button>
                                      
                                      <button
                                        onClick={() => {
                                          setSelectedArticle(article.id);
                                          setTimeout(() => {
                                            const element = document.getElementById('comment-form');
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                          }, 100);
                                        }}
                                        className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                      >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Comentar artículo
                                      </button>
                                    </div>
                                    
                                    {/* Comments for this article */}
                                    {isSelected && (
                                      <div className="mt-8 border-t border-gray-200 pt-8">
                                        <CommentSection
                                          lawId={lawId!}
                                          articleId={article.id}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })
                  ) : (
                    // Show all chapters collapsed
                    getChapters().map((chapter) => {
                      const isExpanded = expandedChapters.has(chapter.id);
                      const colors = getColorClasses(chapter.color);
                      const IconComponent = chapter.icon;
                      
                      return (
                        <div key={chapter.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                          <button
                            onClick={() => toggleChapter(chapter.id)}
                            className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-200"
                          >
                            <div className="flex items-center space-x-6">
                              <div className={`p-4 rounded-xl bg-gradient-to-br ${chapter.gradient} shadow-lg`}>
                                <IconComponent className="h-8 w-8 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  Capítulo {chapter.id.split('-')[1].toUpperCase()}: {chapter.title}
                                </h3>
                                <p className="text-gray-600 mb-1">{chapter.subtitle}</p>
                                <p className="text-sm text-gray-500">{chapter.articles.length} artículos</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
                                {isExpanded ? 'Contraer' : 'Expandir'}
                              </div>
                              {isExpanded ? (
                                <ChevronDown className="h-6 w-6 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-6 w-6 text-gray-400" />
                              )}
                            </div>
                          </button>
                          
                          {isExpanded && (
                            <div className="border-t border-gray-200 bg-gray-50">
                              <div className="p-8 space-y-6">
                                {chapter.articles.map((article) => {
                                  const isSelected = selectedArticle === article.id;
                                  
                                  return (
                                    <div
                                      key={article.id}
                                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                                        isSelected ? `${colors.border} ${colors.bg} shadow-md` : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                      }`}
                                    >
                                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                                        isSelected ? `bg-white ${colors.text}` : `${colors.bg} ${colors.text}`
                                      }`}>
                                        {article.number}
                                      </div>
                                      <h4 className="font-bold text-gray-900 mb-3 text-lg">
                                        {article.title}
                                      </h4>
                                      <div className="prose prose-sm prose-gray max-w-none mb-4">
                                        <ReactMarkdown className="text-gray-700 leading-relaxed">
                                          {article.content}
                                        </ReactMarkdown>
                                      </div>
                                      
                                      <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                                        <button
                                          onClick={() => setSelectedArticle(isSelected ? null : article.id)}
                                          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                            isSelected 
                                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                                              : `${colors.button} text-white shadow-md hover:shadow-lg`
                                          }`}
                                        >
                                          <MessageSquare className="h-4 w-4 mr-2" />
                                          {isSelected ? 'Cerrar comentarios' : 'Ver comentarios'}
                                        </button>
                                        
                                        <button
                                          onClick={() => {
                                            setSelectedArticle(article.id);
                                            setTimeout(() => {
                                              const element = document.getElementById('comment-form');
                                              element?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                          }}
                                          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                          <Eye className="h-4 w-4 mr-2" />
                                          Comentar
                                        </button>
                                      </div>
                                      
                                      {/* Comments for this article */}
                                      {isSelected && (
                                        <div className="mt-6 border-t border-gray-200 pt-6">
                                          <CommentSection
                                            lawId={lawId!}
                                            articleId={article.id}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Comentarios Generales sobre la Reforma
                      </h2>
                      <p className="text-gray-600">
                        Comparte tu opinión sobre la iniciativa completa de reforma
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCommentForm(!showCommentForm)}
                      className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                        showCommentForm 
                          ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      }`}
                    >
                      {showCommentForm ? <EyeOff className="h-5 w-5 mr-2" /> : <Eye className="h-5 w-5 mr-2" />}
                      {showCommentForm ? 'Ocultar formulario' : 'Agregar comentario'}
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {showCommentForm && (
                    <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <CommentForm
                        onSubmit={handleGeneralCommentSubmit}
                        isGeneral={true}
                        loading={generalLoading}
                      />
                    </div>
                  )}
                  
                  <CommentSection
                    lawId={lawId!}
                    isGeneral={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Article Comment Form */}
              {selectedArticle && activeTab === 'articles' && (
                <div id="comment-form" className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border-b border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Comentar Artículo</h4>
                    <p className="text-sm text-gray-600">Comparte tu opinión sobre este artículo específico</p>
                  </div>
                  <div className="p-6">
                    <CommentForm
                      onSubmit={handleArticleCommentSubmit}
                      loading={articleLoading}
                    />
                  </div>
                </div>
              )}

              {/* Enhanced Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Resumen de la Reforma</h4>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Artículos:</span>
                    <span className="font-bold text-blue-600 text-lg">{law.articles.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Capítulos:</span>
                    <span className="font-bold text-emerald-600 text-lg">6</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Áreas temáticas:</span>
                    <span className="font-bold text-purple-600 text-lg">6</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Help */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 rounded-full p-2 mr-3">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-900">¿Cómo participar?</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-blue-800">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Navega por capítulos temáticos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Lee cada artículo cuidadosamente</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Comparte comentarios constructivos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Vota por comentarios útiles</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Responde a otros participantes</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Progreso del Proceso</h4>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Fase actual:</span>
                      <span className="font-medium text-orange-600">Participación</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Días restantes:</span>
                      <span className="font-bold text-orange-600">45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawDetail;