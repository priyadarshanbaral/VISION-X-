import { useState } from 'react';
import { CreditCard, X, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from './Router';
import { useAuth } from './AuthProvider';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  price: string;
  /** Stored in MongoDB `bookings.type` so the dashboard can group bookings. */
  bookingType?: string;
  amount?: number;
  guests?: number;
  notes?: string;
}

/** Turn "₹1,25,000" or "$120" into a plain number for the bookings collection. */
function parseAmount(price: string): number {
  const digits = price.replace(/[^0-9.]/g, '');
  const value = Number.parseFloat(digits);
  return Number.isFinite(value) ? value : 0;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  itemName,
  price,
  bookingType = 'booking',
  amount,
  guests,
  notes,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');
  const { navigate } = useRouter();
  const { user, api } = useAuth();

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Bookings are tied to a user, so a session is required to persist to MongoDB.
    if (!user) {
      setError('Please sign in to complete your booking.');
      return;
    }

    setStep('processing');
    try {
      const result = await api('/api/me/bookings', {
        method: 'POST',
        body: JSON.stringify({
          title: itemName,
          type: bookingType,
          amount: amount ?? parseAmount(price),
          guests: guests ?? 1,
          notes: notes ?? '',
          date: new Date().toISOString(),
        }),
      });
      setBookingId(result.booking?.id || '');
      setStep('success');
    } catch (err: any) {
      setStep('details');
      setError(err?.message || 'Could not save your booking. Please try again.');
    }
  };

  const handleViewDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm perspective-1000">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-stone-200/50 animate-in fade-in zoom-in duration-200 transform-gpu">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-gradient-to-b from-stone-50 to-white">
          <h2 className="font-serif text-xl font-bold text-stone-900 drop-shadow-sm">Secure Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-all active:translate-y-0.5 shadow-sm border border-transparent hover:border-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex justify-between items-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]">
                <div>
                  <p className="text-sm text-stone-500 font-medium mb-1">Booking Item</p>
                  <p className="font-bold text-stone-900">{itemName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-500 font-medium mb-1">Total</p>
                  <p className="font-bold text-amber-600 text-xl drop-shadow-sm">{price}</p>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Card Information</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      required
                      defaultValue="4532 8920 1827 4920"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all text-stone-800 font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    defaultValue="12/28"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all text-stone-800 font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    required
                    defaultValue="829"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all text-stone-800 font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-b from-stone-800 to-stone-900 text-white font-bold hover:from-stone-700 hover:to-stone-800 transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] border-b-4 border-stone-950 active:border-b-0 active:translate-y-1"
              >
                <ShieldCheck className="w-5 h-5 drop-shadow-md text-amber-400" /> Pay {price}
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4 relative z-10 drop-shadow-md" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2 drop-shadow-sm">Processing Payment...</h3>
              <p className="text-stone-500 text-sm">Securing your booking with encrypted protocol.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              {bookingId && (
                <p className="mb-4 text-xs font-mono text-stone-400">
                  Ref: {bookingId}
                </p>
              )}
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.9),0_10px_20px_rgba(16,185,129,0.2)] transform hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-10 h-10 drop-shadow-md" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2 drop-shadow-sm">Booking Confirmed!</h3>
              <p className="text-stone-600 mb-8 text-sm">Your confirmation and tickets have been saved to your traveler dashboard.</p>
              <button 
                onClick={handleViewDashboard} 
                className="w-full py-4 rounded-xl bg-gradient-to-b from-stone-800 to-stone-900 text-white font-bold hover:from-stone-700 hover:to-stone-800 transition-all shadow-[0_5px_15px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.2)] border-b-4 border-stone-950 active:border-b-0 active:translate-y-1"
              >
                View in Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
