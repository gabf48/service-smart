"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      setPosts(data || []);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lucrări realizate</h1>

      {posts.map((post) => (
        <div key={post.id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <small>
            {new Date(post.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
