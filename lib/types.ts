export type ChatbotData = {
  chatbot_id: string;
  sft_id: string;
  category_id: string | null;
  profile_image: string | null;
  name: string;
  description: string;
  instruction: string;
  example_conversation: string;
  kb_id: string;
  is_deleted: number;
  wallet_addr: string;
  last_updated: string;
  created_at: string;
  session_id: string | null;
  category_name: string | null;
};

export type ChatbotDataList = {
  chatbot_count: number;
  chatbot_data: ChatbotData[];
};

export type ChatbotDataListResponse = {
  data: ChatbotDataList;
};

export type NftData = {
  name: string;
  description: string;
  attributes: string;
  contract_addr: string;
  chatbot_id: string;
  sft_id: string;
  kb_id: string;
  wallet_addr: string;
  created: string;
  is_deleted: number;
  supply: number;
  category: string;
  token_symbol: string;
  price_per_query: number;
  query_royalties: number;
  url: string;
  asset_id: string;
  sft_address: string;
  slot_value: number;
  token_amount: number;
  profile_image: string;
};
