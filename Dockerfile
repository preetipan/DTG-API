# เลือก base image ที่จะใช้ (Node.js version ที่ต้องการ)
FROM node:20

# ตั้งค่า directory ภายใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (หรือ yarn.lock) ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดจากโปรเจคไปยัง container
COPY . .

# ตั้งพอร์ตที่ application จะฟัง
EXPOSE 3000

# สั่งให้ container รันโปรเจค NestJS เมื่อ container เริ่มทำงาน
CMD ["npm", "run", "start:prod"]