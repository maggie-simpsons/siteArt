# ---------- Étape 1 : construction du site ----------
FROM node:22-alpine AS build
WORKDIR /app

# Installer les dépendances (mis en cache tant que package*.json ne change pas)
COPY package.json package-lock.json ./
RUN npm ci

# Copier le code et construire la version de production (dossier dist/)
COPY . .
RUN npm run build

# ---------- Étape 2 : serveur web léger ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
