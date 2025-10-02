import TestimonialCard from "@/components/TestimonialCard";

export default function Testimonials() {
  const testimonials = [
    { name: "John & Maria", text: "Absolutely amazing work! You captured our wedding perfectly." },
    { name: "BrandX", text: "Professional and creative. Our product videos boosted engagement instantly." },
    { name: "Sam", text: "Loved the travel reel. It was cinematic and inspiring." },
  ];

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-12">Testimonials</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} name={t.name} text={t.text} />
        ))}
      </div>
    </section>
  );
}
