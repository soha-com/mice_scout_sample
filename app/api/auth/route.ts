import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { password } = await request.json()
    const adminPassword = process.env.admin_password

    if (!adminPassword) {
        return NextResponse.json({ success: false, message: '서버 설정 오류' }, { status: 500 })
    }

    if (password === adminPassword) {
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: '비밀번호가 올바르지 않습니다.' }, { status: 401 })
}
