import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://zvxfvslnqaldyqayagte.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eGZ2c2xucWFsZHlxYXlhZ3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY3MjA3OTksImV4cCI6MTk2MjI5Njc5OX0.DTiZ2WdDsYIcqRyb2Ef5ecXxAT2oJgG3JzwREmv21Pg"
);
export  {
    supabase
};