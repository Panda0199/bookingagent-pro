import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAgentSettings,
  updateAgentSettings,
  type AgentSettingsFormData,
} from "@/lib/agentSettings";

export const useAgentSettings = () => {
  return useQuery({
    queryKey: ["agent-settings"],
    queryFn: getAgentSettings,
  });
};

export const useUpdateAgentSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: AgentSettingsFormData;
    }) => updateAgentSettings(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent-settings"] });
    },
  });
};