# ArchEducation - Dashboard Ejecutivo

## 📚 Descripción

ArchEducation es una plataforma web innovadora diseñada específicamente para el sector educativo público peruano. Este dashboard ejecutivo permite a los administradores de colegios, institutos y universidades del estado gestionar eficientemente sus recursos educativos digitales.

## 🎯 Características Principales

### 🏠 Dashboard Principal
- **Estadísticas en tiempo real**: Visualización de docentes, estudiantes, recursos y repositorios
- **Actividad reciente**: Seguimiento de las últimas acciones en la plataforma
- **Interfaz moderna**: Diseño minimalista con paleta de colores institucional

### ⚙️ Gestión de Perfil
- **Información personal**: Visualización de datos del ejecutivo
- **Configuraciones**: Notificaciones, modo oscuro y preferencias
- **Seguridad**: Gestión de credenciales y configuraciones de acceso

### 💬 Centro de Mensajes
- **Comunicación directa**: Chat con soporte técnico de ArchEducation
- **Notificaciones**: Sistema de alertas y recordatorios
- **Historial**: Registro completo de conversaciones

### 👥 Gestión de Usuarios
- **Docentes y Estudiantes**: Administración completa de usuarios
- **Generador de Correos**: Creación automática de hasta 100 correos institucionales
- **Búsqueda avanzada**: Filtros por nombre, materia y estado

### 📁 Repositorios Educativos
- **Contenido institucional**: Recursos creados por la institución
- **Filtros inteligentes**: Por materia, grado y tipo de contenido
- **Estadísticas**: Descargas, valoraciones y popularidad
- **Búsqueda**: Sistema de búsqueda en tiempo real

### 📖 Biblioteca Digital
- **Recursos educativos**: Libros y materiales digitales
- **Categorización**: Textos escolares, literatura, ciencia e historia
- **Subida de contenido**: Funcionalidad para agregar nuevos recursos
- **Filtros avanzados**: Por categoría, autor y año

## 🎨 Paleta de Colores

```css
--color1: #0085ff; /* Azul principal */
--color2: #00a7ff; /* Azul secundario */
--color3: #82ceff; /* Azul claro */
--color4: #e4f8ff; /* Azul muy claro */
--color5: #ffffff; /* Blanco */
```

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconografía profesional
- **Google Fonts**: Tipografía Inter

## 📱 Características Técnicas

### Responsive Design
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: Tablet (1024px), Mobile (768px), Small Mobile (480px)
- **Touch Friendly**: Elementos táctiles de mínimo 44px

### Accesibilidad
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Navegación por teclado**: Soporte completo para teclado
- **Contraste**: Cumple con estándares WCAG 2.1
- **Focus visible**: Indicadores claros de foco

### Performance
- **Lazy Loading**: Carga diferida de imágenes
- **Animaciones optimizadas**: Respeta `prefers-reduced-motion`
- **Código modular**: Separación de responsabilidades
- **Compresión**: Archivos optimizados para web

## 🛠️ Instalación y Uso

### Opción 1: GitHub Pages (Recomendado)
1. Fork este repositorio
2. Ve a Settings > Pages
3. Selecciona "Deploy from a branch"
4. Elige "main" branch y "/ (root)"
5. Tu sitio estará disponible en `https://tu-usuario.github.io/nombre-repo`

### Opción 2: Local
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/archeducation-dashboard.git
```

2. Abre `index.html` en tu navegador

### Opción 3: Servidor Local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

## 📂 Estructura del Proyecto

```
archeducation-dashboard/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principales
│   └── responsive.css      # Estilos responsivos
├── js/
│   ├── main.js            # Controlador principal
│   ├── navigation.js      # Sistema de navegación
│   └── email-generator.js # Generador de correos
├── assets/
│   ├── images/           # Imágenes y recursos
│   └── fonts/            # Fuentes personalizadas
└── README.md             # Documentación
```

## 🎮 Funcionalidades Demo

### Generador de Correos Institucionales
- **Cantidad**: Hasta 100 correos por generación
- **Formato**: nombre.apellido@institucion.edu.pe
- **Credenciales**: Generación automática de usuarios y contraseñas
- **Exportación**: Descarga en formato CSV

### Filtros y Búsqueda
- **Repositorios**: Por materia, grado y texto libre
- **Biblioteca**: Por categoría y texto libre
- **Usuarios**: Por nombre, materia y correo

### Navegación
- **Atajos de teclado**: Alt + 1-6 para navegación rápida
- **Búsqueda global**: Ctrl + K
- **Responsive**: Menú hamburguesa en móviles

## 🌟 Datos Ficticios Incluidos

### Instituciones Peruanas
- I.E. José Faustino Sánchez Carrión
- Contenido adaptado a la realidad educativa peruana
- Nombres y apellidos típicamente peruanos

### Materias Curriculares
- Matemáticas
- Comunicación
- Ciencias Naturales
- Historia y Geografía
- Ciencia y Tecnología

## 🔧 Personalización

### Cambiar Institución
Edita las variables en `js/main.js`:
```javascript
this.currentUser = {
    institution: 'Tu Institución',
    modularCode: 'Tu Código',
    // ...
};
```

### Modificar Dominio de Correos
En `js/email-generator.js`:
```javascript
this.domainInput.value = 'tu-institucion.edu.pe';
```

### Actualizar Colores
Modifica las variables CSS en `css/styles.css`:
```css
:root {
    --color1: #tu-color-principal;
    --color2: #tu-color-secundario;
    /* ... */
}
```

## 📊 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado para el sector educativo público peruano con el objetivo de modernizar la gestión educativa digital.

## 🙏 Agradecimientos

- **Ministerio de Educación del Perú**: Por la inspiración en el sistema educativo
- **Font Awesome**: Por los iconos utilizados
- **Google Fonts**: Por la tipografía Inter
- **Comunidad educativa peruana**: Por el feedback y sugerencias

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: soporte@archeducation.pe
- 💬 Chat: Disponible en el dashboard
- 📱 WhatsApp: +51 999 888 777

---

**ArchEducation** - Transformando la educación digital en el Perú 🇵🇪
