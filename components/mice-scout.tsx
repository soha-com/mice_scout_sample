"use client"

import React, { useState, useRef } from 'react'
import {
  ExternalLink, Calendar, FileText, Tag, Building2,
  Search, Info, Target, Zap, Quote, RotateCw, ArrowRight, X, ChevronRight, Newspaper
} from 'lucide-react'

const data = {
  report_month: "2026-02",
  exhibition: "국제광융합 EXPO",
  organizer_summary: "이번 달 분석 결과, 광융합 기술이 단순 소자 중심에서 '공공 인프라 솔루션(스마트팜, 스마트시티, 도로안전)'으로 확장되는 추세입니다. 실증 사업을 진행 중인 기업 위주로 섭외 시 지자체 바이어 유치에 유리합니다.",
  total_leads: 10,
  leads: [
    {
      id: 1,
      company_name: "아이엘",
      keywords: ["LED조명", "광학기구", "로봇", "산업용"],
      type: "MIXED",
      recruitment_point: "LED 조명 및 광학기구 분야에서 15년 이상의 업력을 가진 전문 개발사. 최근 로봇 및 산업용 협동로봇 분야로 사업 영역을 확장 중.",
      exhibition_effect: "전통적인 광융합 하드웨어의 견고한 라인업을 구성하며, 부품 소재 전문관의 대표 기업으로 적합.",
      article_count: 1,
      related_articles: [
        { title: "로봇·산업용·협동로봇 관련주, '봄꽃만개' 대동기어·휴림로봇·대동...", url: "http://www.finomy.com/news/articleView.html?idxno=249491", description: "아이엘은 2008년 LED 조명 및 광학기구 개발·생산·판매를 목적으로 설립되었으며, 2019년 코스닥시장에... 효율화와 스마트 팩토리 구축을 지원하고 있다.", pub_date: "2026-02-10T09:20:00.000Z" }
      ]
    },
    {
      id: 2,
      company_name: "루비스코",
      keywords: ["LED", "광레시피", "스마트농업", "수의계약"],
      type: "MIXED",
      recruitment_point: "LED 광레시피 기술을 바탕으로 지자체 스마트팜 사업의 핵심 파트너로 부상 중. 최근 수의계약 자격 획득으로 실무적 참가가 용이함.",
      exhibition_effect: "'광융합 x 스마트농업' 특별 섹션의 앵커 기업 역할 수행 및 지자체 바이어 유입 유도.",
      article_count: 1,
      related_articles: [
        { title: "[장익경 기자의 K-명품 시리즈] 루비스코 이재영 이사 편", url: "http://www.ttlnews.com/news/articleView.html?idxno=3074906", description: "저희 기술은 딸기 모종이 가장 건강하게 자랄 수 있는 최적의 광레시피(LED)와 양분(양액), 그리고 온·습도와... 등 공공기관에서 우리 제품을 수의계약을 통해 도입할 수 있게 되었습니다.", pub_date: "2026-02-01T06:06:00.000Z" }
      ]
    },
    {
      id: 3,
      company_name: "코콤",
      keywords: ["LED조명", "CCTV", "스마트홈", "학교보안"],
      type: "MIXED",
      recruitment_point: "학교 CCTV 의무화 법안 통과에 따른 정책 수혜주. 영상 보안과 조명을 결합한 스마트홈/안전 플랫폼 시장의 선두주자.",
      exhibition_effect: "교육청, 학교 관계자 및 보안 시스템 설치 기업 등 B2G/B2B 관람객 유입 효과가 큼.",
      article_count: 1,
      related_articles: [
        { title: "[특징주] 코콤, 학교 CCTV 의무화 법안 통과...정책 수혜주 부각 20%대 급...", url: "https://www.widedaily.com/news/articleView.html?idxno=288863", description: "공공기관·공동주택·산업시설 등에 시스템을 구축한 레퍼런스를 확보하고 있다. 특히 공공 조달 시장 대응력이 강점으로 평가된다.", pub_date: "2026-02-13T06:28:00.000Z" }
      ]
    },
    {
      id: 4,
      company_name: "영우디에스피",
      keywords: ["OLED검사", "머신러닝", "스마트팩토리", "로봇"],
      type: "MIXED",
      recruitment_point: "기존 OLED 검사 장비의 강점을 바탕으로 로봇 및 헬스케어 신대륙 진출 선언. 정밀 광학 측정 기술의 비즈니스 확장 모델을 보여주는 대표적 사례.",
      exhibition_effect: "반도체/디스플레이 등 하이테크 제조 공정 관계자들을 관람객으로 유치할 수 있는 기술적 무게감 제공.",
      article_count: 1,
      related_articles: [
        { title: "OLED 검사는 시작일 뿐… 영우디에스피, 로봇·헬스케어 신대륙 넘본다", url: "https://www.pinpointnews.co.kr/news/articleView.html?idxno=428725", description: "2017년 코스닥 상장 이후 이들의 기술력은 가속기와 핵융합로를 넘어 머신러닝, 스마트팩토리 솔루션으로... 공공기관 대상 AI 솔루션을 제공하는 위세아이텍, 데이터 보안의 에스투더블유.", pub_date: "2026-02-11T09:44:00.000Z" }
      ]
    },
    {
      id: 5,
      company_name: "포스코DX",
      keywords: ["라이다(LiDAR)", "AI CCTV", "스마트교통"],
      type: "SOLUTION_PARTNER",
      recruitment_point: "라이다(LiDAR) 센서와 AI를 결합한 도로 안전 솔루션 운영. 자율주행 및 스마트시티 인프라 시장에서 강력한 영향력을 행사하는 대기업 계열사.",
      exhibition_effect: "'모빌리티 광학 센서' 섹터의 전문성을 강화하고, 관련 중소기업들의 참가를 독려하는 클러스터 효과 기대.",
      article_count: 1,
      related_articles: [
        { title: "[Who Is ?] 심민석 포스코DX 대표이사 사장", url: "https://www.businesspost.co.kr/BP?command=article_view&num=430248", description: "이를 기반으로 대외 기업과 공공기관으로 관련 서비스 제공을 확대해 나간다는 계획도 갖고 있다.... 로드킬 사고가 빈번한 도로 구간에 AI 기반의 스마트 CCTV와 라이다(LiDAR) 센서를 설치해 도로상에 출현한...", pub_date: "2026-02-12T22:30:00.000Z" }
      ]
    },
    {
      id: 6,
      company_name: "한전KDN",
      keywords: ["에너지ICT", "스마트팜", "스마트정류장"],
      type: "SOLUTION_PARTNER",
      recruitment_point: "스마트 에코 정류장 및 에너지 ICT 사업 주도 공기업. 단순 참가뿐 아니라 '공공 구매 상담회'의 메인 바이어로 초청하기에 최적.",
      exhibition_effect: "전시회의 규모감 확보 및 참가사들에게 실질적인 판로 개척 기회 제공.",
      article_count: 4,
      related_articles: [
        { title: "한전KDN, 민·관·공 합동 화재 예방 안전점검 실시…지역사회 안전망 강...", url: "https://www.pressian.com/pages/articles/2026020512265794233?utm_source=naver&utm_medium=search", description: "지자체와 공공기관, 민간단체가 함께 참여한 '민·관·공 합동 전기·소방·화재 예방 안전점검 및 교육... 또한 나주시와 함께 스마트팜 운영, 스마트 에코 정류장 구축.", pub_date: "2026-02-05T04:21:00.000Z" },
        { title: "한전KDN, 민·관·공 협력 화재 예방 안전망 구축…지역 취약시설 점검", url: "https://www.betanews.net/article/view/beta202602050049", description: "에너지ICT 전문 공기업 한전KDN이 지자체·공공기관·민간단체와 함께 민·관·공 합동 전기·소방·화재 예방...", pub_date: "2026-02-05T05:06:00.000Z" },
        { title: "한전KDN, 민·관·공 협업으로 지역사회 '안전 골든타임' 지킨다", url: "http://www.breaknews.com/1182984", description: "에너지ICT 전문 공기업인 한전KDN이 지자체, 공공기관, 민간단체와 손잡고... 함께하는 스마트 팜 운영, 스마트 에코 정류장 구축 제공.", pub_date: "2026-02-06T00:10:00.000Z" },
        { title: "나주시-한전KDN, '상생 도시락'으로 전통시장 활력 불어넣는다", url: "http://www.breaknews.com/1183844", description: "전남 나주시가 공공기관과의 긴밀한 상생협력을 통해 전통시장의 안정적인... 스마트 전통시장 지원을 통한 온라인 판로 확대.", pub_date: "2026-02-10T00:16:00.000Z" }
      ]
    },
    {
      id: 7,
      company_name: "금호에이치티",
      keywords: ["LED램프", "자동차부품", "전장"],
      type: "MIXED",
      recruitment_point: "글로벌 강소기업으로 선정된 자동차용 LED 모듈 전문 기업. 전장 시장 확대에 따라 참가가 매우 유력한 타겟.",
      exhibition_effect: "완성차 및 1차 부품 협력사 관계자 유치 및 모빌리티 조명 트렌드 제시.",
      article_count: 1,
      related_articles: [
        { title: "전기차 관련주, '봄바람 살랑살랑' 뉴인텍·화신·아진전자부품·금호에...", url: "http://www.finomy.com/news/articleView.html?idxno=249699", description: "기존 스마트폰 부품 중심 사업 구조에서 벗어나 로봇·에너지 분야로 사업 영역을 확장하며 체질 개선에... 앞서 중소벤처기��부의 '글로벌 강소기업 1000+' 프로젝트에 선정되며 기술력을 인정받은 바 있다.", pub_date: "2026-02-12T09:20:00.000Z" }
      ]
    },
    {
      id: 8,
      company_name: "경인씨엔에스",
      keywords: ["CCTV", "장애관리", "넷가드", "통합관제"],
      type: "MIXED",
      recruitment_point: "지능형 CCTV 장애관리 및 통합관제 센터용 솔루션 전문. 시스템의 안정성을 중시하는 공공기관 수요가 높음.",
      exhibition_effect: "단순 하드웨어 전시를 넘어 '관리 소프트웨어' 영역의 전문성을 더해 전시 품목의 다양성 확보.",
      article_count: 1,
      related_articles: [
        { title: "[2026 CCTV 장애관리 리포트] 스마트 도시 시대, CCTV 장애관리의 현재와...", url: "http://www.boannews.com/media/view.asp?idx=141759&kind=3", description: "국내 보안업계에 장애관리라는 영역을 처음으로 등장시킨 경인씨엔에스의 넷가드는 스마트 네트워크... 이러한 접근은 영상 연속성과 신뢰성이 중요한 공공기관 및 통합관제센터 환경에서 특히 중요하게 요구되고...", pub_date: "2026-02-08T13:10:00.000Z" }
      ]
    },
    {
      id: 9,
      company_name: "다원시스",
      keywords: ["스마트박스", "태양광에너지", "AI연산기지"],
      type: "MIXED",
      recruitment_point: "스마트시티용 도심형 AI 연산 기지 및 스마트박스 기술 보유. 에너지 효율과 AI를 결합한 미래형 인프라 제시 가능.",
      exhibition_effect: "에너지 기술과 광융합 기술의 교차점을 전시하여 신재생 에너지 테마 강화.",
      article_count: 2,
      related_articles: [
        { title: "태양광에너지 관련주, '맑고 화창' 한화솔루션·유니테스트·파루·에스...", url: "http://www.finomy.com/news/articleView.html?idxno=249112", description: "'스마트박스'는 빠른 설치가 가능하고 공간 효율이 높아, 스마트시티·5G 기지국·AI 연산기지 등 도심형... 1996년 설립된 다원시스는 과거 한국원자력연구원과...", pub_date: "2026-02-04T09:06:00.000Z" },
        { title: "태양광에너지 관련주, '맑고화창' 다스코·뉴인텍·SDN·한화솔루션·신...", url: "http://www.finomy.com/news/articleView.html?idxno=249584", description: "'스마트박스'는 빠른 설치가 가능하고 공간 효율이 높아, 스마트시티·5G 기지국·AI 연산기지 등 도심형...", pub_date: "2026-02-11T09:06:00.000Z" }
      ]
    },
    {
      id: 10,
      company_name: "유위컴",
      keywords: ["음향센서", "무선전송", "난청기술", "공공기관"],
      type: "MIXED",
      recruitment_point: "무선 전송 및 센서 기반 난청 보조 기술 보유. 이미 500여 개 공공기관에서 선택받은 입증된 기술력.",
      exhibition_effect: "광융합 기술이 헬스케어 및 복지 분야에 어떻게 기여하는지 보여주는 감성적/실용적 전시 콘텐츠가 됨.",
      article_count: 1,
      related_articles: [
        { title: "다시 들리는 기쁨 …'기술'로 찾아줄게요", url: "https://www.junggi.co.kr/news/articleView.html?idxno=35376", description: "유위컴의 기술력은 국내외 500여개 공공기관과 주요 의료기관에서 선택하며 그 가치를 입증받았다. 또한... 스마트폰과 무선 이어폰 사용이 일상화되면서 10~20대에서도 소음성 난청 환자가 늘고 있다는 것에 착안한...", pub_date: "2026-01-31T15:00:00.000Z" }
      ]
    }
  ]
}

export default function MiceScout() {
  const [searchTerm, setSearchTerm] = useState('')
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const [articleModal, setArticleModal] = useState<{ company: string; articles: typeof data.leads[0]['related_articles'] } | null>(null)

  const handleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const filteredLeads = [...data.leads]
    .sort((a, b) => b.article_count - a.article_count)
    .filter(lead =>
      lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    )

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
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">MICE Scout {data.exhibition} {data.report_month.split('-')[1]}월 호</h1>
            </div>
            <p className="text-slate-500 font-medium tracking-tight">전시 참가 후보 기업 브리프 (Keyword + Strategy)</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full font-bold">
              <Calendar size={14} />
              <span>2026-02-20</span>
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
          {filteredLeads.map((lead) => (
            <div key={lead.id} className={`flip-card h-[380px] ${flippedCards[lead.id] ? 'flipped' : ''}`}>
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
                      onClick={() => handleFlip(lead.id)}
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
                        <button onClick={() => handleFlip(lead.id)} className="text-slate-400 hover:text-white transition-colors">
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
                        onClick={() => handleFlip(lead.id)}
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
