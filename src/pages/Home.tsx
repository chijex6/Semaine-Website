import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Shield, Bell, Lock, Heart, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, animate, useMotionValue, useInView } from "framer-motion";
const fadeIn = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.6
  }
};
const features = [{
  icon: <Shield className="w-8 h-8 text-red-500" />,
  title: "Premium Protection",
  description: "High-quality security products designed for your safety"
}, {
  icon: <Bell className="w-8 h-8 text-red-500" />,
  title: "Instant Alert",
  description: "Quick response features for emergency situations"
}, {
  icon: <Lock className="w-8 h-8 text-red-500" />,
  title: "Reliable Security",
  description: "Trusted by thousands of customers worldwide"
}, {
  icon: <Heart className="w-8 h-8 text-red-500" />,
  title: "Peace of Mind",
  description: "24/7 protection for you and your loved ones"
}];
const testimonials = [{
  name: "Sarah Johnson",
  role: "Verified Customer",
  content: "The personal alarm gave me confidence to go running at dawn. Excellent product!",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
}, {
  name: "Michael Chen",
  role: "Verified Customer",
  content: "Best investment in personal security. The quality is outstanding.",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
}];
const stats = [{
  number: 50000,
  label: "Protected Customers"
}, {
  number: 99.9,
  label: "Satisfaction Rate",
  suffix: "%"
}, {
  number: 24,
  label: "Hour Support",
  suffix: "/7"
}, {
  number: 5,
  label: "Star Rating",
  suffix: "/5"
}];
const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white border-t border-gray-100"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
          <div className="flex items-center space-x-3 group">
            <Mail className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            <a 
              href="mailto:support@semaine.com" 
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              support@semaine.com
            </a>
          </div>
          <div className="flex items-center space-x-3 group">
            <Phone className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            <a 
              href="tel:+11234567890" 
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              +1 (123) 456-7890
            </a>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { icon: <Facebook className="w-6 h-6" />, name: 'Facebook' },
              { icon: <Twitter className="w-6 h-6" />, name: 'Twitter' },
              { icon: <Instagram className="w-6 h-6" />, name: 'Instagram' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Additional Sections */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          <nav className="flex flex-col space-y-2">
            {['Privacy Policy', 'Terms of Service', 'Security Tips'].map((item, index) => (
              <a 
                key={index}
                href="#"
                className="text-gray-600 hover:text-red-600 transition-colors hover:pl-2 duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Branding */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">Semaine</span>
          </div>
          <p className="text-sm text-gray-600">
            Empowering your safety since 2020
          </p>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-600"
      >
        © {new Date().getFullYear()} Semaine Security. All rights reserved.
      </motion.div>
    </div>
  </motion.footer>
);

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}

const AnimatedNumber = ({
  value,
  suffix = ""
}: AnimatedNumberProps) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView && !hasAnimated) {
      animate(motionValue, value, {
        duration: 2,
        ease: "easeOut"
      });
      setHasAnimated(true);
    }
  }, [isInView, value, motionValue, hasAnimated]);
  const rounded = useTransform(motionValue, latest => Math.round(latest));
  return <motion.div ref={ref} className="text-5xl font-bold text-red-600 flex justify-center items-center">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.div>;
};
export const Home = () => {
  const {
    scrollYProgress
  } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  return <div className="w-full bg-white overflow-hidden">
      <div className="relative">
        <motion.div style={{
        scale: heroScale,
        opacity: heroOpacity
      }} className="absolute inset-0 bg-center bg-cover" initial={{
        scale: 1.1
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.8
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
          <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3" alt="Security" className="w-full h-full object-cover" />
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center">
            <motion.div initial={{
            scale: 0.5,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="mb-8">
              <Shield className="h-16 w-16 text-red-500 mx-auto" />
            </motion.div>
            <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.3
          }}>
              Protect What
              <br />
              <span className="text-red-500">Matters Most</span>
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.4
          }}>
              Discover our premium selection of personal security products
              designed to keep you and your loved ones protected.
            </motion.p>
            <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.5
          }}>
              <Link to="/products" className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-200 transform hover:scale-105">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <motion.div key={index} className="text-center" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                <div className="text-gray-600 mt-2 text-lg">{stat.label}</div>
              </motion.div>)}
          </div>
        </div>
      </div>
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Semaine?
            </h2>
            <p className="text-xl text-gray-600">
              We provide the best in personal security solutions
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <motion.div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            y: -5
          }}>
                <motion.div className="mb-6 text-red-500" whileHover={{
              scale: 1.1
            }} transition={{
              type: "spring",
              stiffness: 300
            }}>
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>)}
          </div>
        </div>
      </div>
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => <motion.div key={index} className="bg-gray-50 p-8 rounded-lg" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.2
          }}>
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <p className="text-gray-900 font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </div>
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                24/7 Emergency Response Ready
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our products are designed to provide immediate assistance when
                you need it most. With built-in emergency response features,
                help is always just a button press away.
              </p>
              <Link to="/products" className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <motion.div className="relative h-96" whileHover={{
            scale: 1.02
          }} transition={{
            duration: 0.3
          }}>
              <img src="https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-4.0.3" alt="Emergency Response" className="w-full h-full object-cover rounded-lg shadow-xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div className="bg-gradient-to-r from-red-600 to-red-700 py-16" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} viewport={{
      once: true
    }}>
        <div className="w-full bg-white overflow-hidden">
          <Footer />
        </div>
      </motion.div>
    </div>;
};