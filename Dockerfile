# ใช้ Node.js LTS image เป็น base
FROM node:18

# ตั้ง working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json เพื่อทำการติดตั้ง dependencies
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดในโปรเจค
COPY . .

# สร้างโปรเจคสำหรับ production
RUN npm run build

# เปิดพอร์ต 3000 (หรือพอร์ตที่คุณใช้)
EXPOSE 3000

# คำสั่งในการรันโปรเจค
CMD ["npm", "run", "start:prod"]
