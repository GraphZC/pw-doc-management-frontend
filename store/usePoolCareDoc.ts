'use client'
import { Pool } from '@/interface/Pool';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PoolCareDocState {
    data: Pool[];
    month: number;
    year: number;
    setData: (data: Pool[]) => void;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
}

const usePoolCareDoc = create<PoolCareDocState>()(
    persist(
        (set) => ({
            data: [],
            month: 0,
            year: 0,
            setData: (data: Pool[]) => set({ data }),
            setMonth: (month: number) => set({ month }),
            setYear: (year: number) => set({ year }),
        }),
        {
            name: 'poolCareDoc-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default usePoolCareDoc;