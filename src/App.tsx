import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'education', label: t('nav.education') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') }
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Adicionar variantes para animação
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-black' : 'bg-white'}`}>
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                >
                  {item.label}
                </button>
              ))}
              {/* Seletor de idioma */}
              <select
                onChange={e => {
                  let lang = e.target.value;
                  if (lang === 'pt-PT') lang = 'pt';
                  window.localStorage.setItem('i18nextLng', lang);
                  window.location.reload();
                }}
                defaultValue={(() => {
                  const lng = localStorage.getItem('i18nextLng') || 'en';
                  return lng === 'pt' ? 'pt-PT' : lng;
                })()}
                className={`mx-2 px-2 py-1 rounded ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-900'}`}
                aria-label="Selecionar idioma"
              >
                <option value="en">English</option>
                <option value="pt-PT">Português (Portugal)</option>
              </select>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${darkMode ? 'bg-black' : 'bg-white'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center w-full px-3 py-2 rounded-md ${
                    darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  {darkMode ? (
                    <>
                      <Sun size={20} className="mr-2" />
                      {t('nav.lightMode')}
                    </>
                  ) : (
                    <>
                      <Moon size={20} className="mr-2" />
                      {t('nav.darkMode')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {/* Home Section */}
        <motion.section
          {...{ id: 'home', className: `min-h-screen flex items-center justify-center ${darkMode ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-white to-gray-100'}` }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('hero.title')}{' '}
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="text-blue-600"
                >
                  Rafael
                </motion.span>
              </h1>
              <p className={`text-xl sm:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('hero.subtitle')}
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="#contact"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors duration-200`}
                >
                  {t('hero.cta')}
                </a>
                <a
                  href="#projects"
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  } transition-colors duration-200`}
                >
                  {t('projects.viewProject')}
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <section id="about" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.title')}</h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('about.subtitle')}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-lg p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.whoAmI.title')}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('about.whoAmI.content')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-lg p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.whatIDo.title')}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('about.whatIDo.content')}</p>
              </motion.div>
            </div>
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {Object.entries(t('about.stats', { returnObjects: true }) as Record<string, string>).map(([key, value]) => (
                <div key={key} className={`flex flex-col items-center p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <span className="text-2xl font-bold">{value}</span>
                  <span className="text-sm mt-1">{t(`about.stats.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('skills.title')}</h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('skills.subtitle')}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(t('skills.items', { returnObjects: true }) as Record<string, string[]>).map((category, index) => {
                const skills = t(`skills.items.${category}`, { returnObjects: true }) as string[];
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`rounded-lg p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                  >
                    <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t(`skills.categories.${category}`)}</h3>
                    <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}> 
                      {skills.map((skill: string) => (
                        <li key={skill} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('education.title')}</h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('education.subtitle')}</p>
            </motion.div>
            <div className="space-y-8">
              {Object.values(t('education.items', { returnObjects: true }) as Record<string, any>).map((edu: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`rounded-lg p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</h3>
                  <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{edu.school}</p>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{edu.period}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('experience.title')}</h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('experience.subtitle')}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(t('experience.items', { returnObjects: true }))
                .filter(([key, exp]: [string, any]) => typeof exp === 'object')
                .map(([key, exp]: [string, any], index: number) => (
                  <motion.div
                    key={key}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    className={`rounded-2xl shadow-lg p-8 flex flex-col gap-4 transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{exp.title || '-'}</h3>
                    </div>
                    {exp.company && <span className={`text-base font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{exp.company}</span>}
                    {exp.period && <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.period}</span>}
                    {exp.description && <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.description}</p>}
                    {/* Tecnologias */}
                    {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {exp.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Outros campos dinâmicos */}
                    {Object.entries(exp).map(([field, value]) => (
                      !['title', 'company', 'period', 'description', 'technologies'].includes(field) &&
                      (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') ? (
                        <div key={field} className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className="font-semibold mr-1">{field}:</span> {value}
                        </div>
                      ) : null
                    ))}
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('projects.title')}</h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('projects.subtitle')}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.values(t('projects.items', { returnObjects: true }) as Record<string, any>).map((project: any, index: number) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  className={`rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                >
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                    <p className={`mb-4 text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto flex gap-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors duration-200`}
                        >
                          {t('projects.viewProject')}
                        </a>
                      )}
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'} transition-colors duration-200`}
                        >
                          {t('projects.viewCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.title')}
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('contact.subtitle')}
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`rounded-lg p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
              >
                <form>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {t('contact.form.message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`w-full px-6 py-3 rounded-lg font-medium ${
                        darkMode
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } transition-colors duration-200`}
                    >
                      {t('contact.form.submit')}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-8 ${darkMode ? 'bg-black' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${
              darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-colors duration-200`}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
