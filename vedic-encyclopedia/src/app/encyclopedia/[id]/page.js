import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function ArticlePage({ params }) {
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">
        {article.content}
      </p>
    </div>
  );
}
