import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Digits only, country code without + (India 91…) */
const WHATSAPP_ENQUIRY_NUMBER = '919403611664';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  sendEnquiryToWhatsApp(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const phone = String(fd.get('phone') ?? '').trim();
    const subject = String(fd.get('subject') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();

    const text = [
      '*Enquiry — Rajlaxmi Solar Enterprises*',
      '',
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      `*Phone:* ${phone}`,
      `*Subject:* ${subject}`,
      '',
      '*Message:*',
      message,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_ENQUIRY_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
