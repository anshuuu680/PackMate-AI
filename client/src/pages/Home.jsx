import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🌤",
      title: "Weather-aware Packing",
      description: "Fetch real-time forecasts and suggest suitable outfits.",
    },
    {
      icon: "🧳",
      title: "Smart Luggage Optimization",
      description: "Mix-and-match outfit planning to reduce baggage weight.",
    },
    {
      icon: "🎯",
      title: "Context-aware Suggestions",
      description: "Adapts lists for business trips, adventures, or vacations.",
    },
    {
      icon: "🛒",
      title: "Shopping Assistant",
      description: "Recommends essentials with e-commerce integration.",
    },
    {
      icon: "📸",
      title: "AI Packing Validator",
      description: "Upload suitcase photo—AI checks if you forgot items.",
    },
    {
      icon: "🩺",
      title: "Health & Safety Kit",
      description: "Recommends medicines, adapters, or travel essentials.",
    },
  ];

  const benefits = [
    {
      icon: "⏰",
      title: "Save Time",
      description: "Personalized packing lists in minutes.",
    },
    {
      icon: "🎒",
      title: "Pack Smart",
      description: "Optimize luggage with mix-and-match outfits.",
    },
    {
      icon: "✅",
      title: "Stay Prepared",
      description: "AI validation ensures you never forget essentials.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Frequent Traveler",
      feedback:
        "PackMate made my trip stress-free. I packed lighter and didn’t forget a thing!",
    },
    {
      name: "James L.",
      role: "Business Consultant",
      feedback:
        "Finally, an app that thinks ahead. Perfect packing suggestions every time.",
    },
    {
      name: "Alicia K.",
      role: "Adventure Blogger",
      feedback:
        "I can focus on experiences instead of packing headaches. Highly recommend!",
    },
  ];

  const logos = ["✈️", "🏨", "🛍️", "🌍", "🚀"];

  const handleGetStarted = () => navigate("/auth/register");
  const handleLogin = () => navigate("/auth/login");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div
      style={{ fontFamily: "Work sans" }}
      className="w-full min-h-screen bg-white font-manrope text-gray-900 overflow-x-hidden"
    >
      {/* Header */}
      <header className="w-full border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-2xl">✨</span>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              PackMate
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="features"
              smooth
              duration={600}
              offset={-80}
              className="cursor-pointer hover:text-indigo-600"
            >
              Features
            </Link>
            <Link
              to="benefits"
              smooth
              duration={600}
              offset={-80}
              className="cursor-pointer hover:text-indigo-600"
            >
              Benefits
            </Link>
            <Link
              to="testimonials"
              smooth
              duration={600}
              offset={-80}
              className="cursor-pointer hover:text-indigo-600"
            >
              Testimonials
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Sign In
            </button>
            <button
              onClick={handleGetStarted}
              className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      <section className="text-center py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl font-extrabold mb-6 text-gray-900 leading-tight"
          >
            Smarter Packing, Powered by{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-600 mb-8"
          >
            From outfit planning to AI luggage checks, PackMate helps you save
            time, pack light, and never forget an essential again.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
            <Link
              to="features"
              smooth
              duration={600}
              offset={-80}
              className="px-8 py-3 text-lg font-medium text-gray-800 border border-gray-300 rounded-lg hover:border-indigo-400 transition cursor-pointer flex items-center justify-center"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Features</h2>
            <p className="text-lg text-gray-600">
              Everything you need for stress-free travel packing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md p-6 transition"
              >
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Benefits</h2>
            <p className="text-lg text-gray-600">
              Why travelers choose PackMate for their journeys.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md p-8 transition"
              >
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-600">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            What Travelers Say
          </h2>
          <p className="text-lg text-gray-600">
            Loved by thousands of frequent flyers and explorers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-50 rounded-xl shadow p-6 text-left"
            >
              <p className="text-sm text-gray-700 italic mb-4">
                “{t.feedback}”
              </p>
              <div className="text-sm font-semibold text-gray-900">
                {t.name}
              </div>
              <div className="text-xs text-gray-500">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Pack Smarter?
        </h2>
        <p className="text-lg mb-8 text-indigo-100">
          Join thousands of travelers using PackMate today.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 text-lg font-semibold bg-white text-indigo-700 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span className="font-semibold text-gray-900">PackMate</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-indigo-600">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-600">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-600">
              Contact
            </a>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 PackMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
