# **SV Country App**

Aplicación interactiva desarrollada con React y Typescript que consume la API de RestCountries. Permite a los usuarios explorar información detallada de los países del mundo.

🔗 **[Ver Demo](https://sv-country-app.vercel.app/)**

![SV Country App](https://raw.githubusercontent.com/santiagoarielv98/sv-country-app/main/public/images/captura.webp)

---

## **Tabla de Contenidos**
1. [Características](#características)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Pruebas](#pruebas)
7. [Contribuciones](#contribuciones)
8. [Licencia](#licencia)
9. [Contacto](#contacto)

---

## **Características**
- 🌍 Búsqueda por nombre de país.
- 📂 Filtrado por región.
- 📜 Información detallada de cada país: bandera, nombre, capital, población, área, idiomas, moneda.
- 🎨 Diseño sencillo y responsivo.
- 🌙 Modo oscuro.
- 🐳 Contenedor Docker
- 🚀 Despliegue en Vercel.
- 🧪 Pruebas unitarias.

---

## **Tecnologías Utilizadas**
- React
- Typescript
- React Router
- Axios
- Bootstrap
- Docker
- Vercel
- RestCountries API

---

## **Requisitos Previos**
Asegúrate de tener instalados los siguientes programas:

- Node.js (v20 o superior)
- Navegador web actualizado
- Docker (opcional)
- Git (opcional)

---

## **Instalación**
Sigue estos pasos para ejecutar la aplicación localmente:

1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/santiagoarielv98/sv-country-app.git
   cd sv-country-app
   ```
2. Instalar dependencias:  
   ```bash
   pnpm install
   ```
3. Iniciar la aplicación:  
   ```bash
   pnpm dev
   ```

Para ejecutar la aplicación con Docker, sigue estos pasos:

1. Construir la imagen:  
   ```bash
docker-compose up --build
# o
docker build -t sv-country-app .
   ```

---

## **Uso**
1. Accede a la aplicación en tu navegador en `http://localhost:5173`.
2. Usa el cuadro de búsqueda para encontrar países.
3. Filtra por región desde el menú desplegable.
4. Haz clic en un país para ver más detalles.

---

## **Pruebas**

### Ejecutar Pruebas
Para ejecutar las pruebas unitarias:
```bash
pnpm test
```

### Stack de Pruebas
- Vitest como test runner
- React Testing Library para pruebas de componentes
- Jest DOM para aserciones DOM
- MSW para mock de servicios

### Cobertura de Pruebas
Las Pruebas incluyen:
- ✅ Componentes React (CountryList, CountryDetail)
- ✅ Custom Hooks (useCountries)
- ✅ Servicios API
- ✅ Utilidades y helpers 

### Estructura de Pruebas
```markdown
src/
  └── tests/
      ├── components/
      │   ├── CountryList.test.tsx
      │   └── CountryDetail.test.tsx
      ├── hooks/
      │   └── useCountries.test.tsx
      └── mocks/
          └── country.mock.ts
```

---

## **Contribuciones**
¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Confirma tus cambios (`git commit -m 'Agregada nueva característica'`).
4. Haz push a tu rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

---

## **Licencia**
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

---

## **Contacto**
👤 **[Santiago Villanueva](https://linkedin.com/in/santiagoarielv/)**  
📧 [santiagoarielv98@gmail.com](mailto:santiagoarielv98@gmail.com)  
🌐 [Portafolio](https://santiagoarielv98.vercel.app/)
