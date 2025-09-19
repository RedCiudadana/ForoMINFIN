import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, MessageSquare, Filter, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';
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

  // useEffect(() => {
  //   getLaws().then(laws => {
  //     const found = laws.find(l => l.id === lawId);
  //     setLaw(found || null);
  //     setLoading(false);
  //   });
  // }, [lawId]);

  if (!law) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Ley no encontrada</h1>
        <Link to="/" className="text-blue-600 hover:text-white mt-4 inline-block">
          Volver al inicio
        </Link>
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

  // Group articles by chapter
  const getChapters = () => {
    if (!law) return [];
    
    const chapters = [
      {
        id: 'cap-1',
        title: 'Capítulo I – Transparencia y Acceso a la Información',
        articles: law.articles.slice(0, 3) // Articles 1-3
      },
      {
        id: 'cap-2',
        title: 'Capítulo II – Modernización de Procesos',
        articles: law.articles.slice(3, 6) // Articles 4-6
      },
      {
        id: 'cap-3',
        title: 'Capítulo III – Fortalecimiento de la Competencia',
        articles: law.articles.slice(6, 9) // Articles 7-9
      },
      {
        id: 'cap-4',
        title: 'Capítulo IV – Profesionalización y Control',
        articles: law.articles.slice(9, 12) // Articles 10-12
      },
      {
        id: 'cap-5',
        title: 'Capítulo V – Sanciones y Responsabilidad',
        articles: law.articles.slice(12, 15) // Articles 13-15
      },
      {
        id: 'cap-6',
        title: 'Capítulo VI – Innovación y Buenas Prácticas',
        articles: law.articles.slice(15, 18) // Articles 16-18
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/"
          className="inline-flex items-center text-blue-800 hover:text-blue-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a iniciativas
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{law.title}</h1>
          <p className="text-lg text-gray-700 mb-6">{law.fullDescription}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href={law.pdfUrl}
              className="inline-flex items-center bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Descargar PDF completo
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        <CommentStats lawId={lawId!} />
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('articles');
                setSelectedChapter(null);
                setSelectedArticle(null);
                setShowCommentForm(false);
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'articles'
                  ? 'border-blue-500 text-blue-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Artículos por Capítulos ({law.articles.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('general');
                setSelectedChapter(null);
                setSelectedArticle(null);
                setShowCommentForm(false);
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Comentarios Generales
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'articles' ? (
            <div>
              {/* Chapter Navigation */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Navegación por Capítulos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getChapters().map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => selectChapter(chapter.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedChapter === chapter.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {chapter.title.split('–')[0].trim()}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {chapter.title.split('–')[1]?.trim()}
                      </p>
                      <span className="text-xs text-blue-600 font-medium">
                        {chapter.articles.length} artículos
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* General Comment Form Toggle */}
              <div className="mb-6 flex justify-end">
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  {showCommentForm ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showCommentForm ? 'Ocultar formulario' : 'Comentar ley completa'}
                </button>
              </div>

              {/* General Comment Form */}
              {showCommentForm && (
                <div className="mb-8">
                  <CommentForm
                    onSubmit={handleGeneralCommentSubmit}
                    isGeneral={true}
                    loading={generalLoading}
                  />
                </div>
              )}

              {/* Articles by Chapter */}
              <div className="space-y-8">
                {selectedChapter ? (
                  // Show selected chapter
                  getChapters()
                    .filter(chapter => chapter.id === selectedChapter)
                    .map((chapter) => (
                      <div key={chapter.id} className="space-y-6">
                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                          <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-blue-900">
                              {chapter.title}
                            </h2>
                            <button
                              onClick={() => setSelectedChapter(null)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
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
                              className={`bg-white rounded-lg border transition-all ${
                                isSelected ? 'border-blue-300 ring-2 ring-blue-100 shadow-md' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {article.number}: {article.title}
                                  </h3>
                                </div>
                                
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                  <ReactMarkdown>{article.content}</ReactMarkdown>
                                </p>
                                
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => setSelectedArticle(isSelected ? null : article.id)}
                                    className="text-blue-800 hover:text-white font-medium text-sm transition-colors"
                                  >
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
                                    className="text-blue-800 hover:text-green-800 font-medium text-sm transition-colors"
                                  >
                                    Comentar artículo
                                  </button>
                                </div>
                                
                                {/* Comments for this article */}
                                {isSelected && (
                                  <div className="mt-6 border-t border-gray-100 pt-6">
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
                    ))
                ) : (
                  // Show all chapters collapsed
                  getChapters().map((chapter) => {
                    const isExpanded = expandedChapters.has(chapter.id);
                    
                    return (
                      <div key={chapter.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {chapter.title}
                            </h3>
                            <p className="text-gray-600">
                              {chapter.articles.length} artículos
                            </p>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="h-6 w-6 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-6 w-6 text-gray-400" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="border-t border-gray-200 p-6 space-y-4">
                            {chapter.articles.map((article) => {
                              const isSelected = selectedArticle === article.id;
                              
                              return (
                                <div
                                  key={article.id}
                                  className={`p-4 rounded-lg border transition-all ${
                                    isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <h4 className="font-semibold text-gray-900 mb-2">
                                    {article.number}: {article.title}
                                  </h4>
                                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                                    <ReactMarkdown>{article.content}</ReactMarkdown>
                                  </p>
                                  
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() => setSelectedArticle(isSelected ? null : article.id)}
                                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                    >
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
                                      className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
                                    >
                                      Comentar artículo
                                    </button>
                                  </div>
                                  
                                  {/* Comments for this article */}
                                  {isSelected && (
                                    <div className="mt-4 border-t border-gray-200 pt-4">
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
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Comentarios Generales sobre la Ley
                </h2>
                <button
                  onClick={() => setShowCommentForm(!showCommentForm)}
                  className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  {showCommentForm ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showCommentForm ? 'Ocultar formulario' : 'Agregar comentario'}
                </button>
              </div>

              {showCommentForm && (
                <div className="mb-8">
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
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Article Comment Form */}
            {selectedArticle && activeTab === 'articles' && (
              <div id="comment-form">
                <CommentForm
                  onSubmit={handleArticleCommentSubmit}
                  loading={articleLoading}
                />
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Resumen Rápido</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Artículos:</span>
                  <span className="font-medium">{law.articles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capítulos:</span>
                  <span className="font-medium">6</span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">¿Cómo participar?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Navega por capítulos temáticos</li>
                <li>• Lee cada artículo cuidadosamente</li>
                <li>• Comparte comentarios constructivos</li>
                <li>• Vota por comentarios útiles</li>
                <li>• Responde a otros participantes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawDetail;