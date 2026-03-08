import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Calendar, 
  Download, 
  Plus, 
  User, 
  GraduationCap, 
  TrendingUp, 
  ClipboardCheck, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Star,
  BookOpen,
  FileText,
  History,
  Bold,
  Italic,
  List as ListIcon,
  Paperclip,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  School,
  BrainCircuit,
  Terminal,
  Library,
  LineChart,
  Wallet
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const performanceData = [
  { month: '2023.12', score: 78 },
  { month: '2024.01', score: 80 },
  { month: '2024.02', score: 75 },
  { month: '2024.03', score: 82 },
  { month: '2024.04', score: 88 },
  { month: '2024.05', score: 90 },
];

const students = [
  { id: '30101', name: '김민수', gpa: 4.25, major: '컴퓨터공학과', status: '상담 완료', color: 'emerald' },
  { id: '30105', name: '이서윤', gpa: 3.92, major: '경영학과', status: '진행 중', color: 'blue' },
  { id: '30112', name: '박지우', gpa: 3.45, major: '의생명공학', status: '대기 중', color: 'orange' },
  { id: '30118', name: '최도현', gpa: 4.10, major: '정치외교학과', status: '상담 완료', color: 'emerald' },
  { id: '30121', name: '정예원', gpa: 3.78, major: '건축학과', status: '진행 중', color: 'blue' },
];

const subjectComparison = [
  { subject: '국어', student: 142, average: 135 },
  { subject: '수학 (확통)', student: 138, average: 139 },
  { subject: '영어', student: 95, average: 80 }, // Represented as percentile/score for bar
];

const predictions = [
  { univ: '서울대학교', dept: '경영대학 경영학과', type: '소신 지원', prob: 32, icon: School, gpa: 1.25, cutoff: 1.12, color: 'red' },
  { univ: '성균관대학교', dept: '사회과학대학 심리학과', type: '적정 지원', prob: 68, icon: BrainCircuit, gpa: 1.25, cutoff: 1.38, color: 'amber' },
  { univ: '한양대학교', dept: '공과대학 컴퓨터소프트웨어학부', type: '안정 지원', prob: 89, icon: Terminal, gpa: 1.25, cutoff: 1.54, color: 'emerald' },
  { univ: '연세대학교', dept: '문과대학 국어국문학과', type: '적정 지원', prob: 54, icon: Library, gpa: 1.25, cutoff: 1.31, color: 'amber' },
  { univ: '고려대학교', dept: '정경대학 통계학과', type: '적정 지원', prob: 61, icon: LineChart, gpa: 1.25, cutoff: 1.42, color: 'amber' },
  { univ: '서강대학교', dept: '경영대학 경영학부', type: '안정 지원', prob: 82, icon: Wallet, gpa: 1.25, cutoff: 1.68, color: 'emerald' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
      active 
        ? "bg-[#1a227f] text-white" 
        : "text-slate-600 hover:bg-slate-100"
    )}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const StatCard = ({ icon: Icon, label, value, change, subtext, type, urgent = false }: any) => (
  <div className={cn(
    "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md",
    urgent && "border-l-4 border-l-red-500"
  )}>
    <div className="flex items-center justify-between mb-4">
      <div className={cn(
        "size-10 rounded-xl flex items-center justify-center",
        type === 'blue' && "bg-blue-50 text-blue-600",
        type === 'purple' && "bg-purple-50 text-purple-600",
        type === 'orange' && "bg-orange-50 text-orange-600",
        type === 'red' && "bg-red-50 text-red-600",
      )}>
        <Icon size={20} />
      </div>
      <span className={cn(
        "text-[10px] font-bold px-2 py-1 rounded",
        urgent ? "bg-red-500 text-white" : "bg-slate-100 text-slate-400"
      )}>
        {urgent ? 'URGENT' : label.toUpperCase()}
      </span>
    </div>
    <p className="text-slate-500 text-sm font-medium">{subtext}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <h3 className="text-2xl font-bold">{value}</h3>
      {change && (
        <span className={cn(
          "text-xs font-bold",
          change.startsWith('+') ? "text-emerald-500" : "text-red-500"
        )}>
          {change}
        </span>
      )}
      {!change && <span className="text-xs font-bold text-slate-400">이번주 마감</span>}
    </div>
  </div>
);

// --- Views ---

const TeacherDashboard = ({ onStudentClick }: { onStudentClick: () => void }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">입시 진화 지도 교사 대시보드</h2>
        <p className="text-slate-500 mt-1">오늘의 학급 현황과 주요 상담 일정을 한눈에 확인하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-bold shadow-sm hover:bg-slate-50">
          <Download size={16} />
          보고서 출력
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a227f] text-white text-sm font-bold shadow-lg shadow-[#1a227f]/20 hover:opacity-90 transition-opacity">
          <Plus size={16} />
          새 상담 등록
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={User} label="Total" value="120명" change="+0%" subtext="전체 학생 수" type="blue" />
      <StatCard icon={GraduationCap} label="GPA" value="3.85" change="+0.05" subtext="학급 평균 GPA" type="purple" />
      <StatCard icon={TrendingUp} label="Progress" value="75%" change="-2%" subtext="상담 진행률" type="orange" />
      <StatCard icon={ClipboardCheck} label="Urgent" value="12건" subtext="미결 과제" type="red" urgent />
    </div>

    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold tracking-tight">학급 모의고사 성적 추이</h3>
          <p className="text-sm text-slate-500 mt-1">최근 6개월간 국/영/수 합산 평균 백분위 변화</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button className="px-3 py-1.5 text-xs font-bold rounded-md bg-white shadow-sm">6개월</button>
          <button className="px-3 py-1.5 text-xs font-bold rounded-md text-slate-500">12개월</button>
          <button className="px-3 py-1.5 text-xs font-bold rounded-md text-slate-500">전체</button>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a227f" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#1a227f" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#1a227f" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              dot={{ r: 6, fill: '#1a227f', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">학생 관리 명단</h3>
        <div className="flex gap-2">
          <select className="text-xs font-bold border-slate-200 bg-white rounded-lg py-1.5 focus:ring-[#1a227f]/20">
            <option>전체 학생</option>
            <option>상담 대기</option>
            <option>진행 중</option>
          </select>
          <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
            <Settings size={16} className="text-slate-500" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">이름</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">GPA</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">희망 전공</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">상담 상태</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr 
                key={student.id} 
                className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                onClick={onStudentClick}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-[#1a227f]/10 text-[#1a227f] flex items-center justify-center font-bold text-xs">
                      {student.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{student.name}</p>
                      <p className="text-[10px] text-slate-400">{student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{student.gpa}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{student.major}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold",
                    student.color === 'emerald' && "bg-emerald-100 text-emerald-700",
                    student.color === 'blue' && "bg-blue-100 text-blue-700",
                    student.color === 'orange' && "bg-orange-100 text-orange-700",
                  )}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-[#1a227f] transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">총 120명의 학생 중 1-5 표시</p>
        <div className="flex gap-1">
          <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
            <ChevronLeft size={16} />
          </button>
          <button className="size-8 flex items-center justify-center rounded-lg bg-[#1a227f] text-white text-xs font-bold">1</button>
          <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
          <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
          <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StudentDetail = ({ onBack, onReportClick }: { onBack: () => void, onReportClick: () => void }) => (
  <div className="space-y-6 animate-in slide-in-from-right duration-500">
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1a227f]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-slate-400" />
        </button>
        <div className="relative">
          <div className="size-20 rounded-full bg-slate-200 overflow-hidden border-2 border-[#1a227f]/20">
            <img 
              src="https://picsum.photos/seed/student/200/200" 
              alt="Student profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute bottom-0 right-0 size-5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">김지훈 <span className="text-lg font-medium text-slate-500">(3학년)</span></h1>
            <span className="px-2 py-0.5 bg-[#1a227f]/10 text-[#1a227f] text-xs font-bold rounded uppercase">인문계열</span>
          </div>
          <p className="text-slate-500 mt-1 text-sm font-medium">학번: 202101234 | 최근 접속: 2023.10.27 14:30</p>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 font-bold rounded-lg hover:bg-slate-50 flex items-center justify-center gap-2">
          <FileText size={18} /> 정보 수정
        </button>
        <button 
          onClick={onReportClick}
          className="flex-1 md:flex-none px-4 py-2 bg-[#1a227f] text-white font-bold rounded-lg hover:bg-[#1a227f]/90 flex items-center justify-center gap-2"
        >
          <BarChart3 size={18} /> 리포트 출력
        </button>
        <button className="p-2 border border-slate-200 rounded-lg">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1a227f]/5">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <School size={20} className="text-[#1a227f]" /> 학업 성적 요약
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1a227f]/5 border border-[#1a227f]/10">
              <p className="text-sm text-slate-500 font-medium">전체 GPA</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-[#1a227f]">4.21</span>
                <span className="text-sm font-bold text-slate-400">/ 4.5</span>
              </div>
              <div className="mt-2 flex items-center text-xs font-bold text-green-600">
                <TrendingUp size={14} className="mr-1" /> 전학기 대비 +0.12
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm text-slate-500 font-medium">최근 모의고사</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold">1.2</span>
                <span className="text-sm font-bold text-slate-400">등급 평균</span>
              </div>
              <div className="mt-2 flex items-center text-xs font-bold text-slate-500">
                상위 2.1% (9월 모의평가)
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">내신 등급 추이</h4>
            <div className="h-40 flex items-end justify-between gap-1 px-2">
              {[70, 75, 85, 82, 94].map((h, i) => (
                <div key={i} className="group relative flex-1">
                  <div 
                    className={cn(
                      "w-full rounded-t transition-all",
                      i === 4 ? "bg-[#1a227f]" : "bg-[#1a227f]/20"
                    )} 
                    style={{ height: `${h}%` }}
                  ></div>
                  <span className={cn(
                    "text-[10px] absolute -bottom-6 left-1/2 -translate-x-1/2",
                    i === 4 ? "font-bold text-[#1a227f]" : "text-slate-500"
                  )}>
                    {['1-1', '1-2', '2-1', '2-2', '3-1'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1a227f]/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Star size={20} className="text-[#1a227f]" /> 목표 대학 분석
            </h3>
            <button className="text-xs font-bold text-[#1a227f] hover:underline">대학 변경</button>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1a227f]/5 mb-8">
            <div className="size-12 rounded-lg bg-white flex items-center justify-center border border-[#1a227f]/10 shadow-sm">
              <School size={24} className="text-[#1a227f]" />
            </div>
            <div>
              <h4 className="font-bold text-[#1a227f]">서울대학교</h4>
              <p className="text-sm text-slate-500">인문대학 국어국문학과 (지역균형선발)</p>
            </div>
            <div className="ml-auto text-right">
              <span className="text-xs font-bold text-slate-400">합격 가능성</span>
              <p className="text-lg font-bold text-green-600">안정권 (85%)</p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold mb-4 flex justify-between">
                과목별 표준점수 비교 <span className="text-slate-400 font-normal">국어 / 수학 / 영어</span>
              </h4>
              <div className="space-y-6">
                {subjectComparison.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{item.subject}</span>
                      <span className="text-[#1a227f]">학생: {item.student} / 전년 평균: {item.average}</span>
                    </div>
                    <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-[#1a227f]/30 rounded-full" style={{ width: `${(item.average / 160) * 100}%` }}></div>
                      <div className="absolute inset-y-0 left-0 bg-[#1a227f] rounded-full shadow-lg" style={{ width: `${(item.student / 160) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-4 text-[10px] font-bold uppercase tracking-tight">
                <div className="flex items-center gap-1"><span className="size-2 bg-[#1a227f] rounded-full"></span> 김지훈 점수</div>
                <div className="flex items-center gap-1"><span className="size-2 bg-[#1a227f]/30 rounded-full"></span> 전년 합격자 평균</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 rounded-xl">
                <p className="text-xs text-slate-500 font-bold mb-1">최근 경쟁률</p>
                <p className="text-xl font-bold">4.25 : 1</p>
                <p className="text-[10px] text-red-500 mt-1">▲ 전년대비 0.5% 증가</p>
              </div>
              <div className="p-4 border border-slate-100 rounded-xl">
                <p className="text-xs text-slate-500 font-bold mb-1">합격자 평균 내신</p>
                <p className="text-xl font-bold">1.15 등급</p>
                <p className="text-[10px] text-green-600 mt-1">● 지원 가능 수준</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#1a227f]/5 flex flex-col h-full min-h-[600px]">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MessageSquare size={20} className="text-[#1a227f]" /> 컨설팅 노트
            </h3>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex flex-wrap gap-2 bg-slate-50">
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Bold size={18} /></button>
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Italic size={18} /></button>
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><ListIcon size={18} /></button>
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><Paperclip size={18} /></button>
              <div className="w-px h-6 bg-slate-300 mx-1"></div>
              <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600"><History size={18} /></button>
            </div>
            <textarea 
              className="flex-1 p-6 bg-transparent border-none focus:ring-0 text-sm leading-relaxed resize-none" 
              placeholder="오늘의 상담 내용을 기록하세요..."
            ></textarea>
            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button className="px-6 py-2 bg-[#1a227f] text-white font-bold rounded-lg hover:bg-[#1a227f]/90 text-sm">기록 저장</button>
            </div>
          </div>
          <div className="p-6 bg-slate-50 rounded-b-xl border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">이전 상담 내역</h4>
            <div className="space-y-4">
              <div className="relative pl-6 pb-4 border-l border-[#1a227f]/20 last:pb-0">
                <div className="absolute top-0 left-[-4.5px] size-2 rounded-full bg-[#1a227f]"></div>
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold">2023.10.12</p>
                  <span className="text-[10px] text-slate-400">오후 3:00</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1 italic">수학 취약 단원 보완 계획 수립 및 6월 모평 오답 분석 진행...</p>
              </div>
              <div className="relative pl-6 pb-4 border-l border-[#1a227f]/20 last:pb-0">
                <div className="absolute top-0 left-[-4.5px] size-2 rounded-full bg-[#1a227f]/30"></div>
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold">2023.09.25</p>
                  <span className="text-[10px] text-slate-400">오전 11:30</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1 italic">목표 대학 수시 전형 리스트업 완료. 생기부 창체 활동 기록 보완 요청...</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-[#1a227f] transition-colors">전체 내역 보기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PredictionReport = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-8 animate-in zoom-in-95 duration-500">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-slate-400" />
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">대학 합격 예측 리포트 - 김지훈</h2>
          <p className="mt-2 text-slate-600">2024학년도 정시/수시 통합 데이터 기반 심층 분석 결과입니다.</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
          <Download size={18} /> 리포트 PDF 저장
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1a227f] text-white rounded-lg text-sm font-semibold hover:bg-[#1a227f]/90">
          <History size={18} /> 데이터 업데이트
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-slate-500">총 지원 가능 대학</p>
          <ListIcon size={20} className="text-[#1a227f]/40" />
        </div>
        <p className="text-3xl font-bold text-slate-900">12 <span className="text-sm font-normal text-slate-400">개교</span></p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-slate-500">소신 지원 (Aggressive)</p>
          <TrendingUp size={20} className="text-red-500/40" />
        </div>
        <p className="text-3xl font-bold text-slate-900">3 <span className="text-sm font-normal text-slate-400">건</span></p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-slate-500">적정 지원 (Target)</p>
          <AlertCircle size={20} className="text-amber-500/40" />
        </div>
        <p className="text-3xl font-bold text-slate-900">5 <span className="text-sm font-normal text-slate-400">건</span></p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-slate-500">안정 지원 (Safe)</p>
          <CheckCircle2 size={20} className="text-emerald-500/40" />
        </div>
        <p className="text-3xl font-bold text-slate-900">4 <span className="text-sm font-normal text-slate-400">건</span></p>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <BarChart3 size={20} className="text-[#1a227f]" /> 지원 대학별 상세 예측 결과
      </h3>
      <select className="bg-white border-slate-200 rounded-lg text-sm px-3 py-1.5 focus:ring-[#1a227f]">
        <option>전체 전형</option>
        <option>수시 모집</option>
        <option>정시 모집</option>
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {predictions.map((p, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center">
                  <p.icon size={24} className="text-[#1a227f]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 leading-none">{p.univ}</h4>
                  <p className="text-sm text-slate-500 mt-1">{p.dept}</p>
                </div>
              </div>
              <span className={cn(
                "px-2 py-1 rounded text-[11px] font-bold",
                p.color === 'red' && "bg-red-100 text-red-700",
                p.color === 'amber' && "bg-amber-100 text-amber-700",
                p.color === 'emerald' && "bg-emerald-100 text-emerald-700",
              )}>
                {p.type}
              </span>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm font-medium text-slate-600">합격 확률</p>
                <p className={cn(
                  "text-2xl font-black",
                  p.color === 'red' && "text-red-600",
                  p.color === 'amber' && "text-amber-600",
                  p.color === 'emerald' && "text-emerald-600",
                )}>{p.prob}%</p>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className={cn(
                  "h-full rounded-full",
                  p.color === 'red' && "bg-red-500",
                  p.color === 'amber' && "bg-amber-500",
                  p.color === 'emerald' && "bg-emerald-500",
                )} style={{ width: `${p.prob}%` }}></div>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">전형 유형</span>
                <span className="font-medium">일반전형</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">내신 GPA (본인)</span>
                <span className="font-bold text-[#1a227f]">{p.gpa}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">전년도 커트라인</span>
                <span className="font-medium">{p.cutoff}</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-slate-50 flex justify-center">
            <button className="text-sm font-bold text-[#1a227f] hover:underline">상세 분석 리포트 보기</button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 flex flex-col items-center">
      <p className="text-sm text-slate-500 mb-4">전체 12개 결과 중 6개 표시됨</p>
      <button className="px-8 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
        더 많은 예측 결과 불러오기
      </button>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'dashboard' | 'student' | 'report'>('dashboard');

  return (
    <div className="flex min-h-screen bg-[#f6f6f8] text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-[#1a227f] rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-[#1a227f]">EduGuide Pro</h1>
        </div>
        
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
            <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/teacher/100/100')" }}></div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">김철수 선생님</p>
              <p className="text-xs text-slate-500 truncate">진로 진학 지도부</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="대시보드" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
          <SidebarItem icon={Users} label="학생 관리" active={view === 'student' || view === 'report'} onClick={() => setView('dashboard')} />
          <SidebarItem icon={BarChart3} label="성적 분석" />
          <SidebarItem icon={MessageSquare} label="진학 상담" />
          
          <div className="pt-4 pb-2 px-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</p>
          </div>
          <SidebarItem icon={Settings} label="설정" />
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1a227f] transition-colors" />
              <input 
                className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#1a227f]/20 transition-all" 
                placeholder="학생 이름, 학번 또는 학부 검색..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100">
              <Calendar size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <p className="text-sm font-medium">2024년 5월 22일 (수)</p>
          </div>
        </header>

        <div className="p-8 flex-1">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <TeacherDashboard onStudentClick={() => setView('student')} />
              </motion.div>
            )}
            {view === 'student' && (
              <motion.div
                key="student"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <StudentDetail onBack={() => setView('dashboard')} onReportClick={() => setView('report')} />
              </motion.div>
            )}
            {view === 'report' && (
              <motion.div
                key="report"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <PredictionReport onBack={() => setView('student')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="p-8 mt-auto border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400 font-medium">© 2024 EduGuide Pro. 고등학교 입시 진화 지도 시스템. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
