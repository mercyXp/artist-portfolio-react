-- =====================================================================
-- RICH ZENZI ART - COMPLETE SUPABASE DATABASE SETUP
-- =====================================================================
-- Run this script in the Supabase SQL Editor (https://supabase.com/) 
-- to initialize all required tables, seed baseline portfolios, 
-- and configure Row-Level Security (RLS) policies.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. ARTWORKS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  src TEXT NOT NULL,
  duration TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Enable Row-Level Security (RLS)
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Drop policy if it already exists to avoid duplication errors
DROP POLICY IF EXISTS "Allow public read access" ON artworks;

-- Create policy to allow public select access
CREATE POLICY "Allow public read access" 
ON artworks FOR SELECT 
USING (true);

-- Create policy to allow authenticated dashboard modifications (or service role)
DROP POLICY IF EXISTS "Allow service role modifications" ON artworks;
CREATE POLICY "Allow service role modifications" 
ON artworks FOR ALL 
USING (true) 
WITH CHECK (true);

-- Seed Baseline Artworks
INSERT INTO artworks (title, description, src, duration) VALUES
('The Thinker', 'A study of deep reflection and inner calm.', '/images/draw-1.jpg', '8 hours'),
('Soul in Motion', 'Capturing life through dynamic expression.', '/images/draw-2.jpg', '6 hours'),
('Silent Whispers', 'An abstract form of serenity and grace.', '/images/draw-8.jpg', '5 hours'),
('Urban Mirage', 'A mix of architecture and emotion.', '/images/draw-3.jpg', '10 hours'),
('Grace in Lines', 'Every stroke tells a story of patience.', '/images/draw-5.jpg', '7 hours'),
('Nature’s Essence', 'Where detail meets tranquility.', '/images/draw-7.jpg', '4 hours')
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------
-- 2. CREATIVE PROCESS STEPS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  desc_text TEXT NOT NULL,
  video_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Enable Row-Level Security (RLS)
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;

-- Drop policy if it already exists
DROP POLICY IF EXISTS "Allow public read process steps" ON process_steps;

-- Create policy to allow public select access
CREATE POLICY "Allow public read process steps" 
ON process_steps FOR SELECT 
USING (true);

-- Create policy to allow modifications
DROP POLICY IF EXISTS "Allow process steps modifications" ON process_steps;
CREATE POLICY "Allow process steps modifications" 
ON process_steps FOR ALL 
USING (true) 
WITH CHECK (true);

-- Seed Baseline Steps
INSERT INTO process_steps (title, desc_text, video_url, sort_order) VALUES
('Concept & Sketch', 'Every artwork begins with a pencil sketch.', 'https://www.youtube.com/embed/LtL1Brf2N2Q?si=5kiaa0iGFafYxGMC', 1),
('Layering & Detailing', 'Through patience and precision, each stroke adds emotion and life.', 'https://www.youtube.com/embed/Fa9CNQ_9bk8?si=Phxb5gFSrei5oQ4n', 2),
('Finishing Touches', 'I bring depth and contrast to complete a story worth framing.', 'https://www.youtube.com/embed/u3-U0gSWyA4?si=Yu-Vga-nEG2U-M2Q', 3)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------------------
-- 3. COMMISSIONS REQUESTS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Enable Row-Level Security (RLS)
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Drop policy if it already exists
DROP POLICY IF EXISTS "Allow public inserts" ON commissions;

-- Create policy to allow anyone to insert a commission request
CREATE POLICY "Allow public inserts" 
ON commissions FOR INSERT 
WITH CHECK (true);

-- Create policy to allow viewing requests from admin
DROP POLICY IF EXISTS "Allow admin select access" ON commissions;
CREATE POLICY "Allow admin select access" 
ON commissions FOR SELECT 
USING (true);

-- Create policy to allow modifications
DROP POLICY IF EXISTS "Allow admin modifications" ON commissions;
CREATE POLICY "Allow admin modifications" 
ON commissions FOR ALL 
USING (true);


-- ---------------------------------------------------------------------
-- 4. CONTACT MESSAGES TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Enable Row-Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop policy if it already exists
DROP POLICY IF EXISTS "Allow public messages inserts" ON contact_messages;

-- Create policy to allow anyone to submit an inquiry
CREATE POLICY "Allow public messages inserts" 
ON contact_messages FOR INSERT 
WITH CHECK (true);

-- Create policy to allow viewing inquiries from admin
DROP POLICY IF EXISTS "Allow admin messages select access" ON contact_messages;
CREATE POLICY "Allow admin messages select access" 
ON contact_messages FOR SELECT 
USING (true);

-- Create policy to allow modifications
DROP POLICY IF EXISTS "Allow admin messages modifications" ON contact_messages;
CREATE POLICY "Allow admin messages modifications" 
ON contact_messages FOR ALL 
USING (true);
