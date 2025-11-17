// Server Component
export default function YTUploadsEmbed({ className = '' }: { className?: string }) {
  const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UC4xHcDzRPGsTuthS3OT3Cjg';
  const uploadsId = channelId.startsWith('UC') ? `UU${channelId.slice(2)}` : channelId;

  return (
    <div className={className}>
      <div className="aspect-video w-full bg-slate-100">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsId}`}
          title="Mensagens IEG"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-slate-600">Últimas mensagens do nosso canal.</p>
      </div>
    </div>
  );
}
