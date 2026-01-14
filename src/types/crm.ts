export type LeadStatus = 'New' | 'Contacted' | 'Booked' | 'Lost';

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    bedrooms: number;
    bathrooms: number;
    priceQuote: number;
    status: LeadStatus;
    notes: string;
    createdAt: string; // ISO Status
    city: string;
}

export interface DragItem {
    id: string;
    type: 'LEAD';
}
