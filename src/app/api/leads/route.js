import { NextResponse } from 'next/server';

// Initial Mock Data matching screenshot columns
const leads = [
    {
        id: 1,
        name: 'Budi Santoso',
        company: 'Toko Maju Jaya',
        email: 'budi@tokojaya.com',
        source: 'Landing Page',
        phone: '+62 812-3333-1111',
        value: 'Rp 5M',
        pic: 'Sarah',
        status: 'Prospek Baru',
        createdDate: '2024-12-10',
        notes: ''
    },
    {
        id: 2,
        name: 'Siti Aminah',
        company: 'Warung Nasi Bu Siti',
        email: 'siti@warungnasi.com',
        source: 'Referral',
        phone: '+62 812-3333-2222',
        value: 'Rp 2M',
        pic: 'Ahmad',
        status: 'Prospek Baru',
        createdDate: '2024-12-11',
        notes: ''
    },
    {
        id: 3,
        name: 'Andi Wijaya',
        company: 'Kafe Kopi Kenangan',
        email: 'andi@kopikenangan.com',
        source: 'Google Ads',
        phone: '+62 812-3333-3333',
        value: 'Rp 8M',
        pic: 'Sarah',
        status: 'Dihubungi',
        createdDate: '2024-12-09',
        notes: 'Tertarik dengan fitur promo.'
    },
    {
        id: 4,
        name: 'Dewi Lestari',
        company: 'Fashion Store Cantik',
        email: 'dewi@fashioncantik.com',
        source: 'Webinar',
        phone: '+62 822-3333-4444',
        value: 'Rp 10M',
        pic: 'Ahmad',
        status: 'Demo',
        createdDate: '2024-12-12',
        notes: 'Demo dijadwalkan 18 Des 2024'
    },
    {
        id: 5,
        name: 'Hendra Gunawan',
        company: 'Elektronik Murah',
        email: 'hendra@elektronik.com',
        source: 'Cold Call',
        phone: '+62 812-3333-5555',
        value: 'Rp 15M',
        pic: 'Sarah',
        status: 'Negosiasi',
        createdDate: '2024-12-08',
        notes: 'Minta diskon 10%.'
    }
];

export async function GET() {
    return NextResponse.json(leads);
}

export async function POST(request) {
    const body = await request.json();
    // In a real app we'd save it. Here we just mock return it.
    return NextResponse.json({ ...body, id: Date.now() });
}

export async function PUT(request) {
    const body = await request.json();
    return NextResponse.json(body);
}
