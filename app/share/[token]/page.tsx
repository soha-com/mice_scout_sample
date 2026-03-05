"use client"

import React, { useState, useEffect, use } from 'react'
import MiceScout from '@/components/mice-scout'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Exhibition {
    id: string
    name: string
    category: string
    reports: string[]
}

interface ReportData {
    report_month: string
    exhibition: string
    organizer_summary: string
    total_leads: number
    leads: any[]
}

export default function SharePage({ params }: { params: Promise<{ token: string }> }) {
    const resolvedParams = use(params)
    const [data, setData] = useState<ReportData | null>(null)
    const [allReports, setAllReports] = useState<string[]>([])
    const [exhibitionId, setExhibitionId] = useState('')
    const [currentMonth, setCurrentMonth] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const decoded = atob(resolvedParams.token)
            const [exId, month] = decoded.split(':')

            if (!exId || !month) {
                setError('유효하지 않은 링크입니다.')
                setLoading(false)
                return
            }

            setExhibitionId(exId)
            setCurrentMonth(month)

            // Fetch exhibition list to get all report months
            fetch('/data/exhibitions.json')
                .then(res => res.json())
                .then(exData => {
                    const exhibition = exData.exhibitions.find((ex: Exhibition) => ex.id === exId)
                    if (exhibition) {
                        setAllReports(exhibition.reports)
                    }
                })
                .catch(() => { })

            // Fetch the report data
            fetch(`/data/${exId}/${month}.json`)
                .then(res => {
                    if (!res.ok) throw new Error('리포트를 찾을 수 없습니다.')
                    return res.json()
                })
                .then(reportData => {
                    setData(reportData)
                    setLoading(false)
                })
                .catch(err => {
                    setError(err.message || '데이터 로드에 실패했습니다.')
                    setLoading(false)
                })
        } catch {
            setError('유효하지 않은 링크입니다.')
            setLoading(false)
        }
    }, [resolvedParams.token])

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                    <span className="text-sm font-medium text-slate-400">리포트를 불러오는 중...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
                    <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">접근 오류</h2>
                    <p className="text-slate-500 text-sm font-medium mb-6">{error}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold transition-all hover:bg-blue-700"
                    >
                        <Sparkles size={14} />
                        서비스 홈으로
                    </Link>
                </div>
            </div>
        )
    }

    if (!data) return null

    return (
        <MiceScout
            data={data}
            allReports={allReports}
            exhibitionId={exhibitionId}
            currentMonth={currentMonth}
        />
    )
}
