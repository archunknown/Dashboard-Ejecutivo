# ArchEducation - Dashboard Ejecutivo

Dashboard web moderno para ejecutivos del sector educativo público peruano. Plataforma tipo Blackboard diseñada específicamente para la gestión de instituciones educativas estatales (colegios, institutos y universidades).

## 🚀 Características Principales

### 📊 Dashboard Principal
- Estadísticas en tiempo real de docentes, estudiantes y recursos
- Actividad reciente del sistema
- Interfaz moderna y minimalista con paleta de colores institucional

### 👥 Gestión de Usuarios
- **Generador de Correos Institucionales**: Creación manual de correos con DNI + dominio
- Gestión de docentes y estudiantes
- Búsqueda y filtrado avanzado
- Tabs separados para diferentes tipos de usuarios

### 📚 Repositorios Educativos Públicos
- Contenido educativo compartido por instituciones de todo el Perú
- Filtros avanzados por:
  - Materia (Matemáticas, Comunicación, Ciencias, Historia, etc.)
  - Grado académico
  - Tipo de contenido (Presentaciones, Ejercicios, Evaluaciones, etc.)
  - Institución (Colegios, Institutos, Universidades, MINEDU)
- Estadísticas de descargas, vistas y calificaciones

### 📖 Biblioteca Digital Pública
- Libros y recursos educativos de acceso libre
- Filtros por:
  - Categoría (Textos Escolares, Literatura, Ciencias, etc.)
  - Nivel educativo (Primaria, Secundaria, Superior)
  - Idioma (Español, Quechua, Inglés, etc.)
  - Formato (PDF, EPUB, Audio, Video, Interactivo)
- Contenido adaptado a la realidad peruana

### 💬 Centro de Mensajes
- Comunicación directa con soporte técnico de ArchEducation
- Interfaz tipo chat moderna
- Notificaciones en tiempo real

### ⚙️ Configuraciones
- Gestión de perfil ejecutivo
- Configuraciones de notificaciones
- Información institucional (código modular, datos del centro educativo)

## 🎨 Diseño

### Paleta de Colores
```css
.color1 { color: #0085ff; } /* Azul principal */
.color2 { color: #00a7ff; } /* Azul secundario */
.color3 { color: #82ceff; } /* Azul claro */
.color4 { color: #e4f8ff; } /* Azul muy claro */
.color5 { color: #ffffff; } /* Blanco */
```

### Características de Diseño
- **Moderno y Minimalista**: Interfaz limpia y profesional
- **Responsive**: Adaptado para desktop, tablet y móvil
- **Accesible**: Cumple estándares de accesibilidad web
- **Iconografía**: Font Awesome 6.0 para iconos consistentes

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Inter

## 📁 Estructura del Proyecto

```
/
├── index.html              # Página principal
├── css/
│   ├── styles.css         # Estilos principales
│   └── responsive.css     # Diseño responsivo
├── js/
│   ├── main.js           # Funcionalidad principal
│   ├── navigation.js     # Navegación y filtros
│   └── email-generator.js # Generador de correos
└── README.md             # Documentación
```

## 🚀 Instalación y Uso

### GitHub Pages
Este proyecto está optimizado para GitHub Pages:

1. Fork este repositorio
2. Ve a Settings > Pages
3. Selecciona "Deploy from a branch"
4. Elige "main" branch y "/ (root)"
5. Tu dashboard estará disponible en: `https://tu-usuario.github.io/nombre-repo`

### Desarrollo Local
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/archeducation-dashboard.git

# Navega al directorio
cd archeducation-dashboard

# Abre index.html en tu navegador
# O usa un servidor local como Live Server en VS Code
```

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] Dashboard principal con estadísticas
- [x] Navegación entre secciones
- [x] Generador de correos institucionales (manual con DNI)
- [x] Repositorios públicos con filtros avanzados
- [x] Biblioteca digital pública con múltiples filtros
- [x] Centro de mensajes
- [x] Configuraciones de perfil
- [x] Diseño responsive
- [x] Sidebar colapsible

### 🔄 Funcionalidades Demo
- Generación de correos con DNI + dominio
- Filtros de búsqueda en repositorios y biblioteca
- Navegación entre tabs de usuarios
- Interfaz de mensajería

## 🎓 Contexto Educativo Peruano

### Dirigido a:
- **Colegios Públicos**: Instituciones de educación secundaria
- **Institutos Superiores**: Educación técnica y pedagógica
- **Universidades Estatales**: Educación superior pública

### Características Específicas:
- Códigos modulares para identificación institucional
- Contenido en español y quechua
- Adaptado al currículo nacional peruano
- Integración con sistemas del MINEDU

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas versiones)
- **Dispositivos**: Desktop, Tablet, Móvil
- **Resoluciones**: Desde 320px hasta 4K

## 🤝 Contribución

Este es un proyecto de demostración. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es una demostración educativa. Libre para uso académico y de aprendizaje.

## 📞 Soporte

Para consultas sobre el proyecto:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo

---

**ArchEducation** - Transformando la educación pública peruana a través de la tecnología 🇵🇪
