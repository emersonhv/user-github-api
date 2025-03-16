# Aplicación de Búsqueda de Usuarios de GitHub

Esta es una aplicación Angular que permite buscar usuarios de GitHub, ver sus perfiles y mostrar un gráfico de barras con el número de seguidores de los primeros 10 usuarios encontrados. La aplicación utiliza la API pública de GitHub y sigue principios de diseño SOLID, patrones de diseño y clean code.

## Características

- **Búsqueda de usuarios**: Ingresa un nombre de usuario y obtén una lista de los primeros 10 usuarios que coincidan con la búsqueda.
- **Detalles del usuario**: Haz clic en un usuario para ver su perfil, incluyendo su imagen, nombre de usuario, ID y enlace a su perfil de GitHub.
- **Gráfico de seguidores**: Visualiza el número de seguidores de los primeros 10 usuarios en un gráfico de barras.
- **Validación de score**: No se permite acceder a perfiles de usuarios con un `score` menor a 30.0.

## Tecnologías utilizadas

- **Angular 18**: Framework para construir la aplicación.
- **Bulma**: Framework CSS para el diseño de la interfaz.
- **Chart.js**: Librería para crear gráficos.
- **Axios**: Librería para realizar solicitudes HTTP.
- **GitHub API**: API pública de GitHub para obtener datos de usuarios.

## Configuración del proyecto

### Requisitos previos

- Node.js (v18 o superior)
- Angular CLI (v18 o superior)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git

2. Instalar dependencias
    ```bash
    npm install

3. Instalar Angular CLI
    ```bash
    npm install -g @angular/cli@18

4. Ejecutar servidor de pueba
    ```bash
    ng serve
