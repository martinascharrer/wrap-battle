export function genId(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (let i = 0; i < 4; i++)
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    return result;
}
