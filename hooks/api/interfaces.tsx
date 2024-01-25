export interface IChatBoxParams {
    page_num: number;
    page_size: number;
    user_id?: string | undefined;
    app_id: string;
    session_id?: string | undefined | null;
    request_url?: string;
}

export interface IChatBoxHistoryParams {
    user_id?: string;
    app_id: string;
    session_id?: string | undefined | null;
    request_url?: string;
}

export interface ICreateChatbotParams {
    type: string;
    profile_image: string;
    username: string;
    category_id: string;
    name: string;
    description: string;
    instruction: string;
    example_conversation: string;
}

export interface ICreateKBAndNFTParams {
    type: string;
    kb_data? : string;
    username? : string;
    name: string;
    description: string
    contract_address: string
    wallet_address: string
    supply: string
    category: string
    token_symbol: string
    price_per_query: number
    query_royalties: string
    token_amount: number
    url: string
}

// Used by hooks/api/nft/index.ts
export interface INFTDetailParams {
    sft_id: string;
}

export interface IChatbotDetailParams {
    chatbot_id: string;
}