// 钱包加密与持久化工具

// 浏览器端 PBKDF2 + AES-GCM 加密工具
export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const enc = new TextEncoder()
    const baseKey = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    )
    return window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt instanceof Uint8Array ? new Uint8Array(salt).slice(0) : salt,
            iterations: 100_000,
            hash: 'SHA-256',
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    )
}

export async function encryptData(data: Uint8Array, password: string): Promise<{ cipher: Uint8Array, iv: Uint8Array, salt: Uint8Array }> {
    const salt = window.crypto.getRandomValues(new Uint8Array(16))
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const key = await deriveKey(password, salt)
    const cipherBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv instanceof Uint8Array ? new Uint8Array(iv).slice(0) : iv },
        key,
        data instanceof Uint8Array ? new Uint8Array(data).slice(0) : data
    )
    return { cipher: new Uint8Array(cipherBuffer), iv, salt }
}

export async function decryptData(cipher: Uint8Array, password: string, iv: Uint8Array, salt: Uint8Array): Promise<Uint8Array> {
    const key = await deriveKey(password, salt)
    const plainBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv instanceof Uint8Array ? new Uint8Array(iv).slice(0) : iv },
        key,
        cipher instanceof Uint8Array ? new Uint8Array(cipher).slice(0) : cipher
    )
    return new Uint8Array(plainBuffer)
}
