import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
      icon: "🩺",
      title: "Health & Safety Kit",
      description: "Recommends medicines, adapters, or travel essentials.",
    },
    {
      icon: "💸",
      title: "Expense Tracking",
      description: "Track your trip spending with AI-powered insights.",
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
    <div className="w-full min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="w-full border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-2xl">✨</span>
            <h1 className="text-xl font-bold tracking-tight">PackMate</h1>
          </div>
          <div className="hidden w-full md:flex justify-center items-center gap-6 text-sm font-medium">
            <Link
              to="features"
              smooth
              duration={600}
              offset={-80}
              className="cursor-pointer hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="benefits"
              smooth
              duration={600}
              offset={-80}
              className="cursor-pointer hover:text-primary"
            >
              Benefits
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleLogin}>
              Sign In
            </Button>
            <Button onClick={handleGetStarted}>Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-background to-muted">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-extrabold mb-6 leading-tight"
          >
            Smarter Packing, Powered by{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground mb-8"
          >
            From outfit planning to AI luggage checks, PackMate helps you save
            time, pack light, and never forget an essential again.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Link
              to="features"
              smooth
              duration={600}
              offset={-80}
              className="cursor-pointer"
            >
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Features</h2>
            <p className="text-lg text-muted-foreground">
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
              >
                <Card className="h-full hover:shadow-md transition">
                  <CardHeader>
                    <div className="text-3xl">{f.icon}</div>
                    <CardTitle>{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {f.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Benefits</h2>
            <p className="text-lg text-muted-foreground">
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
              >
                <Card className="h-full hover:shadow-md transition">
                  <CardHeader>
                    <div className="text-3xl">{b.icon}</div>
                    <CardTitle>{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {b.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Showcase */}
      <section id="screenshots" className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {/* Chat Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full rounded-3xl border border-indigo-200 bg-background shadow-lg overflow-hidden">
                <img
                  src="/screens/chat.png"
                  alt="Smart Chat"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <div className="space-y-5">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                Chat
              </Badge>
              <h3 className="text-3xl font-bold">Smart Chat</h3>
              <p className="text-lg text-muted-foreground">
                Plan trips like chatting with a friend — our AI suggests packing
                lists, travel hacks, and more in natural conversation.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Chat about your trip plans</li>
                <li>AI generates personalized packing lists</li>
                <li>Instant suggestions & reminders</li>
              </ul>
            </div>
          </div>

          {/* Dashboard Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-last md:order-first space-y-5">
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Dashboard
              </Badge>
              <h3 className="text-3xl font-bold">Trip Dashboard</h3>
              <p className="text-lg text-muted-foreground">
                Get a bird’s-eye view of all your trips — packing status,
                reminders, expenses, and weather updates in one place.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Centralized trip management</li>
                <li>Weather-aware packing alerts</li>
                <li>Visual progress tracking</li>
              </ul>
            </div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full rounded-3xl border bg-background shadow-lg overflow-hidden">
                <img
                  src="/dashboard.png"
                  alt="Trip Dashboard"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* Suggestions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full rounded-3xl border border-indigo-200 bg-background shadow-lg overflow-hidden">
                <img
                  src="/screens/suggestions.png"
                  alt="AI Suggestions"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <div className="space-y-5">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                AI
              </Badge>
              <h3 className="text-3xl font-bold">AI Suggestions</h3>
              <p className="text-lg text-muted-foreground">
                Context-aware recommendations based on your destination, trip
                type, and preferences.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Business vs. adventure packing modes</li>
                <li>Smart clothing combinations</li>
                <li>Destination-specific essentials</li>
              </ul>
            </div>
          </div>

          {/* Expense Tracking Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-last md:order-first space-y-5">
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                Finance
              </Badge>
              <h3 className="text-3xl font-bold">Expense Tracking</h3>
              <p className="text-lg text-muted-foreground">
                Keep an eye on your spending during trips. AI categorizes
                expenses and gives insights so you stay on budget.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Daily and total expense tracking</li>
                <li>Smart categorization (food, travel, shopping)</li>
                <li>Budget alerts & insights</li>
              </ul>
            </div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full rounded-3xl border  bg-background shadow-lg overflow-hidden">
                <img
                  src="/expense.png"
                  alt="Expense Tracking"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section id="testimonials" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">What Travelers Say</h2>
          <p className="text-lg text-muted-foreground">
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
            >
              <Card className="h-full bg-muted/40">
                <CardContent className="p-6">
                  <p className="text-sm italic mb-4">“{t.feedback}”</p>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* Final CTA */}
      {/* Call to Action */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-sky-950 via-blue-950 to-indigo-950 overflow-hidden">
        {/* Decorative overlay */}
        <div className="absolute inset-0 opacity-20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Ready to Pack Smarter?
            </span>
          </h2>
          <p className="text-lg sm:text-xl mb-10 text-indigo-100 leading-relaxed">
            Join thousands of travelers simplifying their trips with PackMate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold shadow-md"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span className="font-semibold">PackMate</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Contact
            </a>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-sm text-muted-foreground">
          © 2025 PackMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
