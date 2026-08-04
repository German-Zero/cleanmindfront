import { apiRequest } from '@/lib/api'
import type { TermsStatus } from '../types'

export const termsService = {
    getCurrent: () =>
        apiRequest<TermsStatus>('/api/terms/current', {
            cache: 'no-store',
        }),

    acceptCurrent: () =>
        apiRequest<TermsStatus>('/api/terms/current/accept', {
            method: 'POST',
        }),
}
