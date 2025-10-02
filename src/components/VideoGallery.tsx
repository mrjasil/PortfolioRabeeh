export default function VideoGallery() {
  const videos = [
    { title: "Events", url: "/events.mp4" },
    { title: "House Warming", url: "/HouseWarming.mp4" },
    { title: "Commercial Ad", url: "/arch3.mp4" },
    { title: "Wedding Highlight", url: "/wedding.mp4" },
    { title: "Wedding Highlight", url: "/wedding2.mp4" },
    { title: "Wedding Highlight", url: "/bride.mp4" },
    { title: "Wedding Highlight", url: "/bridetobe.mp4" },
    { title: "Baby Shoot", url: "/ewa.mp4" },
];

  return (
    <section className="py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">🎥 Video Showcase</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <video controls className="w-200 h-120 object-cover">
              <source src={video.url} type="video/mp4" />
            </video>
            <div className="p-4 text-center">
              <p className="text-gray-300">{video.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
