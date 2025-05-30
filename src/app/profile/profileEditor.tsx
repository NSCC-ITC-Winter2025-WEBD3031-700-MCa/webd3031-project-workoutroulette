"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

type UserProfile = {
  name: string | null;
  email: string | null;
  image?: string | null;
  aboutMe?: string | null;
  completedWorkouts: number;
  completedExercises: number;
  xp: number;
  level: number;
};

export default function ProfileEditor({ user }: { user: UserProfile }) {
  const router = useRouter();
  const [aboutMe, setAboutMe] = useState(user.aboutMe || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("aboutMe", aboutMe);

    const res = await fetch("/api/user/update", {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      toast.success("Profile updated!");
      router.refresh(); //refresh the server-rendered profile page
    } else {
      toast.error("Failed to update profile.");
    }

    setSaving(false);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    setSaving(true);

    const res = await fetch("/api/user/update", {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      toast.success("Profile picture updated!");
      router.refresh();
    } else {
      toast.error("Failed to upload image.");
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <label className="block font-medium">Profile Picture</label>
        <Image
          src={user.image || "/default-profile.png"}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadImage(file);
            }
          }}
        />
      </div>

      <div>
        <label className="block font-medium">About Me</label>
        <textarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          rows={4}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}