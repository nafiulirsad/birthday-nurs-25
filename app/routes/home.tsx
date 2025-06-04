import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showContent && typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setShowConfetti(true);
    }
  }, [showContent]);

  const handleStart = () => {
    setShowContent(true);
    const audio = document.getElementById("background-audio") as HTMLAudioElement;
    if (audio) {
      audio.volume = 1;
      audio.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    }
  };

  const paragraphs = [
    {
      title: null,
      text: "Hari ini adalah hari istimewa. Hari di mana dunia diperkaya oleh kehadiranmu yang penuh kehangatan. Selamat ulang tahun, sosok yang tidak hanya cantik luar dalam, tapi juga selalu tulus memberi tanpa pamrih.",
    },
    {
      title: "Karena Kamu Istimewa 💖",
      text: "Setiap detik bersamamu adalah hadiah. Caramu tersenyum, menyapa dengan lembut, dan menghadirkan kedamaian di tengah kekacauan—semua itu membuatku bersyukur bisa mengenalmu.",
    },
    {
      title: null,
      text: "Di hari ulang tahunmu ini, aku tak hanya berharap kamu bahagia, tapi juga merasa dicintai, dihargai, dan dipeluk hangat oleh semua cinta di sekelilingmu.",
    },
    {
      title: null,
      text: "Hidup tidak selalu mudah, tapi kamu telah melaluinya dengan kekuatan yang luar biasa. Kamu tetap lembut, tetap hangat, tetap kamu.",
    },
    {
      title: null,
      text: "Semoga setiap harapan yang kamu simpan dalam diam perlahan menjadi nyata. Dan semoga kamu tidak pernah merasa sendiri, karena aku—dan banyak orang lainnya—akan selalu ada untukmu.",
    },
    {
      title: "Untuk Tujuan Indah Kita 💍",
      text: "Di antara semua harapan dan doa, ada satu impian yang terus tumbuh: membangun masa depan bersamamu, dalam ikatan suci yang penuh cinta. Aku tahu jalan ke sana tidak selalu mudah, tapi aku ingin terus memperjuangkannya, bersamamu, setapak demi setapak. Karena kamu adalah rumah yang selalu aku rindukan, dan menikah denganmu adalah bagian terindah dari tujuan hidupku.",
    },
    {
      title: null,
      text: "Terima kasih karena telah menjadi kamu. Dunia ini lebih indah karena kamu ada di dalamnya.",
    },
  ];

  if (!showContent) {
    return (
      <div className="min-h-[80vh] bg-black flex items-center justify-center">
        <button onClick={handleStart} className="cursor-pointer">
          <img
            src="/assets/tart-cake.jpg"
            alt="Tart Cake"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 hover:scale-110 transition-transform rounded-xl"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {showConfetti && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}

      {paragraphs.map((para, index) => (
        <section
          key={index}
          ref={index === 1 ? nextRef : null}
          className="snap-center min-h-[80vh] px-6 flex items-center justify-center text-center"
        >
          <div className="max-w-3xl w-full fade-in-up">
            <div className="flex flex-col justify-center items-center min-h-[80vh] space-y-6">
              {index === 0 && (
                <>
                  <h1 className="text-4xl font-bold text-pink-500">
                    🎉 Selamat Ulang Tahun, <br />
                    Sayangku Nur Sholikhah! 🎂
                  </h1>
                  <p className="text-lg text-pink-300">
                    5 Juni 2000 — Hari ini kamu genap berusia{" "}
                    <span className="font-semibold text-pink-400">
                      25 tahun
                    </span>
                  </p>
                </>
              )}
              {para.title && index !== 0 && (
                <h2 className="text-xl text-pink-400">{para.title}</h2>
              )}
              <p className="text-2xl text-pink-100 leading-relaxed text-justify">
                {para.text}
              </p>

              {index === 0 && (
                <button
                  onClick={() =>
                    nextRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-6 text-pink-400 animate-bounce text-3xl"
                  aria-label="Scroll ke bawah"
                >
                  ↓
                </button>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="snap-center min-h-screen flex flex-col items-center justify-center">
        <Link
          to="/gallery"
          className="bg-pink-600 text-white px-6 py-3 rounded-md text-xl shadow hover:bg-pink-700 transition"
        >
          Yuk, Lihat Kenangan Manis Kita 📸
        </Link>
      </section>
    </div>
  );
}
