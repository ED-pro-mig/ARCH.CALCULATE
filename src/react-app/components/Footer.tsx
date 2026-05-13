import { MessageCircle, Send } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/79096404540";
const TELEGRAM_URL = "https://t.me/lizadetkova";
const PRIVACY_URL = "https://lizadetkova.com/privacy";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground font-body">
            Или свяжитесь с нами напрямую
          </p>
          <div className="flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:opacity-70 transition-opacity font-body"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:opacity-70 transition-opacity font-body"
              aria-label="Telegram"
            >
              <Send className="w-5 h-5" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border text-center">
          <a
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
