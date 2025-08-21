// 工具函数：随机抽取助记词的索引
export function getRandomMnemonicIndexes(length: number, count = 3): number[] {
    const arr = Array.from({ length }, (_, i) => i)
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, count).sort((a, b) => a - b)
}
