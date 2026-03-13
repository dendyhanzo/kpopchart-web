import { client } from "./lib/sanity";
import Link from "next/link";

const query = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": mainImage.asset->url
}`;

export default async function Home() {
  const posts = await client.fetch(query);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-900 border-l-4 border-red-600 pl-3">
          BERITA TERKINI
        </h1>
      </div>

      {/* List Layout (Berjejer ke bawah) */}
      <div className="flex flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              href={`/post/${post.slug}`} 
              key={post._id} 
              className="group flex flex-row items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 p-4"
            >
              
              {/* Konten Teks (Kiri) */}
              <div className="flex flex-col justify-center flex-grow pr-6">
                <p className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wider">
                  K-Pop Update
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2 sm:line-clamp-3 mb-3">
                  {post.title}
                </h2>
                
                {/* Tanggal */}
                <p className="text-sm text-gray-500 font-medium mt-auto">
                  {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>

              {/* Thumbnail Gambar (Kanan) */}
              <div className="relative h-28 w-28 sm:h-36 sm:w-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {post.imageUrl ? (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>

            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">Belum ada artikel yang dipublikasikan.</p>
        )}
      </div>
    </div>
  );
}