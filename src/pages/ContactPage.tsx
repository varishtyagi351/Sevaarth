import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Header, AnnouncementBar } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);

      // Supabase contact_messages table me data insert karein
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.phone.trim() 
            ? `Phone: ${formData.phone.trim()} | ${formData.message.trim()}`
            : formData.message.trim(),
        },
      ]);

      if (error) throw new Error(error.message);

      toast.success("Shukriya! Aapka message humare paas receive ho gaya hai.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#FAF8F5] font-sans text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 pb-16 pt-8 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-emerald-800 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">Contact Us</span>
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              <MessageSquare className="h-3.5 w-3.5" /> We are here to help
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-white">
              Get in Touch with Sevaarth
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-xs text-stone-600 sm:text-sm dark:text-stone-400">
              Bulk orders, distributor queries, ya product feedback — niche form fill karein, humari team 24 ghante ke andar reply karegi.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Left Info Panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-emerald-950 dark:text-emerald-300">
                  Contact Information
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-500">
                  Direct connection with our organic sourcing and supply network.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Harvesting &amp; Works</p>
                      <p className="text-sm font-bold text-stone-800 dark:text-stone-200">Mithila Heritage Valley, Madhubani / Darbhanga, Bihar, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Email Inquiry</p>
                      <p className="text-sm font-bold text-stone-800 dark:text-stone-200">support@sevaarthorganics.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Customer Care</p>
                      <p className="text-sm font-bold text-stone-800 dark:text-stone-200">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Operating Hours</p>
                      <p className="text-sm font-bold text-stone-800 dark:text-stone-200">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#FAF8F5] p-4 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                🌱 <span className="font-bold">Bulk Purchase note:</span> For commercial packing or wholesale orders above 50kg, mention 'Bulk Inquiry' in the message.
              </div>
            </div>

            {/* Right Form Panel (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                    Your Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@gmail.com"
                      className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                    Your Message / Inquiry <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're looking for, or share your feedback..."
                    className="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm outline-none transition focus:border-emerald-700 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:focus:border-emerald-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

export default ContactPage;