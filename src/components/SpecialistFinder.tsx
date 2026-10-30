import React, { useState } from 'react';
import { MOCK_SPECIALISTS } from '../data/mockSpecialists';
import { Specialist } from '../types';
import { MapPin, Phone, Star, Calendar, Check, Search, Filter, ShieldCheck, X } from 'lucide-react';

interface SpecialistFinderProps {
  onBackToResults?: () => void;
}

export const SpecialistFinder: React.FC<SpecialistFinderProps> = ({ onBackToResults }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchZip, setSearchZip] = useState<string>('San Francisco, CA');
  const [bookingSpecialist, setBookingSpecialist] = useState<Specialist | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 10:30 AM');

  const specialties = [
    { id: 'all', label: 'All Specialists' },
    { id: 'Oral & Maxillofacial Surgeon', label: 'Oral Surgeons' },
    { id: 'Oral Medicine & Pathologist', label: 'Oral Pathologists' },
    { id: 'General Dentist', label: 'General Dentists' },
    { id: 'Head & Neck Oncologist', label: 'Head & Neck Oncology' },
  ];

  const filteredSpecialists = MOCK_SPECIALISTS.filter((spec) => {
    if (selectedSpecialty !== 'all' && spec.specialty !== selectedSpecialty) {
      return false;
    }
    return true;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingSpecialist(null);
    }, 2800);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <MapPin className="w-4 h-4" />
              <span>Specialist Triage & Referral Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Find an Oral Surgeon or Screening Dentist
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Connect with board-certified oral and maxillofacial surgeons, oral mucosal disease specialists, and preventive dentists equipped for diagnostic biopsies and vital staining.
            </p>
          </div>

          {onBackToResults && (
            <button
              onClick={onBackToResults}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xs hover:bg-slate-100 self-start sm:self-auto transition-colors"
            >
              ← Back to My Summary
            </button>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Location input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchZip}
              onChange={(e) => setSearchZip(e.target.value)}
              placeholder="Search by city, state, or ZIP"
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Specialty Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {specialties.map((item) => {
              const active = selectedSpecialty === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSpecialty(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-teal-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column: Map-Style Placeholder & Specialist List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map Visualization Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 uppercase font-semibold">Territory Map</span>
              <span className="text-teal-600 dark:text-teal-400 font-medium">5 providers in 5-mile radius</span>
            </div>

            {/* Stylized Simulated Map Card */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 flex items-center justify-center p-3 select-none">
              {/* Map grid streets illustration */}
              <svg viewBox="0 0 400 300" className="w-full h-full opacity-60">
                <rect width="400" height="300" fill="#0f172a" />
                <path d="M 0,60 L 400,60 M 0,130 L 400,130 M 0,200 L 400,200 M 0,260 L 400,260" stroke="#1e293b" strokeWidth="2" />
                <path d="M 80,0 L 80,300 M 160,0 L 160,300 M 240,0 L 240,300 M 320,0 L 320,300" stroke="#1e293b" strokeWidth="2" />
                {/* Diagonal boulevard */}
                <path d="M 0,280 L 400,30" stroke="#334155" strokeWidth="6" />
                <path d="M 0,280 L 400,30" stroke="#0d9488" strokeWidth="2" strokeDasharray="6,4" />

                {/* Bay water accent */}
                <path d="M 280,0 C 270,90 320,180 400,200 L 400,0 Z" fill="#0c4a6e" opacity="0.35" />

                {/* Provider Pins */}
                <g className="cursor-pointer" transform="translate(180, 110)">
                  <circle cx="0" cy="0" r="14" fill="#0d9488" opacity="0.3" className="animate-ping" />
                  <circle cx="0" cy="0" r="9" fill="#0d9488" />
                  <circle cx="0" cy="0" r="4" fill="#ffffff" />
                </g>
                <g className="cursor-pointer" transform="translate(230, 160)">
                  <circle cx="0" cy="0" r="8" fill="#0d9488" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </g>
                <g className="cursor-pointer" transform="translate(120, 190)">
                  <circle cx="0" cy="0" r="8" fill="#0d9488" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </g>
                <g className="cursor-pointer" transform="translate(290, 80)">
                  <circle cx="0" cy="0" r="8" fill="#0d9488" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </g>
              </svg>

              {/* Floating map info badge */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="font-semibold">{searchZip}</span>
                </div>
                <span className="text-[11px] text-slate-300">Live Provider Availability</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <strong className="block text-slate-900 dark:text-white font-medium">Direct Diagnostic Referral:</strong>
              <span>Most oral surgeons and oral pathologists in this network accept direct self-referrals without requiring a prior primary care doctor visit.</span>
            </div>
          </div>

          {/* Right Column: Specialists List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredSpecialists.map((spec) => (
              <div
                key={spec.id}
                className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {spec.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">({spec.distanceMiles} mi)</span>
                    </div>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                      {spec.specialty} · {spec.clinic}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {spec.credentials}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900 text-xs font-semibold shrink-0 self-start">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{spec.rating}</span>
                    <span className="text-slate-400 font-normal">({spec.reviewCount})</span>
                  </div>
                </div>

                {/* Location & Schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{spec.address}, {spec.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span>{spec.availability}</span>
                  </div>
                </div>

                {/* Insurance Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Insurances:</span>
                  {spec.insuranceAccepted.map((ins, i) => (
                    <span key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                      {ins}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={`tel:${spec.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{spec.phone}</span>
                  </a>

                  <button
                    onClick={() => setBookingSpecialist(spec)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-xs ml-auto"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Request Appointment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Consultation Modal Simulator */}
        {bookingSpecialist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl relative space-y-4">
              <button
                onClick={() => setBookingSpecialist(null)}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingConfirmed ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Consultation Request Sent!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                    The office of <strong>{bookingSpecialist.name}</strong> will contact you shortly to confirm your slot for {selectedSlot}. Your screening summary was attached for clinical triage.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-teal-600 dark:text-teal-400 font-semibold">
                      Direct Appointment Request
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {bookingSpecialist.name}
                    </h3>
                    <p className="text-xs text-slate-500">{bookingSpecialist.clinic}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Select Preferred Date & Time
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        'Tomorrow, 10:30 AM',
                        'Tomorrow, 2:15 PM',
                        'In 2 Days, 9:00 AM',
                        'In 3 Days, 3:30 PM',
                      ].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2.5 rounded-lg border text-left font-medium transition-all ${
                            selectedSlot === slot
                              ? 'border-teal-600 bg-teal-50 text-teal-900 dark:bg-teal-950 dark:border-teal-400 dark:text-teal-200 font-semibold'
                              : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Smith"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contact Phone / Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. (555) 012-3456 or name@email.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-900/60 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Your screening data remains private and will be shared only with the doctor during clinical review.</span>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingSpecialist(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
                    >
                      Confirm Booking Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
