// @ts-ignore
/* eslint-disable */
import request from 'app/utils/request';

/** 文件上传 POST /member/file/upload */
export async function postFileUpload(options?: { [key: string]: any }) {
  return request<{ code: string; msg: string; data?: { url?: string } }>('/member/file/upload', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 文件上传 POST /member/file/upload */
export async function postFileUpload2(options?: { [key: string]: any }) {
  return request<{ code: string; msg: string; data?: { url?: string } }>('/member/file/upload', {
    method: 'POST',
    ...(options || {}),
  });
}
