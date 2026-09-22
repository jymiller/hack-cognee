FROM python:3.12-alpine
WORKDIR /app
COPY app.py index.html lesson.json ./
USER 65534:65534
EXPOSE 8080
CMD ["python", "-B", "app.py"]
