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

export interface INFTDetailParams {
    sft_id: string;
}

export interface IChatbotDetailParams {
    chatbot_id: string;
}