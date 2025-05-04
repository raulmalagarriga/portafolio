import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useLanguage } from "@/contexts/language-context"
import { Send } from 'react-feather';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import emailjs from '@emailjs/browser';
import DecryptText from './decrypt-text';


interface ContactFormProps {
  contactVisible: boolean;
}

type SubmissionStatus = 'loading' | 'success' | 'error' | null;

const ContactForm: React.FC<ContactFormProps> = ({ contactVisible }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('loading');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    try {
      await emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey);
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 section-title">
            <span className="text-white">{">"}</span>{" "}
            {contactVisible ? (
              <DecryptText
                text={t("contact.title")}
                duration={1200}
                isVisible={true}
                animationColor="text-theme-light"
              />
            ) : (
              t("contact.title")
            )}
        </h2>
        <div
          className={`section-content ${contactVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDuration: "1s" }}
        >
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className={`${contactVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                <label htmlFor="name" className="block text-gray-300 mb-1 text-sm">
                  {t("contact.name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.placeholder.name")}
                  className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0 text-sm"
                  required
                />
              </div>
              <div
                className={`${contactVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                <label htmlFor="email" className="block text-gray-300 mb-1 text-sm">
                  {t("contact.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.placeholder.email")}
                  className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0 text-sm"
                  required
                />
              </div>
            </div>
            <div
              className={`${contactVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <label htmlFor="subject" className="block text-gray-300 mb-1 text-sm">
                {t("contact.subject")}
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t("contact.placeholder.subject")}
                className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0 text-sm"
                required
              />
            </div>
            <div
              className={`${contactVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <label htmlFor="message" className="block text-gray-300 mb-1 text-sm">
                {t("contact.message")}
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.placeholder.message")}
                rows={4}
                className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0 text-sm"
                required
              />
            </div>
            <div
              className={`${contactVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
            >
              <Button
                type="submit"
                disabled={submissionStatus === 'loading'}
                className="bg-theme text-black hover:bg-theme-light flex items-center gap-2 text-sm"
              >
                {submissionStatus === 'loading' ? t("contact.sending") : t("contact.send")}{" "}
                <Send className="h-4 w-4" />
              </Button>
              {submissionStatus === 'success' && (
                <p className="text-green-500 text-sm mt-2">{t("contact.success")}</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-500 text-sm mt-2">{t("contact.error")}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;