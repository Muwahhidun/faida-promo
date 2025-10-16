# Используем легкий nginx образ
FROM nginx:alpine

# Удаляем стандартный конфиг nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш кастомный конфиг
COPY nginx.conf /etc/nginx/conf.d/

# Копируем файлы сайта в директорию nginx
COPY . /usr/share/nginx/html

# Устанавливаем правильные права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Открываем порт 1991
EXPOSE 1991

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]