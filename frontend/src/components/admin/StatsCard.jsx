import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) => {
  const colorVariants = {
    primary: 'bg-indigo-50 text-indigo-600 ring-indigo-500/10',
    success: 'bg-emerald-50 text-emerald-600 ring-emerald-500/10',
    warning: 'bg-amber-50 text-amber-600 ring-amber-500/10',
    purple: 'bg-purple-50 text-purple-600 ring-purple-500/10',
  };

  return (
    <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 group">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 rounded-2xl ring-1 ${colorVariants[color] || colorVariants.primary} transition-transform duration-500 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-full ring-1 ${
            trend === 'up' 
              ? 'bg-emerald-50 text-emerald-600 ring-emerald-500/10' 
              : 'bg-rose-50 text-rose-600 ring-rose-500/10'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
            {trendValue}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
          <span className="text-xs font-medium text-slate-400">Total</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

