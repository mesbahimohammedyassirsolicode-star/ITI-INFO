import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/motionVariants';
import SectionTitle from '../features/home/components/SectionTitle';
import TrainingCard from '../features/home/components/TrainingCard';
import { trainingPrograms, whyChooseUs } from '../features/home/data/content';

const Home = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    training: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const trainingOptions = useMemo(() => trainingPrograms.map((program) => program.title), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email.';
    if (!/^[0-9+\s()-]{8,}$/.test(formData.phone.trim())) nextErrors.phone = 'Enter a valid phone.';
    if (!formData.training) nextErrors.training = 'Please select a training program.';
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setIsSubmitted(true);
    setFormData({ fullName: '', email: '', phone: '', training: '', message: '' });
  };

  return (
    <div className="bg-white text-slate-900 transition-colors dark:bg-[#0B0F19] dark:text-[#F9FAFB]">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,207,255,0.28),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(0,89,255,0.14),transparent_45%)]" />
        <motion.div
          className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Start Your Career in Tech with ITI Info
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-300 sm:text-lg">
              Join career-focused training programs built to help students gain practical tech skills and register
              quickly with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#training"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#00CFFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-105 sm:w-auto"
              >
                Explore Training
              </a>
              <a
                href="#registration"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 sm:w-auto"
              >
                Register Now
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-2xl shadow-cyan-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop"
              alt="Students learning tech skills"
              loading="lazy"
              className="h-[320px] w-full rounded-2xl object-cover"
            />
          </div>
        </motion.div>
      </section>

      <section id="training" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="Training Section"
            subtitle="Explore structured programs designed to build practical skills and career readiness."
          />
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {trainingPrograms.map((program) => (
              <motion.div key={program.title} variants={fadeUp}>
                <TrainingCard {...program} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="registration" className="bg-[#F5F7FA] px-4 py-16 dark:bg-[#111827] sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionTitle title="Registration Section" subtitle="Register بسهولة and secure your place in your preferred training program." />
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-cyan-500/20"
              />
              {errors.fullName ? <p className="mt-1 text-xs text-red-500">{errors.fullName}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-cyan-500/20"
                />
                {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-cyan-500/20"
                />
                {errors.phone ? <p className="mt-1 text-xs text-red-500">{errors.phone}</p> : null}
              </div>
            </div>

            <div>
              <label htmlFor="training" className="mb-1 block text-sm font-medium">
                Training choice
              </label>
              <select
                id="training"
                name="training"
                value={formData.training}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-cyan-500/20"
              >
                <option value="">Select a program</option>
                {trainingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.training ? <p className="mt-1 text-xs text-red-500">{errors.training}</p> : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-cyan-500/20"
              />
            </div>

            <motion.button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[#00CFFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Now
            </motion.button>
            {isSubmitted ? (
              <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
                Your registration request has been submitted successfully.
              </p>
            ) : null}
          </form>
        </motion.div>
      </section>

      <section id="why-us" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Why Choose Us" subtitle="Clear strengths that support students through their learning journey." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <motion.article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="material-symbols-outlined rounded-xl bg-cyan-100 p-3 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#F5F7FA] px-4 py-16 dark:bg-[#111827] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="Contact Section" subtitle="Reach out for program details, schedules, and registration support." />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: 'mail', label: 'Email', value: 'contact@itiinfo.ma' },
              { icon: 'call', label: 'Phone', value: '+212 6 00 00 00 00' },
              { icon: 'location_on', label: 'Location', value: 'Tanger, Morocco' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="material-symbols-outlined text-cyan-500">{item.icon}</span>
                <p className="mt-2 text-xs uppercase text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl rounded-2xl bg-slate-900 px-6 py-12 text-center text-white dark:bg-slate-800 sm:px-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to start your journey?</h2>
          <a
            href="#registration"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#00CFFF] px-8 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            Register Now
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
