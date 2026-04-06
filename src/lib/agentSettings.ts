import { supabase } from "./supabase";

export type AgentSettingsFormData = {
  business_name: string;
  business_niche: string;
  system_prompt: string;
  booking_mode: string;
  faq_content: string;
  locale_default: string;
  second_language: string;
};

export const getAgentSettings = async () => {
  const { data, error } = await supabase
    .from("agent_settings")
    .select("*")
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};

export const updateAgentSettings = async (
  id: string,
  settings: AgentSettingsFormData
) => {
  const { data, error } = await supabase
    .from("agent_settings")
    .update({
      business_name: settings.business_name,
      business_niche: settings.business_niche,
      system_prompt: settings.system_prompt,
      booking_mode: settings.booking_mode,
      faq_content: settings.faq_content,
      locale_default: settings.locale_default,
      second_language: settings.second_language,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};