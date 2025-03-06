/*
 * @Date: 2025-03-05 14:08:16
 * @LastEditors: yosan
 * @LastEditTime: 2025-03-06 13:41:03
 * @FilePath: /ezgg-app/packages/app/utils/crypto.ts
 */
/*
 * @Description: ID加密解密工具
 */

// 使用一个安全的密钥
const CRYPTO_KEY = 'your-secret-key-here';

/**
 * 简单的异或加密
 * @param text - 要加密的文本
 * @param key - 密钥
 * @returns 加密后的文本
 */
const xorEncrypt = (text: string, key: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
};

/**
 * 加密ID
 * @param id - 要加密的ID
 * @returns 加密后的字符串
 */
export const encryptId = (id: string | number): string => {
  // 将ID转换为字符串
  const idStr = id.toString();

  // 使用密钥进行异或加密
  const encrypted = xorEncrypt(idStr, CRYPTO_KEY);

  // 使用 Base64 编码
  const base64 = Buffer.from(encrypted).toString('base64');

  // 添加一些随机字符使其更难被破解
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);

  // 组合加密后的字符串
  return `${timestamp}${base64}${random}`;
};

/**
 * 解密ID
 * @param encryptedId - 加密后的字符串
 * @returns 原始ID
 */
export const decryptId = (encryptedId: string): string => {
  try {
    // 提取 Base64 编码部分（去除时间戳和随机字符）
    const base64Part = encryptedId.slice(8, -5);

    // Base64 解码
    const decoded = Buffer.from(base64Part, 'base64').toString();

    // 使用密钥进行异或解密
    const decrypted = xorEncrypt(decoded, CRYPTO_KEY);

    return decrypted;
  } catch (error) {
    console.error('解密ID失败:', error);
    return '';
  }
};

// 使用示例：
// const originalId = '12345';
// const encrypted = encryptId(originalId);
// console.log('加密后:', encrypted);
// const decrypted = decryptId(encrypted);
// console.log('解密后:', decrypted);
