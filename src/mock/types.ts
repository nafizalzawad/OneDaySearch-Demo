export type StateCode = 'MD' | 'VA' | 'DC';

export type PropertyType =
  | 'single_family'
  | 'townhouse'
  | 'condominium'
  | 'multi_family'
  | 'commercial';

export type CustomerRole =
  | 'buyer'
  | 'seller'
  | 'real_estate_agent'
  | 'mortgage_lender'
  | 'title_attorney'
  | 'other';

export type OrderStatus =
  | 'MATCHING'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'READY'
  | 'QUESTIONS'
  | 'CLOSED';

export type TierId = '24h' | '12h' | '6h';

export interface Property {
  address: string;
  unit?: string;
  city: string;
  county: string;
  state: StateCode;
  zip: string;
  propertyType: PropertyType;
  parcelId?: string;
}

export interface CustomerContact {
  fullName: string;
  email: string;
  mobile: string;
  role: CustomerRole;
  smsConsent: boolean;
}

export interface Tier {
  id: TierId;
  name: string;
  badge?: string;
  durationHours: number;
  price: number;
  providerPayout: number;
  description: string;
  popular?: boolean;
}

export interface TitleReport {
  id: string;
  version: string;
  isSuperseded: boolean;
  supersededReason?: string;
  effectiveDate: string;
  issuedAt: string;
  countyOffice: string;
  searchPeriodYears: number; // e.g. 40 years standard
  chainOfTitle: {
    instrument: string;
    grantor: string;
    grantee: string;
    recordingDate: string;
    bookPage: string;
  }[];
  openMortgages: {
    lender: string;
    borrower: string;
    originalAmount: number;
    recordingDate: string;
    instrumentNumber: string;
    status: 'OPEN' | 'SATISFACTION_PENDING';
  }[];
  recordedLiens: {
    type: string;
    creditor: string;
    debtor: string;
    amount: number;
    recordingDate: string;
    caseNumber?: string;
  }[];
  easementsCovenants: {
    description: string;
    grantee: string;
    bookPage: string;
  }[];
  abstractorCertification: {
    certifiedSearch: boolean;
    coverageJurisdiction: string;
    completedAt: string;
  };
  fileSize: string;
  pageCount: number;
}

export interface OrderMessage {
  id: string;
  orderId: string;
  senderRole: 'customer' | 'abstractor' | 'system';
  content: string;
  timestamp: string; // ISO
  formattedTime?: string;
}

export interface InternalOrder {
  id: string; // "OD-48213"
  token: string; // "d9f82a17c4b03e89"
  property: Property;
  customer: CustomerContact;
  tier: TierId;
  status: OrderStatus;
  createdAt: string; // ISO
  customerDueTime: string; // ISO computed in ET
  internalDueTime: string; // ISO - typically 2 hours before customerDueTime
  price: number;
  providerPayout: number;
  assignedProviderId?: string;
  assignedProviderName?: string;
  assignedAt?: string;
  report?: TitleReport;
  messages: OrderMessage[];
  isAfterHours: boolean;
  lateRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  internalNotes?: string[];
}

/**
 * HARD SEPARATION: Customer-Safe Order DTO
 * NEVER includes: provider names, provider payout, internal due times,
 * E&O insurance details, routing logic, admin alerts, internal tool names.
 */
export interface CustomerOrderDTO {
  id: string; // e.g. "OD-48213"
  token: string;
  property: Property;
  tier: TierId;
  status: OrderStatus;
  createdAt: string;
  customerDueTime: string;
  dueTimeFormatted: string;
  price: number;
  isAfterHours: boolean;
  report?: TitleReport;
  messages: OrderMessage[];
}

/**
 * HARD SEPARATION: Provider-Safe Order DTO
 * NEVER includes: customer name, customer email, customer phone number, customer billing details.
 */
export interface ProviderOrderDTO {
  id: string; // "OD-48213"
  property: Property; // address, county, state, propertyType
  tier: TierId;
  status: OrderStatus;
  internalDueTime: string;
  internalDueTimeFormatted: string;
  providerPayout: number;
  assignedAt?: string;
  report?: TitleReport;
  messages: OrderMessage[];
  customerRole: CustomerRole; // Role only (e.g. "buyer" or "agent"), NOT identity
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  countiesCovered: string[];
  eoPolicyNumber: string;
  eoExpiryDate: string;
  eoCoverageAmount: number;
  status: 'ACTIVE' | 'PENDING_EO' | 'INACTIVE';
  dailyCapacity: number;
  activeOrdersCount: number;
  rushSlotsCount: number;
  isOnline: boolean;
  todayEarnings: number;
  lifetimeEarnings: number;
  completedSearchesCount: number;
  onboardingStep: 'COMPLETE' | 'NEEDS_EO' | 'COUNTIES_SETUP';
}

export interface Offer {
  id: string;
  orderId: string;
  propertyAddress: string;
  county: string;
  state: StateCode;
  propertyType: PropertyType;
  tier: TierId;
  providerPayout: number;
  internalDeadlineFormatted: string;
  timeoutSecondsRemaining: number;
  expiresAt: string;
}

export interface SystemAlert {
  id: string;
  type:
    | 'NO_ACCEPTANCE_30MIN'
    | 'PROVIDER_DECLINED'
    | 'INTERNAL_DEADLINE_MISSED'
    | 'CUSTOMER_WINDOW_RISK'
    | 'UNANSWERED_QUESTION_24H'
    | 'EO_EXPIRED';
  severity: 'warning' | 'error' | 'critical';
  orderId?: string;
  providerId?: string;
  providerName?: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType:
    | 'ORDER_CREATED'
    | 'OFFER_DISPATCHED'
    | 'OFFER_ACCEPTED'
    | 'OFFER_DECLINED'
    | 'AUTO_REASSIGNED'
    | 'REPORT_UPLOADED'
    | 'ORDER_DELIVERED'
    | 'QUESTION_POSTED';
  orderId: string;
  actor: string;
  details: string;
}
