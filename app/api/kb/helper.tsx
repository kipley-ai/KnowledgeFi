interface CreateKBResponse {
    status: string;
    msg: string;
    kb_id?: string;
}

export async function createKB(
    type: string,
    kbData: Array<Record<string, string>>,
    walletAddress: string
): Promise<CreateKBResponse> {
    const resp = await fetch("/api/kb/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-kf-user-id": walletAddress,
        },
        body: JSON.stringify({
            type: type,
            kb_data: kbData,
        }),
    });

    const data = await resp.json();

    return data as CreateKBResponse;
}