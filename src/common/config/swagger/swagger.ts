import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Learning Managment System Platformasi')
    .setVersion('1.0')
    .setDescription(`🟦 1-BO‘LIM: API Loyihasi haqida

Assalomu alaykum!
Ushbu Swagger hujjati — Learning Management System (LMS) platformasi uchun ishlab chiqilgan backend API'ga tegishli. Bu platforma orqali foydalanuvchilar:

    kurslarga yozilish,

    darslarni o‘rganish,

    imtihon va testlar topshirish,

    uyga vazifalarni yuborish,

    mentor va assistentlar bilan o‘zaro aloqada bo‘lish

imkoniyatlariga ega bo‘lishadi.

Bu API ayniqsa yangi o‘qishni istagan o‘quvchilar uchun foydali bo‘lib, imtihon, test, ball, baholash, kurslar, homework, va chat kabi barcha asosiy funksiyalarni qamrab oladi.
🟨 2-BO‘LIM: Ishlatilgan Texnologiyalar

Ushbu loyiha zamonaviy mikroservis arxitekturasi asosida quyidagi texnologiyalar yordamida qurilgan:
🧠 Backend (API) Texnologiyalari:

    NestJS — modulga asoslangan TypeScript framework

    TypeScript — qat'iy tipga ega dasturlash tili

    Prisma ORM — PostgreSQL bilan integratsiyalashgan kuchli ORM

    PostgreSQL — asosiy ma'lumotlar bazasi

    Redis — OTP, caching va bloklash uchun ishlatiladi

    RabbitMQ — mikroservislar orasida xabar almashinuvi uchun message broker

    CI/CD (GitHub Actions) — avtomatik deploy va testlar

🤖 Telegram Bot Texnologiyalari:

    Grammy.js — bot yozish uchun kuchli va qulay JS/TS kutubxona

    Microservice-based Architecture — bot va backend alohida mustaqil servislar sifatida ishlaydi

    Bot va API o‘rtasida RabbitMQ orqali real-time aloqa o‘rnatilgan

Bot adminlar uchun qulay panel taqdim etadi:
✅ Yangi kelgan xabarlar,
✅ Bloklangan foydalanuvchilar,
✅ Parol bilan kirish va monitoring funksiyalari mavjud.
🟥 3-BO‘LIM: Qiyinchiliklar va Tajribalar

Loyiha davomida quyidagi muammolar va murakkab jihatlar bo‘ldi:
1. CI/CD bilan ishlash

    GitHub Actions orqali auto-deployni sozlashda docker-compose, env, va permissions muammolari bo‘ldi.

    Ularni skriptlar orqali bosqichma-bosqich boshqarish (pull, build, up) qo‘lda tahlil qilindi.

2. Prisma bilan Join va Subquery yozish

    Prisma da kompleks join, where, orderBy va include operatsiyalarini yozish juda murakkab bo‘ldi.

    Xususan HomeworkSubmission, Course va Users o‘rtasidagi bog‘lanmalarni filtr bilan olishda chalkashliklar bo‘ldi.

3. Telegram botda inline tugmalar va real-time ishlash

    Inline tugmalar bosilganda eski tugmalarni tozalash (editMessageReplyMarkup) noqulay holatlarni keltirib chiqardi.

    RabbitMQ bilan real-time chatni sozlash, blocked users logikasini yaratish anchayin mashaqqatli bo‘ldi.`)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
