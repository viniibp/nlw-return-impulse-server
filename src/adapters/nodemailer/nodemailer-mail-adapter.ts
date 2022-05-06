import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d5c12af881dbaa",
    pass: "6e191f59f51033"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { subject, body } = data;
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Vinícius Batista <viniibp@gmail.com>',
      subject,
      html: body
    });
  }
}