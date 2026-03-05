"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ExternalLink, Calendar, FileText, Tag, Building2,
  Search, Target, Zap, Quote, RotateCw, ArrowRight, X, ChevronRight, Newspaper,
  ChevronDown, History
} from 'lucide-react'

interface Article {
  title: string
  url: string
  description: string
  pub_date: string
}

interface Lead {
  company_name: string
  keywords: string[]
  type: string
  recruitment_point: string
  exhibition_effect: string
  article_count: number
  related_articles: Article[]
}

interface ReportData {
  report_month: string
  exhibition: string
  organizer_summary: string
  total_leads: number
  leads: Lead[]
}

interface MiceScoutProps {
  data: ReportData
  allReports: string[]
  exhibitionId: string
  currentMonth: string
}

export default function MiceScout({ data, allReports, exhibitionId, currentMonth }: MiceScoutProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const [articleModal, setArticleModal] = useState<{ company: string; articles: Article[] } | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)

  const handleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleMonthChange = (month: string) => {
    const token = btoa(`${exhibitionId}:${month}`)
    router.push(`/share/${token}`)
    setHistoryOpen(false)
  }

  const filteredLeads = [...data.leads]
    .sort((a, b) => b.article_count - a.article_count)
    .filter(lead =>
      lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const formatMonth = (m: string) => {
    const [y, mo] = m.split('-')
    return `${y}년 ${parseInt(mo)}월`
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                {data.exhibition}
              </span>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                MICE Scout {data.exhibition} {data.report_month.split('-')[1]}월 호
              </h1>
            </div>
            <p className="text-slate-500 font-medium tracking-tight">전시 참가 후보 기업 브리프 (Keyword + Strategy)</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            {/* History Dropdown */}
            {allReports.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full font-bold transition-colors"
                >
                  <History size={14} />
                  <span>{formatMonth(currentMonth)}</span>
                  <ChevronDown size={12} className={`transition-transform ${historyOpen ? 'rotate-180' : ''}`} />
                </button>
                {historyOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setHistoryOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 min-w-[160px]">
                      {allReports.map(month => (
                        <button
                          key={month}
                          onClick={() => handleMonthChange(month)}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                            month === currentMonth
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {formatMonth(month)}
                          {month === currentMonth && <span className="ml-2 text-[10px] text-blue-400">현재</span>}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full font-bold">
              <FileText size={14} />
              <span>{'후보 기업 ' + data.total_leads + '개사'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      <section className="max-w-7xl mx-auto mb-8 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-blue-600/20 p-3 rounded-2xl text-blue-400">
            <Quote size={24} fill="currentColor" />
          </div>
          <div className="flex-1">
            <h2 className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-2">이번 달 분석 총평 및 인사이트</h2>
            <p className="text-slate-100 text-lg font-medium leading-relaxed italic">
              {`"${data.organizer_summary}"`}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="기업명 혹은 핵심 역량으로 검색..."
            className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Lead Cards Grid */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead, idx) => (
            <div key={idx} className={`flip-card h-[380px] ${flippedCards[idx] ? 'flipped' : ''}`}>
              <div className="flip-card-inner">

                {/* FRONT SIDE */}
                <div className="flip-card-front bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 pt-5 pb-3 flex-1 flex flex-col">
                    {/* 1. Header Area */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                          lead.type === 'SOLUTION_PARTNER' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {lead.type.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                          <FileText size={12} />
                          <span>{'기사 ' + lead.article_count + '건'}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-black text-slate-800">
                        {lead.company_name}
                      </h2>
                    </div>

                    <div className="mt-3 space-y-3 flex-1 flex flex-col justify-start">
                      {/* 2. Keywords Area */}
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {lead.keywords.map((kw, kIdx) => (
                          <span key={kIdx} className="text-xs px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg font-bold border border-slate-100 whitespace-nowrap shrink-0">
                            {'#' + kw}
                          </span>
                        ))}
                      </div>

                      {/* 3. Article Area */}
                      <div className="space-y-1.5">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          대표 기사
                        </h3>
                        {lead.related_articles.length > 0 && (
                          <a
                            href={lead.related_articles[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group/link"
                          >
                            <Newspaper size={14} className="text-slate-400 group-hover/link:text-blue-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-700 font-semibold leading-snug truncate group-hover/link:text-blue-700">
                                {lead.related_articles[0].title}
                              </p>
                              {lead.related_articles[0].pub_date && (
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {new Date(lead.related_articles[0].pub_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                </span>
                              )}
                            </div>
                            <ExternalLink size={12} className="text-slate-300 group-hover/link:text-blue-500 shrink-0" />
                          </a>
                        )}
                        {lead.related_articles.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setArticleModal({ company: lead.company_name, articles: lead.related_articles })
                            }}
                            className="w-full flex items-center justify-center gap-1 py-1.5 text-[11px] text-slate-400 hover:text-blue-600 font-semibold transition-colors"
                          >
                            {'전체 기사 ' + lead.related_articles.length + '건 보기'}
                            <ChevronRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 4. Button Area */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-auto">
                    <button
                      onClick={() => handleFlip(idx)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                      {'상세 분석 리포트 보기'} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="flip-card-back bg-slate-900 rounded-3xl shadow-xl border border-slate-800 overflow-hidden text-left">
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-white">{lead.company_name}</h2>
                        <button onClick={() => handleFlip(idx)} className="text-slate-400 hover:text-white transition-colors">
                          <RotateCw size={18} />
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-2 text-blue-400">
                            <Target size={16} />
                            <h3 className="font-black text-xs uppercase tracking-[0.2em]">섭외 포인트</h3>
                          </div>
                          <p className="text-sm text-slate-300 font-medium leading-relaxed">
                            {lead.recruitment_point}
                          </p>
                        </div>

                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Zap size={16} />
                            <h3 className="font-black text-xs uppercase tracking-[0.2em]">전시 기대효과</h3>
                          </div>
                          <p className="text-sm text-slate-300 font-medium leading-relaxed">
                            {lead.exhibition_effect}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <button
                        onClick={() => handleFlip(idx)}
                        className="w-full py-3 bg-white hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-black transition-all"
                      >
                        기본 정보로 돌아가기
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 mb-12 flex flex-col items-center gap-4">
          <div className="h-px w-20 bg-slate-200"></div>
          <p className="text-slate-400 text-[11px] font-bold tracking-tight text-center">
            {'본 문서는 제공된 기사 데이터 분석을 바탕으로 작성되었습니다.'}
            <br />
            {'MICE-SCOUT.ONEPAGER'}
          </p>
        </footer>
      </main>

      {/* Article List Modal */}
      {articleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setArticleModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{articleModal.company}</h3>
                <p className="text-xs text-slate-400 font-medium">{'관련 기사 ' + articleModal.articles.length + '건'}</p>
              </div>
              <button
                onClick={() => setArticleModal(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {articleModal.articles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group/link"
                >
                  <Newspaper size={16} className="text-slate-400 group-hover/link:text-blue-500 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-semibold leading-snug group-hover/link:text-blue-700">
                      {article.title}
                    </p>
                    {article.pub_date && (
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(article.pub_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <ExternalLink size={14} className="text-slate-300 group-hover/link:text-blue-500 shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
