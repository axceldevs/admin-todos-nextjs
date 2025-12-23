# 1. Development
## Pasos para iniciar la app en desarrollo

1. Levantar la base de datos con el comando
```
docker compose up -d
```
2. Crear una copia de .env.template y renombrarlo a .env

3. Reemplazar las variable de entorno.

4. Ejecutar el comando - Instalar dependencias
```
npm install
```
5. Prisma comando - Crear tabla en la base de datos.
```
npx prisma migrate dev
```
6. Prisma comando - Generar el cliente de prisma.
```
npx prisma generate
```
7. Ejecutar el comando - Iniciar la aplicación en modo de desarrollo.
```
npm run dev
```
8. Ejecutar el seed para [para crear datos en la base de datos local](http://localhost:3000/api/v1/seed)


# REF: Prisma comandos
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```