import { NextResponse } from 'next/server';

export async function GET() {
  const assets = [
    {
      id: 1,
      title: 'Banner Promo Akhir Tahun',
      type: 'image',
      size: '2.4 MB',
      category: 'banner',
      date: '2024-12-10',
      imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
      url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
      tags: ['promo', 'banner', '+1']
    },
    {
      id: 2,
      title: 'Email Template Welcome',
      type: 'document',
      size: '45 KB',
      category: 'copywriting',
      date: '2024-12-08',
      imageUrl: null, // Placeholder for non-image
      url: 'https://example.com/template.html',
      tags: ['email', 'template', '+1']
    },
    {
      id: 3,
      title: 'Product Demo Video',
      type: 'video',
      size: '125 MB',
      category: 'video',
      date: '2024-12-05',
      imageUrl: null, // Video placeholder
      url: 'https://example.com/video.mp4',
      tags: ['demo', 'product', '+1']
    },
    {
      id: 4,
      title: 'Logo Brand Guidelines',
      type: 'image',
      size: '1.2 MB',
      category: 'logo',
      date: '2024-11-20',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?w=400', // Netflix logo proxy
      url: 'https://images.unsplash.com/photo-1626785774573-4b799314346d',
      tags: ['brand', 'guideline']
    },
    {
      id: 5,
      title: 'Social Media Post Q1',
      type: 'image',
      size: '3.5 MB',
      category: 'banner',
      date: '2024-11-15',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
      url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
      tags: ['social', 'instagram']
    },
    {
      id: 6,
      title: 'Copywriting Sales Script',
      type: 'document',
      size: '12 KB',
      category: 'copywriting',
      date: '2024-11-10',
      imageUrl: null,
      url: 'https://example.com/script.pdf',
      tags: ['sales', 'script']
    }
  ];

  const counts = {
    all: assets.length,
    banner: assets.filter(a => a.category === 'banner').length,
    copywriting: assets.filter(a => a.category === 'copywriting').length,
    video: assets.filter(a => a.category === 'video').length,
    logo: assets.filter(a => a.category === 'logo').length
  };

  return NextResponse.json({ assets, counts });
}
