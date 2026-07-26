import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '../services/api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  RefreshCw,
  Inbox,
  Activity,
  Layers
} from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import StatsCard from '../components/admin/StatsCard';
import useSEO from '../hooks/useSEO';

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`}></div>
);

const AnalyticsSkeleton = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-32">
          <Skeleton className="w-10 h-10 mb-4" />
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-16 h-8" />
        </div>
      ))}
    </div>
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[450px]">
      <Skeleton className="w-48 h-6 mb-8" />
      <Skeleton className="w-full h-64" />
    </div>
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
      <Skeleton className="w-48 h-6 mb-8" />
      <Skeleton className="w-full h-56" />
    </div>
  </div>
);

const EmptyState = ({ message, onRetry, t }) => (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
    <div className="bg-slate-50 p-4 rounded-full mb-4">
      <Inbox className="w-12 h-12 text-slate-300" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{t('admin.analyticsPage.noDataTitle')}</h3>
    <p className="text-slate-500 mb-6 max-w-xs text-center">{message || t('admin.analyticsPage.noDataDesc')}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        {t('admin.analyticsPage.retry')}
      </button>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-md p-4 shadow-2xl rounded-2xl border border-white/20 ring-1 ring-black/5">
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></div>
            <p className="text-sm font-semibold text-slate-900">
              {entry.name}: <span className="text-indigo-600">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdminAnalytics = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';

  useSEO({
    title: t('seo.adminAnalyticsTitle'),
    description: t('seo.adminAnalyticsDescription'),
  });

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminService.getStats();
      setStats(response.data.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const chartColors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    success: '#10b981',
    muted: '#94a3b8',
  };

  const hasData = stats && (stats.total > 0 || (stats.byFormation && stats.byFormation.length > 0));

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar activeTab="analytics" />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar title={t('admin.analyticsTitle')} />

        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
                  <Activity className="w-3 h-3" />
                  {t('admin.analyticsPage.badge')}
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('admin.analyticsPage.title')}</h2>
                <p className="text-slate-500 mt-1">{t('admin.analyticsPage.subtitle')}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={fetchStats}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  {t('admin.analyticsPage.refresh')}
                </button>
              </div>
            </div>

            {loading ? (
              <AnalyticsSkeleton />
            ) : !hasData ? (
              <EmptyState onRetry={fetchStats} t={t} />
            ) : (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* 1. Stats Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatsCard 
                    title={t('admin.analyticsPage.totalInscriptions')} 
                    value={stats?.total || 0} 
                    icon={Users} 
                    color="primary"
                    trend="up"
                    trendValue="12"
                  />
                  <StatsCard 
                    title={t('admin.analyticsPage.todayInscriptions')} 
                    value={stats?.today || 0} 
                    icon={Clock} 
                    color="success"
                    trend="up"
                    trendValue="8"
                  />
                  <StatsCard 
                    title={t('admin.analyticsPage.growthRate')} 
                    value="24.5%" 
                    icon={TrendingUp} 
                    color="purple"
                    trend="up"
                    trendValue="4"
                  />
                </div>

                {/* 2. Main Trend Chart */}
                <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{t('admin.analyticsPage.activityTitle')}</h3>
                      <p className="text-sm text-slate-500 mt-1">{t('admin.analyticsPage.activitySubtitle')}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                      <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600">{t('admin.analyticsPage.chartLine')}</button>
                      <button className="px-3 py-1.5 text-xs font-bold bg-white shadow-sm rounded-lg text-indigo-600">{t('admin.analyticsPage.chartArea')}</button>
                    </div>
                  </div>
                  
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats?.overTime || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.15}/>
                            <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: chartColors.muted, fontSize: 11, fontWeight: 500 }} 
                          dy={10}
                          tickFormatter={(str) => {
                            const date = new Date(str);
                            return date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'fr-FR', { day: '2-digit', month: 'short' });
                          }}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: chartColors.muted, fontSize: 11, fontWeight: 500 }} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: chartColors.primary, strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area 
                          type="monotone" 
                          dataKey="count" 
                          stroke={chartColors.primary} 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorTrend)" 
                          name={t('admin.analyticsPage.inscriptionsLabel')}
                          animationDuration={2000}
                          dot={{ r: 0 }}
                          activeDot={{ r: 6, fill: chartColors.primary, stroke: '#fff', strokeWidth: 3, shadow: '0 0 10px rgba(0,0,0,0.1)' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 3. Formations Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{t('admin.analyticsPage.inscriptionsByFormation')}</h3>
                        <p className="text-sm text-slate-500 mt-1">{t('admin.analyticsPage.currentDemand')}</p>
                      </div>
                      <div className="bg-indigo-50 p-2.5 rounded-2xl">
                        <Layers className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats?.byFormation || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={20}>
                          <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="formation" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: chartColors.muted, fontSize: 10, fontWeight: 600 }}
                            interval={0}
                            dy={10}
                            tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + '...' : value}
                          />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: chartColors.muted, fontSize: 11, fontWeight: 500 }} />
                          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                          <Bar 
                            dataKey="count" 
                            radius={[10, 10, 10, 10]} 
                            barSize={32} 
                            name={t('admin.analyticsPage.inscriptionsLabel')}
                            animationDuration={1500}
                          >
                            {(stats?.byFormation || []).map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={index % 2 === 0 ? chartColors.primary : chartColors.secondary} 
                                fillOpacity={0.9} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Summary Sidebar */}
                  <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white overflow-hidden relative">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-400" />
                        {t('admin.analyticsPage.topFormations')}
                      </h3>
                      <div className="space-y-5">
                        {(stats?.byFormation || [])
                          .sort((a, b) => b.count - a.count)
                          .slice(0, 4)
                          .map((item, idx) => (
                          <div key={idx} className="group cursor-default">
                            <div className="flex justify-between items-end mb-2">
                              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.formation}</span>
                              <span className="text-lg font-bold">{item.count}</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(item.count / (stats.total || 1)) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-10 pt-10 border-t border-slate-800">
                        <div className="flex items-center gap-4">
                          <div className="bg-emerald-500/20 p-3 rounded-2xl">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t('admin.analyticsPage.overallPerformance')}</p>
                            <p className="text-xl font-black text-white">+18.4% <span className="text-xs font-medium text-slate-500 ml-1">{t('admin.analyticsPage.vsLastMonth')}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
