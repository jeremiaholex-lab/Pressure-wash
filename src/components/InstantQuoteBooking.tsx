import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Home,
  Check,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Phone,
  AlertCircle,
  MapPin,
  Car,
  Layers,
  Send,
  CheckCircle2,
  BellRing
} from 'lucide-react';
import { SERVICES, ADDONS, BUSINESS_INFO } from '../data/mockData';
import { BookingFormState } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface InstantQuoteBookingProps {
  initialServiceId?: string;
}

export const InstantQuoteBooking: React.FC<InstantQuoteBookingProps> = ({ initialServiceId }) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedData, setConfirmedData] = useState<{
    code: string;
    date: string;
    services: string[];
    price: number;
    phone: string;
    address: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState<BookingFormState>({
    services: initialServiceId ? [initialServiceId] : ['house-wash'],
    homeSize: '1500-2500',
    stories: 1,
    drivewaySize: 'standard2car',
    addons: [],
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    timeWindow: 'morning',
    isUrgent: false,
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Ocala',
    zipCode: '34471',
    notes: '',
    smsUpdates: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Real-time dynamic price calculation
  const calculation = useMemo(() => {
    let baseTotal = 0;
    let serviceNames: string[] = [];

    // House wash
    if (formData.services.includes('house-wash')) {
      serviceNames.push('Whole-Home Soft Wash');
      let houseCost = 189;
      if (formData.homeSize === 'under1500') houseCost = 169;
      else if (formData.homeSize === '1500-2500') houseCost = 219;
      else if (formData.homeSize === '2500-3500') houseCost = 279;
      else if (formData.homeSize === '3500+') houseCost = 359;

      if (formData.stories === 2) houseCost += 60;
      baseTotal += houseCost;
    }

    // Driveway
    if (formData.services.includes('driveway-concrete')) {
      serviceNames.push('Driveway & Concrete Clean');
      let driveCost = 129;
      if (formData.drivewaySize === 'standard2car') driveCost = 129;
      else if (formData.drivewaySize === 'large3car') driveCost = 169;
      else if (formData.drivewaySize === 'longCircular') driveCost = 229;
      baseTotal += driveCost;
    }

    // Roof wash
    if (formData.services.includes('roof-wash')) {
      serviceNames.push('Non-Pressure Roof Soft Wash');
      let roofCost = 289;
      if (formData.homeSize === 'under1500') roofCost = 260;
      else if (formData.homeSize === '1500-2500') roofCost = 320;
      else if (formData.homeSize === '2500-3500') roofCost = 390;
      else if (formData.homeSize === '3500+') roofCost = 480;
      baseTotal += roofCost;
    }

    // Pool cage
    if (formData.services.includes('pool-cage-lanai')) {
      serviceNames.push('Pool Cage & Lanai Restoration');
      baseTotal += 220;
    }

    // Fence / Deck
    if (formData.services.includes('deck-fence')) {
      serviceNames.push('Fence & Deck Revitalization');
      baseTotal += 149;
    }

    // Commercial
    if (formData.services.includes('commercial-hoa')) {
      serviceNames.push('Commercial / HOA Consultation');
      baseTotal += 350;
    }

    // Add-ons
    let addonsTotal = 0;
    formData.addons.forEach((addonId) => {
      const found = ADDONS.find((a) => a.id === addonId);
      if (found) addonsTotal += found.price;
    });

    baseTotal += addonsTotal;

    // Bundle discount if 2 or more services selected
    let bundleDiscount = 0;
    if (formData.services.length >= 2) {
      bundleDiscount = formData.services.length >= 3 ? 50 : 30;
    }

    const finalTotal = Math.max(99, baseTotal - bundleDiscount);

    return {
      subtotal: baseTotal,
      bundleDiscount,
      finalTotal,
      serviceNames,
    };
  }, [formData]);

  const toggleService = (id: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(id);
      let updated: string[];
      if (exists) {
        // Keep at least one service
        if (prev.services.length === 1) return prev;
        updated = prev.services.filter((s) => s !== id);
      } else {
        updated = [...prev.services, id];
      }
      return { ...prev, services: updated };
    });
  };

  const toggleAddon = (id: string) => {
    setFormData((prev) => {
      const exists = prev.addons.includes(id);
      return {
        ...prev,
        addons: exists ? prev.addons.filter((a) => a !== id) : [...prev.addons, id],
      };
    });
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone number is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP Code is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const confirmationCode = `ATP-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedData({
        code: confirmationCode,
        date: formData.date,
        services: calculation.serviceNames,
        price: calculation.finalTotal,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, FL ${formData.zipCode}`,
      });
      setIsSubmitting(false);
      setStep(4);
    }, 1000);
  };

  return (
    <section id="estimator" className="py-16 sm:py-24 bg-slate-900 text-white relative">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 border border-cyan-500/30">
            <DollarSign className="w-3.5 h-3.5" />
            Instant Online Price & Booking Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Calculate Your Estimate & Reserve in 60 Seconds
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            No endless phone tag or vague in-person bids. Customize your package, see live transparent pricing, and choose your arrival window.
          </p>
        </ScrollReveal>

        {/* Progress Bar (Steps 1-3) */}
        {step < 4 && (
          <ScrollReveal direction="up" delay={0.1} className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 -z-1" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-cyan-500 transition-all duration-300 -z-1"
                style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
              />

              {[
                { s: 1, label: '1. Select Services' },
                { s: 2, label: '2. Pick Date & Time' },
                { s: 3, label: '3. Contact & Address' },
              ].map((item) => (
                <div key={item.s} className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      step >= item.s
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 ring-4 ring-slate-900'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {step > item.s ? <Check className="w-4 h-4 stroke-[3]" /> : item.s}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-2 whitespace-nowrap ${
                      step >= item.s ? 'text-cyan-300' : 'text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Main Grid: Form on Left, Live Cart Estimate Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-Step Interactive Form */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-8 bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {/* STEP 1: SERVICES & PROPERTY SIZING */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs">
                      1
                    </span>
                    Choose Your Cleaning Services
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Bundle 2 or more services to automatically unlock up to $50 in instant bundle savings!
                  </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SERVICES.map((srv) => {
                    const isSelected = formData.services.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.id)}
                        className={`relative p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-900/60 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                              {srv.category}
                            </span>
                            <h4 className="font-extrabold text-white text-base mt-0.5">{srv.name}</h4>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center transition ${
                              isSelected ? 'bg-cyan-500 text-white' : 'border border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {srv.tagline}
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Starting at</span>
                          <span className="font-extrabold text-cyan-300 text-sm">${srv.startingPrice}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Property Details Refinement */}
                <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-700 space-y-4">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Home className="w-4 h-4 text-cyan-400" />
                    Property Sizing & Story Count
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Estimated House Sq. Footage:
                      </label>
                      <select
                        value={formData.homeSize}
                        onChange={(e) => setFormData({ ...formData, homeSize: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                      >
                        <option value="under1500">Under 1,500 sq ft (Cottage / Villa)</option>
                        <option value="1500-2500">1,500 - 2,500 sq ft (Typical Florida Home)</option>
                        <option value="2500-3500">2,500 - 3,500 sq ft (Spacious 4+ Bed)</option>
                        <option value="3500+">3,500+ sq ft (Executive / Estate)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1.5">
                        Number of Stories:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, stories: 1 })}
                          className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                            formData.stories === 1
                              ? 'bg-cyan-500/20 border-cyan-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          1 Story
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, stories: 2 })}
                          className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                            formData.stories === 2
                              ? 'bg-cyan-500/20 border-cyan-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          2 Stories (+ $60)
                        </button>
                      </div>
                    </div>
                  </div>

                  {formData.services.includes('driveway-concrete') && (
                    <div className="pt-2 border-t border-slate-800">
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-cyan-400" />
                        Driveway Configuration:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'standard2car', label: '2-Car Standard', price: '$129' },
                          { id: 'large3car', label: '3-Car Expanded', price: '$169' },
                          { id: 'longCircular', label: 'Long / Circular', price: '$229' },
                        ].map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, drivewaySize: d.id })}
                            className={`p-2 rounded-xl border text-xs font-semibold text-center transition ${
                              formData.drivewaySize === d.id
                                ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            <div>{d.label}</div>
                            <div className="text-[11px] text-cyan-400 font-bold">{d.price}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Popular Add-ons */}
                <div>
                  <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Recommended Protection Add-ons (Optional)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ADDONS.map((addon) => {
                      const isChecked = formData.addons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-start justify-between gap-3 text-xs ${
                            isChecked
                              ? 'bg-cyan-950/30 border-cyan-500/80 text-white'
                              : 'bg-slate-900/50 border-slate-700/80 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-white">{addon.name}</div>
                            <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                              {addon.description}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-extrabold text-cyan-300">+${addon.price}</span>
                            <div
                              className={`w-5 h-5 rounded mt-1 ml-auto flex items-center justify-center border ${
                                isChecked ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-slate-600'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 1 Continue Button */}
                <div className="flex justify-end pt-4 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition hover:scale-105 cursor-pointer"
                  >
                    <span>Proceed to Schedule & Time</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PICK DATE & TIME */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs">
                      2
                    </span>
                    Choose Preferred Date & Arrival Window
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    You do not need to be home for exterior cleaning as long as exterior water spigots are accessible.
                  </p>
                </div>

                {/* Date Picker */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 space-y-3">
                  <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-cyan-400" />
                    Select Service Date:
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-semibold focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 Weather Guarantee: If rain occurs on your service date, we reschedule with zero fees.
                  </p>
                </div>

                {/* Time Window Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Preferred Arrival Window:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'morning', label: 'Morning Arrival', time: '8:00 AM - 12:00 PM', desc: 'First crew of the day' },
                      { id: 'afternoon', label: 'Afternoon Arrival', time: '12:00 PM - 4:00 PM', desc: 'Midday sunshine' },
                      { id: 'anytime', label: 'Flexible Anytime', time: '8:00 AM - 6:00 PM', desc: 'Fastest dispatch scheduling' },
                    ].map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeWindow: w.id as any })}
                        className={`p-4 rounded-2xl border text-left transition ${
                          formData.timeWindow === w.id
                            ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <p className="font-bold text-white text-sm">{w.label}</p>
                        <p className="text-xs font-semibold text-cyan-400 mt-1">{w.time}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{w.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emergency / HOA Urgent Toggle */}
                <div
                  onClick={() => setFormData({ ...formData, isUrgent: !formData.isUrgent })}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    formData.isUrgent
                      ? 'bg-amber-950/30 border-amber-400/80 text-amber-200'
                      : 'bg-slate-900/50 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">HOA Violation or Emergency Same-Day Request?</p>
                      <p className="text-[11px] text-slate-400">
                        Check this box if you have an urgent deadline. We will prioritize dispatch within 24 hours.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.isUrgent}
                    onChange={() => {}}
                    className="w-5 h-5 rounded border-slate-700 text-cyan-500 focus:ring-0"
                  />
                </div>

                {/* Step 2 Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Services
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition hover:scale-105 cursor-pointer"
                  >
                    <span>Next: Address & Contact</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & PROPERTY ADDRESS */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs">
                      3
                    </span>
                    Where Should We Send the Crew?
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    We’ll send an immediate confirmation and automated arrival text updates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Robert Smith"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 font-medium focus:outline-hidden ${
                        formErrors.fullName ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'
                      }`}
                    />
                    {formErrors.fullName && <p className="text-red-400 text-[11px] mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Mobile Phone Number (for SMS dispatch updates) *
                    </label>
                    <input
                      type="tel"
                      placeholder="(352) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 font-medium focus:outline-hidden ${
                        formErrors.phone ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'
                      }`}
                    />
                    {formErrors.phone && <p className="text-red-400 text-[11px] mt-1">{formErrors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">
                      Email Address (for invoice & photos)
                    </label>
                    <input
                      type="email"
                      placeholder="robert@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 font-medium focus:border-cyan-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">
                      Property Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1420 SW 27th Ave"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 font-medium focus:outline-hidden ${
                        formErrors.address ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'
                      }`}
                    />
                    {formErrors.address && <p className="text-red-400 text-[11px] mt-1">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      City / Area *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium focus:border-cyan-500 focus:outline-hidden"
                    >
                      <option value="Ocala">Ocala</option>
                      <option value="The Villages">The Villages</option>
                      <option value="Belleview">Belleview</option>
                      <option value="Dunnellon">Dunnellon</option>
                      <option value="Crystal River">Crystal River</option>
                      <option value="Summerfield">Summerfield</option>
                      <option value="Silver Springs">Silver Springs</option>
                      <option value="Citrus County Area">Other Marion/Citrus area</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      placeholder="34471"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 font-medium focus:outline-hidden ${
                        formErrors.zipCode ? 'border-red-500' : 'border-slate-700 focus:border-cyan-500'
                      }`}
                    />
                    {formErrors.zipCode && <p className="text-red-400 text-[11px] mt-1">{formErrors.zipCode}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">
                      Special Notes (Gate code, pets, sensitive plants, HOA notice)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Gate code is #4812. Please watch out for the bougainvillea by the front porch."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 font-medium focus:border-cyan-500 focus:outline-hidden text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="smsUpdates"
                    checked={formData.smsUpdates}
                    onChange={(e) => setFormData({ ...formData, smsUpdates: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 border-slate-700 focus:ring-0"
                  />
                  <label htmlFor="smsUpdates" className="text-xs text-slate-300 cursor-pointer">
                    Send technician "on the way" GPS tracking and before/after photos via SMS
                  </label>
                </div>

                {/* Submit Row */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Date
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-4 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Locking In Appointment...
                      </span>
                    ) : (
                      <>
                        <span>Confirm Booking (${calculation.finalTotal})</span>
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: INSTANT CONFIRMATION & SIMULATED SMS DISPATCH TRACKER */}
            {step === 4 && confirmedData && (
              <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                    Booking Confirmed • Reference: {confirmedData.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    You're Scheduled with Apply The Pressure!
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                    We have reserved your appointment for <strong className="text-white">{confirmedData.date}</strong> at{' '}
                    <span className="text-cyan-300 font-semibold">{confirmedData.address}</span>.
                  </p>
                </div>

                {/* Simulated SMS Alert Card */}
                <div className="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-4 text-left shadow-xl">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1.5 font-bold text-slate-300">
                      <BellRing className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                      Simulated SMS Dispatch Notification
                    </span>
                    <span>Just now</span>
                  </div>
                  <div className="mt-3 bg-slate-800 p-3 rounded-xl text-xs text-slate-200 leading-relaxed font-mono">
                    <p className="font-bold text-cyan-400">APPLY THE PRESSURE DISPATCH:</p>
                    <p className="mt-1">
                      Hi {formData.fullName || 'Neighbor'}, your service has been logged ({confirmedData.code}).
                    </p>
                    <p className="mt-1 text-slate-400">
                      Selected: {confirmedData.services.join(' + ')}. Total Est: ${confirmedData.price}.
                    </p>
                    <p className="mt-1 text-emerald-400">
                      Crew Lead assigned: Marcus • Rig #2 (Ocala Dispatch). Call or text 352-653-3882 for any changes!
                    </p>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setConfirmedData(null);
                    }}
                    className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Book Another Property
                  </button>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneOfficeRaw}`}
                    className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Speak with Office: (352) 653-3882
                  </a>
                </div>
              </div>
            )}
          </ScrollReveal>

          {/* Right Column: Dynamic Price Summary Box */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-4 bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 shadow-2xl backdrop-blur-md sticky top-28 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Your Live Estimate
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold">
                100% Guaranteed
              </span>
            </div>

            {/* Selected Services Breakdown */}
            <div className="space-y-2.5 text-xs">
              <p className="text-slate-400 font-bold uppercase text-[10px]">Selected Items:</p>
              {calculation.serviceNames.map((name, i) => (
                <div key={i} className="flex items-center justify-between text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {name}
                  </span>
                </div>
              ))}

              {formData.addons.length > 0 && (
                <div className="pt-2 border-t border-slate-700/50 space-y-1">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Add-ons:</p>
                  {formData.addons.map((aid) => {
                    const addon = ADDONS.find((a) => a.id === aid);
                    if (!addon) return null;
                    return (
                      <div key={aid} className="flex items-center justify-between text-slate-300">
                        <span>+ {addon.name}</span>
                        <span className="text-cyan-400 font-semibold">+${addon.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Subtotal & Discounts */}
            <div className="pt-3 border-t border-slate-700 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Services Subtotal:</span>
                <span className="font-semibold text-slate-300">${calculation.subtotal}</span>
              </div>

              {calculation.bundleDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Multi-Service Bundle Savings:
                  </span>
                  <span>-${calculation.bundleDiscount}</span>
                </div>
              )}
            </div>

            {/* Big Total Box */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 text-center">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Estimated Total Cost</p>
              <div className="text-3xl sm:text-4xl font-black text-white mt-0.5">
                ${calculation.finalTotal}
              </div>
              <p className="text-[11px] text-cyan-400 font-semibold mt-1">
                Zero Hidden Trip Fees • Pay Upon 100% Satisfaction
              </p>
            </div>

            {/* Trust highlights */}
            <div className="space-y-2 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>$1,000,000 Commercial Liability Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Shingle Damage ARMA-Approved Soft Wash</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Need assistance? Call (352) 653-3882</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
