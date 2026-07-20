import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AboutData {
  about_title_fr: string;
  about_title_en: string;
  about_p1_fr: string;
  about_p1_en: string;
  about_p2_fr: string;
  about_p2_en: string;
  highlights_title_fr: string;
  highlights_title_en: string;
  hl_completed_fr: string;
  hl_completed_en: string;
  hl_in_progress_fr: string;
  hl_in_progress_en: string;
  hl_maintained_fr: string;
  hl_maintained_en: string;
  featured_title_fr: string;
  featured_title_en: string;
}

export interface AboutFeatured {
  image: string;
  logo: string;
  link: string;
  link_url: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
}

export interface ParcoursLabels {
  resume_title_fr: string;
  resume_title_en: string;
  experience_label_fr: string;
  experience_label_en: string;
  education_label_fr: string;
  education_label_en: string;
  skills_label_fr: string;
  skills_label_en: string;
  frameworks_label_fr: string;
  frameworks_label_en: string;
  software_label_fr: string;
  software_label_en: string;
  infra_label_fr: string;
  infra_label_en: string;
}

export interface ExperienceEntry {
  title_fr: string;
  title_en: string;
  date_fr: string;
  date_en: string;
  desc_fr: string;
  desc_en: string;
  logo: string | null;
}

export interface SoftwareEntry {
  name: string;
  logo: string;
}

export interface ProjectEntry {
  img: string;
  logo: string;
  link: string;
  title_fr: string;
  title_en: string;
  category_fr: string;
  category_en: string;
  desc_fr: string;
  desc_en: string;
}

export interface ContactData {
  contact_title_fr: string;
  contact_title_en: string;
  contact_details_fr: string;
  contact_details_en: string;
  contact_mobile_fr: string;
  contact_mobile_en: string;
  contact_form_title_fr: string;
  contact_form_title_en: string;
  contact_name_fr: string;
  contact_name_en: string;
  contact_email_fr: string;
  contact_email_en: string;
  contact_msg_fr: string;
  contact_msg_en: string;
  contact_send_fr: string;
  contact_send_en: string;
  contact_sent_fr: string;
  contact_sent_en: string;
  phone_fr: string;
  phone_en: string;
  email: string;
  location_fr: string;
  location_en: string;
  linkedin_url: string;
  github_url: string;
  cv_pdf_url: string;
  profile_photo_url: string;
  show_contacts_fr: string;
  show_contacts_en: string;
  footer_fr: string;
  footer_en: string;
}

export interface GalleryEntry {
  img: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
}

export async function fetchAbout(): Promise<AboutData | null> {
  const { data } = await supabase.from("a_propos").select("*").limit(1).single();
  return data;
}

export async function fetchAboutFeatured(): Promise<AboutFeatured[]> {
  const { data } = await supabase.from("a_propos_vedette").select("*").order("sort_order");
  return data ?? [];
}

export async function fetchParcoursLabels(): Promise<ParcoursLabels | null> {
  const { data } = await supabase.from("parcours").select("*").limit(1).single();
  return data;
}

export async function fetchExperiences(): Promise<ExperienceEntry[]> {
  const { data } = await supabase.from("parcours_experience").select("*").eq("type", "experience").order("sort_order");
  return data ?? [];
}

export async function fetchEducations(): Promise<ExperienceEntry[]> {
  const { data } = await supabase.from("parcours_experience").select("*").eq("type", "education").order("sort_order");
  return data ?? [];
}

export async function fetchSoftware(): Promise<SoftwareEntry[]> {
  const { data } = await supabase.from("parcours_logiciel").select("*").order("sort_order");
  return data ?? [];
}

export async function fetchProjects(): Promise<ProjectEntry[]> {
  const { data } = await supabase.from("projets").select("*").order("sort_order");
  return data ?? [];
}

export async function fetchContact(): Promise<ContactData | null> {
  const { data } = await supabase.from("contact").select("*").limit(1).single();
  return data;
}

export async function fetchGallery(): Promise<GalleryEntry[]> {
  const { data } = await supabase.from("galerie").select("*").order("sort_order");
  return data ?? [];
}
