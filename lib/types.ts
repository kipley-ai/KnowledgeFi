export type ChatbotData = {
  chatbot_id: string;
  sft_id: string;
  category_id: string;
  profile_image: string;
  name: string;
  description: string;
  instruction: string;
  example_conversation: string;
  kb_id: string;
  is_deleted: number;
  wallet_addr: string;
  last_updated: string;
  created_at: string;
  session_id: string;
  category_name: string;
  tone: string;
  personality: string;
};

export type ChatbotDataListResponse = {
  data: {
    chatbot_data: ChatbotData[];
    chatbot_count: number;
  };
};

export type ChatbotDetailResponse = {
  data: ChatbotData;
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

export type NftDataListResponse = {
  data: {
    nft_data: NftData[];
    nft_count: number;
  };
};

export type NftDetailResponse = {
  data: NftData;
};

export type KBItem = {
  item_id: string;
  kb_id: string;
  item_name: string;
  item_type: string;
  file_url: string;
  created_at: string;
  twitter_username: string;
  status: string;
  size: number;
};

export type KBItemResponse = {
  data: {
    kb_item_data: KBItem[];
    kb_item_count: number;
  };
};

export type UserDetailResponse = {
  data: {
    wallet_addr: string;
    full_name: string;
    credit_earning: number;
    credit_balance: number;
    about_me: string;
    headline: string;
    creator_tos: number;
    billing_email: string;
    location: string;
    onboarding: number;
    is_deleted: number;
    twitter_link: string;
    username: string;
    lname: string;
    fname: string;
    profile_image: string | null;
    last_recharge: string;
    last_login: string;
    created_at: string;
  };
};

export type EarningReportResponse = {
  data: {
    earning_report_data: any[];
    earning_report_count: number;
  };
};

export type TaskData = {
  task_id: string;
  task_name: string;
  is_public: number;
  task_assigned: string | null;
  task_start_time: string;
  task_end_time: string | null;
  task_reward_type: string;
  task_reward_amount: number;
  task_frequency: string;
  task_link: string;
  task_action: string;
  is_deleted: number;
  created: string;
  is_completed: number;
  is_taken: number;
  taken_id: string | null;
};

export type TaskListResponse = {
  data: {
    task_data: TaskData[];
    task_count: number;
  };
};
