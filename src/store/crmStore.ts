import { useState, useEffect } from 'react';
import { Lead } from '../types/crm';

const STORAGE_KEY = 'stronghomes_leads_v1';

export function useCrmStore() {
    const [leads, setLeads] = useState<Lead[]>([]);

    // Load mostly on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setLeads(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse leads', e);
            }
        } else {
            // Seed with some dummy data if empty for demo
            seedData();
        }
    }, []);

    // Save whenever changes happen
    useEffect(() => {
        if (leads.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
        }
    }, [leads]);

    const seedData = () => {
        const dummy: Lead[] = [
            {
                id: '1',
                name: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                phone: '(219) 555-0123',
                serviceType: 'Standard',
                bedrooms: 3,
                bathrooms: 2,
                priceQuote: 160,
                status: 'New',
                notes: '',
                city: 'Hammond',
                createdAt: new Date().toISOString(),
            },
            {
                id: '2',
                name: 'Mike Smith',
                email: 'mike.s@example.com',
                phone: '(219) 555-0199',
                serviceType: 'Deep',
                bedrooms: 4,
                bathrooms: 3,
                priceQuote: 280,
                status: 'Contacted',
                notes: 'Called, left voicemail.',
                city: 'Valparaiso',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
            },
        ];
        setLeads(dummy);
    };

    const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
        const newLead: Lead = {
            ...lead,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: 'New',
        };
        setLeads((prev) => [newLead, ...prev]);
    };

    const updateLeadStatus = (id: string, status: Lead['status']) => {
        setLeads((prev) =>
            prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
    };

    const updateLeadNotes = (id: string, notes: string) => {
        setLeads((prev) =>
            prev.map((l) => (l.id === id ? { ...l, notes } : l))
        );
    };

    const deleteLead = (id: string) => {
        setLeads((prev) => prev.filter(l => l.id !== id));
    };

    return { leads, addLead, updateLeadStatus, updateLeadNotes, deleteLead };
}
