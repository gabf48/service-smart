"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


export default function AdminPosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<any[]>([]);


useEffect(() => {
  const fetch = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts(data || []);
  };

  fetch();
}, []);

const deletePost = async (id: string) => {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (!error) {
    setPosts(posts.filter(p => p.id !== id));
  }
};


  
  const handleAdd = async () => {
  if (!title || !content) {
    alert("Completează toate câmpurile!");
    return;
  }

  let imageUrl = "";

  if (image) {
    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("work-images")
      .upload(fileName, image);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    imageUrl = supabase.storage
      .from("work-images")
      .getPublicUrl(fileName).data.publicUrl;
  }

  

  const { error } = await supabase.from("posts").insert([
    { title, content, image_url: imageUrl },
  ]);

  if (error) alert(error.message);
  else {
    alert("Postare adăugată!");
    setTitle("");
    setContent("");
    setImage(null);
  }

  const { data } = await supabase
  .from("posts")
  .select("*")
  .order("created_at", { ascending: false });

setPosts(data || []);

  
};




  return (
 <div className="p-8 flex flex-col gap-4 max-w-xl mx-auto bg-black rounded-xl shadow-lg">

      <h1 className="text-2xl font-bold">Adaugă lucrare</h1>

      <input
        placeholder="Titlu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />

      <textarea
        placeholder="Descriere lucrare"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2"
      />

      <input
  type="file"
  onChange={(e) => setImage(e.target.files?.[0] || null)}
/>


      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Publică
      </button>

      <hr className="my-6" />

<h2 className="text-xl font-bold">Postări existente</h2>

{posts.map(post => (
  <div key={post.id} className="border p-4 mt-4">
    <h3 className="font-bold">{post.title}</h3>
    <p>{post.content}</p>

    {post.image_url && (
      <img src={post.image_url} className="max-h-40 mt-2" />
    )}

    <button
      onClick={() => deletePost(post.id)}
      className="bg-red-600 text-white px-3 py-1 mt-2 rounded"
    >
      Șterge
    </button>
  </div>
))}

    </div>
  );
}
