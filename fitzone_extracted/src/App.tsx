import React, { useEffect, useRef, useState } from 'react';
import { 
  Dumbbell, 
  Play, 
  UserCheck, 
  ClipboardList, 
  Users, 
  Flame, 
  Activity, 
  Flower2, 
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Menu,
  Star,
  X
} from 'lucide-react';

function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 240;
    const currentFrame = (index: number) => (
      `frames/frame_${index.toString().padStart(6, '0')}.jpg`
    );

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    const img = new Image();
    img.src = currentFrame(1);
    
    img.onload = function() {
      canvas.width = img.width || 1920;
      canvas.height = img.height || 1080;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const updateImage = (index: number) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const handleScroll = () => {
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      
      // Prevent division by zero if page isn't scrollable
      if (maxScrollTop <= 0) return;

      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );
      
      requestAnimationFrame(() => updateImage(frameIndex + 1));
    };

    window.addEventListener('scroll', handleScroll);
    preloadImages();

    // Trigger once on mount to handle initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: -10
      }}
    />
  );
}

function Navbar({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <nav className="flex items-center justify-between px-6 lg:px-16 py-6 border-b border-white/5">
      <div className="flex items-center gap-3">
        <img src="/logo.jpg" alt="Life Fitness Logo" className="h-16 w-auto object-contain" />
        <div className="flex flex-col">
          <span className="font-black text-2xl leading-none tracking-wider">LIFE FITNESS</span>
          <span className="text-[10px] tracking-[0.2em] text-gray-400 font-bold mt-0.5">STRONGER EVERYDAY</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest">
        <a href="#home" className="text-white hover:text-yellow-500 transition-colors">HOME</a>
        <a href="#gallery" className="text-white hover:text-yellow-500 transition-colors">OUR GALLERY</a>
        <a href="#programs" className="text-white hover:text-yellow-500 transition-colors">CLASSES</a>
        <a href="#contact" className="text-white hover:text-yellow-500 transition-colors">CONTACT</a>
      </div>
      <button onClick={onJoinClick} className="hidden lg:block bg-yellow-500 text-black px-6 py-2.5 font-bold text-sm rounded hover:bg-yellow-400 transition-colors tracking-wide">
        JOIN NOW
      </button>
      <button className="lg:hidden text-white">
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
}

function Hero({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section id="home" className="relative px-6 lg:px-16 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-lg lg:text-xl text-gray-200 font-bold uppercase tracking-widest mb-4">
            Build strength.<br/>Build confidence.
          </h2>
          <h1 className="text-6xl lg:text-[5.5rem] font-black uppercase leading-[1.05] mb-6 tracking-wide">
            Become<br />
            <span className="text-yellow-500">Your Best</span>
          </h1>
          <p className="text-gray-400 text-base max-w-md mb-10 leading-relaxed">
            Join a community that pushes you, supports you and helps you become the strongest version of yourself.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={onJoinClick} className="bg-yellow-500 text-black px-8 py-3.5 font-bold rounded flex items-center gap-2 hover:bg-yellow-400 transition-colors text-sm tracking-wide">
              JOIN NOW <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Dumbbell, title: 'MODERN EQUIPMENT', desc: 'Top quality machines and equipments for effective workouts.' },
    { icon: UserCheck, title: 'EXPERT TRAINERS', desc: 'Certified & experienced trainers to guide you every step.' },
    { icon: ClipboardList, title: 'PERSONALIZED PLANS', desc: 'Workout and diet plans tailored to your goals and lifestyle.' },
    { icon: Users, title: 'SUPPORTIVE COMMUNITY', desc: 'A positive environment that keeps you motivated and consistent.' }
  ];

  return (
    <section className="px-6 lg:px-16 -mt-8 relative z-20">
      <div className="max-w-7xl mx-auto bg-[#111] border border-white/5 rounded-2xl p-8 lg:p-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {features.map((feat, idx) => (
            <div key={idx} className={`flex gap-5 ${idx !== 0 ? 'md:pl-8 pt-8 md:pt-0' : ''}`}>
              <feat.icon className="w-10 h-10 text-yellow-500 shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-bold text-white mb-2 text-sm tracking-wide uppercase">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type ProgramDetails = {
  img: string;
  icon: any;
  title: string;
  desc: string;
  longDesc: string;
  benefits: string[];
};

function Programs({ onJoinClick }: { onJoinClick: () => void }) {
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetails | null>(null);

  const programs: ProgramDetails[] = [
    { 
      img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop', 
      icon: Dumbbell, 
      title: 'STRENGTH TRAINING', 
      desc: 'Build lean muscle and increase overall strength.',
      longDesc: 'Our Strength Training program is designed to help you build lean muscle mass, increase your raw power, and transform your physique. Using a combination of free weights, compound movements, and targeted isolation exercises, our expert coaches will guide you through progressive overload to ensure continuous results.',
      benefits: ['Increased muscle mass and definition', 'Boosted metabolism for continuous fat burn', 'Stronger bones and joints', 'Expert guidance on lifting form and technique']
    },
    { 
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop', 
      icon: Flame, 
      title: 'WEIGHT LOSS', 
      desc: 'Effective fat loss programs for a healthier you.',
      longDesc: 'Achieve your dream physique with our scientifically-backed Weight Loss program. We combine high-intensity interval training (HIIT), dynamic cardio, and nutritional guidance to create a sustainable calorie deficit while maintaining muscle mass. Get ready to sweat, burn fat, and feel more energetic than ever.',
      benefits: ['Rapid and sustainable fat loss', 'Improved cardiovascular health and stamina', 'Personalized diet and nutrition tips', 'High-energy, motivating workout sessions']
    },
    { 
      img: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&auto=format&fit=crop', 
      icon: Activity, 
      title: 'FUNCTIONAL TRAINING', 
      desc: 'Improve mobility, endurance and everyday performance.',
      longDesc: 'Functional Training prepares your body for real-life activities and sports. By focusing on movements such as pushing, pulling, squatting, and lifting, this program enhances your core stability, balance, and overall agility. It is perfect for anyone looking to move better, pain-free, in their daily life.',
      benefits: ['Enhanced core strength and stability', 'Better balance, coordination, and agility', 'Injury prevention for daily activities', 'Dynamic workouts that are never boring']
    },
    { 
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop', 
      icon: Flower2, 
      title: 'YOGA & WELLNESS', 
      desc: 'Balance your body and mind with yoga and stretching.',
      longDesc: 'Find your inner peace and restore your body with our Yoga & Wellness sessions. This program combines various styles of yoga, deep stretching, and breathwork to improve your flexibility, relieve stress, and aid in muscle recovery. It is the perfect complement to intense training or a stressful lifestyle.',
      benefits: ['Significantly improved flexibility and posture', 'Reduced stress and mental clarity', 'Faster muscle recovery and reduced soreness', 'Better breathing techniques and focus']
    }
  ];

  return (
    <section id="programs" className="px-6 lg:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase">OUR PROGRAMS</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-4 uppercase tracking-wide">
            Train. Focus. Achieve.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, idx) => (
            <div key={idx} className="bg-[#111] rounded-xl overflow-hidden border border-white/5 group hover:border-yellow-500/30 transition-colors">
              <div className="h-56 overflow-hidden">
                <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transition-all duration-500" />
              </div>
              <div className="p-8 flex flex-col h-[calc(100%-14rem)]">
                <prog.icon className="w-8 h-8 text-yellow-500 mb-5 shrink-0" strokeWidth={1.5} />
                <h3 className="font-bold text-white text-lg mb-3 tracking-wide uppercase">{prog.title}</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
                  {prog.desc}
                </p>
                <button onClick={() => setSelectedProgram(prog)} className="text-yellow-500 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wide">
                  LEARN MORE <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProgramModal isOpen={!!selectedProgram} onClose={() => setSelectedProgram(null)} program={selectedProgram} onJoinClick={() => { setSelectedProgram(null); onJoinClick(); }} />
    </section>
  );
}

function ProgramModal({ isOpen, onClose, program, onJoinClick }: { isOpen: boolean, onClose: () => void, program: ProgramDetails | null, onJoinClick: () => void }) {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-yellow-500/30 rounded-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-gray-300 hover:text-white transition-colors backdrop-blur-md">
          <X className="w-5 h-5" />
        </button>
        <div className="h-64 shrink-0 relative">
          <img src={program.img} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent"></div>
          <div className="absolute bottom-6 left-8 flex items-center gap-4">
            <program.icon className="w-10 h-10 text-yellow-500" strokeWidth={1.5} />
            <h3 className="text-3xl font-black text-white uppercase tracking-wide">{program.title}</h3>
          </div>
        </div>
        <div className="p-8 overflow-y-auto">
          <p className="text-gray-300 leading-relaxed mb-8">{program.longDesc}</p>
          <h4 className="text-yellow-500 font-bold text-sm uppercase tracking-widest mb-4">Key Benefits</h4>
          <ul className="grid sm:grid-cols-2 gap-4 mb-8">
            {program.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-yellow-500 shrink-0 mt-1" />
                <span className="text-sm text-gray-400 leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
          <button onClick={onJoinClick} className="w-full bg-yellow-500 text-black py-4 rounded font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors">
            JOIN THIS PROGRAM
          </button>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="px-6 lg:px-16 py-20 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase">SEE OUR GYM</span>
          <h3 className="text-4xl lg:text-5xl font-black text-white mt-4 uppercase tracking-wide">Our Gallery</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-6">
          <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop" alt="Gym" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop" alt="Gym Workout" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop" alt="Gym Equipment" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop" alt="Fitness" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1596357395217-80de13130e92?w=800&auto=format&fit=crop" alt="Gym Weights" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop" alt="Gym People" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section className="px-6 lg:px-16 py-20 bg-transparent border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase">ABOUT US</span>
        <h2 className="text-4xl lg:text-5xl font-black text-white mt-4 mb-6 uppercase leading-[1.1] tracking-wide">
          More than a gym,<br/>we are a community.
        </h2>
        <p className="text-gray-400 text-base leading-relaxed mb-8">
          At Life Fitness, we believe that true transformation starts from within. Our expert coaches and supportive community are dedicated to helping you push past your limits and build a stronger, healthier version of yourself.
          <br/><br/>
          Whether you're taking your very first step or striving for a new personal best, we provide the tools, guidance, and motivation you need to succeed every single day.
        </p>
        <button onClick={onJoinClick} className="bg-yellow-500 text-black px-8 py-3.5 font-bold rounded inline-flex items-center gap-2 hover:bg-yellow-400 transition-colors text-sm tracking-wide">
          JOIN OUR COMMUNITY <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  const footerInfo = [
    { icon: MapPin, title: 'ADDRESS', desc: '5th Floor, Life Fitness Pro Sidhivinayak Business Hub,\nCircle, nr. Ghevar Complex, Arihant Nagar, Shahibag,\nAhmedabad, Gujarat 380016' },
    { icon: Phone, title: 'PHONE', desc: '09157098443' },
    { icon: Mail, title: 'EMAIL', desc: 'hello@lifefitness.com' },
    { icon: Clock, title: 'OPENING HOURS', desc: 'Mon - Sat: 6:00 AM – 10:00 PM\nSunday: 7:00 AM – 12:00 PM' }
  ];

  return (
    <footer id="contact" className="bg-transparent py-16 px-6 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {footerInfo.map((info, idx) => (
          <div key={idx} className="flex gap-4">
            <info.icon className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h4 className="font-bold text-white text-sm tracking-widest mb-2 uppercase">{info.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{info.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

function Reviews() {
  const reviews = [
    {
      name: "Rahul Desai",
      rating: 5,
      date: "2 months ago",
      text: "Best gym in Shahibaug area! The equipment is top-notch, especially the Life Fitness Pro2 series. Spacious and very well maintained.",
    },
    {
      name: "Sneha Patel",
      rating: 5,
      date: "3 weeks ago",
      text: "The trainers are extremely knowledgeable and supportive. They actually pay attention to your form. Highly recommend for beginners!",
    },
    {
      name: "Amit Shah",
      rating: 4,
      date: "1 month ago",
      text: "Great atmosphere and a positive vibe. It gets a bit crowded in the evenings, but the management is friendly and cooperative.",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      date: "4 months ago",
      text: "I love the variety of machines they have. Clean changing rooms and the membership pricing is totally worth the facilities provided.",
    }
  ];

  return (
    <section className="px-6 lg:px-16 py-20 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase">TESTIMONIALS</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-4 uppercase tracking-wide">
              Rating & Reviews
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-6xl font-black text-white leading-none">4.7</span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current opacity-50" />
                </div>
                <span className="text-sm font-bold text-gray-400 tracking-wide uppercase">2,033 Reviews</span>
              </div>
            </div>
            <a href="https://maps.app.goo.gl/vdGGMMM4GxaPW33L6" target="_blank" rel="noreferrer" className="text-yellow-500 font-bold text-xs tracking-widest uppercase hover:text-yellow-400 transition-colors flex items-center gap-2 mt-2">
              READ ALL REVIEWS <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors flex flex-col h-full group">
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                {[...Array(5 - rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-700" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow">"{rev.text}"</p>
              <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-4">
                <div>
                  <h4 className="font-bold text-white tracking-wide uppercase text-sm mb-1">{rev.name}</h4>
                  <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <section className="px-6 lg:px-16 py-20 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-bold tracking-widest text-lg lg:text-xl uppercase">LOCATION</span>
          <h2 className="text-3xl lg:text-4xl font-black text-white mt-4 uppercase tracking-wide">
            Find Us Here
          </h2>
        </div>
        <div className="w-full h-[450px] rounded-xl overflow-hidden border border-white/5">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.1021962124482!2d72.599141!3d23.0567146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85edadbc8bed%3A0xc96b5e7a1ff0540!2sLife%20Fitness%20Pro!5e0!3m2!1sen!2sin!4v1786960098824!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919157098443"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
      <span className="absolute left-full ml-4 bg-black/80 text-white text-sm font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}

function JoinModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const duration = formData.get('duration');
    
    const message = `New Gym Membership Inquiry!%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0ADuration: ${duration}`;
    window.open(`https://wa.me/919157098443?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-yellow-500/30 rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-6">Join Life Fitness</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1 block">Full Name</label>
            <input name="name" required type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Enter your name" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1 block">Phone Number</label>
            <input name="phone" required type="tel" className="w-full bg-black/50 border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Enter your number" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1 block">Address</label>
            <textarea name="address" required className="w-full bg-black/50 border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none h-20" placeholder="Enter your address"></textarea>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1 block">Membership Duration</label>
            <select name="duration" required className="w-full bg-black/50 border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500 transition-colors [&>option]:bg-[#111]">
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-black py-3 rounded font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors mt-2">
            Send Inquiry to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-yellow-500 selection:text-black relative">
      <CanvasBackground />
      <div className="relative z-10 bg-black/60">
        <Navbar onJoinClick={() => setIsJoinModalOpen(true)} />
        <Hero onJoinClick={() => setIsJoinModalOpen(true)} />
        <Features />
        <Programs onJoinClick={() => setIsJoinModalOpen(true)} />
        <Gallery />
        <About onJoinClick={() => setIsJoinModalOpen(true)} />
        <Reviews />
        <LocationMap />
        <Footer />
        <WhatsAppButton />
      </div>
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </div>
  );
}
