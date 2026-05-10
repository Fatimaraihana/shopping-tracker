import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qdejgvtnsouaptxmhrfg.supabase.co";
const supabaseKey = "sb_publishable_7_yJR4XUNkKqOCrqji7UDQ_HL247bbx";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);