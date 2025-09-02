import { ExceptionFilter, Catch, ArgumentsHost, HttpException, } from '@nestjs/common';
import { Request, Response } from 'express';
import { promises as fs } from 'fs';

@Catch()
export class FileCleanupExceptionFilter implements ExceptionFilter {
    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        // console.log(exception)

        if (request.files) {

            const files = request.files as
                | Express.Multer.File[]
                | { [fieldname: string]: Express.Multer.File[] };

            const deleteFileIfExists = async (filePath: string) => {
                try {
                    await fs.unlink(filePath);
                } catch (err) {
                    console.warn('⚠️ Fayl o‘chirilmadi:', filePath, err.message);
                }
            };

            // Fayllarni o‘chirish — file.path orqali
            if (files) {
                if (Array.isArray(files)) {
                    // Fayllar ro'yxat ko'rinishida
                    for (const file of files) {
                        if (file?.path) {
                            await deleteFileIfExists(file.path);
                        }
                    }
                } else {
                    // Fayllar obyekt ko'rinishida: { banner: [...], introVideo: [...] }
                    for (const fileArr of Object.values(files)) {
                        for (const file of fileArr) {
                            if (file?.path) {
                                await deleteFileIfExists(file.path);
                            }
                        }
                    }
                }
            }
        }


        // Javobni yuborish
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : 500;

        const message = exception instanceof HttpException
            ? (() => {
                const res = exception.getResponse();

                if (typeof res === 'string') {
                    return res;
                }

                if (typeof res === 'object' && res !== null) {
                    const responseObj = res as any;

                    // Agar massiv bo‘lsa, birlashtiramiz
                    if (Array.isArray(responseObj.message)) {
                        return responseObj.message.join(', ');
                    }

                    // Agar string bo‘lsa, to‘g‘ridan-to‘g‘ri olamiz
                    if (typeof responseObj.message === 'string') {
                        return responseObj.message;
                    }

                    // Yoki error bo‘lsa
                    if (typeof responseObj.error === 'string') {
                        return responseObj.error;
                    }

                    return JSON.stringify(res); // fallback
                }

                return 'Unexpected error format';
            })()
            : 'Internal server error';

            console.log(exception)

        response.status(status).json(exception);
    }
}
