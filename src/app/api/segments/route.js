import { NextResponse } from 'next/server';

// Initial Mock Data matching the screenshot
let segments = [
    {
        id: 1,
        name: 'Merchant Baru Jakarta',
        count: '1.245',
        criteria: ['Kota: Jakarta', 'Status: Baru'],
        lastUpdate: '2 hari lalu',
    },
    {
        id: 2,
        name: 'Merchant Aktif Premium',
        count: '567',
        criteria: ['Status: Aktif', 'Plan: Premium'],
        lastUpdate: '3 hari lalu',
    },
    {
        id: 3,
        name: 'Merchant Tidak Aktif',
        count: '892',
        criteria: ['Last Active: >30 hari', 'Status: Dormant'],
        lastUpdate: '1 minggu lalu',
    },
    {
        id: 4,
        name: 'F&B Surabaya',
        count: '324',
        criteria: ['Kategori: F&B', 'Kota: Surabaya'],
        lastUpdate: '5 hari lalu',
    },
];

export async function GET() {
    return NextResponse.json(segments);
}

export async function POST(request) {
    const body = await request.json();
    const newSegment = {
        id: Date.now(),
        name: body.name,
        count: '0', // Mock count for new segments
        criteria: body.criteria || [],
        lastUpdate: 'Baru saja',
    };

    // In a real DB we would save this. For now, we return it so the UI can optimistically add it.
    // segments.push(newSegment); 

    return NextResponse.json(newSegment);
}

export async function DELETE(request) {
    // Mock delete
    return NextResponse.json({ success: true });
}
