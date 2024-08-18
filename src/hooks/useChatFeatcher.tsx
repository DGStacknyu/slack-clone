import { useSocket } from "@/providers/web-socket";
import { MessageWithUser } from "@/types/app";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
type UseChatFeatcherProps = {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  pageSize: number;
};

export const UseChatFeatcher = ({
  apiUrl,
  queryKey,
  pageSize,
  paramKey,
  paramValue,
}: UseChatFeatcherProps) => {
  const { isConnected } = useSocket();

  const fetcher = async ({
    pageParam = 0,
  }: any): Promise<{ data: MessageWithUser[] }> => {
    const url = `${apiUrl}?${paramKey}=${encodeURIComponent(
      paramValue
    )}&page=${pageParam}&size=${pageSize}`;

    const { data } = await axios.get<MessageWithUser>(url);

    return data as any;
  };
  return useInfiniteQuery<{ data: MessageWithUser[] }, Error>({
    queryKey: [queryKey, paramValue],
    queryFn: fetcher,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length === pageSize ? allPages.length : undefined,
    refetchInterval: isConnected ? false : 1000,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialPageParam: 0,
  });
};
