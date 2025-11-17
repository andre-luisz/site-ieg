import Container from "@/components/Container";
import Section from "@/components/Section";
import VideosClient from "@/components/VideosClient";

export const metadata = {
  title: "Mensagens | Igreja do Evangelho da Graça",
};

export default function MensagensPage() {
  return (
    <Section id="mensagens" className="bg-slate-50 border-y border-slate-200">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold tracking-tight">Mensagens</h2>
          <a
            className="text-sm text-blue-600 hover:underline"
            href="https://www.youtube.com/@igrejadoevangelhodagraca"
            target="_blank"
            rel="noreferrer"
          >
            Ver canal no YouTube →
          </a>
        </div>

        <div className="mt-6">
          <VideosClient initialLimit={9} />
        </div>
      </Container>
    </Section>
  );
}
