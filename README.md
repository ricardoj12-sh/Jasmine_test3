🏗 Pruebas Unitarias con Jasmine - Clase UserManager

Este proyecto es un ejemplo de pruebas unitarias utilizando Jasmine para probar una clase UserManager.
La clase permite gestionar usuarios y validar datos.

📂 Estructura del Proyecto
📁 proyecto_3/
│── 📁 src/                  # Código fuente
│   │── userManager.js       # Clase UserManager
│── 📁 spec/                 # Pruebas unitarias con Jasmine
│   │── userManager.spec.js  # Pruebas para UserManager
│── 📁 spec/support/         # Configuración de Jasmine
│   │── jasmine.mjs          # Configuración de Jasmine en formato ESM
│── package.json             # Configuración del proyecto
│── package-lock.json        # Dependencias de npm

🚀 1️⃣ Instalación y Configuración

Requisitos Previos

Tener Node.js y npm instalados.

Instalar Jasmine

Si aún no tienes Jasmine instalado, ejecuta en la terminal:

npm install --save-dev jasmine

Inicializa Jasmine con:

npx jasmine init

Esto creará la configuración en spec/support/jasmine.mjs.
