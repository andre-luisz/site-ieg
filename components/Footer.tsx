import Container from './Container';


export default function Footer() {
return (
<footer className="py-8 border-t border-slate-200">
<Container>
<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
<p>© {new Date().getFullYear()} Igreja do Evangelho da Graça. Todos os direitos reservados.</p>
<div className="flex items-center gap-4">
<a href="/privacidade" className="hover:text-blue-600">Privacidade</a>
<a href="/termos" className="hover:text-blue-600">Termos</a>
</div>
</div>
</Container>
</footer>
);
}