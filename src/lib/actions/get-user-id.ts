'use server';

import { headers } from 'next/headers';

export async function getUserId() {

    const readonlyHeaders = await headers();


    const requestHeaders = new Headers(readonlyHeaders);

    const userId = requestHeaders.get('user-id');
    return userId;
}
