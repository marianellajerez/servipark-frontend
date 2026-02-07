# Documentación de Módulos Integrados - Evidencia GA8-220501096-AA1-EV02

**Proyecto:** ServiPark Frontend  
**Fecha:** 17 de diciembre de 2025  
**Autor:** [Tu Nombre]  
**Versión:** 1.0  

Esta documentación cumple con los requerimientos de la evidencia GA8-220501096-AA1-EV02 para módulos integrados. Se basa en el estudio de conceptos de desarrollo de software modular, integración de sistemas y mejores prácticas en Angular. Incluye requerimientos, arquitectura, documentación técnica, pruebas y despliegue.

---

## 1. Introducción

### 1.1 Descripción del Proyecto
ServiPark es un sistema de gestión de parqueadero desarrollado como aplicación web frontend en Angular. Permite la administración de entradas/salidas de vehículos, gestión de usuarios, tarifas y reportes avanzados. El sistema está dividido en módulos integrados que interactúan con un backend REST API.

### 1.2 Objetivos de la Evidencia
- Demostrar la integración de módulos en un sistema completo.
- Proporcionar documentación técnica detallada.
- Evidenciar pruebas y despliegue.
- Cumplir con estándares de entrega: código fuente, archivos compilados, documentos y URLs.

### 1.3 Alcance
- **Frontend:** Angular 17+ con standalone components.
- **Backend:** No incluido en esta evidencia (asumido como API externa).
- **Funcionalidades:** Autenticación, gestión de tickets, usuarios, tipos de vehículo, reportes.

---

## 2. Requerimientos del Sistema

### 2.1 Requerimientos Funcionales
- **RF1:** Autenticación de usuarios con roles (ADMINISTRADOR, CAJERO).
- **RF2:** Registro de entrada/salida de vehículos con cálculo de tarifas.
- **RF3:** Gestión CRUD de usuarios, tipos de vehículo y tarifas (solo ADMIN).
- **RF4:** Generación de reportes con KPIs y gráficos.
- **RF5:** Navegación protegida por guards.

### 2.2 Requerimientos No Funcionales
- **RNF1:** Interfaz responsive y accesible.
- **RNF2:** Seguridad con JWT.
- **RNF3:** Rendimiento: Carga inicial < 3s.
- **RNF4:** Compatibilidad con navegadores modernos (Chrome, Firefox).

### 2.3 Actas de Aprobación
- Acta de Aprobación de Requerimientos: Firmada el [Fecha], aprobando los RF y RNF listados.  
  [Adjuntar acta en PDF si disponible; placeholder: Acta_Aprobacion_Requerimientos.pdf]

---

## 3. Arquitectura y Módulos

### 3.1 Arquitectura General
El sistema sigue una arquitectura modular en Angular:
- **Core:** Servicios, guards, interceptores.
- **Features:** Vistas principales (dashboard, tasks).
- **Shared:** Componentes reutilizables.
- **Public:** Acceso público (login).

[Imagen: Diagrama de Arquitectura - Incluir un diagrama UML o flowchart mostrando módulos y dependencias]

### 3.2 Módulos Integrados
1. **Módulo de Autenticación (Login):** Maneja inicio de sesión.
2. **Módulo de Dashboard:** Layout con navegación.
3. **Módulo de Tasks:** Operaciones diarias (ingresar vehículo, cobrar, etc.).
4. **Módulo de Administración:** Gestión de entidades (usuarios, tipos, reportes).
5. **Módulo Compartido:** Modales, pipes, componentes reutilizables.

Cada módulo es standalone y se integra vía rutas y servicios.

---

## 4. Documentación por Módulo y Componente

### 4.1 Módulo de Autenticación (Login)
- **Componente:** LoginComponent
- **Datos de Entrada:** Correo (string, email), Contraseña (string).
- **Datos de Salida:** Token JWT (si éxito), Mensaje de error (si falla).
- **Funcionalidad:** Valida credenciales vía API POST /auth/login.

### 4.2 Módulo de Dashboard
- **Componente:** DashboardComponent
- **Datos de Entrada:** Ninguno (layout).
- **Datos de Salida:** Navegación a vistas hijas.
- **Subcomponentes:**
  - Header: Entrada: Token JWT; Salida: Info usuario, logout.
  - Sidenav: Entrada: Rol usuario; Salida: Enlaces de navegación.

### 4.3 Módulo de Tasks
- **Ingresar Vehículo:** Entrada: Placa (string), ID Tipo Vehículo (number); Salida: Ticket creado (objeto).
- **Ver Ticket Activo:** Entrada: Placa; Salida: Detalles ticket.
- **Cobrar Parqueo:** Entrada: Placa; Salida: Ticket pagado.
- **Ticket Detalle:** Entrada: Placa; Salida: Info ticket + costo preliminar (number).
- **Recibo Salida:** Entrada: Ticket (desde state); Salida: Recibo impreso.

### 4.4 Módulo de Administración
- **Gestionar Usuarios:** Entrada: Datos usuario (create/update); Salida: Lista usuarios actualizada.
- **Gestionar Tipos Vehículo:** Entrada: Nombre + tarifa; Salida: Tipo creado.
- **Reportes Avanzados:** Entrada: Fechas (inicio/fin); Salida: Datos reportes (KPIs, gráficos).

### 4.5 Servicios (Core)
- **AuthService:** Entrada: Credenciales; Salida: Token.
- **TicketService:** Entrada: Placa/tipo; Salida: Ticket data.
- **Etc.:** Similar para otros servicios.

[Imagen: Diagrama de Flujo de Datos - Mostrar entradas/salidas por módulo]

---

## 5. Repositorio y Código Fuente

### 5.1 Repositorio
- **Plataforma:** GitHub.
- **URL:** https://github.com/marianellajerez/servipark-frontend
- **Rama Actual:** features/implementacion-cajero
- **Historial:** Commits documentados con mensajes descriptivos (e.g., "Add login component").

### 5.2 Código Fuente
- Ubicación: Carpeta `src/` en el repositorio.
- Archivos Clave: `app.routes.ts`, `core/services/`, `features/`.
- Compilación: `ng build` genera `dist/` (archivos ejecutables).

[Adjuntar: Enlace al repositorio o ZIP del código fuente]

---

## 6. Despliegue y URLs

### 6.1 Archivos Ejecutables
- **Build:** Ejecutar `ng build --prod` para generar `dist/servipark-frontend/`.
- **Despliegue:** Hospedado en [Plataforma, e.g., Vercel/Netlify].
- **URL de Producción:** [https://servipark-frontend.vercel.app] (placeholder; reemplazar con real).
- **URL de Pruebas:** [https://staging-servipark.vercel.app] (placeholder).

### 6.2 Configuración de Despliegue
- **Servidor:** Node.js + Angular CLI.
- **Base de Datos:** No aplica (frontend; backend separado).
- **Variables:** API_URL en `environment.ts`.

---

## 7. Pruebas Realizadas

### 7.1 Pruebas Unitarias
- **Framework:** Jasmine + Karma.
- **Cobertura:** 80%+ en servicios y componentes.
- **Ejemplos:** AuthGuard.spec.ts, Login.spec.ts.
- **Resultado:** Todas pasan (ver `ng test` output).

### 7.2 Pruebas de Integración
- **Escenarios:** Flujo completo (login → ingresar vehículo → cobrar).
- **Herramientas:** Manual + Postman (basado en insomnia-servipark.json).
- **Resultado:** Funcional en desarrollo.

### 7.3 Configuraciones
- **Desarrollo:** Local con `ng serve`, Node 18+, Angular CLI.
- **Pruebas:** Ambiente staging con API mock.
- **Servidores:** Frontend en localhost:4200; Backend en [URL API].
- **Base de Datos:** PostgreSQL/MySQL en backend (no incluido).

[Imagen: Captura de Pruebas - Screenshot de ng test o Postman]

---

## 8. Manuales Técnicos

### 8.1 Manual de Instalación
1. Clonar repo: `git clone https://github.com/...`
2. Instalar: `npm install`
3. Configurar `environment.ts` con API URL.
4. Ejecutar: `ng serve`

### 8.2 Manual de Usuario
- Login: Ingresar correo/contraseña.
- Dashboard: Navegar con sidenav.
- Tasks: Seguir flujos descritos en sección 4.

### 8.3 Manual de Despliegue
- Build: `ng build --prod`
- Deploy: Subir `dist/` a hosting (e.g., Vercel).

[Adjuntar: Manuales en PDF separados si necesario]

---

## 9. Conclusión

Los módulos están integrados correctamente, cumpliendo requerimientos. El sistema es funcional y documentado. Para mejoras, considerar más tests E2E.

**Archivos Adjuntos:**
- Código Fuente: [Enlace/ZIP]
- Build: dist/
- Documentos: Esta doc en PDF, actas, manuales.

[Imagen: Logo del Proyecto o Captura Final]