export interface IBMResponse {
    status: string,
    results: {
        original_text: string,
        predictions: {
            toxic: number,
            severe_toxic: number,
            obscene: number,
            threat: number,
            insult: number,
            identity_hate: number
        }
    }[]
}