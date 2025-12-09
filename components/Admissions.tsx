
import React, { useState } from 'react';
import Button from './Button';
import { X, Loader2, CheckCircle, Calendar, User, Mail, Phone, Globe, BookOpen, Download, FileText, Smartphone, Lock, CreditCard, Upload, Camera } from 'lucide-react';

interface AdmissionsProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

interface ApplicationData {
  studentName: string;
  dateOfBirth: string;
  gradeLevel: string;
  parentName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  studentImage: File | null;
}

const Admissions: React.FC<AdmissionsProps> = ({ showForm, setShowForm }) => {
  const [showFees, setShowFees] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Payment States
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'waiting' | 'success' | 'failed'>('idle');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const APPLICATION_FEE = 5000;

  const [formData, setFormData] = useState<ApplicationData>({
    studentName: '',
    dateOfBirth: '',
    gradeLevel: '',
    parentName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    studentImage: null
  });

  const steps = [
    { title: "Application", desc: "Submit the online form and upload school reports." },
    { title: "Assessment", desc: "Short online placement test to determine level." },
    { title: "Enrollment", desc: "Receive offer, pay fees, and access Canvas." }
  ];

  // Fee Structure (KES per Term) - Anchored at Y2=55k, Y11=90k
  const feeStructure = [
    { stage: "Key Stage 1 (Primary)", year: "Year 1", fee: 55000 },
    { stage: "Key Stage 1 (Primary)", year: "Year 2", fee: 55000 },
    { stage: "Key Stage 2 (Primary)", year: "Year 3", fee: 59000 },
    { stage: "Key Stage 2 (Primary)", year: "Year 4", fee: 63000 },
    { stage: "Key Stage 2 (Primary)", year: "Year 5", fee: 67000 },
    { stage: "Key Stage 2 (Primary)", year: "Year 6", fee: 71000 },
    { stage: "Key Stage 3 (Lower Secondary)", year: "Year 7", fee: 75000 },
    { stage: "Key Stage 3 (Lower Secondary)", year: "Year 8", fee: 79000 },
    { stage: "Key Stage 3 (Lower Secondary)", year: "Year 9", fee: 83000 },
    { stage: "Key Stage 4 (IGCSE)", year: "Year 10", fee: 86500 },
    { stage: "Key Stage 4 (IGCSE)", year: "Year 11", fee: 90000 },
    { stage: "Key Stage 5 (A-Level)", year: "Year 12", fee: 95000 },
    { stage: "Key Stage 5 (A-Level)", year: "Year 13", fee: 95000 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, studentImage: e.target.files![0] }));
    }
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form basic requirements
    if (formData.studentName && formData.parentName && formData.phone) {
        setMpesaNumber(formData.phone);
        setShowPayment(true);
    }
  };

  const initiateMpesaPayment = () => {
    setPaymentStatus('processing');
    
    // Simulate API Call to Daraja
    setTimeout(() => {
        setPaymentStatus('waiting');
        
        // Simulate User entering PIN on phone (wait 4 seconds)
        setTimeout(() => {
            setPaymentStatus('success');
            
            // Auto submit application after payment success
            setTimeout(() => {
                finalizeApplicationSubmission();
            }, 1500);
            
        }, 4000);
    }, 1500);
  };

  const finalizeApplicationSubmission = () => {
    setFormStatus('submitting');
    // Simulate network request/email sending with Payment Reference
    const transactionId = "MPESA_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    setTimeout(() => {
      console.log('Application & Payment Submitted to admin@brainybayschools.com:', { 
          ...formData, 
          studentImage: formData.studentImage ? formData.studentImage.name : 'No image',
          transactionId, 
          amount: APPLICATION_FEE 
      });
      setFormStatus('success');
      setShowPayment(false); 
    }, 1000);
  };

  const resetForm = () => {
    setShowForm(false);
    setShowPayment(false);
    setFormStatus('idle');
    setPaymentStatus('idle');
    setFormData({
      studentName: '',
      dateOfBirth: '',
      gradeLevel: '',
      parentName: '',
      email: '',
      phone: '',
      country: '',
      message: '',
      studentImage: null
    });
  };

  const downloadFeeStructure = () => {
    const headers = ["Stage,Year,Tuition Fee (KES per Term)\n"];
    const rows = feeStructure.map(item => `"${item.stage}","${item.year}",${item.fee}`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Brainybay_Schools_Fee_Structure_2025.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="admissions" className="scroll-mt-28 py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-center relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Start Your Journey in 3 Simple Steps</h2>
        
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl flex flex-col items-center group hover:border-brainy-red transition-colors">
                <div className="w-12 h-12 rounded-full bg-brainy-red flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-brainy-red/30 group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-brainy-navy p-8 rounded-2xl border border-slate-700 inline-block max-w-2xl w-full shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h3>
          <p className="text-slate-400 mb-6">Our admissions team is ready to help you navigate the process.</p>
          <div className="flex justify-center gap-4">
             <Button variant="primary" onClick={() => setShowForm(true)}>Start Application</Button>
             <Button variant="secondary" onClick={() => setShowFees(true)}>View Fee Structure</Button>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition z-50"
            >
              <X size={24} />
            </button>

            <div className="p-8 text-left">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Application Received!</h3>
                  <p className="text-slate-300 max-w-md">
                    Thank you for applying to Brainybay International Schools. Your payment of <strong>KES {APPLICATION_FEE.toLocaleString()}</strong> was successful. We have sent a confirmation email to <strong>{formData.email}</strong>.
                  </p>
                  <Button variant="primary" onClick={resetForm} className="mt-6">Close</Button>
                </div>
              ) : (
                <>
                  {/* Payment Overlay */}
                  {showPayment ? (
                    <div className="animate-in fade-in slide-in-from-right-10 duration-300">
                         <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                             <button onClick={() => setShowPayment(false)} className="text-sm text-slate-400 hover:text-white">← Back</button>
                             <h3 className="text-2xl font-bold text-white">Application Fee Payment</h3>
                         </div>
                         
                         <div className="bg-slate-950 p-6 rounded-xl border border-slate-700 mb-6">
                             <div className="flex justify-between items-center mb-2">
                                 <span className="text-slate-400">Application Fee</span>
                                 <span className="text-white font-bold">KES {APPLICATION_FEE.toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between items-center text-sm">
                                 <span className="text-slate-500">Processing Fee</span>
                                 <span className="text-slate-500">KES 0</span>
                             </div>
                             <div className="h-px bg-slate-800 my-4"></div>
                             <div className="flex justify-between items-center text-lg">
                                 <span className="text-white font-bold">Total to Pay</span>
                                 <span className="text-brainy-gold font-bold">KES {APPLICATION_FEE.toLocaleString()}</span>
                             </div>
                         </div>

                         {paymentStatus === 'success' ? (
                             <div className="text-center py-8">
                                 <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                     <CheckCircle className="text-white w-8 h-8" />
                                 </div>
                                 <h4 className="text-xl font-bold text-white">Payment Successful!</h4>
                                 <p className="text-slate-400 mt-2">Finalizing your application...</p>
                             </div>
                         ) : (
                             <div className="space-y-6">
                                 <div className="space-y-2">
                                     <label className="text-sm text-slate-300 flex items-center gap-2"><Smartphone size={16}/> M-PESA Phone Number</label>
                                     <input 
                                       type="tel" 
                                       value={mpesaNumber}
                                       onChange={(e) => setMpesaNumber(e.target.value)}
                                       disabled={paymentStatus !== 'idle'}
                                       className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-lg font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                       placeholder="07XX XXX XXX"
                                     />
                                 </div>

                                 {paymentStatus === 'waiting' && (
                                     <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg flex gap-4 items-start animate-pulse">
                                         <Smartphone className="text-green-500 w-6 h-6 shrink-0 mt-1" />
                                         <div>
                                             <h5 className="font-bold text-green-400 text-sm">Check your phone</h5>
                                             <p className="text-xs text-green-300/80 mt-1">An M-PESA pop-up has been sent to {mpesaNumber}. Please enter your PIN to complete the payment.</p>
                                         </div>
                                     </div>
                                 )}

                                 <Button 
                                    onClick={initiateMpesaPayment}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4"
                                    disabled={paymentStatus !== 'idle' || !mpesaNumber}
                                 >
                                     {paymentStatus === 'idle' && `Pay KES ${APPLICATION_FEE.toLocaleString()}`}
                                     {paymentStatus === 'processing' && ( <><Loader2 className="w-5 h-5 animate-spin mr-2"/> Sending Request...</>)}
                                     {paymentStatus === 'waiting' && ( <><Lock className="w-5 h-5 mr-2"/> Waiting for PIN...</>)}
                                 </Button>
                                 
                                 <div className="flex justify-center items-center gap-2 opacity-50">
                                     <div className="h-8 w-12 bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold tracking-tighter">M-PESA</div>
                                     <span className="text-xs text-slate-500">Secure Payment via Daraja API</span>
                                 </div>
                             </div>
                         )}
                    </div>
                  ) : (
                    <>
                    {/* Standard Application Form */}
                      <h3 className="text-2xl font-bold text-white mb-2">Student Application Form</h3>
                      <p className="text-slate-400 mb-8 text-sm">Please fill in the details below. An application fee of <span className="text-white font-bold">KES {APPLICATION_FEE.toLocaleString()}</span> applies.</p>
                      
                      <form onSubmit={handlePreSubmit} className="space-y-6">
                        
                        {/* Student Details Section */}
                        <div className="space-y-4">
                          <h4 className="text-sm font-semibold text-brainy-red uppercase tracking-wider border-b border-slate-700 pb-2">Student Information</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            
                            {/* Student Photo Upload */}
                            <div className="col-span-full mb-2">
                                <label className="text-sm text-slate-300 flex items-center gap-2 mb-2"><Camera size={14}/> Student Photo</label>
                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-brainy-red hover:bg-slate-800/50 transition cursor-pointer relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    {formData.studentImage ? (
                                        <div className="relative z-0">
                                            <img
                                                src={URL.createObjectURL(formData.studentImage)}
                                                alt="Student Preview"
                                                className="w-24 h-24 object-cover rounded-full border-4 border-brainy-red mx-auto shadow-lg"
                                            />
                                            <p className="text-xs text-green-400 mt-2 font-medium flex items-center justify-center gap-1">
                                                <CheckCircle size={10} /> {formData.studentImage.name}
                                            </p>
                                            <p className="text-[10px] text-slate-500 mt-1 group-hover:text-brainy-red transition-colors">Click to change photo</p>
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 group-hover:text-slate-300 transition-colors z-0">
                                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-slate-700 transition-colors">
                                                <Upload className="w-6 h-6" />
                                            </div>
                                            <p className="text-sm font-medium">Click or drag to upload photo</p>
                                            <p className="text-xs mt-1 opacity-70">JPG, PNG (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm text-slate-300 flex items-center gap-2"><User size={14}/> Full Name</label>
                              <input 
                                required
                                type="text" 
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition"
                                placeholder="Student's Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-slate-300 flex items-center gap-2"><Calendar size={14}/> Date of Birth</label>
                              <input 
                                required
                                type="date" 
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-slate-300 flex items-center gap-2"><BookOpen size={14}/> Grade Level Applying For</label>
                              <select 
                                required
                                name="gradeLevel"
                                value={formData.gradeLevel}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition"
                              >
                                <option value="">Select Grade</option>
                                <option value="Primary (Year 1-6)">Primary (Year 1-6)</option>
                                <option value="Lower Secondary (Year 7-9)">Lower Secondary (Year 7-9)</option>
                                <option value="IGCSE (Year 10-11)">IGCSE (Year 10-11)</option>
                                <option value="A-Level (Year 12-13)">A-Level (Year 12-13)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Parent Details Section */}
                        <div className="space-y-4 pt-4">
                          <h4 className="text-sm font-semibold text-brainy-red uppercase tracking-wider border-b border-slate-700 pb-2">Parent / Guardian Information</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm text-slate-300 flex items-center gap-2"><User size={14}/> Parent Name</label>
                              <input 
                                required
                                type="text" 
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition"
                                placeholder="Parent/Guardian Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-slate-300 flex items-center gap-2"><Globe size={14}/> Country of Residence</label>
                              <input 
                                required
                                type="text" 
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition"
                                placeholder="e.g. Kenya, UK, UAE"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-slate-300 flex items-center gap-2"><Mail size={14}/> Email Address</label>
                              <input 
                                required
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition"
                                placeholder="parent@example.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-slate-300 flex items-center gap-2"><Phone size={14}/> Phone Number</label>
                              <input 
                                required
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition"
                                placeholder="+254..."
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <label className="text-sm text-slate-300">Additional Message (Optional)</label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-brainy-red focus:border-transparent outline-none transition resize-none"
                            placeholder="Tell us about the student's interests or any specific requirements..."
                          ></textarea>
                        </div>

                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-full flex items-center justify-center gap-2"
                          >
                            Proceed to Payment <CreditCard size={18} />
                          </Button>
                          <p className="text-center text-xs text-slate-500 mt-3">
                            Clicking proceed will take you to a secure payment step for the KES {APPLICATION_FEE.toLocaleString()} fee.
                          </p>
                        </div>
                      </form>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fee Structure Modal */}
      {showFees && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
             {/* Close Button */}
            <button 
              onClick={() => setShowFees(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <h3 className="text-2xl font-bold text-white">Fee Structure (2025)</h3>
                    <p className="text-slate-400 text-sm mt-1">Tuition Fees per Term in KES (Kenyan Shillings)</p>
                 </div>
                 <div className="hidden sm:block">
                   <Button variant="secondary" size="sm" onClick={downloadFeeStructure}>
                     <Download size={16} className="mr-2" /> Download PDF
                   </Button>
                 </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-700">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-800 text-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-sm border-b border-slate-700">Key Stage</th>
                      <th className="p-4 font-semibold text-sm border-b border-slate-700">Year Group</th>
                      <th className="p-4 font-semibold text-sm border-b border-slate-700 text-right">Fee per Term (KES)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {feeStructure.map((item, index) => (
                      <tr key={index} className={`hover:bg-slate-800/50 transition ${index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}`}>
                        <td className="p-4 text-sm border-b border-slate-800">{item.stage}</td>
                        <td className="p-4 text-sm border-b border-slate-800 font-medium text-white">{item.year}</td>
                        <td className="p-4 text-sm border-b border-slate-800 text-right font-mono text-brainy-gold">{item.fee.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 bg-slate-800/50 p-4 rounded-lg">
                <p>
                  * Fees are subject to change. Fees listed are per term (3 terms per academic year).
                  <br />
                  * One-time registration fee applies for new students.
                </p>
                <button 
                  onClick={downloadFeeStructure} 
                  className="sm:hidden text-brainy-red hover:underline flex items-center gap-1"
                >
                  <FileText size={14}/> Download Fees
                </button>
              </div>

            </div>
           </div>
        </div>
      )}
    </section>
  );
};

export default Admissions;
