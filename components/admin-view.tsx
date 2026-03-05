"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Building2, Calendar, Copy, Check, ExternalLink, Sparkles,
    ChevronRight, Link2, Eye, Tag, FileText, ArrowLeft, LayoutGrid,
    Lock, KeyRound
} from 'lucide-react'

interface Exhibition {
    id: string
    name: string
    category: string
    reports: string[]
}

interface ExhibitionsData {
    exhibitions: Exhibition[]
}

export default function AdminView() {
    const [authenticated, setAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [authLoading, setAuthLoading] = useState(false)

    const [exhibitions, setExhibitions] = useState<Exhibition[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null)
    const [selectedMonth, setSelectedMonth] = useState<string>('')
    const [copied, setCopied] = useState(false)
    const [generatedUrl, setGeneratedUrl] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthLoading(true)
        setAuthError('')
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            const data = await res.json()
            if (data.success) {
                setAuthenticated(true)
            } else {
                setAuthError(data.message || '인증에 실패했습니다.')
            }
        } catch {
            setAuthError('서버와 통신할 수 없습니다.')
        } finally {
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        if (!authenticated) return
        fetch('/data/exhibitions.json')
            .then(res => res.json())
            .then((data: ExhibitionsData) => {
                setExhibitions(data.exhibitions)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [authenticated])

    const generateToken = (exhibitionId: string, month: string) => {
        return btoa(`${exhibitionId}:${month}`)
    }

    const handleGenerateLink = () => {
        if (!selectedExhibition || !selectedMonth) return
        const token = generateToken(selectedExhibition.id, selectedMonth)
        const url = `${window.location.origin}/share/${token}`
        setGeneratedUrl(url)
    }

    const handleCopy = async () => {
        if (!generatedUrl) return
        try {
            await navigator.clipboard.writeText(generatedUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // fallback
            const textarea = document.createElement('textarea')
            textarea.value = generatedUrl
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const formatMonth = (m: string) => {
        const [y, mo] = m.split('-')
        return `${y}년 ${parseInt(mo)}월`
    }

    // Group exhibitions by category
    const categories = exhibitions.reduce<Record<string, Exhibition[]>>((acc, ex) => {
        if (!acc[ex.category]) acc[ex.category] = []
        acc[ex.category].push(ex)
        return acc
    }, {})

    // Login screen
    if (!authenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                <Lock size={24} className="text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-slate-800">관리자 인증</h1>
                            <p className="text-sm text-slate-400 font-medium mt-1">비밀번호를 입력해주세요</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setAuthError('') }}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium transition-all"
                                    autoFocus
                                />
                            </div>
                            {authError && (
                                <p className="text-xs text-red-500 font-medium text-center">{authError}</p>
                            )}
                            <button
                                type="submit"
                                disabled={authLoading || !password}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {authLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    '로그인'
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="text-center mt-4">
                        <a href="/" className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors">← 홈으로 돌아가기</a>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                    <span className="text-sm font-medium">데이터를 불러오는 중...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight">MICE Scout Admin</h1>
                            <p className="text-xs text-slate-400 font-medium">전시회 리포트 관리 대시보드</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
                    >
                        <ArrowLeft size={14} />
                        홈으로
                    </Link>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Exhibition Dashboard */}
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-6">
                        <LayoutGrid size={18} className="text-blue-600" />
                        <h2 className="text-xl font-bold">전시회 대시보드</h2>
                        <span className="ml-2 px-2.5 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">
                            {exhibitions.length}개 전시회
                        </span>
                    </div>

                    {Object.entries(categories).map(([category, exList]) => (
                        <div key={category} className="mb-8">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag size={14} className="text-indigo-500" />
                                <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wider">{category}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {exList.map(ex => (
                                    <button
                                        key={ex.id}
                                        onClick={() => {
                                            setSelectedExhibition(ex)
                                            setSelectedMonth(ex.reports[ex.reports.length - 1] || '')
                                            setGeneratedUrl('')
                                        }}
                                        className={`text-left p-5 rounded-2xl border transition-all group ${selectedExhibition?.id === ex.id
                                            ? 'bg-blue-50 border-blue-200 shadow-sm'
                                            : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                                                <Building2 size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                                <FileText size={12} />
                                                <span>{ex.reports.length}개 리포트</span>
                                            </div>
                                        </div>
                                        <h4 className="text-base font-bold text-slate-800 mb-1">{ex.name}</h4>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {ex.reports.map(month => (
                                                <span
                                                    key={month}
                                                    className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-bold"
                                                >
                                                    {formatMonth(month)}
                                                </span>
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Token Generator */}
                {selectedExhibition && (
                    <section className="mb-10">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <Link2 size={18} className="text-blue-600" />
                                    <h2 className="text-lg font-bold">매직링크 생성기</h2>
                                </div>
                                <p className="text-sm text-slate-400 font-medium mt-1">
                                    선택한 전시회의 리포트를 공유할 URL을 생성합니다.
                                </p>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {/* Exhibition Selector */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            전시회
                                        </label>
                                        <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium text-slate-700">
                                            {selectedExhibition.name}
                                        </div>
                                    </div>

                                    {/* Month Selector */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            리포트 월
                                        </label>
                                        <select
                                            value={selectedMonth}
                                            onChange={(e) => {
                                                setSelectedMonth(e.target.value)
                                                setGeneratedUrl('')
                                            }}
                                            className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        >
                                            {selectedExhibition.reports.map(month => (
                                                <option key={month} value={month}>{formatMonth(month)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerateLink}
                                    disabled={!selectedMonth}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 disabled:shadow-none"
                                >
                                    URL 생성하기
                                </button>

                                {/* Generated URL */}
                                {generatedUrl && (
                                    <div className="mt-6 p-4 bg-slate-900 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Check size={14} className="text-emerald-400" />
                                            <span className="text-xs font-bold text-emerald-400">URL이 생성되었습니다</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 text-sm text-blue-300 font-mono bg-slate-800 px-3 py-2 rounded-lg overflow-x-auto">
                                                {generatedUrl}
                                            </code>
                                            <button
                                                onClick={handleCopy}
                                                className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${copied
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-white text-slate-900 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {copied ? (
                                                    <span className="flex items-center gap-1"><Check size={12} /> 복사됨</span>
                                                ) : (
                                                    <span className="flex items-center gap-1"><Copy size={12} /> 복사</span>
                                                )}
                                            </button>
                                        </div>

                                        {/* Quick Preview Button */}
                                        <div className="mt-3">
                                            <Link
                                                href={generatedUrl.replace(window.location.origin, '')}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-all"
                                            >
                                                <Eye size={14} />
                                                주최사 뷰로 미리보기
                                                <ExternalLink size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
