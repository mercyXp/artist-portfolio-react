'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Video, FileText, Mail, Lock, LogOut, UploadCloud } from 'lucide-react';

// Design easing and motion configurations
const easeStandard = [0.4, 0, 0.2, 1];

interface Artwork {
  id: string;
  title: string;
  description: string;
  src: string;
  duration: string;
}

interface ProcessStep {
  id: string;
  title: string;
  desc_text: string;
  video_url: string;
  sort_order: number;
}

interface CommissionRequest {
  id: string;
  name: string;
  email: string;
  details: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

function convertYoutubeUrl(url: string): string {
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
  } catch (e) {
    // fallback
  }
  return url;
}

export default function AdminPortal() {
  const shouldReduceMotion = useReducedMotion();
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Active Tab: 'gallery' | 'process' | 'commissions' | 'inquiries'
  const [activeTab, setActiveTab] = useState<'gallery' | 'process' | 'commissions' | 'inquiries'>('gallery');

  // Database lists
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [commissions, setCommissions] = useState<CommissionRequest[]>([]);
  const [inquiries, setInquiries] = useState<ContactMessage[]>([]);
  
  // Operations & Form States
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Gallery Form State
  const [artTitle, setArtTitle] = useState('');
  const [artDesc, setArtDesc] = useState('');
  const [artSrc, setArtSrc] = useState('');
  const [artDuration, setArtDuration] = useState('');

  // Drag & drop upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        await handleImageUpload(file);
      } else {
        setMsg({ type: 'error', text: 'Unsupported file type. Please select a valid image.' });
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        await handleImageUpload(file);
      } else {
        setMsg({ type: 'error', text: 'Unsupported file type. Please select a valid image.' });
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setMsg(null);
    
    try {
      const bucketName = 'portfolio';
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `artworks/${fileName}`;

      // Upload file to Supabase Cloud Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(error.message);
      }

      // Get public accessible link
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      setArtSrc(publicUrl);
      setMsg({ type: 'success', text: 'Image successfully uploaded to Supabase Cloud Storage!' });
    } catch (err: any) {
      console.warn('Storage upload failed, fallback to direct Base64 embedding:', err.message);
      
      // Standalone base64 encoder fallback - works instantly offline without bucket setup
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setArtSrc(reader.result);
          setMsg({ 
            type: 'success', 
            text: 'Image encoded directly as Base64. (Setup a public "portfolio" bucket in Supabase Storage to enable permanent cloud links!).' 
          });
        }
      };
      reader.onerror = () => {
        setMsg({ type: 'error', text: 'Could not process the selected image.' });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  // Process Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoOrder, setVideoOrder] = useState('1');

  // Load Session and DB lists
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('admin_session');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      // 1. Fetch Artworks
      const { data: artData } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });
      if (artData) setArtworks(artData);

      // 2. Fetch Process Steps
      const { data: procData } = await supabase
        .from('process_steps')
        .select('*')
        .order('sort_order', { ascending: true });
      if (procData) {
        const mapped = procData.map((item: any) => ({
          id: item.id,
          title: item.title,
          desc_text: item.desc_text || item.desc,
          video_url: item.video_url || item.videoUrl,
          sort_order: item.sort_order,
        }));
        setProcessSteps(mapped);
      }

      // 3. Fetch Commission requests
      const { data: commData } = await supabase
        .from('commissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (commData) setCommissions(commData);

      // 4. Fetch Contact messages
      const { data: inqData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (inqData) setInquiries(inqData);

    } catch (err) {
      console.error('Error fetching admin ledger:', err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    // Simple passcode check (checks environment configuration, with secure developer fallback 'zenzi2026')
    const configPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'zenzi2026';
    
    if (passcode === configPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session', 'true');
    } else {
      setAuthError('Incorrect passcode. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session');
    setPasscode('');
  };

  // Add Artwork Submit
  const handleAddArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);

    if (!artTitle || !artSrc) {
      setMsg({ type: 'error', text: 'Title and Artwork URL are required fields.' });
      setSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('artworks')
        .insert([
          {
            title: artTitle,
            description: artDesc || 'Bespoke Illustration.',
            src: artSrc,
            duration: artDuration || 'Flexible timeframe',
          },
        ])
        .select();

      if (error) throw error;

      setMsg({ type: 'success', text: 'Artwork item added successfully to your Gallery!' });
      setArtTitle('');
      setArtDesc('');
      setArtSrc('');
      setArtDuration('');
      fetchData(); // reload
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error occurred while saving.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Add Process Step Submit
  const handleAddProcessStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);

    if (!videoTitle || !videoUrl) {
      setMsg({ type: 'error', text: 'Title and Video watch/embed URL are required fields.' });
      setSubmitting(false);
      return;
    }

    const cleanEmbedUrl = convertYoutubeUrl(videoUrl);

    try {
      const { error } = await supabase
        .from('process_steps')
        .insert([
          {
            title: videoTitle,
            desc_text: videoDesc || 'Illustrative step.',
            video_url: cleanEmbedUrl,
            sort_order: parseInt(videoOrder) || 1,
          },
        ]);

      if (error) throw error;

      setMsg({ type: 'success', text: 'Process video step added successfully!' });
      setVideoTitle('');
      setVideoDesc('');
      setVideoUrl('');
      setVideoOrder('1');
      fetchData(); // reload
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error occurred while saving.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Artwork
  const handleDeleteArtwork = async (id: string) => {
    if (!confirm('Are you sure you want to remove this artwork from the exhibition?')) return;
    try {
      const { error } = await supabase.from('artworks').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Delete Process Step
  const handleDeleteProcess = async (id: string) => {
    if (!confirm('Are you sure you want to delete this creative step?')) return;
    try {
      const { error } = await supabase.from('process_steps').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Login Form Screen (Warm Charcoal + Cream Theme, playfair heading)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] text-[#1a1612] flex flex-col justify-center items-center px-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.15em] uppercase text-[#5a544d] hover:text-[#c9a96e] transition-colors mb-10"
        >
          <ArrowLeft size={14} className="text-[#c9a96e]" /> Back to main site
        </a>

        <div className="w-full max-w-md p-8 border border-[#c9a96e]/20 bg-[#e9e2d5] shadow-xl text-center">
          <div className="w-12 h-12 bg-[#2d2926] text-[#c9a96e] flex items-center justify-center mx-auto mb-6">
            <Lock size={20} />
          </div>
          
          <h1 className="font-serif text-3xl font-bold text-[#2d2926] mb-2">
            Atelier Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5a544d] font-sans font-light mb-8 uppercase tracking-widest">
            STUDIO OWNER ACCESS ONLY
          </p>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-medium text-center">
                {authError}
              </div>
            )}

            <div>
              <label className="block mb-2 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                Enter passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="p-3 w-full focus:outline-none bg-white/40 focus:bg-white text-sm text-center tracking-widest text-[#1a1612] border border-[#c9a96e]/20 rounded-none focus:border-[#c9a96e] transition-all duration-200"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { y: -2, backgroundColor: '#e8d5a3', letterSpacing: '0.14em' }
              }
              whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="w-full font-bold text-xs tracking-[0.1em] uppercase py-4 bg-[#c9a96e] text-[#2d2926] cursor-pointer border-0"
            >
              Verify Passcode
            </motion.button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Panel Screen
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1612] flex flex-col font-sans font-light">
      
      {/* Admin header */}
      <header className="bg-[#2d2926] text-[#f5f0e8] py-5 px-6 md:px-12 border-b border-[#c9a96e]/10">
        <div className="container mx-auto flex justify-between items-center w-full">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
              Studio Workspace
            </h1>
            <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] mt-0.5">
              ZENZI ART ATELIER PANEL
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] uppercase text-[#f5f0e8]/80 hover:text-[#c9a96e] transition-colors"
            >
              <ArrowLeft size={12} className="text-[#c9a96e]" /> Preview Site
            </a>
            <button
              onClick={handleLogout}
              className="p-2 sm:px-4 sm:py-2 text-xs font-bold tracking-[0.1em] uppercase bg-white/5 hover:bg-[#c9a96e] hover:text-[#2d2926] text-[#f5f0e8] border border-[#c9a96e]/20 transition-all duration-300 rounded-none flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={12} /> <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin tabs menu */}
      <div className="bg-[#e9e2d5] border-b border-[#c9a96e]/10 px-6 md:px-12">
        <div className="container mx-auto flex space-x-6 overflow-x-auto py-3">
          {[
            { id: 'gallery', label: 'Gallery Expositions', icon: <ImageIcon size={14} /> },
            { id: 'process', label: 'Creative Process', icon: <Video size={14} /> },
            { id: 'commissions', label: 'Custom Requests', icon: <FileText size={14} />, badge: commissions.length },
            { id: 'inquiries', label: 'Inquiries', icon: <Mail size={14} />, badge: inquiries.length },
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMsg(null);
                }}
                className={`px-4 py-2.5 text-xs font-bold tracking-[0.12em] uppercase cursor-pointer flex items-center gap-2 shrink-0 border-b-2 transition-all duration-200 ${
                  isTabActive
                    ? 'border-[#c9a96e] text-[#1a1612]'
                    : 'border-transparent text-[#5a544d] hover:text-[#1a1612] hover:border-[#c9a96e]/30'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[8px] font-sans font-bold text-[#2d2926] bg-[#c9a96e]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Ledger Workspace */}
      <main className="container mx-auto px-6 md:px-12 py-12 flex-grow max-w-6xl w-full">
        
        {/* Status Messaging */}
        {msg && (
          <div
            className={`p-4 mb-8 rounded-none border text-xs tracking-wide max-w-3xl mx-auto font-medium ${
              msg.type === 'success'
                ? 'bg-[#c9a96e]/10 border-[#c9a96e]/30 text-[#1a1612]'
                : 'bg-red-500/10 border-red-500/20 text-red-700'
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 1: GALLERY EXPOSITIONS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'gallery' && (
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Form Column */}
            <div className="lg:col-span-1 p-6 md:p-8 bg-[#e9e2d5] border border-[#c9a96e]/15 shadow-sm self-start">
              <h2 className="font-serif text-lg font-bold text-[#2d2926] mb-6 flex items-center gap-2">
                <Plus size={18} className="text-[#c9a96e]" /> Add New Artwork
              </h2>

              <form onSubmit={handleAddArtwork} className="space-y-5 text-left">
                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    Artwork Title *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    placeholder="e.g. Whispering Winds"
                    className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    Description / Medium
                  </label>
                  <input
                    type="text"
                    disabled={submitting}
                    value={artDesc}
                    onChange={(e) => setArtDesc(e.target.value)}
                    placeholder="e.g. Charcoal on textured canvas."
                    className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    Artwork Image Upload *
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`p-6 border border-dashed text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative bg-white/20 hover:bg-white/40 ${
                      isDragging ? 'border-[#c9a96e] bg-white/50 scale-[1.01]' : 'border-[#c9a96e]/30'
                    }`}
                    onClick={() => document.getElementById('artwork-file-input')?.click()}
                  >
                    <input
                      id="artwork-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {uploadingImage ? (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-[#c9a96e] border-t-transparent animate-spin rounded-full mb-2"></div>
                        <p className="text-[10px] tracking-wider text-[#5a544d] uppercase font-bold">Uploading file...</p>
                      </div>
                    ) : artSrc ? (
                      <div className="w-full flex flex-col items-center">
                        <div className="w-16 h-20 mb-2 border border-[#c9a96e]/30 overflow-hidden relative shadow-md bg-white p-1 flex-shrink-0">
                          <img
                            src={artSrc}
                            alt="Upload preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[9px] font-bold text-[#c9a96e] tracking-widest uppercase truncate max-w-[200px]">
                          Image Loaded Successfully
                        </p>
                        <p className="text-[9px] text-[#5a544d] mt-0.5 italic">
                          Click or drop another file to change
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud size={24} className="text-[#c9a96e] mb-2" />
                        <p className="text-[11px] font-medium text-[#2d2926] tracking-wide">
                          Drag & drop image here
                        </p>
                        <p className="text-[9px] text-[#5a544d] mt-1 uppercase tracking-widest">
                          or click to choose from PC
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Manual input fallback */}
                  <div className="mt-3">
                    <input
                      type="text"
                      required
                      disabled={submitting}
                      value={artSrc}
                      onChange={(e) => setArtSrc(e.target.value)}
                      placeholder="Or manual path/URL (e.g. /images/draw-1.jpg)"
                      className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    Completion Time
                  </label>
                  <input
                    type="text"
                    disabled={submitting}
                    value={artDuration}
                    onChange={(e) => setArtDuration(e.target.value)}
                    placeholder="e.g. 7 hours"
                    className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={shouldReduceMotion ? {} : { y: -2, backgroundColor: '#e8d5a3', letterSpacing: '0.14em' }}
                  whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full font-bold text-xs tracking-[0.1em] uppercase py-3.5 bg-[#c9a96e] text-[#2d2926] cursor-pointer border-0 shadow-sm"
                >
                  {submitting ? 'Exhibiting...' : 'Exhibit Artwork'}
                </motion.button>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-lg font-bold text-[#2d2926] mb-6">
                Active Gallery Collection ({artworks.length})
              </h2>

              {artworks.length === 0 ? (
                <div className="p-8 text-center bg-[#e9e2d5] border border-dashed border-[#c9a96e]/20 text-[#5a544d] text-sm">
                  Your exhibition hall is empty. Add artworks to display them.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {artworks.map((art) => (
                    <div
                      key={art.id}
                      className="p-4 border border-[#c9a96e]/10 bg-[#e9e2d5]/60 hover:bg-[#e9e2d5] transition-colors duration-200 flex items-center gap-4"
                    >
                      <div className="w-16 h-20 bg-[#1a1612] overflow-hidden flex-shrink-0 border border-[#c9a96e]/10">
                        <img
                          src={art.src}
                          alt={art.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/identicon/svg?seed=' + art.title;
                          }}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-serif text-sm font-bold text-[#2d2926] truncate">{art.title}</h3>
                        <p className="text-[11px] text-[#5a544d] truncate mt-0.5">{art.description}</p>
                        <p className="text-[10px] text-[#c9a96e] font-semibold uppercase tracking-widest mt-1">⏱ {art.duration}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteArtwork(art.id)}
                        className="p-2.5 bg-white/20 hover:bg-red-500/10 hover:text-red-600 text-[#5a544d] transition-colors duration-200 cursor-pointer border-0 rounded-none flex-shrink-0"
                        aria-label="Delete Artwork"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: CREATIVE PROCESS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'process' && (
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Form Column */}
            <div className="lg:col-span-1 p-6 md:p-8 bg-[#e9e2d5] border border-[#c9a96e]/15 shadow-sm self-start">
              <h2 className="font-serif text-lg font-bold text-[#2d2926] mb-6 flex items-center gap-2">
                <Plus size={18} className="text-[#c9a96e]" /> Add Process Step
              </h2>

              <form onSubmit={handleAddProcessStep} className="space-y-5 text-left">
                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    Step Title *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. Concept Draft"
                    className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    Step Description *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    placeholder="e.g. Mapping perspective guidelines with a 2B pencil."
                    className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    YouTube Watch/Share URL *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={submitting}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="e.g. https://youtu.be/u3-U0gSWyA4"
                    className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                    Sort Sequence Position
                  </label>
                  <input
                    type="number"
                    disabled={submitting}
                    value={videoOrder}
                    onChange={(e) => setVideoOrder(e.target.value)}
                    placeholder="e.g. 1"
                    min="1"
                    className="p-3 w-full text-xs tracking-wide text-[#1a1612] bg-white border border-[#c9a96e]/20 rounded-none focus:outline-none focus:border-[#c9a96e] transition-colors duration-200"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={shouldReduceMotion ? {} : { y: -2, backgroundColor: '#e8d5a3', letterSpacing: '0.14em' }}
                  whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full font-bold text-xs tracking-[0.1em] uppercase py-3.5 bg-[#c9a96e] text-[#2d2926] cursor-pointer border-0 shadow-sm"
                >
                  {submitting ? 'Recording...' : 'Register Process Step'}
                </motion.button>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-lg font-bold text-[#2d2926] mb-6">
                Creative Process Video Steps ({processSteps.length})
              </h2>

              {processSteps.length === 0 ? (
                <div className="p-8 text-center bg-[#e9e2d5] border border-dashed border-[#c9a96e]/20 text-[#5a544d] text-sm">
                  No process steps declared. Add steps to display them.
                </div>
              ) : (
                <div className="space-y-4">
                  {processSteps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-5 border border-[#c9a96e]/10 bg-[#e9e2d5]/60 hover:bg-[#e9e2d5] transition-colors duration-200 flex items-start gap-5"
                    >
                      <div className="font-serif italic text-3xl font-bold text-[#c9a96e]/40 select-none pt-1">
                        0{idx + 1}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-serif text-sm font-bold text-[#2d2926]">{step.title}</h3>
                        <p className="text-[11px] text-[#5a544d] mt-1 leading-relaxed">{step.desc_text}</p>
                        <p className="text-[10px] text-[#c9a96e] truncate mt-2 font-mono font-medium max-w-md">{step.video_url}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProcess(step.id)}
                        className="p-2.5 bg-white/20 hover:bg-red-500/10 hover:text-red-600 text-[#5a544d] transition-colors duration-200 cursor-pointer border-0 rounded-none flex-shrink-0"
                        aria-label="Delete Process"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: COMMISSION REQUESTS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'commissions' && (
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2d2926] mb-6">
              Custom Commission Ledger ({commissions.length})
            </h2>

            {commissions.length === 0 ? (
              <div className="p-12 text-center bg-[#e9e2d5] border border-dashed border-[#c9a96e]/20 text-[#5a544d] text-sm">
                No commission requests have been submitted yet. When clients fill out your commissions form, they will appear here.
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl">
                {commissions.map((comm) => (
                  <div
                    key={comm.id}
                    className="p-6 md:p-8 border border-[#c9a96e]/15 bg-[#e9e2d5] shadow-sm relative text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 pb-4 border-b border-[#c9a96e]/10">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#2d2926]">{comm.name}</h3>
                        <a
                          href={`mailto:${comm.email}`}
                          className="text-xs text-[#c9a96e] hover:underline hover:text-[#e8d5a3] font-medium"
                        >
                          {comm.email}
                        </a>
                      </div>
                      <span className="text-[10px] text-[#5a544d] font-mono select-none">
                        {new Date(comm.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <h4 className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#c9a96e] mb-1.5">
                      Bespoke Details:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1a1612] font-sans font-light leading-relaxed whitespace-pre-line bg-white/40 p-4 border border-[#c9a96e]/10">
                      {comm.details}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: GENERAL INQUIRIES */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2d2926] mb-6">
              Studio Inquiry Messages ({inquiries.length})
            </h2>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#e9e2d5] border border-dashed border-[#c9a96e]/20 text-[#5a544d] text-sm">
                No contact inquiries recorded yet. Messages sent via your "Get in Touch" form will populate this ledger.
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-6 md:p-8 border border-[#c9a96e]/15 bg-[#e9e2d5] shadow-sm relative text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 pb-4 border-b border-[#c9a96e]/10">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#2d2926]">{inq.name}</h3>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-xs text-[#c9a96e] hover:underline hover:text-[#e8d5a3] font-medium"
                        >
                          {inq.email}
                        </a>
                      </div>
                      <span className="text-[10px] text-[#5a544d] font-mono select-none">
                        {new Date(inq.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {inq.subject && (
                      <div className="mb-3">
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#c9a96e] block mb-1">
                          Subject:
                        </span>
                        <p className="text-xs sm:text-sm font-serif italic text-[#2d2926] font-bold">
                          {inq.subject}
                        </p>
                      </div>
                    )}

                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#c9a96e] block mb-1.5">
                      Message Content:
                    </span>
                    <p className="text-xs sm:text-sm text-[#1a1612] font-sans font-light leading-relaxed whitespace-pre-line bg-white/40 p-4 border border-[#c9a96e]/10">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}
