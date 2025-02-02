import { Injectable } from '@nestjs/common';
import * as Speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class TwoFactorAuthService {
  constructor() {}
  private readonly qrName = process.env.QR_ENV || 'MyApp';

  async generate2faAuthCode(userEmail: string) {
    const secret = Speakeasy.generateSecret({
      length: 20,
      name: `${this.qrName} (${userEmail})`,
    });

    const qrUrl = await QRCode.toDataURL(secret.otpauth_url, {
      errorCorrectionLevel: 'M',
    });

    return {
      base32: secret.base32,
      qrUrl,
    };
  }

  verify2faAuthCode(secret: string, token: string): boolean {
    return Speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 0,
    });
  }
}
