
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import Button from './Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): string => {
    let error = '';
    switch (name) {
        case 'name':
            if (!value.trim()) error = 'Full name is required';
            else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) error = 'Email address is required';
            else if (!emailRegex.test(value)) error = 'Please enter a valid email address';
            break;
        case 'phone':
             const phoneDigits = value.replace(/\D/g, '');
             if (!value.trim()) error = 'Phone number is required';
             else if (phoneDigits.length < 9 || phoneDigits.length > 15) error = 'Please enter a valid phone number (9-15 digits)';
             break;
        case 'subject':
            if (!value) error = 'Please select a subject';
            break;
        case 'message':
            if (!value.trim()) error = 'Message text is required';
            else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
            break;
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTouched(prev => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors(prev => {
          const newErrors = { ...prev };
          if (error) newErrors[name] = error;
          else delete newErrors[name];
          return newErrors;
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation: If the field has been touched, validate immediately as user types
    if (touched[name]) {
        const error = validateField(name, value);
        setErrors(prev => {
          const newErrors = { ...prev };
          if (error) newErrors[name] = error;
          else delete newErrors[name];
          return newErrors;
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    const allTouched: Record<string, boolean> = {};
    
    Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key] = error;
        allTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(allTouched);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate processing delay
      setTimeout(() => {
          const mailtoLink = `mailto:administrator@brainybayschools.com?subject=${encodeURIComponent("Web Inquiry: " + formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
          window.location.href = mailtoLink;
          setIsSubmitting(false);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setErrors({});
          setTouched({});
      }, 800);
    }
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full bg-slate-50 border rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition";
    return errors[fieldName] 
      ? `${baseClass} border-red-500 bg-red-50 ring-1 ring-red-500` 
      : `${baseClass} border-slate-200`;
  };

  return (
    <section id="contact" className="py-24 bg-brainy-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-brainy-red/5 blur-[100px]"></div>
         <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-brainy-blue/5 blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brainy-red font-semibold tracking-wide uppercase text-sm mb-3">
            Contact Us
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have questions about admissions, our curriculum, or the online learning experience? 
            Our team is ready to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
             <h4 className="text-xl font-bold text-white mb-8">Contact Information</h4>
             
             <div className="space-y-8">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-lg bg-brainy-red/10 flex items-center justify-center shrink-0">
                      <MapPin className="text-brainy-red w-6 h-6" />
                   </div>
                   <div>
                      <h5 className="text-white font-medium mb-1">Visit Us</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        The Crescent Business Center,<br/>
                        Westlands 6th Floor, Suite 14<br/>
                        Nairobi, Kenya
                      </p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-lg bg-brainy-blue/10 flex items-center justify-center shrink-0">
                      <Phone className="text-brainy-blue w-6 h-6" />
                   </div>
                   <div>
                      <h5 className="text-white font-medium mb-1">Call Us</h5>
                      <p className="text-slate-400 text-sm mb-1">Mon-Fri from 8am to 5pm</p>
                      <div className="flex flex-col gap-1">
                        <a href="tel:+254720066035" className="text-white hover:text-brainy-gold transition font-mono">
                          +254 720 066 035
                        </a>
                        <a href="tel:+254720154485" className="text-white hover:text-brainy-gold transition font-mono">
                          +254 720 154 485
                        </a>
                      </div>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-lg bg-brainy-gold/10 flex items-center justify-center shrink-0">
                      <Mail className="text-brainy-gold w-6 h-6" />
                   </div>
                   <div>
                      <h5 className="text-white font-medium mb-1">Email Us</h5>
                      <p className="text-slate-400 text-sm mb-1">For general inquiries</p>
                      <a href="mailto:administrator@brainybayschools.com" className="text-white hover:text-brainy-gold transition">
                        administrator@brainybayschools.com
                      </a>
                      <p className="text-slate-400 text-sm mt-2">For admissions</p>
                       <a href="mailto:admissions@brainybayschools.com" className="text-white hover:text-brainy-gold transition">
                        admissions@brainybayschools.com
                      </a>
                   </div>
                </div>
             </div>
             
             {/* Map Placeholder or Visual */}
             <div className="mt-8 rounded-xl overflow-hidden border border-slate-700 h-48 bg-slate-900 relative group">
                {/* Abstract Map Visual */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')] bg-cover bg-center opacity-50 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute inset-0 bg-slate-900/20"></div>
                <a 
                   href="https://maps.google.com/?q=The+Crescent+Business+Center" 
                   target="_blank" 
                   rel="noreferrer"
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <Button variant="secondary" size="sm" className="shadow-xl">
                      View on Google Maps
                   </Button>
                </a>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
             <h4 className="text-xl font-bold text-slate-900 mb-6">Send us a Message</h4>
             <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Your Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('name')}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs flex items-center gap-1 animate-pulse">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('email')}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs flex items-center gap-1 animate-pulse">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('phone')}
                        placeholder="+254 700 000 000"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs flex items-center gap-1 animate-pulse">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                   </div>
                   
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Subject *</label>
                      <select 
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         onBlur={handleBlur}
                         className={getInputClass('subject')}
                      >
                         <option value="" disabled>Select a topic</option>
                         <option value="General Inquiry">General Inquiry</option>
                         <option value="Admissions">Admissions Question</option>
                         <option value="Tuition Fees">Tuition & Fees</option>
                         <option value="Curriculum">Curriculum Details</option>
                         <option value="Technical Support">Technical Support</option>
                      </select>
                      {errors.subject && (
                        <p className="text-red-500 text-xs flex items-center gap-1 animate-pulse">
                          <AlertCircle size={12} /> {errors.subject}
                        </p>
                      )}
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-700">Message *</label>
                   <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      className={getInputClass('message')}
                      placeholder="How can we help you?"
                   ></textarea>
                   {errors.message && (
                    <p className="text-red-500 text-xs flex items-center gap-1 animate-pulse">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                <Button 
                   type="submit" 
                   variant="primary" 
                   className="w-full"
                   disabled={isSubmitting}
                >
                   {isSubmitting ? 'Opening Email Client...' : 'Send Message'}
                   {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                </Button>
                <p className="text-center text-xs text-slate-500 mt-4">
                  This will open your default email application to send the message.
                </p>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
