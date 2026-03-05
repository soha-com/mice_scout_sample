"use client"

import React from 'react'
import Link from 'next/link'
import {
    Search, BarChart3, Target, Zap, Share2, Shield,
    ArrowRight, Sparkles, Building2, Newspaper, ChevronRight
} from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden">

            {/* Hero Section */}
            <div className="relative">
                {/* Background effects */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
                    <div className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-600/15 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/10 rounded-full blur-[120px]" />
                </div>

                {/* Nav */}
                <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">MICE Scout</span>
                    </div>
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-semibold transition-all backdrop-blur-sm"
                    >
                        <Shield size={14} />
                        관리자 대시보드
                    </Link>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold mb-6">
                        <Sparkles size={12} />
                        AI 기반 전시 참가 후보 기업 분석
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                        <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                            뉴스 데이터로 발굴하는
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            전시 참가사 인텔리전스
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                        MICE Scout은 최신 뉴스를 분석하여 잠재적 전시 참가 기업을 발굴하고,
                        <br className="hidden md:block" />
                        주최사에게 섭외 전략과 기대 효과를 제공하는 AI 리포트 서비스입니다.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/admin"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                        >
                            관리자 대시보드 입장
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <section className="relative max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Search size={22} />,
                            iconBg: 'bg-blue-500/10 text-blue-400',
                            title: '뉴스 기반 기업 발굴',
                            desc: '키워드 매칭과 AI 분석을 통해 전시 주제에 부합하는 잠재 참가 기업을 자동으로 발굴합니다.'
                        },
                        {
                            icon: <Target size={22} />,
                            iconBg: 'bg-indigo-500/10 text-indigo-400',
                            title: '섭외 전략 리포트',
                            desc: '기업별 섭외 포인트와 전시 기대 효과를 분석하여 주최사의 의사결정을 지원합니다.'
                        },
                        {
                            icon: <Share2 size={22} />,
                            iconBg: 'bg-emerald-500/10 text-emerald-400',
                            title: '매직링크 공유',
                            desc: '토큰 기반 공유 URL로 관계자에게 리포트를 간편하게 전달할 수 있습니다.'
                        }
                    ].map((feat, i) => (
                        <div
                            key={i}
                            className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.06] transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${feat.iconBg}`}>
                                {feat.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">{feat.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Sparkles size={14} />
                        <span>MICE Scout — AI-Powered Exhibition Intelligence</span>
                    </div>
                    <p className="text-slate-600 text-xs">© 2026 MICE Scout. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
