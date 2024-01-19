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