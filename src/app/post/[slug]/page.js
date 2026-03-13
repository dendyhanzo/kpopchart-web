import { client } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Link from "next/link"; // Pastikan import Link ditambahkan

const query = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "imageUrl": mainImage.asset->url,
  publishedAt,
  body
}`;

// Fungsi otomatis untuk men-generate SEO & Open Graph setiap artikel
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Menarik data khusus untuk kebutuhan SEO
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    "imageUrl": mainImage.asset->url
  }`, { slug });

  // Jika artikel tidak ada, berikan SEO default
  if (!post) {
    return { title: 'Artikel Tidak Ditemukan | Kpop Chart' };
  }

  // Merakit metadata SEO dan Open Graph
  return {
    title: `${post.title} | Kpop Chart`,
    description: `Baca update terbaru tentang ${post.title} selengkapnya hanya di Kpop Chart.`,
    openGraph: {
      title: `${post.title} | Kpop Chart`,
      description: `Baca update terbaru tentang ${post.title} selengkapnya hanya di Kpop Chart.`,
      url: `https://kpopchart-web.vercel.app/post/${slug}`, // Ganti dengan domain aslimu nanti
      siteName: 'Kpop Chart',
      images: [
        {
          url: post.imageUrl || 'https://kpopchart-web.vercel.app/default-og.jpg', 
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Kpop Chart`,
      description: `Baca update terbaru tentang ${post.title} selengkapnya hanya di Kpop Chart.`,
      images: [post.imageUrl || 'https://kpopchart-web.vercel.app/default-og.jpg'],
    },
  };
}

export default async function PostDetail({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const post = await client.fetch(query, { slug });

  if (!post) {
    return notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Tombol Kembali ke Beranda */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Kembali ke Beranda
        </Link>
      </div>

      {/* Header Artikel */}
      <header className="mb-8">
        <p className="text-red-600 font-bold tracking-wider uppercase text-sm mb-3">
          K-Pop Update
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 font-medium">
          {new Date(post.publishedAt).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}
        </p>
      </header>

      {/* Gambar Utama */}
      {post.imageUrl && (
        <div className="mb-10 rounded-xl overflow-hidden shadow-sm bg-gray-100">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Isi Artikel */}
      <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed 
        [&>p]:mb-6 
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-gray-900 dark:[&>h2]:text-white
        [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-gray-900 dark:[&>h3]:text-white
        [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 
        [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6
        [&>blockquote]:border-l-4 [&>blockquote]:border-red-600 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 dark:[&>blockquote]:text-gray-400
      ">
        <PortableText value={post.body} />
      </div>
      
    </article>
  );
}