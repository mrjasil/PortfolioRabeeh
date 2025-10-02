export default function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
      <p className="italic text-gray-300">“{text}”</p>
      <h4 className="mt-4 font-semibold text-white">- {name}</h4>
    </div>
  );
}
