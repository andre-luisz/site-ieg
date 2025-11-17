'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'success' | 'error' | 'duplicate' | 'invalidEmail' | null;

// ajuste aqui se quiser permitir mais domínios
const ALLOWED_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'yahoo.com',
  'icloud.com',
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!data.name || !data.email || !data.message) {
      setStatus('error');
      return;
    }

    // ✅ valida domínio do e-mail
    const email = data.email.trim().toLowerCase();
    const domain = email.split('@')[1];

    if (!domain || !ALLOWED_DOMAINS.includes(domain)) {
      setStatus('invalidEmail');
      return;
    }

    if ((data.message || '').trim().length < 20) {
      alert('Escreva uma mensagem um pouquinho maior, por favor. 😊');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('contato_mensagens').insert([
        {
          nome: data.name,
          email: data.email,
          assunto: data.subject || null,
          mensagem: data.message,
        },
      ]);

      if (error) {
        // 23505 = unique_violation (mesmo email + dia)
        if ((error as any).code === '23505') {
          setStatus('duplicate');
        } else {
          console.error('Erro ao salvar mensagem:', error);
          setStatus('error');
        }
        return;
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-4 text-sm">
      <input
        name="name"
        className="rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Seu nome"
        required
      />
      <input
        name="email"
        type="email"
        className="rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Seu e-mail (apenas Gmail, Hotmail, Outlook…)"
        required
      />
      <input
        name="subject"
        className="rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Assunto (opcional)"
      />
      <textarea
        name="message"
        className="md:col-span-3 rounded-xl border border-slate-300 px-4 py-2.5 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Mensagem"
        required
      />

      <div className="md:col-span-3 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <button
            disabled={loading}
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-5 py-2.5 hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar mensagem
              </>
            )}
          </button>

          {status === 'success' && (
            <span className="inline-flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Mensagem enviada com sucesso!
            </span>
          )}
          {status === 'duplicate' && (
            <span className="inline-flex items-center gap-1 text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              Você já enviou uma mensagem hoje. Obrigado! 🙏
            </span>
          )}
          {status === 'invalidEmail' && (
            <span className="inline-flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              Use um e-mail de provedor comum (gmail, hotmail, outlook, yahoo…).
            </span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              Não foi possível enviar. Tente novamente mais tarde.
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500">
          As mensagens são registradas com segurança no banco de dados. Limitamos o envio
          e aceitamos apenas provedores de e-mail mais comuns para reduzir spam.
        </p>
      </div>
    </form>
  );
}
