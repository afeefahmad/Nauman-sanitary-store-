import React from 'react';
import { useInquiry } from '../context/InquiryContext';
import { ShoppingBag, X, Plus, Minus, Trash2, MessageSquare, Send } from 'lucide-react';

export default function InquiryDrawer() {
  const { items, isOpen, setIsOpen, removeFromInquiry, updateQuantity, clearInquiry, sendWhatsAppInquiry, totalCount } = useInquiry();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="bg-slate-900 text-slate-100 w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-800 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#c8a060]/10 text-[#c8a060] rounded-xl border border-[#c8a060]/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Inquiry Cart</h3>
              <p className="text-xs text-slate-400">{totalCount} item{totalCount !== 1 ? 's' : ''} selected</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="p-4 bg-slate-800/50 rounded-full mb-3 text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-white text-base">Your Inquiry List is Empty</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Browse our luxury sanitaryware catalog and click "Inquire" to build your quote request.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-[#c8a060]/40 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-slate-700 bg-white shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-700/50 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                      SANITARY
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-[#c8a060]">{item.brand || 'Unbranded'}</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 shrink-0 pl-2">
                  <div className="flex items-center gap-1 border border-slate-700 rounded-lg p-1 bg-slate-900">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-6 text-center text-white">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromInquiry(item.id)}
                    className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3">
            <button
              onClick={sendWhatsAppInquiry}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" /> Send Inquiry via WhatsApp
            </button>
            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <button
                onClick={clearInquiry}
                className="hover:text-red-400 transition-colors"
              >
                Clear Cart
              </button>
              <span>Instant WhatsApp Quote</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
