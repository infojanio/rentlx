import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  //obs. não se usa async, await dentro do construtor
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        console.log(account);
        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  public async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8'); //pega a template e coloca na variável

    const templateParse = handlebars.compile(templateFileContent); //compila o template

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Equipe: Rentx <norepaly@rentx.com.br',
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
