"use client"



export function secondToString(seconds: number): string {
    // 如果输入大于等于10000，假定为毫秒，先转换为秒
    if (seconds > 10000) {
        seconds = Math.floor(seconds / 1000);
    }
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}