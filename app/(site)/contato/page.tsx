import Container from '@/components/Container';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';


export default function ContatoPage() {
return (
<Section id="contato">
<Container>
<h2 className="text-3xl font-bold tracking-tight">Fale com a gente</h2>
<div className="mt-6">
<ContactForm />
</div>
</Container>
</Section>
);
}