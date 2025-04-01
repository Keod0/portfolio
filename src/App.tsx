import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Disc as Discord, Menu, X, Moon, Sun, Code2, Database, Shield, Server, Terminal, Cpu, Mail, ExternalLink, ArrowUp, Globe, Wrench } from 'lucide-react';
import TypewriterComponent from 'typewriter-effect';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import emailjs from '@emailjs/browser';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

function AppContent() {
  const { language, setLanguage, t } = useLanguage();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });

      // Mostrar/ocultar botão de voltar ao topo
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skills = [
    { name: 'Python', level: 90, icon: <Code2 className="w-6 h-6 text-blue-500" /> },
    { name: 'C++', level: 75, icon: <Terminal className="w-6 h-6 text-green-500" /> },
    { name: 'R', level: 80, icon: <Database className="w-6 h-6 text-purple-500" /> },
    { name: 'Java', level: 70, icon: <Cpu className="w-6 h-6 text-red-500" /> },
    { name: 'HTML/CSS', level: 85, icon: <Globe className="w-6 h-6 text-orange-500" /> },
    { name: 'PHP', level: 75, icon: <Server className="w-6 h-6 text-indigo-500" /> },
    { name: 'Power BI', level: 85, icon: <Database className="w-6 h-6 text-yellow-500" /> },
    { name: 'Solar Systems', level: 80, icon: <Wrench className="w-6 h-6 text-cyan-500" /> }
  ];

  const certifications = [
    {
      name: 'Google Data Analytics',
      issuer: 'Google',
      date: '2023',
      link: '#'
    },
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: '#'
    },
    {
      name: 'Cybersecurity Fundamentals',
      issuer: 'CompTIA',
      date: '2022',
      link: '#'
    }
  ];

  const experiences = [
    {
      company: 'Mestreclique Sistemas de Informação',
      role: 'Data Analyst & Developer',
      period: '2025',
      description: 'Development of Power BI dashboards, web systems using HTML, PHP and Bootstrap, and process automation with Python.',
      tech: ['Power BI', 'HTML', 'PHP', 'Bootstrap', 'Python']
    },
    {
      company: 'JAB (Spain - Erasmus)',
      role: 'IT Support Intern',
      period: '2023',
      description: 'Development of photovoltaic systems, solar energy system programming, and inverter programming for solar energy systems.',
      tech: ['Solar Systems', 'Programming', 'Energy Solutions', 'Inverter Programming']
    },
    {
      company: 'Visabeira',
      role: 'Tech Solutions Specialist',
      period: '2021 - 2022',
      description: 'First experience in the tech world, working with technological solutions.',
      tech: ['Technology Solutions', 'System Analysis']
    }
  ];

  interface Education {
    degree: string;
    school: string;
    period: string;
  }

  const education: Education[] = [
    {
      degree: 'Técnico Superior em Engenharia de Automação e Controlo',
      school: 'TEAC',
      period: '2021 - 2023'
    },
    {
      degree: 'CTeSP em Automação, Robótica e Controlo Industrial',
      school: 'IPG',
      period: '2019 - 2021'
    }
  ];

  const projects = [
    {
      title: 'Python Applications',
      description: 'Development of data analysis and automation solutions.',
      icon: <Code2 className="w-8 h-8" />,
      link: 'https://github.com/Keod0/EMCO',
      tech: ['Python', 'MongoDB', 'Kivy', 'ReportLab']
    },
    {
      title: 'Web Services',
      description: 'Implementation of APIs for system integration.',
      icon: <Server className="w-8 h-8" />,
      link: '#',
      tech: ['PHP', 'HTML', 'CSS', 'Bootstrap']
    },
    {
      title: 'Homelab & Servers',
      description: 'Configuration of game servers and personal projects.',
      icon: <Terminal className="w-8 h-8" />,
      link: '#',
      tech: ['Linux', 'Docker', 'Networking']
    },
    {
      title: 'Cryptocurrency Mining',
      description: 'Creation of GPU miners.',
      icon: <Cpu className="w-8 h-8" />,
      link: '#',
      tech: ['Python', 'C++', 'CUDA']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        'service_nyyuhjb',
        'template_1wksz5s',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'UREbrAJ9OTds8ivc1'
      );
      
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        darkMode ? 'bg-black/90 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
      } border-b border-gray-200 dark:border-gray-700`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-blue-500">
              Rafael
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'skills', 'education', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`text-sm font-medium transition-all duration-300 border-b-2 ${
                    activeSection === section
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'
                  }`}
                >
                  {t(`nav.${section}`)}
                </button>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {['home', 'about', 'skills', 'education', 'experience', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      handleNavClick(section);
                      setIsMenuOpen(false);
                    }}
                    className={`text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
                      activeSection === section
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {t(`nav.${section}`)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-20">
        <section id="home" className={`min-h-screen flex items-center justify-center py-20 ${
          darkMode ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'
        }`}>
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                <Code2 className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Hello, What's up?|
            </h1>
            <p className="text-xl">
              Tech enthusiast and developer from Portugal
            </p>
            <div className="flex justify-center space-x-6 mt-8">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-gray-50 dark:bg-black">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container mx-auto px-6"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-12 text-center"
            >
              {t('skills.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {skill.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold ml-4">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2.5 rounded-full bg-blue-500"
                    />
                  </div>
                  <p className="text-gray-600 dark:text-white text-sm mt-2">
                    {skill.level}% proficiency
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="experience" className="py-20 bg-gray-50 dark:bg-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6"
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              {t('experience.title')}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-gray-600 dark:text-white mb-2">{exp.company}</p>
                  <p className="text-gray-500 dark:text-gray-100 mb-4">{exp.period}</p>
                  <p className="text-gray-600 dark:text-white mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-20 bg-white dark:bg-black">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container mx-auto px-6"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            >
              {t('projects.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-800 group"
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300"
                    >
                      {project.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold ml-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-white mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-sm rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="mr-2">{t('projects.viewProject')}</span>
                    <ExternalLink className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-200" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="py-20 bg-gray-50 dark:bg-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6"
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Contact
            </h2>
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-gray-600 dark:text-white border-t dark:border-gray-800">
        <p>© {new Date().getFullYear()} Rafael. {t('footer.rights')}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
