import React, { useState } from 'react';
import { Pencil, Check, X, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function IntentPreview({ intent, onConfirm }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedIntent, setEditedIntent] = useState({ ...intent });

  const handleSave = () => {
    setIsEditing(false);

    const parsedAmount = typeof editedIntent.amount === 'string' ? parseFloat(editedIntent.amount) : editedIntent.amount;
    setEditedIntent(prev => ({
      ...prev,
      amount: isNaN(parsedAmount) ? null : parsedAmount
    }));
  };

  const handleCancel = () => {
    setEditedIntent({ ...intent });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] tracking-wide uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          Intent Extracted
        </div>
        <h2 className="text-xl font-bold text-[#F3F4F6] tracking-tight">
          PAYMENT INTENT
        </h2>
        <p className="text-sm text-[#94A3B8]">
          This is what Sentinel understood from your payment context.
        </p>
      </div>

      <Card variant="default" padding="none" className="bg-[#12151B] border-white/[0.08] divide-y divide-white/[0.06]">

        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[#94A3B8]">Amount</span>
          </div>
          {isEditing ? (
            <input 
              type="number" 
              className="w-full bg-[#1A1E27] text-amber-400 font-mono font-bold border border-white/[0.1] rounded px-2 py-1 outline-none"
              value={editedIntent.amount || ''}
              onChange={(e) => setEditedIntent({...editedIntent, amount: e.target.value})}
              placeholder="e.g. 840"
            />
          ) : (
            <div className="font-mono font-bold text-amber-400 text-lg">
              {editedIntent.amount ? `₹${editedIntent.amount}` : (
                <span className="text-red-400 text-sm">We couldn't identify a payment amount.</span>
              )}
            </div>
          )}
        </div>


        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[#94A3B8]">Purpose</span>
          </div>
          {isEditing ? (
            <input 
              type="text" 
              className="w-full bg-[#1A1E27] text-[#F3F4F6] text-sm border border-white/[0.1] rounded px-2 py-1 outline-none"
              value={editedIntent.purpose || ''}
              onChange={(e) => setEditedIntent({...editedIntent, purpose: e.target.value})}
              placeholder="e.g. Electricity Bill"
            />
          ) : (
            <div className="text-sm text-[#F3F4F6] font-medium">
              {editedIntent.purpose || <span className="text-[#64748B] italic">Not specified</span>}
            </div>
          )}
        </div>


        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[#94A3B8]">Action</span>
          </div>
          {isEditing ? (
            <select
              className="w-full bg-[#1A1E27] text-[#F3F4F6] text-sm border border-white/[0.1] rounded px-2 py-1 outline-none"
              value={editedIntent.action}
              onChange={(e) => setEditedIntent({...editedIntent, action: e.target.value})}
            >
              <option value="SEND">SEND</option>
              <option value="RECEIVE">RECEIVE</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </select>
          ) : (
            <div className="text-sm font-bold tracking-wider">
              {editedIntent.action === 'SEND' && <span className="text-red-400">SEND</span>}
              {editedIntent.action === 'RECEIVE' && <span className="text-emerald-400">RECEIVE</span>}
              {editedIntent.action === 'UNKNOWN' && <span className="text-amber-400">UNKNOWN</span>}
            </div>
          )}
        </div>


        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[#94A3B8]">Recipient</span>
          </div>
          {isEditing ? (
            <input 
              type="text" 
              className="w-full bg-[#1A1E27] text-[#F3F4F6] text-sm border border-white/[0.1] rounded px-2 py-1 outline-none"
              value={editedIntent.recipient || ''}
              onChange={(e) => setEditedIntent({...editedIntent, recipient: e.target.value})}
              placeholder="e.g. abc@upi or Name"
            />
          ) : (
            <div className="text-sm text-[#F3F4F6] font-medium">
              {editedIntent.recipient || <span className="text-[#64748B] italic">Not specified</span>}
            </div>
          )}
        </div>


        {!isEditing && (
          <div className="px-4 py-3 bg-black/20">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#64748B]">Confidence</span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                editedIntent.confidence === 'HIGH' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                editedIntent.confidence === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {editedIntent.confidence}
              </span>
            </div>
          </div>
        )}
      </Card>

      <div className="pt-4 space-y-3">
        {isEditing ? (
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={handleCancel} icon={X}>Cancel</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave} icon={Check}>Save</Button>
          </div>
        ) : (
          <>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full shadow-md shadow-amber-950/20"
              onClick={() => onConfirm(editedIntent)}
            >
              Looks Correct → Continue
            </Button>
            <Button 
              variant="secondary" 
              size="md" 
              className="w-full"
              icon={Pencil}
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
