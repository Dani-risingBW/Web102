import { createClient } from '@supabase/supabase-js';
const URL = 'https://cjfvzklcyfpymzankjhd.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZnZ6a2xjeWZweW16YW5ramhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDY3ODgsImV4cCI6MjA2OTIyMjc4OH0.r3PFmRDd_uRl9oePrLuOqjauXSZU14A76v65IrCplHI'

export const supabase = createClient(URL, API_KEY);
