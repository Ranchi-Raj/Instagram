"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [username, setUsername] = useState<string>('');
  // const [storieUserName, setStorieUsername] = useState<string>('');
  const [reelUrl, setReelUrl] = useState<string>('');
  // const [storyUsername, setStoryUsername] = useState<string>('');

  const [loading, setLoading] = useState<string>('');
  // const [login, setLogin] = useState<boolean>(false);
  // const [loginUsername, setLoginUsername] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const backendUrl = "https://instagram-5-dm4n.onrender.com"
  
  // "http://localhost:8000";
  // console.log(loginUsername, password);

  // const handleLogin = async () => {
  //   if (!loginUsername || !password) {
  //     toast.error("Please enter both username and password");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("username", "raj_adi3");
  //   formData.append("password", password);
  //   try {
  //     const res = await fetch(`${backendUrl}/login`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       toast.error(errorData.error);
  //       return;
  //     }

  //     const data = await res.json();
  //     console.log(data);
  //     if (data.message === "Login successful") {
  //       toast.success("Login successful");
  //       setLogin(true);
  //     } else {
  //       toast.error("Login failed");
  //     }
  //   }
  //   catch (err) {
  //     console.error(err);
  //     toast.error("Something went wrong!");
  //   } 
  // }
  // Function to download DPs
  const download = async (endpoint: string, filenamePrefix: string = '', username ?: string) => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    setLoading('dp');
    const formData = new FormData();
    formData.append("username", username);

    try {
      const res = await fetch(`${backendUrl}/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      // If file is returned (only for dp currently)
      if (res.headers.get("content-type")?.includes("image/jpeg") || res.headers.get("content-type")?.includes("application/octet-stream")) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filenamePrefix}${username}.jpg`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        const data = await res.json();
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert(data.message);
        }
      }
    } catch (err) {
      console.error(err);
      // alert("Something went wrong!");
      toast.error("Something went wrong!");
    }
    setUsername('');
    setLoading('');
  };

  // Function to download reels
  const reelDownload = async (reelUrl : string) => {

    if (!reelUrl) {
      alert("Please enter a reel URL");
      return;
    }

    setLoading('reel');

     const formData = new FormData();
      formData.append("url", reelUrl);

     try {
      const res = await fetch(`${backendUrl}/download-reel`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error);
        setLoading('reel');
        return;
      }

      const blob = await res.blob();
      const urlBlob = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", `instagram_reel.mp4`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      // alert("Failed to download the reel.");
      toast.error("Failed to download the reel.");
      console.error(err);
    }
    finally{
      setLoading('');
    }

    setReelUrl('');
  };

  // Function to download stories

  // const downloadStories = async (username: string) => {
  //   if (!username) {
  //     alert("Please enter a username");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("username", username);
  //   setLoading('stories');  

  //    try {
  //     const res = await fetch(`${backendUrl}/download-stories`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       const data = await res.json();
  //       alert(data.error);
  //       return;
  //     }

  //     const blob = await res.blob();
  //     const url = window.URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `${username}_story.mp4`;
  //     link.click();
  //   } catch (err) {
  //     alert("Error downloading story.");
  //     console.error(err);
  //   } finally {
  //     setStoryUsername('');
  //     setLoading('');
  //   }

  // }

  // Function to download posts


  // if(!login){
  //   return (
  //      <div className="min-h-screen bg-gradient-to-br from-pink-950 via-fuchsia-800 to bg-pink-500 flex flex-col items-center justify-center text-white">
  //       <Toaster />
  //        <Card className="w-[350px] bg-[rgba(206,201,201,0.05)] border-[3px] border-[rgba(255,255,255,0.1)] backdrop-blur-[10px] rounded-[10px] p-[20px]">
  //     <CardHeader>
  //       <CardTitle className='text-center text-2xl'>Login</CardTitle>
  //       <CardDescription className='text-center text-gray-300'>Only for authorization. We won&apos;t store anything </CardDescription>
  //     </CardHeader>
  //     <CardContent>
  //       <form>
  //         <div className="grid w-full items-center gap-4">
  //           <div className="flex flex-col space-y-1.5">
  //             <Label htmlFor="name">Username</Label>
  //             <Input id="name" placeholder="Enter your username "onChange={(e) => setLoginUsername(e.target.value)} className='bg-white/20 text-white placeholder:text-white'/>
  //           </div>
  //         </div>
  //         <div className="grid w-full items-center gap-4">
  //           <div className="flex flex-col space-y-1.5">
  //             <Label htmlFor="name" className='mt-2'>Password</Label>
  //             <Input type='password' id="name" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className='bg-white/20 text-white placeholder:text-white'/>
  //           </div>
  //         </div>
  //       </form>
  //     </CardContent>
  //     <CardFooter className="flex justify-between">
  //       <Button variant="outline" onClick={() => setLogin(true)}>Skip</Button>
  //       <Button onClick={handleLogin} className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-4 py-2 rounded-md hover:opacity-90 transition">Login</Button>
  //     </CardFooter>
  //   </Card>
  //   <div className='flex justify-center items-center'>
  //    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  //           <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  //           <path d="M5 12l5 5l10 -10" />
  //       </svg>
  //     <p className='w-[350px] text-center text-gray-300 bg-white/10 rounded-md mt-4 '>Credentials are required only for downloading stories. Hit Skip if you need only DPs or reels. </p>
  //     </div>
  //      </div>
  //   )
  // }


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-fuchsia-800 to bg-pink-500 flex flex-col items-center justify-center text-white">
      <Toaster />
      {/* <h1>Instagram Downloader</h1> */}
        <Card className="w-full max-w-md shadow-xl border-none bg-white/10 backdrop-blur text-white">

        {/* For downloading DP */}
      <form onSubmit={(e) => { e.preventDefault(); download("download-dp", "dp_", username); }}>
  <CardHeader>
    <CardTitle className="text-center text-2xl mb-4">Instagram Downloader</CardTitle>
  </CardHeader>
  <CardContent className='flex justify-evenly'>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-4 py-2 rounded hover:opacity-90 transition"
      >
        {loading === "dp" ? "Downloading..." : "Download DP"}
      </button>
  </CardContent>
      </form>

      {/* For downloading Stories */}

      {/* <form onSubmit={(e) => { e.preventDefault(); downloadStories(storyUsername); }}>
        <CardContent className='flex justify-evenly'>
          <input
            type="text"
            placeholder="Enter Instagram username"
            value={storyUsername}
            onChange={(e) => setStoryUsername(e.target.value)}
            required
            className="p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-4 py-2 rounded hover:opacity-90 transition"
          >
            {loading === "stories" ? "Downloading..." : "Download Stories"}
          </button>
        </CardContent>
      </form> */}

      {/* For downloading posts */}
    

      {/* For downloading reels */}

      <form onSubmit={(e) => { e.preventDefault(); reelDownload(reelUrl); }}>
        <CardContent className='flex justify-evenly'>
          <input
            type="text"
            placeholder="Enter reel URL"
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            // required
            className="p-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-4 py-2 rounded hover:opacity-90 transition"
          >
            {loading === "reel" ? "Downloading..." : "Download Reel"}
          </button>
        </CardContent>
      </form>

</Card>

    </div>
  );
}
