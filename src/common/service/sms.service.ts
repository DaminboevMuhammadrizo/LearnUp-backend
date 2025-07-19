import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { SMSSendResponse } from "../types/sms";

@Injectable()
export class SmsService {
    private readonly TOKEN = process.env.SMS_TOKEN
    private readonly $from = process.env.SMS_FROM
    private readonly URL = process.env.SMS_URL
    private readonly USERNAME = process.env.SMS_LOGIN
    private readonly CALLBACK_URL = process.env.SMS_CALLBACK_URL

    private $axsios = axios.create({ baseURL: this.URL })

    public async sendSMS(message: string, to: string) {
        try {
            const { data } = await this.$axsios.post<{ data: { token: string } }>('/auth/login', {
                email: this.USERNAME,
                password: this.TOKEN
            })

            await this.$axsios.post<SMSSendResponse>('/message/sms/send', {
                from: this.$from,
                message,
                mobile_phone: to.replace(/[\\s+]/g, ''),
                callback_url: this.CALLBACK_URL
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + data.data.token
                    }
                }
            )
            return true
        } catch (error) {
            console.log(error)
            const status = error.response.status || HttpStatus.BAD_REQUEST;
            const msg = error.response.statusText || error?.message || 'Unknown SMS error';
            throw new HttpException(`SMS Service: ${msg}`, status);
        }
    }
}