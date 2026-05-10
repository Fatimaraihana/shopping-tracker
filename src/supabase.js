import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "qdejgvtnsouaptxmhrfg";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZWpndnRuc291YXB0eG1ocmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzOTM3MzQsImV4cCI6MjA5Mzk2OTczNH0.AsvpBeMLbPSd8ZVtLbKKAK2i5gdEzLlo1D-eZ_KW2rA";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);